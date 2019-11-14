import {expect} from 'chai';
import {and, Spec, even, odd, isNumber, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('and', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invaid name', function() {
      expect(() => and(2, even)).to.throw(Error);
    });

    it('throws an error on [non-Spec spec]', function() {
      expect(() => and('non-Spec', 'non-Spec')).to.throw(Error);
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
      expect(and('is even number?', isNumber, even).assert(12)).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(and('is even number?', isNumber, even).assert(11)).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      let spy = sinon.spy(console, 'log');
      expect(and('is even number?', isNumber, even).explain(12, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(and('is odd number?', isNumber, odd).explain(12, ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
