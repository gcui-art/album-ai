import { Injectable } from '@nestjs/common';
import { anthropicClient } from '../app.module';
import * as sharp from 'sharp';

@Injectable()
export class ExtractImageService {
  public async extractImageInfo(
    imageBase64: string,
    contentType: 'image/jpeg',
  ) {
    return anthropicClient.messages.create({
      model: 'claude-3-haiku-20240307',
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
              text: 'Describe this image.',
            },
          ],
        },
      ],
    });
  }

  public async compressImageToBuffer(inputImagePath: string, quality: number) {
    const image = sharp(inputImagePath);
    return await image.jpeg({ quality }).toBuffer();
  }

  public async imageToBase64(imageBuffer: Buffer) {
    return imageBuffer.toString('base64');
  }
}
