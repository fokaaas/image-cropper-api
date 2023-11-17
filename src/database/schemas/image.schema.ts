import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop({
    required: true,
  })
    url: string;

  @Prop({
    required: true,
    default: Date.now,
  })
    processedAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
