/// <reference path="./axios.d.ts" />
/// <reference path="./rc-input-number.d.ts" />

/**
 * PromiseType
 * @desc Obtain Promise resolve type
 * @example
 *   // Expect: string;
 *   type Response = PromiseType<Promise<string>>;
 */
type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
