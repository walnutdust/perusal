'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.keys = void 0;

var _spec = _interopRequireDefault(require('./spec'));

var _control = require('../control');

var _immutable = require('immutable');

var _addToSpecs = require('./util/addToSpecs');

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

/** @module specjs/spec */

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
         * returns `specjs.invalid` otherwise.
         *
         * @param {any} value - The value to be asserted.
         * @return {invalid|any} Returns the value if value passes spec, returns
         * specjs.invalid otherwise.
         */
        value: function assert(value) {
          if (value.specs && value.specs[this.name] !== undefined) return value.specs[this.name];
          if (!(_typeof(value) === 'object')) return _control.invalid;

          for (var _key in this.options) {
            var spec = this.options[_key];

            var toCheck = (value.get && value.get(_key)) || value[_key];

            if (spec.assert(toCheck) === _control.invalid) {
              (0, _addToSpecs.addToSpecs)(value, this.name, _control.invalid);
              return _control.invalid;
            }
          }

          (0, _addToSpecs.addToSpecs)(value, this.name, true);
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
          if (!(value instanceof _immutable.Map) && !(_typeof(value) === 'object')) return false;
          var result = true;

          for (var _key2 in this.options) {
            var spec = this.options[_key2];

            if (
              !value.get ||
              spec.explain(value.get(_key2), path.concat(['key '.concat(_key2)])) === false
            ) {
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
    'specjs.keys was called with an invalid name.'
  );
  (0, _tinyInvariant['default'])(
    _typeof(specs) === 'object' && Object.keys(specs).length !== 0,
    'specjs.keys was called with invalid key predicates. Are the key predicates in a map?'
  );

  for (var _key3 in specs) {
    (0, _tinyInvariant['default'])(
      specs[_key3] instanceof _spec['default'],
      'specjs.keys was called with invalid key predicates. Are the values specifications?'
    );
  }

  return new Keys(name, specs);
};

exports.keys = keys;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGVjL2tleXMudHMiXSwibmFtZXMiOlsiS2V5cyIsInZhbHVlIiwic3BlY3MiLCJuYW1lIiwidW5kZWZpbmVkIiwiaW52YWxpZCIsImtleSIsIm9wdGlvbnMiLCJzcGVjIiwidG9DaGVjayIsImdldCIsImFzc2VydCIsInBhdGgiLCJNYXAiLCJyZXN1bHQiLCJleHBsYWluIiwiY29uY2F0IiwiU3BlYyIsImtleXMiLCJPYmplY3QiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBOzs7OztJQUtNQSxJOzs7Ozs7Ozs7Ozs7OztBQUNKOzs7Ozs7OzsyQkFRT0MsSyxFQUFZO0FBQ2pCLFVBQUlBLEtBQUssQ0FBQ0MsS0FBTixJQUFlRCxLQUFLLENBQUNDLEtBQU4sQ0FBWSxLQUFLQyxJQUFqQixNQUEyQkMsU0FBOUMsRUFBeUQsT0FBT0gsS0FBSyxDQUFDQyxLQUFOLENBQVksS0FBS0MsSUFBakIsQ0FBUDtBQUN6RCxVQUFJLEVBQUUsUUFBT0YsS0FBUCxNQUFpQixRQUFuQixDQUFKLEVBQWtDLE9BQU9JLGdCQUFQOztBQUVsQyxXQUFLLElBQUlDLElBQVQsSUFBZ0IsS0FBS0MsT0FBckIsRUFBOEI7QUFDNUIsWUFBTUMsSUFBSSxHQUFHLEtBQUtELE9BQUwsQ0FBYUQsSUFBYixDQUFiOztBQUNBLFlBQU1HLE9BQU8sR0FBSVIsS0FBSyxDQUFDUyxHQUFOLElBQWFULEtBQUssQ0FBQ1MsR0FBTixDQUFVSixJQUFWLENBQWQsSUFBaUNMLEtBQUssQ0FBQ0ssSUFBRCxDQUF0RDs7QUFDQSxZQUFJRSxJQUFJLENBQUNHLE1BQUwsQ0FBWUYsT0FBWixNQUF5QkosZ0JBQTdCLEVBQXNDO0FBQ3BDLHNDQUFXSixLQUFYLEVBQWtCLEtBQUtFLElBQXZCLEVBQTZCRSxnQkFBN0I7QUFDQSxpQkFBT0EsZ0JBQVA7QUFDRDtBQUNGOztBQUVELGtDQUFXSixLQUFYLEVBQWtCLEtBQUtFLElBQXZCLEVBQTZCLElBQTdCO0FBQ0EsYUFBT0YsS0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OzRCQVFRQSxLLEVBQVlXLEksRUFBZ0I7QUFDbEMsVUFBSSxFQUFFWCxLQUFLLFlBQVlZLGNBQW5CLEtBQTJCLEVBQUUsUUFBT1osS0FBUCxNQUFpQixRQUFuQixDQUEvQixFQUE2RCxPQUFPLEtBQVA7QUFFN0QsVUFBSWEsTUFBTSxHQUFHLElBQWI7O0FBQ0EsV0FBSyxJQUFJUixLQUFULElBQWdCLEtBQUtDLE9BQXJCLEVBQThCO0FBQzVCLFlBQU1DLElBQUksR0FBRyxLQUFLRCxPQUFMLENBQWFELEtBQWIsQ0FBYjs7QUFDQSxZQUFJLENBQUNMLEtBQUssQ0FBQ1MsR0FBUCxJQUFjRixJQUFJLENBQUNPLE9BQUwsQ0FBYWQsS0FBSyxDQUFDUyxHQUFOLENBQVVKLEtBQVYsQ0FBYixFQUE2Qk0sSUFBSSxDQUFDSSxNQUFMLENBQVksZUFBUVYsS0FBUixFQUFaLENBQTdCLE1BQThELEtBQWhGLEVBQXVGO0FBQ3JGUSxVQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNEO0FBQ0Y7O0FBRUQsYUFBT0EsTUFBUDtBQUNEOzs7O0VBOUNnQkcsZ0I7QUFpRG5COzs7Ozs7Ozs7OztBQVNPLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNmLElBQUQsRUFBZUQsS0FBZixFQUFnRDtBQUNsRSxpQ0FBVSxPQUFPQyxJQUFQLEtBQWdCLFFBQTFCLEVBQW9DLDhDQUFwQztBQUNBLGlDQUNFLFFBQU9ELEtBQVAsTUFBaUIsUUFBakIsSUFBNkJpQixNQUFNLENBQUNELElBQVAsQ0FBWWhCLEtBQVosRUFBbUJrQixNQUFuQixLQUE4QixDQUQ3RCxFQUVFLHNGQUZGOztBQUtBLE9BQUssSUFBSWQsS0FBVCxJQUFnQkosS0FBaEIsRUFBdUI7QUFDckIsbUNBQ0VBLEtBQUssQ0FBQ0ksS0FBRCxDQUFMLFlBQXNCVyxnQkFEeEIsRUFFRSxvRkFGRjtBQUlEOztBQUVELFNBQU8sSUFBSWpCLElBQUosQ0FBU0csSUFBVCxFQUFlRCxLQUFmLENBQVA7QUFDRCxDQWZNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwZWMgZnJvbSAnLi9zcGVjJztcbmltcG9ydCB7aW52YWxpZH0gZnJvbSAnLi4vY29udHJvbCc7XG5pbXBvcnQge01hcH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7YWRkVG9TcGVjc30gZnJvbSAnLi91dGlsL2FkZFRvU3BlY3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICd0aW55LWludmFyaWFudCc7XG5cbi8qKiBAbW9kdWxlIHNwZWNqcy9zcGVjICovXG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGBLZXlzYCBzcGVjcywgd2hpY2ggcmVxdWlyZXMgdGhhdCBnaXZlbiBhbiBpbW11dGFibGUgbWFwLFxuICogYWxsIHRoZSBrZXlzIGluIGB0aGlzYCBtdXN0IHNhdGlzZnkgdGhlIHNwZWNzIGF0dGFjaGVkIHRvIHRoZSBrZXlzLlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgS2V5cyBleHRlbmRzIFNwZWMge1xuICAvKipcbiAgICogQXNzZXJ0cyB0aGlzIHNwZWMgb24gYSBnaXZlbiB2YWx1ZS4gUmV0dXJucyB0aGUgdmFsdWUgaWYgdmFsdWUgcGFzc2VzIHNwZWMsXG4gICAqIHJldHVybnMgYHNwZWNqcy5pbnZhbGlkYCBvdGhlcndpc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBhc3NlcnRlZC5cbiAgICogQHJldHVybiB7aW52YWxpZHxhbnl9IFJldHVybnMgdGhlIHZhbHVlIGlmIHZhbHVlIHBhc3NlcyBzcGVjLCByZXR1cm5zXG4gICAqIHNwZWNqcy5pbnZhbGlkIG90aGVyd2lzZS5cbiAgICovXG4gIGFzc2VydCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlLnNwZWNzICYmIHZhbHVlLnNwZWNzW3RoaXMubmFtZV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHZhbHVlLnNwZWNzW3RoaXMubmFtZV07XG4gICAgaWYgKCEodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykpIHJldHVybiBpbnZhbGlkO1xuXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMub3B0aW9ucykge1xuICAgICAgY29uc3Qgc3BlYyA9IHRoaXMub3B0aW9uc1trZXldO1xuICAgICAgY29uc3QgdG9DaGVjayA9ICh2YWx1ZS5nZXQgJiYgdmFsdWUuZ2V0KGtleSkpIHx8IHZhbHVlW2tleV07XG4gICAgICBpZiAoc3BlYy5hc3NlcnQodG9DaGVjaykgPT09IGludmFsaWQpIHtcbiAgICAgICAgYWRkVG9TcGVjcyh2YWx1ZSwgdGhpcy5uYW1lLCBpbnZhbGlkKTtcbiAgICAgICAgcmV0dXJuIGludmFsaWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkVG9TcGVjcyh2YWx1ZSwgdGhpcy5uYW1lLCB0cnVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRXhwbGFpbnMgd2h5IGEgdmFsdWUgcGFzc2VzL2ZhaWxzIHRoaXMgc3BlYy5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIGNoZWNrZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGggLSBUaGUgcGF0aCB0cmF2ZWxsZWQgdG8gdGhpcyBzcGVjLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlIHNhdGlzZmllcyB0aGlzIHNwZWMsIGZhbHNlXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIGV4cGxhaW4odmFsdWU6IGFueSwgcGF0aDogc3RyaW5nW10pIHtcbiAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkgJiYgISh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMub3B0aW9ucykge1xuICAgICAgY29uc3Qgc3BlYyA9IHRoaXMub3B0aW9uc1trZXldO1xuICAgICAgaWYgKCF2YWx1ZS5nZXQgfHwgc3BlYy5leHBsYWluKHZhbHVlLmdldChrZXkpLCBwYXRoLmNvbmNhdChbYGtleSAke2tleX1gXSkpID09PSBmYWxzZSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiBmb3IgYEtleXNgIHNwZWNzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUga2V5IHNwZWMuIEltcG9ydGFudCB0byBzZXQgdGhpcyB0byBhIGh1bWFuXG4gKiByZWFkYWJsZSAobWVhbmluZ2Z1bCkgc3RyaW5nLCBzaW5jZSB0aGlzIGlzIHdoYXQgd2lsbCBnZXQgcHJpbnRlZCBvdXQgaW4gZXhwbGFpbi5cbiAqIEBwYXJhbSB7KFtrZXkgOiBzdHJpbmddOiBTcGVjKX0gc3BlY3MgLSBTcGVjcyB0aGF0IGhhdmUgYWxsIHRvIGJlIHNhdGlzZmllZCB0byBmdWxmaWxsIHRoaXMgc3BlYy5cbiAqIEByZXR1cm4ge0tleXN9IFJldHVybnMgYSBgS2V5c2Agc3BlYyByZXF1aXJpbmcgdGhlIHZhbHVlcyBvZiB0aGUgaW5wdXQgdG8gc2F0aXNmeVxuICogdGhlIGtleXMgaW5pdGlhbGl6ZWQgaW4gdGhpcyBzcGVjLlxuICovXG5leHBvcnQgY29uc3Qga2V5cyA9IChuYW1lOiBzdHJpbmcsIHNwZWNzOiB7W2tleTogc3RyaW5nXTogU3BlY30pID0+IHtcbiAgaW52YXJpYW50KHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJywgJ3NwZWNqcy5rZXlzIHdhcyBjYWxsZWQgd2l0aCBhbiBpbnZhbGlkIG5hbWUuJyk7XG4gIGludmFyaWFudChcbiAgICB0eXBlb2Ygc3BlY3MgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHNwZWNzKS5sZW5ndGggIT09IDAsXG4gICAgJ3NwZWNqcy5rZXlzIHdhcyBjYWxsZWQgd2l0aCBpbnZhbGlkIGtleSBwcmVkaWNhdGVzLiBBcmUgdGhlIGtleSBwcmVkaWNhdGVzIGluIGEgbWFwPydcbiAgKTtcblxuICBmb3IgKGxldCBrZXkgaW4gc3BlY3MpIHtcbiAgICBpbnZhcmlhbnQoXG4gICAgICBzcGVjc1trZXldIGluc3RhbmNlb2YgU3BlYyxcbiAgICAgICdzcGVjanMua2V5cyB3YXMgY2FsbGVkIHdpdGggaW52YWxpZCBrZXkgcHJlZGljYXRlcy4gQXJlIHRoZSB2YWx1ZXMgc3BlY2lmaWNhdGlvbnM/J1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gbmV3IEtleXMobmFtZSwgc3BlY3MpO1xufTtcbiJdfQ==
