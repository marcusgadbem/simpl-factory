import {
  FactorySchema,
  Factory,
  Args,
} from './src/types.d';

declare const simplFactory: simplFactory.Api;

declare namespace simplFactory {
  interface Api {
    define(factoryName: string, factory: Factory): void
    create(factoryName: string, ...args: Args[]): FactorySchema
    createList(
      factoryName: string,
      count: number,
      ...args: Args[],
    ): FactorySchema[]
  }
}

export = simplFactory;
export as namespace simplFactory;
