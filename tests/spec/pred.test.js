import {expect} from 'chai';
import {pred, Spec, even, odd, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

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

    it('fails with invalid name string', function() {
      expect(() => pred(2, (value) => value === true)).to.throw(Error);
    });

    it('fails with too many arguments', function() {
      expect(() =>
        pred(
          'is even?',
          (value) => value,
          (value) => value
        )
      ).to.throw(Error);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(even.assert(12)).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(odd.assert(12)).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      let spy = sinon.spy(console, 'log');
      expect(even.explain(12, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(odd.explain(12, ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
