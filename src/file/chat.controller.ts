import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/api/v1')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/chat')
  public async chat(@Body() input: { text: string }) {
    return this.chatService.chat(input);
  }
}