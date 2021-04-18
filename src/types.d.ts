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

export type Args =
  | string
  | FactorySchema
  | undefined;
