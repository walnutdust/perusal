import {isImmutable} from 'immutable';
/** @module perusal-immutable/spec/util/addToSpecs */

/**
 * Adds a certain value to a certain key object's specs, initializing specs if necessary.
 * @private
 *
 * @param {any} object - The object to be added to.
 * @param {String} key - The key for the spec to be added to the object's spec
 * (typically the spec's name).
 * @param {true|invalid} value - Value representing if the object satisfied the keys.
 */

export function addToSpecs(object, key, value) {
  if (isImmutable(object) || object.isExtendable) {
    if (!object.specs) {
      object.specs = {};
    }

    object.specs[key] = value;
  }
}
