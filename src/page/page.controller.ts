import { Get, Controller, Render } from '@nestjs/common';

@Controller('/demo')
export class PageController {
  @Get('/index')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
