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
} from './lib/utils';
import {even, positive, isNumber, isString} from './lib/preds';
import Pred from './lib/spec/pred';
import {fromJS, Map} from 'immutable';
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

const threeDpoint = new Map({
  x: 1,
  y: 2,
  z: 3,
});
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
const invalidPoint = new Map({
  x: 'a',
  y: 2,
});
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
const nestedPoint = new Map({
  x: new Map({
    x: new Map({
      x: 2,
      y: 3,
    }),
  }),
});
define('2-nested point', keys('nested nested point', {
  x: keys('nested point', {x: getSpec('point')}),
}));
explain(nestedPoint, '2-nested point');
// key x->key x->key x->is a number?: hi failed specification.
// key x->key x->key y->is a number?: undefined failed specification.

// A good way to capture the same behavior is via the immutable from JS method.
const nestedPoint2 = fromJS({
  x: {
    x: {
      x: 2,
      y: 3,
    },
  },
});

isValid(nestedPoint2, '2-nested point'); // true
explain(nestedPoint2, '2-nested point');

// This works with normal JS Maps as well.
const nestedPoint3 = {
  x: {
    x: {
      x: 2,
      y: 3,
    },
  },
};

isValid(nestedPoint3, '2-nested point'); // true
explain(nestedPoint3, '2-nested point');

// What of the speed of the comparisons?

// Test 1: Simple JS Maps
let start,
  end,
  numTimes = 10000000;

start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint3, '2-nested point');
}
end = performance.now();
console.log(
  `Test 1: Time taken to perform ${numTimes} validity checks on the JS Map is ${end -
    start}ms, averaging ${(end - start) / numTimes}ms.`
);
/* Test 1: Time taken to perform 10000000 validity checks on the JS Map is 5441.707319021225ms, 
   averaging 0.0005441707319021225ms.. */

// Test 2: fromJS (immutableJS) Map
start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint2, '2-nested point');
}
end = performance.now();
console.log(
  `Test 2: Time taken to perform ${numTimes} validity checks on the fromJS Map is ${end -
    start}ms, averaging ${(end - start) / numTimes}ms.`
);
/* Test 2: Time taken to perform 10000000 validity checks on the fromJS Map is 1474.4121170043945ms, 
   averaging 0.00014744121170043946ms. */

// Test 3: immutableJS Map
start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint, '2-nested point');
}
end = performance.now();
console.log(
  `Test 3: Time taken to perform ${numTimes} validity checks on the immutable Map is ${end -
    start}ms, averaging ${(end - start) / numTimes}ms.`
);

/* Test 3: Time taken to perform 10000000 validity checks on the immutable Map is 1248.7203179597855ms, 
   averaging 0.00012487203179597855ms. */

/* Notes: As we may have expected, the immutable Maps take about the same times. We also note that 
   the mutable version takes nearly three times as long as the immutable versions with this input. 
   
   As a comparison, clojure's spec (which inspired this library) gives us 31613.900138 msecs, which 
   is about 100 times our immutable version, and 10 times our mutable version implementation. */
