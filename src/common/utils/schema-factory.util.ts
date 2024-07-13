import { Type } from '@nestjs/common';
import { SchemaFactory as MongoSchemaFactory } from '@nestjs/mongoose';

export const SchemaFactory = <T>(target: Type<T>) =>
  MongoSchemaFactory.createForClass(target);
