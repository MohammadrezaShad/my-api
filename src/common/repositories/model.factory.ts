export interface ModelFactory<TModel> {
  create(...args: any): TModel | Promise<TModel>;
}
