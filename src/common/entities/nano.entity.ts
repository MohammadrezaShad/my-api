import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { customAlphabet } from 'nanoid';

import { toPersianDate } from './../middleware/to-persian-date.middleware';

@ObjectType()
export class NanoEntity {
  @Field(type => String)
  @Prop({
    type: String,
  })
  _id: string;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: string;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: string;
}
