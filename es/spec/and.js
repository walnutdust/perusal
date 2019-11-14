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
 * Class representing `And` specs, which requires that all the sub-specs be fulfilled.
 * @private
 */

var And =
  /*#__PURE__*/
  (function(_Spec) {
    _inherits(And, _Spec);

    function And() {
      _classCallCheck(this, And);

      return _possibleConstructorReturn(this, _getPrototypeOf(And).apply(this, arguments));
    }

    _createClass(And, [
      {
        key: 'assert',

        /**
         * Asserts this spec on a given value. Returns the value if value passes spec,
         * returns `perusal.invalid` otherwise.
         *
         * @param {any} value - The value to be asserted.
         * @return {invalid|any} Returns the value if value passes spec, returns
         * perusal.invalid otherwise.
         */
        value: function assert(value) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (
              var _iterator = this.options[Symbol.iterator](), _step;
              !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
              _iteratorNormalCompletion = true
            ) {
              var spec = _step.value;

              if (spec.assert(value) === invalid) {
                return invalid;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return'] != null) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return value;
        },
        /**
         * Explains why a value passes/fails this spec.
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
          var result = true;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (
              var _iterator2 = this.options[Symbol.iterator](), _step2;
              !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
              _iteratorNormalCompletion2 = true
            ) {
              var spec = _step2.value;

              if (spec.explain(value, path.concat([this.name])) === false) {
                result = false;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return'] != null) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return result;
        },
      },
    ]);

    return And;
  })(Spec);
/**
 * Factory function for `And` specs.
 *
 * @param {string} name - Name of the and spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {...Spec} specs - Specs that have all to be satisfied to fulfill this spec.
 * @return {And} Returns an `And` spec representing the conjunction of the given specs.
 */

export function and(name) {
  invariant(typeof name === 'string', 'perusal.and was called with an invalid name.');

  for (
    var _len = arguments.length, specs = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
    _key < _len;
    _key++
  ) {
    specs[_key - 1] = arguments[_key];
  }

  invariant(specs.length > 0, 'perusal.and was called without specs.');

  for (var _i = 0, _specs = specs; _i < _specs.length; _i++) {
    var spec = _specs[_i];
    invariant(spec instanceof Spec, 'perusal.and was called with invalid specs.');
  }

  return new And(name, specs);
}
