import {expect} from 'chai';
import {oneOf, Spec, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('oneOf', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name', function() {
      expect(() => oneOf(2, 3, 4)).to.throw(Error);
    });

    it('passes with valid name', function() {
      expect(oneOf('is 3 or 4?', 3, 4)).to.be.an.instanceof(Spec);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      expect(oneOf('is 3 or 4?', 3, 4).assert(3)).to.eq(3);
    });

    it('returns invalid if value fails', function() {
      expect(oneOf('is 3 or 4?', 3, 4).assert(2)).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      let spy = sinon.spy(console, 'log');
      expect(oneOf('is 3 or 4?', 3, 4).explain(3, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails', function() {
      let spy = sinon.spy(console, 'log');
      expect(oneOf('is 3 or 4?', 3, 4).explain(2, [])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });
  });
});
