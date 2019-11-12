'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.keys = void 0;

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
 * Class representing `Keys` specs, which requires that given an immutable map,
 * all the keys in `this` must satisfy the specs attached to the keys.
 * @private
 */
var Keys =
  /*#__PURE__*/
  (function(_Spec) {
    _inherits(Keys, _Spec);

    function Keys() {
      _classCallCheck(this, Keys);

      return _possibleConstructorReturn(this, _getPrototypeOf(Keys).apply(this, arguments));
    }

    _createClass(Keys, [
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
          if (value.specs && value.specs[this.name] !== undefined) return value.specs[this.name];
          if (!(_typeof(value) === 'object')) return _control.invalid;

          for (var _key in this.options) {
            var spec = this.options[_key];

            var toCheck = (value.get && value.get(_key)) || value[_key];

            if (spec.assert(toCheck) === _control.invalid) {
              return _control.invalid;
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
          if (!(_typeof(value) === 'object')) return false;
          var result = true;

          for (var _key2 in this.options) {
            var spec = this.options[_key2];

            if (spec.explain(value[_key2], path.concat(['key '.concat(_key2)])) === false) {
              result = false;
            }
          }

          return result;
        },
      },
    ]);

    return Keys;
  })(_spec['default']);
/**
 * Factory function for `Keys` specs.
 *
 * @param {string} name - Name of the key spec. Important to set this to a human
 * readable (meaningful) string, since this is what will get printed out in explain.
 * @param {([key : string]: Spec)} specs - Specs that have all to be satisfied to fulfill this spec.
 * @return {Keys} Returns a `Keys` spec requiring the values of the input to satisfy
 * the keys initialized in this spec.
 */

var keys = function keys(name, specs) {
  (0, _tinyInvariant['default'])(
    typeof name === 'string',
    'perusal.keys was called with an invalid name.'
  );
  (0, _tinyInvariant['default'])(
    _typeof(specs) === 'object' && Object.keys(specs).length !== 0,
    'perusal.keys was called with invalid key predicates. Are the key predicates in a map?'
  );

  for (var _key3 in specs) {
    (0, _tinyInvariant['default'])(
      specs[_key3] instanceof _spec['default'],
      'perusal.keys was called with invalid key predicates. Are the values specifications?'
    );
  }

  return new Keys(name, specs);
};

exports.keys = keys;
