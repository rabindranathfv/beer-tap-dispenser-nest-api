import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsageDocument = HydratedDocument<Usage>;

@Schema({ versionKey: false })
export class Usage {
  _id?: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Dispenser' })
  dispenser?: string;

  @Prop({ required: true, type: Number })
  flow_volume: number;

  @Prop({ type: Date, required: true })
  opened_at: Date;

  @Prop({ type: Date })
  closed_at: Date | null;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
