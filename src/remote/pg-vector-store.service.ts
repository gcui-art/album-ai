import { OpenAIEmbeddings } from '@langchain/openai';
import { configService } from '../config/config.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';

@Injectable()
export class PgVectorStoreService implements OnModuleInit {
  private pgvectorStore: PGVectorStore;

  async onModuleInit() {
    await this.init();
  }

  public async init() {
    this.pgvectorStore = await PGVectorStore.initialize(
      new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        configuration: {
          httpAgent: process.env.PROXY_URL
            ? new HttpsProxyAgent(process.env.PROXY_URL)
            : undefined,
        },
      }),
      configService.getPGvectorConfig(),
    );
  }

  public async addDoc(pageContent: string, metadata: Record<string, any>) {
    await this.pgvectorStore.addDocuments([
      {
        pageContent: pageContent,
        metadata: metadata,
      },
    ]);
  }

  public async addDocs(
    docs: { pageContent: string; metadata: Record<string, any> }[],
  ) {
    await this.pgvectorStore.addDocuments(docs);
  }

  public async search(query: string) {
    return this.pgvectorStore.similaritySearch(query);
  }
}
