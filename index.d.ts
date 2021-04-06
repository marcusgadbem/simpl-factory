import {
  FactorySchema,
  Factory,
  Args,
} from './src/types.d';

declare const simplFactory: simplFactory.Api;

declare namespace simplFactory {
  interface Api {
    registerFactory(factoryName: string, factory: Factory): void

    createFactory(factoryName: string, ...args: Args[]): FactorySchema

    createFactoryList(
      factoryName: string,
      count: number,
      ...args: Args[],
    ): FactorySchema[]
  }
}

export = simplFactory;
export as namespace simplFactory;
