import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';

import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  @Mutation(() => User)
  createUser() {
    return INITIAL_RESPONSE;
  }

  @Query(() => [User], { name: 'user' })
  findAll() {
    return INITIAL_RESPONSE;
  }
}
