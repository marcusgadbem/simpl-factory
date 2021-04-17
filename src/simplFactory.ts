import { renderFactory, processArgs } from './core';
import { isFunction } from './utils';
import { FactoryList, FactorySchema, Factory, Args } from './types.d';

/**
 * Registry of all factories
 */
export const registry: FactoryList = {};

/**
 * Registers a new factory.
 */
export function define(
  factoryName: string,
  factory: Factory
): void {
  if (!Object.prototype.hasOwnProperty.call(factory(), 'schema')) {
    throw new Error('A schema is required to define a factory.');
  }

  if (Object.prototype.hasOwnProperty.call(registry, factoryName)) {
    console.warn(`Factory "${factoryName}" was redefined.`);
  }

  registry[factoryName] = factory;
}

/**
 * Create a literal object derived from the given factory.
 * @param factoryName Factory name
 * @param args Arguments including traits and/or contextual data
 * @returns object with resolved factory
 */
export function create(
  factoryName: string,
  ...args: Args[]
): FactorySchema {
  const { traits, context } = processArgs(args);

  if (!registry[factoryName]) {
    throw new Error(`Factory ${factoryName} does not exists.`);
  }

  return renderFactory(registry, factoryName, traits, context);
}

/**
 * Resolve and return a list of new instances of a factory.
 * @param factoryName Factory name
 * @param count Amount of instances to be generated
 * @param args Arguments including traits and/or contextual data
 * @returns
 */
export function createList(
  factoryName: string,
  count = 10,
  ...args: Args[]
): FactorySchema[] {
  const { traits, context } = processArgs(args);

  const arrayWithIndexes: number[] =
    Array(count)
      .fill(0)
      .map((_, index) => index);

  return arrayWithIndexes.map(index =>
    renderFactory(
      registry,
      factoryName,
      traits,
      // @ts-expect-error: how to fix this?
      // Error:
      //    This expression is not callable.
      //    Not all constituents of type 'Context' are callable.
      //    Type 'FactorySchema' has no call signatures.ts(2349)
      isFunction(context) ? context(index) : context
    )
  );
}
