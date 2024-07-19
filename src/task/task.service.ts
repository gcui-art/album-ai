import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FileService } from '../file/file.service.js';
import { configService } from '../config/config.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly fileService: FileService) {}

  @Cron('0 */1 * * * *')
  async triggerScanFile() {
    this.logger.log(
      `Starting scan files, path: ${configService.getAlbumDir()}`,
    );
    await this.fileService.scanFile();
  }

  @Cron('0 */1 * * * *')
  async triggerExtractDesc() {
    this.logger.log('Starting extract desc');
    await this.fileService.extractDesc();
  }

  @Cron('0 */1 * * * *')
  async triggerEmbedding() {
    this.logger.log('Starting embedding');
    await this.fileService.embedding();
  }
}
