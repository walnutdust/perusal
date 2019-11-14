import {expect} from 'chai';
import {or, isString, Spec, even, odd, isNumber, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('or', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name', function() {
      expect(() => or(2, even)).to.throw(Error);
    });

    it('throws an error on [non-Spec spec]', function() {
      expect(() => or('non-Spec', 'non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(or('is even?', even)).to.be.an.instanceof(Spec);
    });

    it('passes with multiple Spec input', function() {
      expect(or('is either even or odd?', even, odd)).to.be.an.instanceof(Spec);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(or('is string or number?', isNumber, isString).assert(12)).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(or('is odd or even?', even, odd).assert('fail')).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      let spy = sinon.spy(console, 'log');
      expect(or('is string or number?', isNumber, isString).explain(12, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(or('is odd or even?', even, odd).explain('hi', ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
