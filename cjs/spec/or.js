'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.or = or;

var _spec2 = _interopRequireDefault(require('./spec'));

var _control = require('../control');

var _tinyInvariant = _interopRequireDefault(require('tiny-invariant'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

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

/** @module perusal/spec */

/**
 * Class representing `Or` specs, which requires that at least one sub-spec be
 * fulfilled.
 * @private
 */
var Or =
  /*#__PURE__*/
  (function(_Spec) {
    _inherits(Or, _Spec);

    function Or() {
      _classCallCheck(this, Or);

      return _possibleConstructorReturn(this, _getPrototypeOf(Or).apply(this, arguments));
    }

    _createClass(Or, [
      {
        key: 'assert',

        /**
         * Asserts this spec on a given value. Returns the value if value passes spec,
         * returns `perusal.invalid` otherwise.
         *
         * @param {any} value - The value to be asserted.
         * @return {any} Returns the value if value passes spec, returns
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

              if (spec.assert(value) !== _control.invalid) {
                return value;
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

          return _control.invalid;
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
          var result = false;
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

              if (spec.assert(value) !== _control.invalid) {
                result = true;
                break;
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

          if (result === true) return true;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (
              var _iterator3 = this.options[Symbol.iterator](), _step3;
              !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
              _iteratorNormalCompletion3 = true
            ) {
              var _spec = _step3.value;

              _spec.explain(value, path.concat([this.name]));
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3['return'] != null) {
                _iterator3['return']();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          return false;
        },
      },
    ]);

    return Or;
  })(_spec2['default']);
/**
 * Factory function for `Or` specs.
 *
 * @param {string} name - Name of the and spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {...Spec} specs - Specs, where one of them has to be satisfied to fulfill
 * this spec.
 * @return {Or} Returns an `Or` spec representing the disjunction of the given specs.
 */

function or(name) {
  (0, _tinyInvariant['default'])(
    typeof name === 'string',
    'perusal.or was called with an invalid name.'
  );

  for (
    var _len = arguments.length, specs = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
    _key < _len;
    _key++
  ) {
    specs[_key - 1] = arguments[_key];
  }

  (0, _tinyInvariant['default'])(specs.length > 0, 'perusal.or was called without specs.');

  for (var _i = 0, _specs = specs; _i < _specs.length; _i++) {
    var spec = _specs[_i];
    (0, _tinyInvariant['default'])(
      spec instanceof _spec2['default'],
      'perusal.or was called with invalid specs.'
    );
  }

  return new Or(name, specs);
}
