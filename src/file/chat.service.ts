import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import { openai } from '../app.module';

@Injectable()
export class ChatService {
  constructor(private readonly fileService: FileService) {
  }

  public async chat(input: { text: string }) {
    const { results, urls } = await this.fileService.searchDetail(input.text);
    if (!results || results.length == 0) {
      return { code: 404, msg: 'Not found' };
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      temperature: 0.5,
      messages: [
        {
          role: 'user',
          content: `You are an artificial intelligence image album assistant, and your goal is to respond to user requests by combining relevant image data. 
The user request is:  <request>${input.text}</request>,
and the associated images are: <images>${JSON.stringify({ results, urls })}</images>.
'fId' is the unique identification of the image.
You need to return a friendly response in Markdown format and showcase the related images(use markdown image tag).`
        },
      ],
    });

    const content = response.choices[0].message.content;
    return {
      content,
    };
  }
}
