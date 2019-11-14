import Spec from './spec';
import {invalid} from '../control';
import invariant from 'tiny-invariant';

/** @module perusal/spec */

/**
 * Class representing `Predicates`, the building block of specs. It is important that
 * your predicates are as simple as possible to aid in debugging, because simple
 * predicates will meaningfully inform exactly what the issue is.
 * @private
 */
export default class Pred extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `perusal.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {any} Returns the value if value passes spec, returns
   * perusal.invalid otherwise.
   * @throws Throws an error if predicate function does not return boolean when
   * fed with input value.
   */
  assert(value: any): any {
    const result = this.options(value);

    if (result === true) return value;
    if (result === false) return invalid;

    // Checking for predicate function with invalid (non-boolean output)
    invariant(false, `Invalid predicate function used in (Predicate: ${this.name}).`);
  }

  /**
   * Explains why a value passes/fails this spec. Prints out the path to this pred
   * if value fails at this pred.
   *
   * @param {any} value - The value to be checked.
   * @param {string[]} path - The path travelled to this spec.
   * @return {boolean} Returns true if the value satisfies this spec, false
   * otherwise.
   */
  explain(value: any, path: string[]): boolean {
    const result = this.options(value);

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
 * Factory function for `Pred` specs. Note that this does not check if input function is a valid
 * boolean function (since program is unaware of user input domain), thus the responsibility is
 * on the user to verify that the input fn is a function. However, during runtime, should a
 * non-boolean output be detected, assert throws an error, which may help in debugging.
 *
 * @param {string} name - Name of the key spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {function} fn - Predicate function that returns a boolean value on input
 * within user-desired domain.
 * @return {Pred} Returns a `Pred` spec requiring the value to return true when fed
 * to `fn`.
 * @throws Throws an error if name is not a valid string or fn is not a valid function.
 */
export function pred(name: string, fn: (value: any) => boolean): Pred {
  invariant(fn && typeof fn === 'function', 'perusal.pred was called with an invalid predicate.');

  invariant(name && typeof name === 'string', 'perusal.pred was called with an invalid string.');

  invariant(arguments.length === 2, 'perusal.pred was called with invalid number of arguments.');

  return new Pred(name, fn);
}
