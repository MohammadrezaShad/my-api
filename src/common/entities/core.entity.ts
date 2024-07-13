import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

import { toPersianDate } from './../middleware/to-persian-date.middleware';

@ObjectType()
export class CoreEntity {
  @Field(type => Int)
  @Prop({
    type: Number,
  })
  _id: number;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  createdAt?: Date;
  @Field(type => String, { nullable: true, middleware: [toPersianDate] })
  updatedAt?: Date;
}
