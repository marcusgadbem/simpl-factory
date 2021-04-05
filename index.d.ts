import {
  FactorySchema,
  Factory,
  Args,
} from './src/types.d';

declare const nfactory: nfactory.Api;

declare namespace nfactory {
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

export = nfactory;
export as namespace nfactory;
