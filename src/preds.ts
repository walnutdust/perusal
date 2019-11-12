import {pred} from './spec/pred';

/** @module perusal/basic */

// Basic numerical predicates

/**
 * Predicate checking if value is even.
 */
export const even = pred('is even?', (number: number) => {
  return number % 2 === 0 && typeof number === 'number';
});

/**
 * Predicate checking if value is odd.
 */
export const odd = pred('is odd?', (number: number) => {
  return number % 2 === 1 && typeof number === 'number';
});

/**
 * Predicate checking if value is positive.
 */
export const positive = pred('is positive?', (number: number) => {
  return typeof number === 'number' && number > 0;
});

/**
 * Predicate checking if value is negative.
 */
export const negative = pred('is negative?', (number: number) => {
  return typeof number === 'number' && number < 0;
});

/**
 * Predicate checking if value is zero.
 */
export const zero = pred('is zero?', (number: number) => {
  return typeof number === 'number' && number === 0;
});

// Type predicates

/**
 * Predicate checking if value is a number.
 */
export const isNumber = pred('is a number?', (maybeNumber: any) => typeof maybeNumber === 'number');

/**
 * Predicate checking if value is a number.
 */
export const isString = pred('is a string?', (maybeString: any) => typeof maybeString === 'string');

/**
 * Predicate checking if value is a number.
 */
export const isObject = pred(
  'is an object?',
  (maybeObject: any) => typeof maybeObject === 'object'
);

/**
 * Predicate checking if value is a number.
 */
export const isBool = pred('is a boolean?', (maybeBool: any) => typeof maybeBool === 'boolean');

/**
 * Predicate checking if value is a symbol.
 */
export const isSymbol = pred('is a symbol?', (maybeSymbol: any) => typeof maybeSymbol === 'symbol');

/**
 * Predicate checking if value is a function.
 */
export const isFn = pred('is a function?', (maybeFn: any) => typeof maybeFn === 'function');
