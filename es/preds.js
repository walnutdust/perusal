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

import {pred} from './spec/pred';
/** @module perusal/basic */
// Basic numerical predicates

/**
 * Predicate checking if value is even.
 */

export var even = pred('is even?', function(number) {
  return number % 2 === 0 && typeof number === 'number';
});
/**
 * Predicate checking if value is odd.
 */

export var odd = pred('is odd?', function(number) {
  return number % 2 === 1 && typeof number === 'number';
});
/**
 * Predicate checking if value is positive.
 */

export var positive = pred('is positive?', function(number) {
  return typeof number === 'number' && number > 0;
});
/**
 * Predicate checking if value is negative.
 */

export var negative = pred('is negative?', function(number) {
  return typeof number === 'number' && number < 0;
});
/**
 * Predicate checking if value is zero.
 */

export var zero = pred('is zero?', function(number) {
  return typeof number === 'number' && number === 0;
}); // Type predicates

/**
 * Predicate checking if value is a number.
 */

export var isNumber = pred('is a number?', function(maybeNumber) {
  return typeof maybeNumber === 'number';
});
/**
 * Predicate checking if value is a number.
 */

export var isString = pred('is a string?', function(maybeString) {
  return typeof maybeString === 'string';
});
/**
 * Predicate checking if value is a number.
 */

export var isObject = pred('is an object?', function(maybeObject) {
  return _typeof(maybeObject) === 'object';
});
/**
 * Predicate checking if value is a number.
 */

export var isBool = pred('is a boolean?', function(maybeBool) {
  return typeof maybeBool === 'boolean';
});
/**
 * Predicate checking if value is a symbol.
 */

export var isSymbol = pred('is a symbol?', function(maybeSymbol) {
  return _typeof(maybeSymbol) === 'symbol';
});
/**
 * Predicate checking if value is a function.
 */

export var isFn = pred('is a function?', function(maybeFn) {
  return typeof maybeFn === 'function';
});
