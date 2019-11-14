import Spec from './spec/spec';
import {and} from './spec/and';
import {or} from './spec/or';
import {pred} from './spec/pred';
import {keys} from './spec/keys';
import {optional} from './spec/optional';
import {invalid} from './control';
import invariant from 'tiny-invariant';

export {and, keys, pred, optional, Spec, or};

/* eslint-disable no-console */
/** @member {[key: string]: Spec} defs holds all user-made definitions. */
const defs: {[key: string]: Spec} = {};

/**
 * Asserts a spec on a given value. Returns the value if value passes specification,
 * returns `perusal.invalid` otherwise.
 *
 * @param {any} value - The value to be asserted.
 * @param {Spec | string} spec - The spec to be used.
 * @return {any} Returns the value if value passes specification, returns
 * perusal.invalid otherwise.
 */
export function assert(value: any, spec: Spec | string): any {
  // getSpec allows us to pass it strings to retrive previously defined specs.
  invariant(
    typeof spec === 'string' || spec instanceof Spec,
    `Invalid spec ${spec} passed to perusal.assert.`
  );

  const specification = getSpec(spec);

  // If the value was previous asserted with this specification, simply return the
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
export function isValid(value: any, spec: Spec | string) {
  // Error checking/throwing here to provide more helpful error messages.
  invariant(
    typeof spec === 'string' || spec instanceof Spec,
    `Invalid specification ${spec} passed to perusal.isValid.`
  );

  return assert(value, spec) !== invalid;
}

/**
 * Explains why a value passes/fails a specification.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The speficiation to be used.
 */
export function explain(value: any, spec: Spec | string) {
  invariant(
    typeof spec === 'string' || spec instanceof Spec,
    `Invalid specification ${spec} passed to perusal.explain.`
  );

  const specification = getSpec(spec);

  if (specification.assert(value) !== invalid) {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log(`\n\nPasses specification ${specification.name}.`);
    console.log(`\n`);
  } else {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log(`\n\nFails specification(s):`);
    specification.explain(value, []);
    console.log(`\n`);
  }
}

/**
 * Explains why a value fails a specification. Like {@link explain}, but only produces output if invalid.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The specificiation to be used.
 */
export function explainIfInvalid(value: any, spec: Spec | string) {
  invariant(
    typeof spec === 'string' || spec instanceof Spec,
    `Invalid specification ${spec} passed to perusal.explainIfInvalid.`
  );

  const specification = getSpec(spec);

  if (specification.assert(value) === invalid) {
    console.log('\n\nValue:\n');
    console.log(value);
    console.log(`\n\nFails specification(s):`);
    specification.explain(value, []);
    console.log(`\n`);
  }
}

/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string} name - The name that will be used to refer to the spec in the future.
 * @param {Spec} spec - The spec to be defined.
 */
export function define(name: string, spec: Spec) {
  invariant(typeof name == 'string', 'Specs can only be defined with string names!');
  invariant(!defs[name], `Specfication for ${name} already exists!`);
  invariant(spec instanceof Spec, 'perusal.define called with invalid spec.');
  defs[name] = spec;
}

/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string|Spec} maybeSpec - The name of the spec as previously defined in
 * {@link define} or the spec itself.
 */
export function getSpec(maybeSpec: string | Spec) {
  if (maybeSpec instanceof Spec) return maybeSpec;

  invariant(defs[maybeSpec], `Specification for ${maybeSpec} does not exist!`);
  return defs[maybeSpec];
}
