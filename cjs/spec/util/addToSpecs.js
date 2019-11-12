'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.addToSpecs = addToSpecs;

var _immutable = require('immutable');

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
function addToSpecs(object, key, value) {
  if ((0, _immutable.isImmutable)(object) || object.isExtendable) {
    if (!object.specs) {
      object.specs = {};
    }

    object.specs[key] = value;
  }
}
