import { registerEnumType } from '@nestjs/graphql';

export enum CollectionName {
  IMAGE = 'image',
}

registerEnumType(CollectionName, {
  name: 'CollectionName',
});
