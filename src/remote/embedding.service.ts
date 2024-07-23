import { Injectable } from '@nestjs/common';
import { openai } from '../app.module';

@Injectable()
export class EmbeddingService {
  public async embeddingByOpenAI(text: string) {
    if (process.env.EMBEDDING_PROVIDER == 'openai') {
      const response = await openai.embeddings.create({
        model: process.env.EMBEDDING_PROVIDER_MODEL,
        input: text,
      });
      return response.data[0].embedding;
    } else {
      throw new Error(`no support. provider=${process.env.EMBEDDING_PROVIDER}`);
    }
  }
}
