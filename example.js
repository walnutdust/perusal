import {
  explainIfInvalid,
  define,
  and,
  keys,
  optional,
  or,
  getSpec,
  isValid,
  explain,
} from './cjs/utils';
import {even, positive, isNumber, isString} from './cjs/preds';
import Pred from './cjs/spec/pred';
import {performance} from 'perf_hooks';

/* eslint-disable no-console */

// Invalid validity checking returns false.
isValid(1, even); // false

// Valid values returns true.
isValid(2, even); // true

// We can define our own specifications.
define('is-a?', new Pred("is 'a'?", (value) => value === 'a'));
isValid('b', 'is-a?'); // false
isValid('a', 'is-a?'); // true

// We can join multiple predicates.
// Note that the definition key does not have to be the same as the explanatory string.
define('pos-even', and('positive, even number', positive, even));
isValid(2, 'pos-even'); // true
isValid(-2, 'pos-even'); // false

// We can also check maps.
const point = {
  x: 1,
  y: 2,
};

const threeDpoint = {
  x: 1,
  y: 2,
  z: 3,
};
define('point', keys('2d or 3d point', {x: isNumber, y: isNumber, z: optional(isNumber)}));
define('point or string', or('point or string', getSpec('point'), isString));
isValid(point, 'point'); // true
explain(point, 'point');
/*
  Value:

  { x: 1, y: 2 }

  Passes specification 2d or 3d point.
*/

isValid(threeDpoint, 'point'); // true
isValid(threeDpoint, 'point or string'); // true

// We can assert the value, which returns invalid if it fails.
const invalidPoint = {
  x: 'a',
  y: 2,
};
isValid(invalidPoint, 'point or string'); // false
// Why did it fail?
explain(invalidPoint, 'point or string');
// point or string->key x->is a number?: a failed specification.
// point or string->is a string?: { "x": "a", "y": 2 } failed specification.

// We can wrap it with a method that normally asserts, but explains if invalid (helpful for debugging).
explainIfInvalid(invalidPoint, 'point or string');
// point or string->key x->is a number?: a failed specification.
// point or string->is a string?: Map { "x": "a", "y": 2 } failed specification.
explainIfInvalid(point, 'point or string'); // no output.

// Explanation works well with nesting too
const nestedPoint = {
  x: {
    x: {
      x: 2,
      y: 3,
    },
  },
};

define('2-nested point', keys('nested nested point', {
  x: keys('nested point', {x: getSpec('point')}),
}));
explain(nestedPoint, '2-nested point');

// What of the speed of the comparisons?
let start,
  end,
  numTimes = 10000000;
start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint, '2-nested point');
}
end = performance.now();
console.log(
  `Test 1: Time taken to perform ${numTimes} validity checks on the jsMap is ${end -
    start}ms, averaging ${(end - start) / numTimes}ms.`
);
