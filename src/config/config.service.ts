import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FileAlbum } from '../file/file-scan.entity.js';
import { PoolConfig } from 'pg';
import { DistanceStrategy } from '@langchain/community/dist/vectorstores/pgvector';

export class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [FileAlbum],
    };
  }

  public getPGvectorConfig() {
    return {
      postgresConnectionOptions: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      } as PoolConfig,
      tableName: 'file_vector_index',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'embedding',
        contentColumnName: 'text',
        metadataColumnName: 'metadata',
      },
      // supported distance strategies: cosine (default), innerProduct, or euclidean
      distanceStrategy: 'cosine' as DistanceStrategy,
    };
  }

  public getAlbumDir() {
    return process.env.ALBUM_PATH || '/home/images';
  }

  public getHostName() {
    return process.env.HOST_NAME || 'http://127.0.0.1:8080';
  }
}

export const configService = new ConfigService();
