import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class S3Service {
  private readonly bucket = process.env.S3_BUCKET_NAME;
  private readonly region = process.env.AWS_REGION;
  private readonly client: S3Client;

  constructor() {
    if (!this.bucket) {
      throw new Error('S3_BUCKET_NAME is not set');
    }

    if (!this.region) {
      throw new Error('AWS_REGION is not set');
    }

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  async upload(params: {
    key: string;
    body: Buffer;
    contentType?: string;
  }): Promise<string> {
    const { key, body, contentType } = params;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
