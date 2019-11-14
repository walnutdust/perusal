import Spec from './spec';
import {invalid} from '../control';
import invariant from 'tiny-invariant';

/** @module perusal/spec */

/**
 * Class representing `Nullable` specs, which either accepts an null value or
 * requires that the value satisfy the spec if present.
 * @private
 */
export default class Nullable extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `perusal.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {any} Returns the value if value passes spec, returns
   * perusal.invalid otherwise.
   */
  assert(value: any): any {
    if (value === null) return value;

    const result = this.options.assert(value);

    if (result !== invalid) return value;
    return invalid;
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
    if (value === null) return true;

    return this.options.explain(value, path);
  }
}

/**
 * Factory function for `Nullable` specs.
 *
 * @param {Spec} spec - Spec that has to be fulfiled if input value is not undefined.
 * @return {Nullable} Returns a `Nullable` spec requiring the input value to satisfy
 * the provided spec if it is not null.
 */
export function nullable(spec: Spec): Nullable {
  invariant(spec instanceof Spec, 'Invalid specification passed to perusal.nullable');
  invariant(
    arguments.length === 1,
    'perusal.nullable was called with invalid number of arguments.'
  );
  return new Nullable('nullable', spec);
}
