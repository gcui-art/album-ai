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
              text: `You are an advanced image recognition AI tasked with identifying and describing the contents of images.    Your analysis will be used in an image recognition software.    Follow these instructions carefully:
1.    You will be presented with an image.

2.    Analyze the image thoroughly, paying attention to all visible elements, including:
- Objects
- People
- Text
- Colors
- Shapes
- Patterns
- Background
- Foreground
- Emotional and atmosphere
- Any notable features or characteristics

3.    If any aspect of the image is unclear or ambiguous, state this explicitly in the relevant section of your analysis.    Use phrases like "unclear," "ambiguous," or "cannot be determined with certainty" when appropriate.

4.    Remember to respect privacy and ethical considerations:
- Do not attempt to identify specific individuals
- Avoid making assumptions about race, ethnicity, or other sensitive characteristics unless they are clearly relevant to the image content
- If the image contains potentially sensitive or inappropriate content, mention this in the Additional Note section without going into explicit detail

5.    Provide your complete analysis(Markdown format) within <metadata> tags.

Remember, your goal is to provide an accurate, detailed, and objective description of the image contents that can be used by image recognition software.    Focus on what you can see and reasonably infer from the image itself.`,
            },
          ],
        },
      ],
    });
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
