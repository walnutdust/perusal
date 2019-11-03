import Spec from './spec';
import {invalid} from '../control';
import invariant from 'tiny-invariant';

/** @module specjs/spec */

/**
 * Class representing `Or` specs, which requires that at least one sub-spec be
 * fulfilled.
 * @private
 */
class Or extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `specjs.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {invalid|any} Returns the value if value passes spec, returns
   * specjs.invalid otherwise.
   */
  assert(value) {
    for (let spec of this.options) {
      if (spec.assert(value) !== invalid) {
        return value;
      }
    }

    return invalid;
  }

  /**
   * Explains why a value passes/fails this spec.
   *
   * @param {any} value - The value to be checked.
   * @param {String[]} path - The path travelled to this spec.
   * @return {boolean} Returns true if the value satisfies this spec, false
   * otherwise.
   */
  explain(value, path) {
    let result = false;
    for (let spec of this.options) {
      if (spec.assert(value) !== invalid) {
        result = true;
        break;
      }
    }

    if (result === true) return true;

    for (let spec of this.options) {
      spec.explain(value, path.concat([this.name]));
    }
    return false;
  }
}

/**
 * Factory function for `Or` specs.
 *
 * @param {String} name - Name of the and spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {...Spec} specs - Specs, where one of them has to be satisfied to fulfill
 * this spec.
 * @return {And} Returns an `Or` spec representing the disjunction of the given specs.
 */
export const or = (name, ...specs) => {
  invariant(typeof name === 'string', 'specjs.or was called with an invalid name.');
  invariant(specs.length > 0, 'specjs.or was called without specs.');
  for (let spec of specs) {
    invariant(spec instanceof Spec, 'specjs.or was called with invalid specs.');
  }
  return new Or(name, specs);
};