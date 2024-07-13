import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { DefaultEntity } from './default.entity';

@ObjectType('BaseMainEntityType')
export class BaseMainEntity extends DefaultEntity {
  @Prop()
  @Field(() => String)
  @IsString()
  name: string;

  @Prop()
  @Field(() => String)
  @IsString()
  slug: string;

  @Prop({
    type: Number,
    default: 0,
  })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  postCount?: number;

  @Prop()
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}
