import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileAlbum } from './file-scan.entity.js';
import { In, MoreThan, Repository } from 'typeorm';
import { glob } from 'glob';
import { configService } from '../config/config.service.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import crc32 from 'crc/crc32';
import * as mime from 'mime-types';
import { FileStatus } from '../common';
import { ExtractImageService } from '../remote/extract-image.service';
import { PgVectorStoreService } from '../remote/pg-vector-store.service';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  private hasScanFileTask = false;
  private hasExtractDescTask = false;
  private hasEmbeddingTask = false;

  constructor(
    @InjectRepository(FileAlbum)
    private readonly fileRepository: Repository<FileAlbum>,
    private readonly extractImageService: ExtractImageService,
    private readonly pgVectorStoreService: PgVectorStoreService,
  ) {}

  public findAll() {
    return this.fileRepository.find();
  }

  public async scanFile() {
    if (this.hasScanFileTask) {
      return;
    }

    this.hasScanFileTask = true;
    try {
      const dir = configService.getAlbumDir();
      const filePaths = await glob(`${dir}/**/*`);

      const fileDetails = filePaths.map(async (filePath) => {
        const stats = fs.lstatSync(filePath);

        const fileBuffer = fs.readFileSync(filePath);
        const crc = crc32(fileBuffer).toString(16);

        return {
          path: filePath,
          name: path.basename(filePath),
          isDirectory: stats.isDirectory(),
          size: stats.size,
          crc: crc,
          fileType: mime.lookup(filePath) || 'unknown',
        };
      });

      const resList = await Promise.all(fileDetails);
      const dataList = resList.map((item) => {
        return {
          fileName: item.name,
          path: item.path,
          crc: item.crc,
          status: FileStatus.Init,
          crcFile: item.fileType,
          contentType: item.fileType,
          size: item.size,
        } as Partial<FileAlbum>;
      });
      // save DB
      await this.fileRepository
        .createQueryBuilder()
        .insert()
        .into(FileAlbum)
        .values(dataList)
        .orIgnore()
        .execute();
    } catch (err) {
      this.logger.warn('exec scanning file error', err);
    } finally {
      this.hasScanFileTask = false;
    }
  }

  public async extractDesc() {
    if (this.hasExtractDescTask) {
      return;
    }
    this.hasExtractDescTask = true;
    try {
      let cursorId = 0n;
      while (true) {
        const dataList = await this.fileRepository.find({
          where: {
            fId: MoreThan(cursorId),
            status: FileStatus.Init,
          },
          take: 10,
          order: { fId: 'asc' },
        });

        if (!dataList || dataList.length == 0) {
          return;
        }
        cursorId = dataList[dataList.length - 1].fId;

        for (const fileAlbum of dataList) {
          const imageBuf = await this.extractImageService.compressImageToBuffer(
            fileAlbum.path,
            80,
          );
          const base64 = await this.extractImageService.imageToBase64(imageBuf);
          const content = await this.extractImageService.extractImageInfo(
            base64,
            'image/jpeg',
          );

          await this.fileRepository.update(
            {
              fId: fileAlbum.fId,
              status: FileStatus.Init,
            },
            {
              descAi: content,
              status: FileStatus.Extract,
            },
          );
        }
      }
    } catch (err) {
      this.logger.warn('exec extracting Desc error', err);
    } finally {
      this.hasExtractDescTask = false;
    }
  }

  public async embedding() {
    if (this.hasEmbeddingTask) {
      return;
    }
    this.hasEmbeddingTask = true;
    try {
      let cursorId = 0n;
      while (true) {
        const dataList = await this.fileRepository.find({
          where: {
            fId: MoreThan(cursorId),
            status: FileStatus.Extract,
          },
          take: 10,
          order: { fId: 'asc' },
        });

        if (!dataList || dataList.length == 0) {
          return;
        }
        cursorId = dataList[dataList.length - 1].fId;
        const docs = dataList.map((item) => {
          return {
            pageContent: item.descAi,
            metadata: { fId: item.fId.toString() },
          } as { pageContent: string; metadata: Record<string, any> };
        });
        await this.pgVectorStoreService.addDocs(docs);

        await this.fileRepository.update(
          {
            fId: In(dataList.map((item) => item.fId)),
            status: FileStatus.Extract,
          },
          {
            status: FileStatus.Embedding,
          },
        );
      }
    } catch (err) {
      this.logger.warn('exec embedding error', err);
    } finally {
      this.hasEmbeddingTask = false;
    }
  }

  public async searchDetail(query: string) {
    const results = await this.pgVectorStoreService.search(query);
    if (!results || results.length == 0) {
      return;
    }
    const fIds = results.map((item) => item.metadata.fId);
    const fileAlbums = await this.fileRepository.find({
      where: {
        fId: In(fIds),
      },
    });
    const fileUrls = fIds.map((fId) => {
      return {
        fId,
        url: `${configService.getHostName()}/api/v1/file/${fId}/download`,
      };
    });
    return {
      results,
      fileAlbums,
      urls: fileUrls,
    };
  }

  public async findFile(fId: string) {
    return await this.fileRepository.findOne({
      where: {
        fId: BigInt(fId),
      },
    });
  }
}
