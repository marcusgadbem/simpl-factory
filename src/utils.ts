/**
 * Test if a variable is a Function
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isFunction(entry: any): boolean {
  return entry.constructor === Function;
}

/**
 * Test if a variable is an Object
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isObject(entry: any): boolean {
  return entry.constructor === Object;
}

/**
 * Test if a variable is a String
 * @param entry
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function isString(entry: any): boolean {
  return entry.constructor === String;
}
