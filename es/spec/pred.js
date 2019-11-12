function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

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

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, writable: true, configurable: true},
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

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

var Pred =
  /*#__PURE__*/
  (function(_Spec) {
    _inherits(Pred, _Spec);

    function Pred() {
      _classCallCheck(this, Pred);

      return _possibleConstructorReturn(this, _getPrototypeOf(Pred).apply(this, arguments));
    }

    _createClass(Pred, [
      {
        key: 'assert',

        /**
         * Asserts this spec on a given value. Returns the value if value passes spec,
         * returns `perusal.invalid` otherwise.
         *
         * @param {any} value - The value to be asserted.
         * @return {invalid|any} Returns the value if value passes spec, returns
         * perusal.invalid otherwise.
         * @throws Throws an error if predicate function does not return boolean when
         * fed with input value.
         */
        value: function assert(value) {
          var result = this.options(value);
          if (result === true) return value;
          if (result === false) return invalid; // Checking for predicate function with invalid (non-boolean output)

          invariant(
            false,
            'Invalid predicate function used in (Predicate: '.concat(this.name, ').')
          );
        },
        /**
         * Explains why a value passes/fails this spec. Prints out the path to this pred
         * if value fails at this pred.
         *
         * @param {any} value - The value to be checked.
         * @param {string[]} path - The path travelled to this spec.
         * @return {boolean} Returns true if the value satisfies this spec, false
         * otherwise.
         */
      },
      {
        key: 'explain',
        value: function explain(value, path) {
          var result = this.options(value);
          if (result === true) return true; // eslint-disable-next-line

          console.log(
            ''
              .concat(path.concat([this.name]).join('->'), ': ')
              .concat(JSON.stringify(value, null, '\t'), ' failed specification.')
          );
          return false;
        },
      },
    ]);

    return Pred;
  })(Spec);
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

export {Pred as default};
export var pred = function pred(name, fn) {
  invariant(fn && typeof fn === 'function', 'perusal.pred was called with an invalid predicate.');
  invariant(name && typeof name === 'string', 'perusal.pred was called with an invalid string.');
  return new Pred(name, fn);
};
