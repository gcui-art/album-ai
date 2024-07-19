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
      max_tokens: 300,
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

    const content = response.choices[0].message.content;
    return {
      content,
    };
  }
}
