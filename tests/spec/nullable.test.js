import {expect} from 'chai';
import {nullable, Spec, even, odd, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('nullable', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name', function() {
      expect(() => nullable(2, even)).to.throw(Error);
    });

    it('throws an error on [non-Spec spec]', function() {
      expect(() => nullable('non-Spec')).to.throw(Error);
    });

    it('passes with one Spec input', function() {
      expect(nullable(even)).to.be.an.instanceof(Spec);
    });

    it('fails with too many arguments', function() {
      expect(() => nullable(even, even)).to.throw(Error);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(nullable(even).assert(12)).to.eq(12);
    });

    it('returns invalid if value fails', function() {
      expect(nullable(even).assert(11)).to.eq(invalid);
    });

    it('returns value if (null)', function() {
      expect(nullable(even).assert(null)).to.eq(null);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(nullable(even).explain(12, [])).to.eq(true);
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(nullable(odd).explain('hi', ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns true and logs nothing if null', function() {
      let spy = sinon.spy(console, 'log');
      expect(nullable(odd).explain(null, ['path'])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });
  });
});
