import { AggregateRoot } from '@nestjs/cqrs';

export interface ModelEntityFactory<TEntity, TModel extends AggregateRoot> {
  create(model: TModel): TEntity;
  createFromEntity(entity: TEntity): TModel;
}
