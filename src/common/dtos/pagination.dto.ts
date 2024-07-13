import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field(type => Int, { defaultValue: 1, nullable: true })
  page: number;

  @Field(type => Int, { defaultValue: 24, nullable: true })
  count: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(type => Int, { nullable: true })
  totalPages?: number;

  @Field(type => Int, { nullable: true })
  totalCount?: number;
}
