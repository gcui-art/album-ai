import { NestFactory } from '@nestjs/core';
import * as process from 'node:process';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.init();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(() => {
  console.log('success launched!');
});
