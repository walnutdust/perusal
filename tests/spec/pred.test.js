import {expect} from 'chai';
import {pred, Spec, assert} from '../../cjs/utils';
import {even, odd} from '../../cjs/preds';
import {invalid} from '../../cjs/control';
import {suspendConsole, restoreConsole} from '../testing-utils';

describe('pred', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid input', function() {
      expect(() => pred('fail')).to.throw(Error);
    });

    it('passes with name string and function input', function() {
      expect(pred('is even?', (value) => value === true)).to.be.an.instanceof(Spec);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(assert(12, even)).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(assert(12, odd)).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(even.explain(12, [])).to.eq(true);
    });

    it('returns false and logs error if spec fails', function() {
      expect(odd.explain(12, ['path'])).to.eq(false);
    });
  });
});
