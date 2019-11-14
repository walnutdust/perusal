import {expect} from 'chai';
import {every, Spec, even, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('every', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name', function() {
      expect(() => every(2, even)).to.throw(Error);
    });

    it('throws an error on [non-Spec spec]', function() {
      expect(() => every('non-Spec', 'non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(every('is every value even?', even)).to.be.an.instanceof(Spec);
    });

    it('fails with too many Spec inputs', function() {
      expect(() => every('is every value even?', even, even)).to.throw(Error);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes (Array)', function() {
      const testArray = [12, 4];
      expect(every('is even number?', even).assert(testArray)).to.eq(testArray);
    });

    it('returns invalid if value fails (Array)', function() {
      expect(every('is even number?', even).assert([11, 12])).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      let spy = sinon.spy(console, 'log');
      expect(every('is even number?', even).explain([12, 12], [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(every('is odd number?', even).explain([11, 12], [])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
