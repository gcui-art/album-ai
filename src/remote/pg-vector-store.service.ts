import { OpenAIEmbeddings } from '@langchain/openai';
import { configService } from '../config/config.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { similaritySearch } from '@langchain/community/dist/vectorstores/tests/convex/convex/lib';

@Injectable()
export class PgVectorStoreService implements OnModuleInit {
  private pgvectorStore: PGVectorStore;

  async onModuleInit() {
    await this.init();
  }

  public async init() {
    if (process.env.EMBEDDING_PROVIDER == 'openai') {
      this.pgvectorStore = await PGVectorStore.initialize(
        new OpenAIEmbeddings({
          apiKey: process.env.OPENAI_API_KEY,
          model: process.env.EMBEDDING_PROVIDER_MODEL,
          configuration: {
            httpAgent: process.env.PROXY_URL
              ? new HttpsProxyAgent(process.env.PROXY_URL)
              : undefined,
          },
        }),
        configService.getPGvectorConfig(),
      );
    } else {
      throw new Error(`no support. provider=${process.env.EMBEDDING_PROVIDER}`);
    }
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

  public async search(query: string, limit: number) {
    return this.pgvectorStore.similaritySearchWithScore(query, limit);
  }
}
