import Spec from './spec';
import {invalid} from '../control';
import invariant from 'tiny-invariant';

/** @module perusal/spec */

/**
 * Class representing `Every` specs, which requires that all the values in the collection fulfill
 * a certain specfication.
 * @private
 */
class Every extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `perusal.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {any} Returns the value if value passes spec, returns
   * perusal.invalid otherwise.
   */
  assert(value: any): any {
    invariant(value.values, 'perusal.every.assert was not called with a collection!');

    const iterator = value.values();
    let nextValue = iterator.next();

    while (!nextValue.done) {
      if (this.options.assert(nextValue.value) === invalid) {
        return invalid;
      }
      nextValue = iterator.next();
    }

    return value;
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
    invariant(value.values, 'perusal.every.explain was not called with a collection!');

    let result = true;
    const iterator = value.values();
    let nextValue = iterator.next();

    while (!nextValue.done) {
      if (this.options.explain(nextValue.value, path.concat([this.name])) === false) {
        result = false;
      }
      nextValue = iterator.next();
    }

    return result;
  }
}

/**
 * Factory function for `Every` specs.
 *
 * @param {string} name - Name of the every spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {Spec} spec - Specs that have all to be satisfied to fulfill this spec.
 * @return {Every} Returns an `Every` spec representing that all elements in the collection have to
 * satisfy the provided spec..
 */
export function every(name: string, spec: Spec): Every {
  invariant(typeof name === 'string', 'perusal.every was called with an invalid name.');
  invariant(spec instanceof Spec, 'perusal.every was called with invalid specs.');
  invariant(arguments.length === 2, 'perusal.every was called with invalid number of arguments.');
  return new Every(name, spec);
}
