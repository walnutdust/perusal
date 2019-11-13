'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.assert = assert;
exports.isValid = isValid;
exports.explain = explain;
exports.explainIfInvalid = explainIfInvalid;
exports.define = define;
exports.getSpec = getSpec;
Object.defineProperty(exports, 'Spec', {
  enumerable: true,
  get: function get() {
    return _spec['default'];
  },
});
Object.defineProperty(exports, 'and', {
  enumerable: true,
  get: function get() {
    return _and.and;
  },
});
Object.defineProperty(exports, 'or', {
  enumerable: true,
  get: function get() {
    return _or.or;
  },
});
Object.defineProperty(exports, 'pred', {
  enumerable: true,
  get: function get() {
    return _pred.pred;
  },
});
Object.defineProperty(exports, 'keys', {
  enumerable: true,
  get: function get() {
    return _keys.keys;
  },
});
Object.defineProperty(exports, 'optional', {
  enumerable: true,
  get: function get() {
    return _optional.optional;
  },
});

var _spec = _interopRequireDefault(require('./spec/spec'));

var _and = require('./spec/and');

var _or = require('./spec/or');

var _pred = require('./spec/pred');

var _keys = require('./spec/keys');

var _optional = require('./spec/optional');

var _control = require('./control');

var _tinyInvariant = _interopRequireDefault(require('tiny-invariant'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/* eslint-disable no-console */

/** @member {[key: string]: Spec} defs holds all user-made definitions. */
var defs = {};
/**
 * Asserts a spec on a given value. Returns the value if value passes specification,
 * returns `perusal-immutable.invalid` otherwise.
 *
 * @param {any} value - The value to be asserted.
 * @param {Spec | string} spec - The spec to be used.
 * @return {invalid|any} Returns the value if value passes specification, returns
 * perusal-immutable.invalid otherwise.
 */

function assert(value, spec) {
  // getSpec allows us to pass it strings to retrive previously defined specs.
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid spec '.concat(spec, ' passed to perusal-immutable.assert.')
  );
  var specification = getSpec(spec); // If the value was previous asserted with this specification, simply return the
  // previous result.

  if (value.specs && value.specs[specification.name]) return value.specs[specification.name];
  return specification.assert(value);
}
/**
 * Checks if a value is valid given a specificiation.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The speficiation to be used.
 * @return {boolean} Returns boolean representing if the value if value passes
 * spec.
 */

function isValid(value, spec) {
  // Error checking/throwing here to provide more helpful error messages.
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to perusal-immutable.isValid.')
  );
  return assert(value, spec) !== _control.invalid;
}
/**
 * Explains why a value passes/fails a specification.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The speficiation to be used.
 */

function explain(value, spec) {
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to perusal-immutable.explain.')
  );
  var specification = getSpec(spec);

  if (specification.assert(value) !== _control.invalid) {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log('\n\nPasses specification '.concat(specification.name, '.'));
    console.log('\n');
  } else {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log('\n\nFails specification(s):');
    specification.explain(value, []);
    console.log('\n');
  }
}
/**
 * Explains why a value fails a specification. Like {@link explain}, but only produces output if invalid.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The specificiation to be used.
 */

function explainIfInvalid(value, spec) {
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to perusal-immutable.explainIfInvalid.')
  );
  var specification = getSpec(spec);

  if (specification.assert(value) === _control.invalid) {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log('\n\nFails specification(s):');
    specification.explain(value, []);
    console.log('\n');
  }
}
/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string} name - The name that will be used to refer to the spec in the future.
 * @param {Spec} spec - The spec to be defined.
 */

function define(name, spec) {
  (0, _tinyInvariant['default'])(
    typeof name == 'string',
    'Specs can only be defined with string names!'
  );
  (0, _tinyInvariant['default'])(!defs[name], 'Specfication for '.concat(name, ' already exists!'));
  (0, _tinyInvariant['default'])(
    spec instanceof _spec['default'],
    'perusal-immutable.define called with invalid spec.'
  );
  defs[name] = spec;
}
/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string|Spec} maybeSpec - The name of the spec as previously defined in
 * {@link define} or the spec itself.
 */

function getSpec(maybeSpec) {
  if (maybeSpec instanceof _spec['default']) return maybeSpec;
  (0, _tinyInvariant['default'])(
    defs[maybeSpec],
    'Specification for '.concat(maybeSpec, ' does not exist!')
  );
  return defs[maybeSpec];
}
