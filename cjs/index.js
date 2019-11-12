'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var _exportNames = {
  Spec: true,
  and: true,
  or: true,
  pred: true,
  keys: true,
  optional: true,
  invalid: true,
  assert: true,
  isValid: true,
  explain: true,
  explainIfInvalid: true,
  define: true,
  getSpec: true,
};
Object.defineProperty(exports, 'Spec', {
  enumerable: true,
  get: function get() {
    return _spec['default'];
  },
});
Object.defineProperty(exports, 'and', {
  enumerable: true,
  get: function get() {
    return _and.and;
  },
});
Object.defineProperty(exports, 'or', {
  enumerable: true,
  get: function get() {
    return _or.or;
  },
});
Object.defineProperty(exports, 'pred', {
  enumerable: true,
  get: function get() {
    return _pred.pred;
  },
});
Object.defineProperty(exports, 'keys', {
  enumerable: true,
  get: function get() {
    return _keys.keys;
  },
});
Object.defineProperty(exports, 'optional', {
  enumerable: true,
  get: function get() {
    return _optional.optional;
  },
});
Object.defineProperty(exports, 'invalid', {
  enumerable: true,
  get: function get() {
    return _control.invalid;
  },
});
Object.defineProperty(exports, 'assert', {
  enumerable: true,
  get: function get() {
    return _utils.assert;
  },
});
Object.defineProperty(exports, 'isValid', {
  enumerable: true,
  get: function get() {
    return _utils.isValid;
  },
});
Object.defineProperty(exports, 'explain', {
  enumerable: true,
  get: function get() {
    return _utils.explain;
  },
});
Object.defineProperty(exports, 'explainIfInvalid', {
  enumerable: true,
  get: function get() {
    return _utils.explainIfInvalid;
  },
});
Object.defineProperty(exports, 'define', {
  enumerable: true,
  get: function get() {
    return _utils.define;
  },
});
Object.defineProperty(exports, 'getSpec', {
  enumerable: true,
  get: function get() {
    return _utils.getSpec;
  },
});

var _spec = _interopRequireDefault(require('./spec/spec'));

var _and = require('./spec/and');

var _or = require('./spec/or');

var _pred = require('./spec/pred');

var _keys = require('./spec/keys');

var _optional = require('./spec/optional');

var _control = require('./control');

var _utils = require('./utils');

var _preds = require('./preds');

Object.keys(_preds).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _preds[key];
    },
  });
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
