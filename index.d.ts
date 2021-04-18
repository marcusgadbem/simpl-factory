import {
  FactorySchema,
  Factory,
  Args,
} from './src/types.d';

declare const simplFactory: SimplFactory;

interface SimplFactory {
  define(factoryName: string, factory: Factory): void
  create<T = FactorySchema>(factoryName: string, ...args: Args[]): T
  createList<T = FactorySchema>(factoryName: string, count: number, ...args: Args[]): T[]
}

export = simplFactory;
export as namespace simplFactory;
