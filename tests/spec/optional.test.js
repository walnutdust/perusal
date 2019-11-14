import {expect} from 'chai';
import {optional, Spec, even, odd, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('optional', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name', function() {
      expect(() => optional(2, even)).to.throw(Error);
    });

    it('throws an error on [non-Spec spec]', function() {
      expect(() => optional('non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(optional(even)).to.be.an.instanceof(Spec);
    });

    it('fails with too many arguments', function() {
      expect(() => optional(even, even)).to.throw(Error);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(optional(even).assert(12)).to.eq(12);
    });

    it('undefined passes and is returned too', function() {
      expect(optional(even).assert(undefined)).to.eq(undefined);
    });

    it('returns invalid if value fails', function() {
      expect(optional(even).assert(11)).to.eq(invalid);
    });

    it('returns invalid if value fails (null)', function() {
      expect(optional(even).assert(null)).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(optional(even).explain(12, [])).to.eq(true);
    });

    it('returns true and logs nothing if undefined', function() {
      let spy = sinon.spy(console, 'log');
      expect(optional(even).explain(undefined, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(optional(odd).explain('hi', ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns false and logs error if spec fails (null)', function() {
      let spy = sinon.spy(console, 'log');
      expect(optional(odd).explain(null, ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
