import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { FileService } from '../src/file/file.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let fileService: FileService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    fileService = moduleFixture.get(FileService);
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('test scan', async () => {
    await fileService.scanFile();
    console.log('-------------');
  });
});
