function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import invariant from 'tiny-invariant';
/** @module perusal/spec */

/**
 * Abstract class representing `Spec`, the main specification of *perusal*. Declares the abstract
 * method assert and explain which is used by the utility methods ofr validity checking and
 * specification assertion on a given value.
 * @private
 */

var Spec =
  /*#__PURE__*/
  (function() {
    function Spec(name, options) {
      _classCallCheck(this, Spec);

      _defineProperty(this, 'name', void 0);

      _defineProperty(this, 'options', void 0);

      this.name = name;
      this.options = options;
    }
    /**
     * Asserts this spec on a given value.
     *
     * @param {any} value - The value to be asserted.
     * @throws Error on call - subclasses should all implement the `assert` method.
     */

    _createClass(Spec, [
      {
        key: 'assert',
        value: function assert(value) {
          invariant(
            false,
            'Invalid call to Spec assert with value '.concat(
              value,
              '. Was assert implemented in the subclass?'
            )
          );
          return value;
        },
        /**
         * Expplains why a given value passes/fails this spec.
         *
         * @param {any} value - The value to be asserted.
         * @param {String[]} path - The path travelled to this spec.
         * @throws Error on call - subclasses should all implement the `explain` method.
         */
      },
      {
        key: 'explain',
        value: function explain(value, path) {
          invariant(
            false,
            'Invalid call to Spec explain with value '
              .concat(value, ' at ')
              .concat(path, '. Was explain implemented in the subclass?')
          );
        },
      },
    ]);

    return Spec;
  })();

export {Spec as default};
