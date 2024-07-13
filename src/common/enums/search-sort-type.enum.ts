import { registerEnumType } from '@nestjs/graphql';

export enum SearchSortType {
  NEWEST = 'newest',
  POST_COUNT = 'postCount',
}

registerEnumType(SearchSortType, {
  name: 'SearchSortType',
});
