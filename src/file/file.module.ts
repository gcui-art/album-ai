import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAlbum } from './file-scan.entity.js';
import { FileController } from './file.controller.js';
import { FileService } from './file.service.js';
import { EmbeddingService } from '../remote/embedding.service';
import { ExtractImageService } from '../remote/extract-image.service';
import { PgVectorStoreService } from '../remote/pg-vector-store.service';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileAlbum])],
  controllers: [FileController, ChatController],
  providers: [
    FileService,
    EmbeddingService,
    ExtractImageService,
    PgVectorStoreService,
    ChatService,
  ],
  exports: [FileService],
})
export class FileModule {}
