# specjs

### Performant Specification System for Javascript

A specification system (spec) ensures that data that is passed in conforms to the requirements.

> `specjs` implements a performant spec system for Javascript - users can define custom specifications, and verify that data satisfies the provided specification. Pairs well with [Immutable.js](https://immutable-js.github.io/immutable-js/) to improve speed by retaining metadata on the passing/failing specs.

Inspired by Clojure's [spec/alpha](https://clojure.org/guides/spec).

## Examples

```javascript
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
```

More examples can be found in `example.js`.

## Installation

This repository is currently not published as a library. Feel free to clone the repository and import as normal to test it out!

## Documentation

Refer to the online documentation at https://walnutdust.github.io/specjs.

## That's great, but what's a spec ?

TL;DR: Specs provide run-time analysis and verification of the data structure with flexibility although at the cost of (some) run-time performance and the lack of compiler help.

For more information, see the [FAQ](#faq).

## Working principle of specjs

**_Definitions:_**

- A **predicate function** is a function that is guaranteed to return a boolean true/false for inputs in within its operational domain.
- A **specification** comprises of one or many **predicate functions**.

## Design principles of specjs

1. **Performance maintenance** - implementation or usage of `specjs` should operate with good performance guarantees.
1. **Natural and easy expression** - codebases that use `specjs` should be readable without being cumbersome.
1. **Sufficiently expressive** - `specjs` should enforce good behavior, not force users to work around it.
1. **Help, rather than harm, the user** - intuitive and expressive error messages.

## FAQ

### 1. Okay, so what's a spec and how does it differ from static typing?

Static typing is used by programmers to help them reason about the program. Specifically, static typing offers the following benefits:

1. **Minimisation of potential bugs** - With static typing, the ability to introduce bugs in the program by calling the wrong method is significantly reduced.
1. **Linter/Compiler help** - The linter/compiler helps with the above point by inferring the types of arguments based on the methods that are called, and throws a warning when conflicting types are inferred for a variable, allowing errors to be detected at compile, rather than run-time.
1. **Optimization** - Certain languages allow for static typing information to be used by compilers to create optimized code.

Specs, on the other hand, performs run-time verification on the data, which offers:

1. **Greater flexibility/expressiveness of checking** - instead of sticking to given types and having to play with them, we can check that the data adheres to certain guidelines (e.g. is a prime, is either a function or a string, or has valid argument patterns (A, B, and C or B, D, and E). Arguably, when the data is more complicated, it becomes less intuitive to forcefully fit data into certain types, and types might not capture all the guarantees of the data structure anyways.
1. **Optional checking** - While enforced checking would stamp out bugs arising from invalid method calls, such a move severely limits the flexibility of expression in the language. Particularly, since Javascript itself is a dynamic language with no provisons for code optimization based on typing, a conventional type offering in this library does not do too much for the language (although tools like [Flow](https://flow.org/) and [Typescript](https://www.typescriptlang.org/) can be used!) We should work with the language features that are offered, rather than running counter to it - embracing Javascript's dynamism.

Refer to Clojure's [spec guide](https://clojure.org/about/spec) to see how people smarter than me reason about this.

### 2. Why not use just Clojurescript?

Definitely! Clojurescript already a [spec library](https://clojure.org/guides/spec).

However, Clojurescript performs this checking from fresh as we build up a data structure, leading to unnecessary repetition of checks which may be costly. See the next question for benchmarks!

### 3. How much is performance affected?

If we were only doing dynamic type checking via `typeof`, it takes only about ~1% more time, and scales linearly. For more complex arguments it is harder to argue about it, but note that most programs do end up explicitly checking inputs in some form or the other, be it nullable checks, or whether the input asserts to a certain usable specification. In those cases, `specjs` helps formalise the code, and offers programmers the capacity to say that given a input that satisfies a certain spec, there will always be output of a certain spec?

To further improve performance, `specjs` also offers an immutable version of itself, which wraps immutable data types from `immutable.js` with metadata that tracks the specs that a certain object has fulfilled. In this manner, if the programmer strictly uses the provided wrappers, we skip repetitive checking and get a huge performance boost if the same data is used in multiple areas.

**_Benchmarks_**

**Simple Type Checking**

```javascript
const {performance} = require('perf_hooks');

const n = 100000000;
let test;

const t0 = performance.now();
for (let i = 0; i < n; i++) {
  test = 'test';
}
const t1 = performance.now();
console.log('Declaring a string took ' + (t1 - t0) / n + ' milliseconds on average.');
// Declaring a string took 8.706519499421119e-7 milliseconds on average.

const t2 = performance.now();
for (let i = 0; i < n; i++) {
  typeof 'test' === 'string';
}
const t3 = performance.now();
console.log('Checking string type took ' + (t3 - t2) / n + ' milliseconds on average.');
console.log('Checking a string took ' + ((t3 - t2) / (t1 - t0)).toPrecision(3) + '% more time.');
const n = 10000000;
const t0 = performance.now();
for (let i = 0; i < 10000000; i++) {
  typeof 'test' === 'string';
}
const t1 = performance.now();
console.log('Checking string type took ' + (t1 - t0) / n + ' milliseconds on average.');
// Checking string type took 8.643735998868942e-7 milliseconds on average.
// Checking a string took 0.993% more time.
```

**Imutable types usage performance boost**

_Javascript_

```javascript
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

isValid(nestedPoint2, '2-nested point'); // false

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
  'Test 1: Time taken to perform ' +
    numTimes +
    ' validity checks on the JS Map is ' +
    (end - start) +
    'ms, averaging ' +
    (end - start) / numTimes +
    'ms.'
);
/* Test 1: Time taken to perform 10000000 validity checks on the JS Map is 5441.707319021225ms, averaging 0.0005441707319021225ms. */

// Test 2: fromJS (immutableJS) Map
start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint2, '2-nested point');
}
end = performance.now();
console.log(
  'Test 2: Time taken to perform ' +
    numTimes +
    ' validity checks on the fromJS Map is ' +
    (end - start) +
    'ms, averaging ' +
    (end - start) / numTimes +
    'ms.'
);
/* Test 2: Test 2: Time taken to perform 10000000 validity checks on the fromJS Map is 1474.4121170043945ms, averaging 0.00014744121170043946ms. */

// Test 3: immutableJS Map
start = performance.now();
for (let i = 0; i < numTimes; i++) {
  isValid(nestedPoint, '2-nested point');
}
end = performance.now();
console.log(
  'Test 3: Time taken to perform ' +
    numTimes +
    ' validity checks on the immutable Map is ' +
    (end - start) +
    'ms, averaging ' +
    (end - start) / numTimes +
    'ms.'
);

/* Test 3: Time taken to perform 10000000 validity checks on the immutable Map is 1248.7203179597855ms, averaging 0.00012487203179597855ms. */
```

_Clojure_

```clojure
(ns benchmark (:require [clojure.spec.alpha :as s]))
(s/def ::x-coord int?)
(s/def ::y-coord int?)
(s/def ::point (s/keys :req-un [::x-coord]
                       :opt-un [::y-coord]))

(s/def ::nested-point (s/keys :req-un [::point]))

(s/def ::nested-nested-point (s/keys :req-un [::nested-point]))

(time (dotimes [_ 10000000] (s/valid? ::nested-nested-point  {:nested-point {:point {:x-coord 2 :y-coord 3}}})))

(comment "Elapsed time: 31613.900138 msecs.")
```

As we may have expected, the immutable Maps take about the same times. We also note that
the mutable version takes nearly three times as long as the immutable versions with this input.

For comparison purposes, clojure's `spec/alpha` (which inspired this library) gives us 31613.900138 msecs, which is about 300 times our immutable version, and 30 times our mutable version implementation.

## When should I use/ not use this library?

**_Suggested Usages_**:

1. Data-processing heavy programs - Ensure that the data fits a required specification before beginning to process it, and be reassured that if the specification fully expresses the requirements of the program, the remainder of the program will be able to process the data without difficulties.
1. API-facing functions/ APIs - Consider an API that searches a person either with their first name and last name or with their address. APIs normally would have them at the same endpoint, but it would be misleading to suggest that all three arguments are optional - supplying only the last name would not work. With `specjs`, the APIs are able to specify the possible combinations of information it wishes to accept.

**_Avoid when_**:

1. The developer team is able to be fully certain that the data flow within the program is as intended - in this case, there is no need to install `specjs` to verify the data.
2. The program requires high level of optimization and speed - `specjs` comes with performance costs since it has to check the type

In general, `specjs` is good for when we want to assert that the input data fulfills a certain structure before we perform further processing (e.g. sending it out to another API, data processing). With the immutable version, users do not have to worry about costs associated with repeated checking of data that is handled between functions, since the metadata will be stored if the same data is used.

## Are there alternatives?

Sure! Look at [js.spec](https://github.com/prayerslayer/js.spec) or [speculaas](https://github.com/mrijk/speculaas).

## Roadmap

1. `coll`, `every`
1. User handling of error logging.
1. Transferrable spec initialization.

## Contributors

Garett Tok Ern Liang [(walnutdust)](https://github.com/walnutdust/)

## License

This project is licenced under the MIT Licence.
