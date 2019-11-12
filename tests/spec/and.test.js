import {expect} from 'chai';
import {and, Spec, assert} from '../../cjs/utils';
import {even, odd, isNumber} from '../../cjs/preds';
import {invalid} from '../../cjs/control';
import {suspendConsole, restoreConsole} from '../testing-utils';

describe('and', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on [non-Spec spec]', function() {
      expect(() => and('non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(and('is even?', even)).to.be.an.instanceof(Spec);
    });

    it('passes with multiple Spec input', function() {
      expect(and('is both even and odd?', even, odd)).to.be.an.instanceof(Spec);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(assert(12, and('is even number?', isNumber, even))).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(assert(12, and('is odd number?', isNumber, odd))).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(and('is even number?', isNumber, even).explain(12, [])).to.eq(true);
    });

    it('returns false and logs error if spec fails', function() {
      expect(and('is odd number?', isNumber, odd).explain(12, ['path'])).to.eq(false);
    });
  });
});
