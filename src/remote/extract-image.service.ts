import { Injectable } from '@nestjs/common';
import { openai } from '../app.module';
import * as sharp from 'sharp';

@Injectable()
export class ExtractImageService {
  public async extractImageInfo(
    imageBase64: string,
    contentType: 'image/jpeg',
  ) {
    return openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
