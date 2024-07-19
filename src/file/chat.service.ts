import { Injectable } from '@nestjs/common';
import { anthropicClient } from '../app.module';
import { TextBlock } from '@anthropic-ai/sdk/src/resources/messages';
import { FileService } from './file.service';

@Injectable()
export class ChatService {
  constructor(private readonly fileService: FileService) {}

  public async chat(input: { text: string }) {
    const { results, urls } = await this.fileService.searchDetail(input.text);
    if (!results || results.length == 0) {
      return { code: 404, msg: 'Not found' };
    }

    const response = await anthropicClient.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: `The user input information is "${input.text}", and the result of vector library retrieval is: 
            ${JSON.stringify({ results, urls })}, fId is the unique identification of the picture. 
            Give a answer, do not include any relevant words about the process, and attach a link to the corresponding image according to the fId`,
        },
      ],
    });

    const content = (response.content[0] as TextBlock).text;
    return {
      content,
    };
  }
}
