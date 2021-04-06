export interface Factory {
  (): {
    schema: FactorySchema,
    traits?: FactoryTraits,
  }
}
export type FactoryList = Record<string, Factory>
export type FactorySchema = Record<string, unknown>;
export type FactoryTraits = Record<
  string,
  FactorySchema
>;

/**
 * User inputs
 */

export type Args =
  | string
  | Context
  | undefined;

export type Context =
  | FactorySchema
  | ((index: number) => FactorySchema);
