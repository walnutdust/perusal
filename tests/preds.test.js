import {
  even,
  odd,
  isNumber,
  positive,
  negative,
  zero,
  isString,
  isObject,
  isBool,
  isSymbol,
  isFn,
} from '../cjs/preds';
import {isValid} from '../cjs/utils';
import {expect} from 'chai';
import {suspendConsole, restoreConsole} from './testing-utils';

describe('preds', function() {
  beforeEach(suspendConsole);
  afterEach(restoreConsole);

  describe('"even" predicate', function() {
    it('fails on non even number', function() {
      expect(isValid(3, even)).to.eq(false);
    });

    it('passes on even number', function() {
      expect(isValid(2, even)).to.eq(true);
    });

    it('fails on non number', function() {
      expect(isValid(false, even)).to.eq(false);
    });
  });

  describe('"odd" predicate', function() {
    it('fails on non odd number', function() {
      expect(isValid(4, odd)).to.eq(false);
    });

    it('passes on non odd number', function() {
      expect(isValid(3, odd)).to.eq(true);
    });

    it('fails on non number', function() {
      expect(isValid(false, odd)).to.eq(false);
    });
  });

  describe('"isNumber" predicate', function() {
    it('fails on non-number input', function() {
      expect(isValid(false, isNumber)).to.eq(false);
    });

    it('passes on numerical input', function() {
      expect(isValid(3, isNumber)).to.eq(true);
    });
  });

  describe('"positive" predicate', function() {
    it('fails on non-positive input', function() {
      expect(isValid(-2, positive)).to.eq(false);
    });

    it('fails on zero', function() {
      expect(isValid(0, positive)).to.eq(false);
    });

    it('passes on positive input', function() {
      expect(isValid(3, positive)).to.eq(true);
    });

    it('fails on non-number input', function() {
      expect(isValid(false, positive)).to.eq(false);
    });
  });

  describe('"negative" predicate', function() {
    it('fails on non-negative input', function() {
      expect(isValid(2, negative)).to.eq(false);
    });

    it('fails on zero', function() {
      expect(isValid(0, negative)).to.eq(false);
    });

    it('passes on negative input', function() {
      expect(isValid(-3, negative)).to.eq(true);
    });

    it('fails on non-number input', function() {
      expect(isValid(false, negative)).to.eq(false);
    });
  });

  describe('"zero" predicate', function() {
    it('fails on non-zero input', function() {
      expect(isValid(2, zero)).to.eq(false);
    });

    it('passes on zero', function() {
      expect(isValid(0, zero)).to.eq(true);
    });

    it('fails on non-number input', function() {
      expect(isValid(false, zero)).to.eq(false);
    });
  });

  describe('"isString" predicate', function() {
    it('fails on non-string input', function() {
      expect(isValid(2, isString)).to.eq(false);
    });

    it('passes on string input', function() {
      expect(isValid('String', isString)).to.eq(true);
    });
  });

  describe('"isBoolean" predicate', function() {
    it('fails on non-boolean input', function() {
      expect(isValid(2, isBool)).to.eq(false);
    });

    it('passes on boolean input', function() {
      expect(isValid(true, isBool)).to.eq(true);
    });
  });

  describe('"isSymbol" predicate', function() {
    it('fails on non-symbol input', function() {
      expect(isValid(2, isSymbol)).to.eq(false);
    });

    it('passes on symbol input', function() {
      expect(isValid(Symbol('symbol'), isSymbol)).to.eq(true);
    });
  });

  describe('"isObject" predicate', function() {
    it('fails on non-object input', function() {
      expect(isValid(2, isObject)).to.eq(false);
    });

    it('passes on object input', function() {
      expect(isValid(Symbol('symbol'), isSymbol)).to.eq(true);
    });
  });

  describe('"isFunction" predicate', function() {
    it('fails on non-function input', function() {
      expect(isValid(2, isFn)).to.eq(false);
    });

    it('passes on function input', function() {
      expect(isValid(() => true, isFn)).to.eq(true);
    });
  });
});
