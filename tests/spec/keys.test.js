import {expect} from 'chai';
import {keys, Spec, assert} from '../../lib/utils';
import {even} from '../../lib/preds';
import {invalid} from '../../lib/control';
import {Map} from 'immutable';
import {suspendConsole, restoreConsole} from '../testing-utils';

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
  });

  describe('assert', function() {
    it('returns the value if value passes', function() {
      const testMap = new Map({x: 12});
      expect(assert(testMap, keys('name', {x: even})).value).to.eq(testMap.value);
    });

    it('returns invalid if value fails', function() {
      expect(assert('fail', keys('name', {x: even}))).to.eq(invalid);
    });
  });

  describe('explain', function() {
    it('returns true and logs nothing if correct', function() {
      expect(keys('name', {x: even}).explain(new Map({x: 12}), [])).to.eq(true);
    });

    it('returns false and logs error if spec fails', function() {
      expect(keys('name', {x: even}).explain('hi', ['path'])).to.eq(false);
    });
  });
});
