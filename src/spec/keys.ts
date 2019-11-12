import Spec from './spec';
import {invalid} from '../control';
import {Map} from 'immutable';
import {addToSpecs} from './util/addToSpecs';
import invariant from 'tiny-invariant';

/** @module specjs/spec */

/**
 * Class representing `Keys` specs, which requires that given an immutable map,
 * all the keys in `this` must satisfy the specs attached to the keys.
 * @private
 */
class Keys extends Spec {
  /**
   * Asserts this spec on a given value. Returns the value if value passes spec,
   * returns `specjs.invalid` otherwise.
   *
   * @param {any} value - The value to be asserted.
   * @return {invalid|any} Returns the value if value passes spec, returns
   * specjs.invalid otherwise.
   */
  assert(value: any) {
    if (value.specs && value.specs[this.name] !== undefined) return value.specs[this.name];
    if (!(typeof value === 'object')) return invalid;

    for (let key in this.options) {
      const spec = this.options[key];
      const toCheck = (value.get && value.get(key)) || value[key];
      if (spec.assert(toCheck) === invalid) {
        addToSpecs(value, this.name, invalid);
        return invalid;
      }
    }

    addToSpecs(value, this.name, true);
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
  explain(value: any, path: string[]) {
    if (!(value instanceof Map) && !(typeof value === 'object')) return false;

    let result = true;
    for (let key in this.options) {
      const spec = this.options[key];
      if (!value.get || spec.explain(value.get(key), path.concat([`key ${key}`])) === false) {
        result = false;
      }
    }

    return result;
  }
}

/**
 * Factory function for `Keys` specs.
 *
 * @param {string} name - Name of the key spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {([key : string]: Spec)} specs - Specs that have all to be satisfied to fulfill this spec.
 * @return {Keys} Returns a `Keys` spec requiring the values of the input to satisfy
 * the keys initialized in this spec.
 */
export const keys = (name: string, specs: {[key: string]: Spec}) => {
  invariant(typeof name === 'string', 'specjs.keys was called with an invalid name.');
  invariant(
    typeof specs === 'object' && Object.keys(specs).length !== 0,
    'specjs.keys was called with invalid key predicates. Are the key predicates in a map?'
  );

  for (let key in specs) {
    invariant(
      specs[key] instanceof Spec,
      'specjs.keys was called with invalid key predicates. Are the values specifications?'
    );
  }

  return new Keys(name, specs);
};
