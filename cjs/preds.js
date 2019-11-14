'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isFn = exports.isSymbol = exports.isBool = exports.isObject = exports.isString = exports.isNumber = exports.zero = exports.negative = exports.positive = exports.odd = exports.even = void 0;

var _pred = require('./spec/pred');

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

/** @module perusal/basic */
// Basic numerical predicates

/**
 * Predicate checking if value is even.
 */
var even = (0, _pred.pred)('is even?', function(number) {
  return number % 2 === 0 && typeof number === 'number';
});
/**
 * Predicate checking if value is odd.
 */

exports.even = even;
var odd = (0, _pred.pred)('is odd?', function(number) {
  return number % 2 === 1 && typeof number === 'number';
});
/**
 * Predicate checking if value is positive.
 */

exports.odd = odd;
var positive = (0, _pred.pred)('is positive?', function(number) {
  return typeof number === 'number' && number > 0;
});
/**
 * Predicate checking if value is negative.
 */

exports.positive = positive;
var negative = (0, _pred.pred)('is negative?', function(number) {
  return typeof number === 'number' && number < 0;
});
/**
 * Predicate checking if value is zero.
 */

exports.negative = negative;
var zero = (0, _pred.pred)('is zero?', function(number) {
  return typeof number === 'number' && number === 0;
}); // Type predicates

/**
 * Predicate checking if value is a number.
 */

exports.zero = zero;
var isNumber = (0, _pred.pred)('is a number?', function(maybeNumber) {
  return typeof maybeNumber === 'number';
});
/**
 * Predicate checking if value is a number.
 */

exports.isNumber = isNumber;
var isString = (0, _pred.pred)('is a string?', function(maybeString) {
  return typeof maybeString === 'string';
});
/**
 * Predicate checking if value is a number.
 */

exports.isString = isString;
var isObject = (0, _pred.pred)('is an object?', function(maybeObject) {
  return _typeof(maybeObject) === 'object';
});
/**
 * Predicate checking if value is a number.
 */

exports.isObject = isObject;
var isBool = (0, _pred.pred)('is a boolean?', function(maybeBool) {
  return typeof maybeBool === 'boolean';
});
/**
 * Predicate checking if value is a symbol.
 */

exports.isBool = isBool;
var isSymbol = (0, _pred.pred)('is a symbol?', function(maybeSymbol) {
  return _typeof(maybeSymbol) === 'symbol';
});
/**
 * Predicate checking if value is a function.
 */

exports.isSymbol = isSymbol;
var isFn = (0, _pred.pred)('is a function?', function(maybeFn) {
  return typeof maybeFn === 'function';
});
exports.isFn = isFn;
