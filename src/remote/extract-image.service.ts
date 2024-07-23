import { Injectable } from '@nestjs/common';
import { anthropicClient, openai } from '../app.module';
import * as sharp from 'sharp';
import Anthropic from '@anthropic-ai/sdk';
import TextBlock = Anthropic.TextBlock;

@Injectable()
export class ExtractImageService {
  public async extractImageInfo(
    imageBase64: string,
    contentType: 'image/jpeg',
  ) {
    if (process.env.IMAGE_EXTRACT_PROVIDER == 'anthropic') {
      const res = await anthropicClient.messages.create({
        model: process.env.IMAGE_EXTRACT_PROVIDER_MODEL,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: contentType,
                  data: imageBase64,
                },
              },
              {
                type: 'text',
                text: process.env.IMAGE_EXTRACT_PROVIDER_PROMPT,
              },
            ],
          },
        ],
      });
      return (res.content[0] as TextBlock).text;
    } else if (process.env.IMAGE_EXTRACT_PROVIDER == 'openai') {
      const res = await openai.chat.completions.create({
        model: process.env.IMAGE_EXTRACT_PROVIDER_MODEL,
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:${contentType};base64,${imageBase64}`,
                },
              },
              {
                type: 'text',
                text: process.env.IMAGE_EXTRACT_PROVIDER_PROMPT,
              },
            ],
          },
        ],
      });
      return res.choices[0].message.content;
    } else {
      throw new Error(
        `no support. provider=${process.env.IMAGE_EXTRACT_PROVIDER}`,
      );
    }
  }

  public async compressImageToBuffer(inputImagePath: string, quality: number) {
    const image = sharp(inputImagePath);
    return await image
      .resize({
        width: 512,
        height: 512,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .jpeg({ quality })
      .toBuffer();
  }

  public async imageToBase64(imageBuffer: Buffer) {
    return imageBuffer.toString('base64');
  }
}
