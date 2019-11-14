import Spec from './spec';
import {invalid} from '../control';
import invariant from 'tiny-invariant';

/** @module perusal/spec */

/**
 * Class representing `OneOf` specs, which checks if a given value is contained within user
 * pre-defined values. === is used for comparison.
 * @private
 */
export default class OneOf extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `perusal.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {invalid|any} Returns the value if value passes spec, returns
   * perusal.invalid otherwise.
   */
  assert(value: any): any {
    if (value === undefined || value === null) return invalid;
    let result = invalid;
    this.options.forEach((val: any) => {
      if (val === value) result = value;
    });

    return result;
  }

  /**
   * Explains why a value passes/fails this spec.
   *
   * @param {any} value - The value to be checked.
   * @param {string[]} path - The path travelled to this spec.
   * @return {boolean} Returns true if the value satisfies this spec, false
   * otherwise.
   */
  explain(value: any, path: string[]): boolean {
    if (value === undefined || value === null) return false;
    let result = false as boolean;
    this.options.forEach((val: any) => {
      if (val === value) result = true;
    });

    if (result === true) return true;

    // eslint-disable-next-line
    console.log(
      `${path.concat([this.name]).join('->')}: ${JSON.stringify(
        value,
        null,
        '\t'
      )} failed specification.`
    );
    return false;
  }
}

/**
 * Factory function for `OneOf` specs. Consider using the spread operator if you start with a
 * collection!
 *
 * @param {string} name - Name of the and spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {...any} values - user-defined values used to assert future values.
 * @return {OneOf} Returns a `OneOf` spec requiring the input value to be within one of the user
 * pre-defined values.
 */
export function oneOf(name: string, ...values: any[]): OneOf {
  invariant(typeof name === 'string', 'perusal.oneOf was called with an invalid name.');

  return new OneOf(name, values);
}
