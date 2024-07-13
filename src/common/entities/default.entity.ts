import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

import { toPersianDate } from './../middleware/to-persian-date.middleware';

@ObjectType()
export class DefaultEntity {
  @Field(type => String)
  _id: ObjectId;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: string;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: string;
}
