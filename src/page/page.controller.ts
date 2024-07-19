import { Get, Controller, Render, Query, Logger } from '@nestjs/common';
import { ChatService } from '../file/chat.service';

@Controller('/')
export class PageController {
  private readonly logger = new Logger(PageController.name);

  constructor(private readonly chatService: ChatService) {}

  @Get('/')
  @Render('index')
  async root(@Query('query') query?: string) {
    this.logger.log('query:', query);
    if (query) {
      const { content } = await this.chatService.chat({ text: query });
      this.logger.log('Answer:', content);
      return {
        answer: content,
        query: query || null,
      };
    }
    return {
      query: query || null,
    };
  }
}
