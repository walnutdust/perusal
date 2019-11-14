import {expect} from 'chai';
import {
  assert,
  isValid,
  explain,
  explainIfInvalid,
  define,
  getSpec,
  and,
  Spec,
  even,
  odd,
  isNumber,
  invalid,
} from '../cjs/index';
import {suspendConsole, restoreConsole} from './testing-utils';
import sinon from 'sinon';

describe('utils', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('assert', function() {
    it('throws an error on invalid spec input', function() {
      expect(() => assert(12, ['hi'])).to.throw(Error);
    });

    it('throws an error on invalid string input for spec if it is not defined', function() {
      expect(() => assert(12, 'undefined')).to.throw(Error);
    });

    it('returns the value if value passes', function() {
      expect(assert(12, even)).to.eq(12);
    });

    it('returns invalid if value passes', function() {
      expect(assert(11, even)).to.eq(invalid);
    });
  });

  describe('isValid', function() {
    it('throws an error on invalid spec input', function() {
      expect(() => isValid(12, ['hi'])).to.throw(Error);
    });

    it('throws an error on invalid string input for spec if it is not defined', function() {
      expect(() => isValid(12, 'undefined')).to.throw(Error);
    });

    it('returns true if value passes', function() {
      expect(isValid(12, even)).to.eq(true);
    });

    it('returns false if value passes', function() {
      expect(isValid(11, even)).to.eq(false);
    });
  });

  describe('explain', function() {
    it('throws an error on invalid spec input', function() {
      expect(() => explain(12, ['hi'])).to.throw(Error);
    });

    it('throws an error on invalid string input for spec if it is not defined', function() {
      expect(() => explain(12, 'undefined')).to.throw(Error);
    });

    it('returns nothing and logs to console if value passes', function() {
      let spy = sinon.spy(console, 'log');
      expect(explain(12, even)).to.eq(undefined);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns nothing and logs to console if value fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(explain(11, even)).to.eq(undefined);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('explainIfInvalid', function() {
    it('throws an error on invalid spec input', function() {
      expect(() => explainIfInvalid(12, ['hi'])).to.throw(Error);
    });

    it('throws an error on invalid string input for spec if it is not defined', function() {
      expect(() => explainIfInvalid(12, 'undefined')).to.throw(Error);
    });

    it('returns nothing and logs to console if value passes', function() {
      let spy = sinon.spy(console, 'log');
      expect(explainIfInvalid(12, even)).to.eq(undefined);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns nothing and logs to console if value fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(explainIfInvalid(11, even)).to.eq(undefined);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });

  describe('define and get specifications', function() {
    it('define specification throws Error if input is not a specification', function() {
      expect(() => define('test', 'not a spec')).to.throw(Error);
    });

    it('define specification throws Error if name is not a string', function() {
      expect(() => define(12, even)).to.throw(Error);
    });

    it('define specification works with specifications', function() {
      expect(() => define('even', and('is even number?', even, isNumber))).to.not.throw(Error);
    });

    it('define fails when the name is already taken', function() {
      define('odd', odd);
      expect(() => define('odd', and('is odd number?', odd, isNumber))).to.throw(Error);
    });

    it('getSpec fails when the specification is not defined', function() {
      expect(() => getSpec('undefined')).to.throw(Error);
    });

    it('getSpec fails when the specification is inavalid', function() {
      expect(() => getSpec(true)).to.throw(Error);
    });

    it('getSpec returns Spec for Spec inputs', function() {
      expect(getSpec(even)).to.eq(even);
    });

    it('getSpec returns Spec if name string is tied to a spec', function() {
      define('is number', isNumber);
      expect(getSpec('is number')).to.be.instanceOf(Spec);
    });
  });
});
