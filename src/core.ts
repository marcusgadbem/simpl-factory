import reduce from 'ramda/src/reduce';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import init from 'ramda/src/init';
import last from 'ramda/src/last';

import {
  isObject,
  isFunction,
  isString,
} from './utils';

import {
  FactoryList,
  FactorySchema,
  FactoryTraits,
  Context,
  Args,
} from './types.d';

/**
 * Create and return a factory with traits and contextual data.
 * @param registry Registry of factories
 * @param factoryName Name of the factory
 * @param traits A list of traits to be resolved
 * @param context Contextual data to be merged within schema
 * @returns literal object with resolved traits and contextual data.
 */
export function renderFactory(
  registry: FactoryList,
  factoryName: string,
  traits: string[],
  context: Context,
): FactorySchema {
  const {
    schema: factorySchema,
    traits: factoryTraits = {}
  } = registry[factoryName]();

  return reduce<FactorySchema[], FactorySchema>(
    mergeDeepRight,
    // @ts-expect-error: TypeScript complains about new Object and {}
    new Object(),
    [
      factorySchema,
      ...buildTraits(factoryTraits, traits),
      context
    ]
  );
}

/**
 * Resolve traits data for a given traits object.
 * @param factoryTraits Factory traits
 * @param traits Traits to resolve
 * @returns
 */
export function buildTraits(
  factoryTraits: FactoryTraits,
  traits: string[]
): Record<string, unknown>[] {
  return traits.map((trait: string) => factoryTraits[trait]);
}

/**
 * Process overloaded arguments, splitting it into `traits` and `context`
 * @param args
 * @returns object of { traits, context}
 */

type ProcessedArgs = {
  traits: string[],
  context: Context,
};

export function processArgs(args: Args[]): ProcessedArgs {
  let traits: string[] = [];
  let context = {};

  if (args.length) {
    const lastArg: Args = last(args);
    // @ts-expect-error: at least one arg will be present
    const restArgs: string[] = init(args);

    // context can be either a Object or a Function
    if (isObject(lastArg) || isFunction(lastArg)) {
      // @ts-expect-error: Unreachable code error
      context = isFunction(lastArg) ? lastArg : { ...lastArg };
      traits = [...restArgs];
    }

    if (isString(lastArg)) {
      // @ts-expect-error: at least one arg will be present
      traits = [...args];
    }
  }

  return { traits, context };
}
