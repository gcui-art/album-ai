import { Injectable } from '@nestjs/common';
import { openai } from '../app.module';

@Injectable()
export class EmbeddingService {
  public async embeddingByOpenAI(text: string) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  }
}
