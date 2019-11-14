'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.optional = optional;
exports['default'] = void 0;

var _spec = _interopRequireDefault(require('./spec'));

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
 * Class representing `Optional` specs, which either accepts an undefined value or
 * requires that the value satisfy the spec if present. Typically used with keys to
 * denote specs for optional keys.
 * @private
 */
var Optional =
  /*#__PURE__*/
  (function(_Spec) {
    _inherits(Optional, _Spec);

    function Optional() {
      _classCallCheck(this, Optional);

      return _possibleConstructorReturn(this, _getPrototypeOf(Optional).apply(this, arguments));
    }

    _createClass(Optional, [
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
          if (value === undefined) return value;
          var result = this.options.assert(value);
          if (result !== _control.invalid) return value;
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
          if (value === undefined) return true;
          return this.options.explain(value, path);
        },
      },
    ]);

    return Optional;
  })(_spec['default']);
/**
 * Factory function for `Optional` specs.
 *
 * @param {Spec} spec - Spec that has to be fulfiled if input value is not undefined.
 * @return {Optional} Returns a `Optional` spec requiring the input value to satisfy
 * the provided spec if it is defined.
 */

exports['default'] = Optional;

function optional(spec) {
  (0, _tinyInvariant['default'])(
    spec instanceof _spec['default'],
    'Invalid specification passed to perusal.optional'
  );
  (0, _tinyInvariant['default'])(
    arguments.length === 1,
    'perusal.optional was called with invalid number of arguments.'
  );
  return new Optional('optional', spec);
}
