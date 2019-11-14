import {expect} from 'chai';
import {keys, Spec, even, invalid} from '../../cjs/index';
import {suspendConsole, restoreConsole} from '../testing-utils';
import sinon from 'sinon';

describe('keys', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('constructor', function() {
    it('throws an error on invalid name.', function() {
      expect(() => keys(1, {})).to.throw(Error);
    });

    it('throws an error on [non-Object]', function() {
      expect(() => keys('name', 'non-Object')).to.throw(Error);
    });

    it('throws an error on non-spec input', function() {
      expect(() => keys('name', {x: 1})).to.throw(Error);
    });

    it('creates a keys spec successfully', function() {
      expect(keys('name', {x: even})).to.be.an.instanceof(Spec);
    });

    it('throws an error on too many arguments', function() {
      expect(() => keys('name', {x: even}, {x: even})).to.throw(Error);
    });
  });

  describe('assert', function() {
    it('returns the value if value passes (JS Map)', function() {
      const testMap = new Map([['x', 12]]);
      expect(keys('name', {x: even}).assert(testMap)).to.eq(testMap);
    });

    it('returns the value if value passes (JS Object)', function() {
      const testMap = {x: 12};
      expect(keys('name', {x: even}).assert(testMap)).to.eq(testMap);
    });

    it('returns invalid if value fails (JS Map)', function() {
      const testMap = new Map([['x', 11]]);
      expect(keys('name', {x: even}).assert(testMap)).to.eq(invalid);
    });

    it('returns invalid if value fails (JS Object)', function() {
      const testMap = {x: 11};
      expect(keys('name', {x: even}).assert(testMap)).to.eq(invalid);
    });

    it('returns invalid on invalid value (array)', function() {
      expect(keys('name', {x: even}).assert(['x', 2])).to.eq(invalid);
    });

    it('returns invalid on invalid value', function() {
      expect(keys('name', {x: even}).assert('string')).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct (JS Map)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain(new Map([['x', 12]]), [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns true and logs nothing if correct (JS Object)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain({x: 12}, [])).to.eq(true);
      expect(spy.called).to.be.false;
      spy.restore();
    });

    it('returns false and logs error if spec fails (JS Map)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain(new Map([['x', 11]]), ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns false and logs error if spec fails (JS Object)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain({x: 11}, ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns false and logs error if spec fails on invalid value (array)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain(['x', 2], ['path'])).to.eq(false);
      expect(spy.called).to.be.true;
      spy.restore();
    });

    it('returns false and logs error if spec fails (invalid)', function() {
      let spy = sinon.spy(console, 'log');
      expect(keys('name', {x: even}).explain('invalid', ['path'])).to.eq(false);
      expect(spy.called).to.be.false;
      spy.restore();
    });
  });
});
