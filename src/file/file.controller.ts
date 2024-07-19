import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { FileService } from './file.service.js';
import { Response } from 'express';

@Controller('/api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/search')
  public async search(@Query('query') query: string) {
    return this.fileService.searchDetail(query);
  }

  @Get('/:fId/download')
  public async download(@Param('fId') fId: string, @Res() response: Response) {
    const file = await this.fileService.findFile(fId);
    response.download(file.path, (err) => {
      if (!err) {
        return;
      }
      response.send({
        code: 500,
        msg: 'download error',
      });
    });
  }
}
