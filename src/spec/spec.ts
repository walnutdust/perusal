import invariant from 'tiny-invariant';

/** @module perusal/spec */

/**
 * Abstract class representing `Spec`, the main specification of *perusal*. Declares the abstract
 * method assert and explain which is used by the utility methods ofr validity checking and
 * specification assertion on a given value.
 * @private
 */
export default abstract class Spec {
  name: string;
  options: any;

  constructor(name: string, options: any) {
    this.name = name;
    this.options = options;
  }

  /**
   * Asserts this spec on a given value.
   *
   * @param {any} value - The value to be asserted.
   * @throws Error on call - subclasses should all implement the `assert` method.
   */
  assert(value: any) {
    invariant(
      false,
      `Invalid call to Spec assert with value ${value}. Was assert implemented in the subclass?`
    );

    return value;
  }

  /**
   * Expplains why a given value passes/fails this spec.
   *
   * @param {any} value - The value to be asserted.
   * @param {String[]} path - The path travelled to this spec.
   * @throws Error on call - subclasses should all implement the `explain` method.
   */
  explain(value: any, path: String[]) {
    invariant(
      false,
      `Invalid call to Spec explain with value ${value} at ${path}. Was explain implemented in the subclass?`
    );
  }
}
