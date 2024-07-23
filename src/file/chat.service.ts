import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import { anthropicClient, openai } from '../app.module';
import Anthropic from '@anthropic-ai/sdk';
import TextBlock = Anthropic.TextBlock;
import { replacePlaceholders } from '../common';

@Injectable()
export class ChatService {
  constructor(private readonly fileService: FileService) {}

  public async chat(input: { text: string }) {
    const { results, urls } = await this.fileService.searchDetail(input.text);
    if (!results || results.length == 0) {
      return { code: 404, msg: 'Not found' };
    }

    let content;
    if (process.env.CHAT_PROVIDER == 'openai') {
      const response = await openai.chat.completions.create({
        model: process.env.CHAT_PROVIDER_MODEL,
        max_tokens: 1024,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: replacePlaceholders(process.env.CHAT_PROVIDER_PROMPT, {
              inputText: input.text,
              imageData: JSON.stringify({ results, urls }),
            }),
          },
        ],
      });
      content = response.choices[0].message.content;
    } else if (process.env.CHAT_PROVIDER == 'anthropic') {
      const response = await anthropicClient.messages.create({
        model: process.env.CHAT_PROVIDER_MODEL,
        max_tokens: 1024,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: replacePlaceholders(process.env.CHAT_PROVIDER_PROMPT, {
              inputText: input.text,
              imageData: JSON.stringify({ results, urls }),
            }),
          },
        ],
      });
      content = (response.content[0] as TextBlock).text;
    } else {
      throw new Error(`no support. provider=${process.env.CHAT_PROVIDER}`);
    }
    return {
      content,
    };
  }
}
