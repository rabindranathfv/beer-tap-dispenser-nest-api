import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from '../constants';
import { Usage } from './usage.schema';
import * as mongoose from 'mongoose';

export type DispenserDocument = HydratedDocument<Dispenser>;

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Dispenser {
  _id?: string;

  @Prop({ required: true })
  flow_volume: number;

  @Prop({ required: true, type: String, enum: Status })
  status: Status;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: Usage.name }],
    default: [],
  })
  usage: Usage[];
}

export const DispenserSchema = SchemaFactory.createForClass(Dispenser);
