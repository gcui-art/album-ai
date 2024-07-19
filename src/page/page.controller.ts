import { Get, Controller, Render, Query } from '@nestjs/common';

@Controller('/')
export class PageController {
  @Get('/')
  @Render('index')
  root(@Query('query') query?: string) {
    console.log("query:", query);
    if (query) {
      const message = `The images depict various cats, including a gray cat sitting on a shelf, a cute and adorable kitten, a close-up portrait of a black and white cat: ![https://picsum.photos/600](https://picsum.photos/600)\n![https://picsum.photos/600](https://picsum.photos/600)`;
      console.log("Answer:", message);
      return {
        message: message,
        query: query || null
      };
    }
    return {
      query: query || null
    };
  }
}
