import {expect} from 'chai';
import {optional, Spec, assert} from '../../cjs/utils';
import {even, odd} from '../../cjs/preds';
import {invalid} from '../../cjs/control';
import {suspendConsole, restoreConsole} from '../testing-utils';

describe('optional key', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on [non-Spec spec]', function() {
      expect(() => optional('non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(optional(even)).to.be.an.instanceof(Spec);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(assert(12, optional(even))).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(assert('fail', optional(even))).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(optional(even).explain(12, [])).to.eq(true);
    });

    it('returns false and logs error if spec fails', function() {
      expect(optional(odd).explain('hi', ['path'])).to.eq(false);
    });
  });
});
