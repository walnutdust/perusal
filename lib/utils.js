'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.assert = assert;
exports.isValid = isValid;
exports.explain = explain;
exports.explainIfInvalid = explainIfInvalid;
exports.define = define;
exports.getSpec = getSpec;
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

var _spec = _interopRequireDefault(require('./spec/spec'));

var _and = require('./spec/and');

var _or = require('./spec/or');

var _pred = require('./spec/pred');

var _keys = require('./spec/keys');

var _optional = require('./spec/optional');

var _control = require('./control');

var _immutable = require('immutable');

var _tinyInvariant = _interopRequireDefault(require('tiny-invariant'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/* eslint-disable no-console */

/** @member {[key: string]: Spec} defs holds all user-made definitions. */
var defs = {};
/**
 * Asserts a spec on a given value. Returns the value if value passes specification,
 * returns `specjs.invalid` otherwise.
 *
 * @param {any} value - The value to be asserted.
 * @param {Spec | string} spec - The spec to be used.
 * @return {invalid|any} Returns the value if value passes specification, returns
 * specjs.invalid otherwise.
 */

function assert(value, spec) {
  // getSpec allows us to pass it strings to retrive previously defined specs.
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid spec '.concat(spec, ' passed to specjs.assert.')
  );
  var specification = getSpec(spec); // If the value was previous asserted with this specification, simply return the
  // previous result.

  if (value.specs && value.specs[specification.name]) return value.specs[specification.name];
  return specification.assert(value);
}
/**
 * Checks if a value is valid given a specificiation.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The speficiation to be used.
 * @return {boolean} Returns boolean representing if the value if value passes
 * spec.
 */

function isValid(value, spec) {
  // Error checking/throwing here to provide more helpful error messages.
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to specjs.isValid.')
  );
  return assert(value, spec) !== _control.invalid;
}
/**
 * Explains why a value passes/fails a specification.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The speficiation to be used.
 */

function explain(value, spec) {
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to specjs.explain.')
  );
  var specification = getSpec(spec);

  if (specification.assert(value) !== _control.invalid) {
    console.log('\n\nValue:\n');
    console.log((0, _immutable.isImmutable)(value) ? value.toJS() : value);
    console.log('\n\nPasses specification '.concat(specification.name, '.'));
    console.log('\n');
  } else {
    console.log('\n\nValue:\n');
    console.log((0, _immutable.isImmutable)(value) ? value.toJS() : value);
    console.log('\n\nFails specification(s):');
    specification.explain(value, []);
    console.log('\n');
  }
}
/**
 * Explains why a value fails a specification. Like {@link explain}, but only produces output if invalid.
 *
 * @param {any} value - The value to be checked.
 * @param {Spec | string} spec - The specificiation to be used.
 */

function explainIfInvalid(value, spec) {
  (0, _tinyInvariant['default'])(
    typeof spec === 'string' || spec instanceof _spec['default'],
    'Invalid specification '.concat(spec, ' passed to specjs.explainIfInvalid.')
  );
  var specification = getSpec(spec);

  if (specification.assert(value) === _control.invalid) {
    console.log('\n\nValue:\n');
    console.log((0, _immutable.isImmutable)(value) ? value.toJS() : value);
    console.log('\n\nFails specification(s):');
    specification.explain(value, []);
    console.log('\n');
  }
}
/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string} name - The name that will be used to refer to the spec in the future.
 * @param {Spec} spec - The spec to be defined.
 */

function define(name, spec) {
  (0, _tinyInvariant['default'])(!defs[name], 'Specfication for '.concat(name, ' already exists!'));
  (0, _tinyInvariant['default'])(
    spec instanceof _spec['default'],
    'specjs.define called with invalid spec.'
  );
  defs[name] = spec;
}
/**
 * Defines a new spec, allowing it to be referenced as such in the future.
 *
 * @param {string|Spec} maybeSpec - The name of the spec as previously defined in
 * {@link define} or the spec itself.
 */

function getSpec(maybeSpec) {
  if (maybeSpec instanceof _spec['default']) return maybeSpec;
  (0, _tinyInvariant['default'])(
    defs[maybeSpec],
    'Specification for '.concat(maybeSpec, ' does not exist!')
  );
  return defs[maybeSpec];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJkZWZzIiwiYXNzZXJ0IiwidmFsdWUiLCJzcGVjIiwiU3BlYyIsInNwZWNpZmljYXRpb24iLCJnZXRTcGVjIiwic3BlY3MiLCJuYW1lIiwiaXNWYWxpZCIsImludmFsaWQiLCJleHBsYWluIiwiY29uc29sZSIsImxvZyIsInRvSlMiLCJleHBsYWluSWZJbnZhbGlkIiwiZGVmaW5lIiwibWF5YmVTcGVjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUlBOztBQUNBO0FBQ0EsSUFBTUEsSUFBMkIsR0FBRyxFQUFwQztBQUVBOzs7Ozs7Ozs7O0FBU08sU0FBU0MsTUFBVCxDQUFnQkMsS0FBaEIsRUFBNEJDLElBQTVCLEVBQWlEO0FBQ3REO0FBQ0EsaUNBQ0UsT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsSUFBSSxZQUFZQyxnQkFEOUMseUJBRWtCRCxJQUZsQjtBQUtBLE1BQU1FLGFBQWEsR0FBR0MsT0FBTyxDQUFDSCxJQUFELENBQTdCLENBUHNELENBU3REO0FBQ0E7O0FBQ0EsTUFBSUQsS0FBSyxDQUFDSyxLQUFOLElBQWVMLEtBQUssQ0FBQ0ssS0FBTixDQUFZRixhQUFhLENBQUNHLElBQTFCLENBQW5CLEVBQW9ELE9BQU9OLEtBQUssQ0FBQ0ssS0FBTixDQUFZRixhQUFhLENBQUNHLElBQTFCLENBQVA7QUFFcEQsU0FBT0gsYUFBYSxDQUFDSixNQUFkLENBQXFCQyxLQUFyQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFPLFNBQVNPLE9BQVQsQ0FBaUJQLEtBQWpCLEVBQTZCQyxJQUE3QixFQUFrRDtBQUN2RDtBQUNBLGlDQUNFLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQUksWUFBWUMsZ0JBRDlDLGtDQUUyQkQsSUFGM0I7QUFLQSxTQUFPRixNQUFNLENBQUNDLEtBQUQsRUFBUUMsSUFBUixDQUFOLEtBQXdCTyxnQkFBL0I7QUFDRDtBQUVEOzs7Ozs7OztBQU1PLFNBQVNDLE9BQVQsQ0FBaUJULEtBQWpCLEVBQTZCQyxJQUE3QixFQUFrRDtBQUN2RCxpQ0FDRSxPQUFPQSxJQUFQLEtBQWdCLFFBQWhCLElBQTRCQSxJQUFJLFlBQVlDLGdCQUQ5QyxrQ0FFMkJELElBRjNCO0FBS0EsTUFBTUUsYUFBYSxHQUFHQyxPQUFPLENBQUNILElBQUQsQ0FBN0I7O0FBRUEsTUFBSUUsYUFBYSxDQUFDSixNQUFkLENBQXFCQyxLQUFyQixNQUFnQ1EsZ0JBQXBDLEVBQTZDO0FBQzNDRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0FELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFZWCxLQUFaLElBQXFCQSxLQUFLLENBQUNZLElBQU4sRUFBckIsR0FBb0NaLEtBQWhEO0FBQ0FVLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixvQ0FBd0NSLGFBQWEsQ0FBQ0csSUFBdEQ7QUFDQUksSUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0QsR0FMRCxNQUtPO0FBQ0xELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNEJBQVlYLEtBQVosSUFBcUJBLEtBQUssQ0FBQ1ksSUFBTixFQUFyQixHQUFvQ1osS0FBaEQ7QUFDQVUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0FSLElBQUFBLGFBQWEsQ0FBQ00sT0FBZCxDQUFzQlQsS0FBdEIsRUFBNkIsRUFBN0I7QUFDQVUsSUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7OztBQU1PLFNBQVNFLGdCQUFULENBQTBCYixLQUExQixFQUFzQ0MsSUFBdEMsRUFBMkQ7QUFDaEUsaUNBQ0UsT0FBT0EsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsSUFBSSxZQUFZQyxnQkFEOUMsa0NBRTJCRCxJQUYzQjtBQUtBLE1BQU1FLGFBQWEsR0FBR0MsT0FBTyxDQUFDSCxJQUFELENBQTdCOztBQUVBLE1BQUlFLGFBQWEsQ0FBQ0osTUFBZCxDQUFxQkMsS0FBckIsTUFBZ0NRLGdCQUFwQyxFQUE2QztBQUMzQ0UsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBWVgsS0FBWixJQUFxQkEsS0FBSyxDQUFDWSxJQUFOLEVBQXJCLEdBQW9DWixLQUFoRDtBQUNBVSxJQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQVIsSUFBQUEsYUFBYSxDQUFDTSxPQUFkLENBQXNCVCxLQUF0QixFQUE2QixFQUE3QjtBQUNBVSxJQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7O0FBTU8sU0FBU0csTUFBVCxDQUFnQlIsSUFBaEIsRUFBOEJMLElBQTlCLEVBQTBDO0FBQy9DLGlDQUFVLENBQUNILElBQUksQ0FBQ1EsSUFBRCxDQUFmLDZCQUEyQ0EsSUFBM0M7QUFDQSxpQ0FBVUwsSUFBSSxZQUFZQyxnQkFBMUIsRUFBZ0MseUNBQWhDO0FBQ0FKLEVBQUFBLElBQUksQ0FBQ1EsSUFBRCxDQUFKLEdBQWFMLElBQWI7QUFDRDtBQUVEOzs7Ozs7OztBQU1PLFNBQVNHLE9BQVQsQ0FBaUJXLFNBQWpCLEVBQTJDO0FBQ2hELE1BQUlBLFNBQVMsWUFBWWIsZ0JBQXpCLEVBQStCLE9BQU9hLFNBQVA7QUFFL0IsaUNBQVVqQixJQUFJLENBQUNpQixTQUFELENBQWQsOEJBQWdEQSxTQUFoRDtBQUNBLFNBQU9qQixJQUFJLENBQUNpQixTQUFELENBQVg7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTcGVjIGZyb20gJy4vc3BlYy9zcGVjJztcbmltcG9ydCB7YW5kfSBmcm9tICcuL3NwZWMvYW5kJztcbmltcG9ydCB7b3J9IGZyb20gJy4vc3BlYy9vcic7XG5pbXBvcnQge3ByZWR9IGZyb20gJy4vc3BlYy9wcmVkJztcbmltcG9ydCB7a2V5c30gZnJvbSAnLi9zcGVjL2tleXMnO1xuaW1wb3J0IHtvcHRpb25hbH0gZnJvbSAnLi9zcGVjL29wdGlvbmFsJztcbmltcG9ydCB7aW52YWxpZH0gZnJvbSAnLi9jb250cm9sJztcbmltcG9ydCB7aXNJbW11dGFibGV9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxuZXhwb3J0IHthbmQsIGtleXMsIHByZWQsIG9wdGlvbmFsLCBTcGVjLCBvcn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8qKiBAbWVtYmVyIHtba2V5OiBzdHJpbmddOiBTcGVjfSBkZWZzIGhvbGRzIGFsbCB1c2VyLW1hZGUgZGVmaW5pdGlvbnMuICovXG5jb25zdCBkZWZzOiB7W2tleTogc3RyaW5nXTogU3BlY30gPSB7fTtcblxuLyoqXG4gKiBBc3NlcnRzIGEgc3BlYyBvbiBhIGdpdmVuIHZhbHVlLiBSZXR1cm5zIHRoZSB2YWx1ZSBpZiB2YWx1ZSBwYXNzZXMgc3BlY2lmaWNhdGlvbixcbiAqIHJldHVybnMgYHNwZWNqcy5pbnZhbGlkYCBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHthbnl9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIGFzc2VydGVkLlxuICogQHBhcmFtIHtTcGVjIHwgc3RyaW5nfSBzcGVjIC0gVGhlIHNwZWMgdG8gYmUgdXNlZC5cbiAqIEByZXR1cm4ge2ludmFsaWR8YW55fSBSZXR1cm5zIHRoZSB2YWx1ZSBpZiB2YWx1ZSBwYXNzZXMgc3BlY2lmaWNhdGlvbiwgcmV0dXJuc1xuICogc3BlY2pzLmludmFsaWQgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHZhbHVlOiBhbnksIHNwZWM6IFNwZWMgfCBzdHJpbmcpIHtcbiAgLy8gZ2V0U3BlYyBhbGxvd3MgdXMgdG8gcGFzcyBpdCBzdHJpbmdzIHRvIHJldHJpdmUgcHJldmlvdXNseSBkZWZpbmVkIHNwZWNzLlxuICBpbnZhcmlhbnQoXG4gICAgdHlwZW9mIHNwZWMgPT09ICdzdHJpbmcnIHx8IHNwZWMgaW5zdGFuY2VvZiBTcGVjLFxuICAgIGBJbnZhbGlkIHNwZWMgJHtzcGVjfSBwYXNzZWQgdG8gc3BlY2pzLmFzc2VydC5gXG4gICk7XG5cbiAgY29uc3Qgc3BlY2lmaWNhdGlvbiA9IGdldFNwZWMoc3BlYyk7XG5cbiAgLy8gSWYgdGhlIHZhbHVlIHdhcyBwcmV2aW91cyBhc3NlcnRlZCB3aXRoIHRoaXMgc3BlY2lmaWNhdGlvbiwgc2ltcGx5IHJldHVybiB0aGVcbiAgLy8gcHJldmlvdXMgcmVzdWx0LlxuICBpZiAodmFsdWUuc3BlY3MgJiYgdmFsdWUuc3BlY3Nbc3BlY2lmaWNhdGlvbi5uYW1lXSkgcmV0dXJuIHZhbHVlLnNwZWNzW3NwZWNpZmljYXRpb24ubmFtZV07XG5cbiAgcmV0dXJuIHNwZWNpZmljYXRpb24uYXNzZXJ0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSB2YWx1ZSBpcyB2YWxpZCBnaXZlbiBhIHNwZWNpZmljaWF0aW9uLlxuICpcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBjaGVja2VkLlxuICogQHBhcmFtIHtTcGVjIHwgc3RyaW5nfSBzcGVjIC0gVGhlIHNwZWZpY2lhdGlvbiB0byBiZSB1c2VkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyBib29sZWFuIHJlcHJlc2VudGluZyBpZiB0aGUgdmFsdWUgaWYgdmFsdWUgcGFzc2VzXG4gKiBzcGVjLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZCh2YWx1ZTogYW55LCBzcGVjOiBTcGVjIHwgc3RyaW5nKSB7XG4gIC8vIEVycm9yIGNoZWNraW5nL3Rocm93aW5nIGhlcmUgdG8gcHJvdmlkZSBtb3JlIGhlbHBmdWwgZXJyb3IgbWVzc2FnZXMuXG4gIGludmFyaWFudChcbiAgICB0eXBlb2Ygc3BlYyA9PT0gJ3N0cmluZycgfHwgc3BlYyBpbnN0YW5jZW9mIFNwZWMsXG4gICAgYEludmFsaWQgc3BlY2lmaWNhdGlvbiAke3NwZWN9IHBhc3NlZCB0byBzcGVjanMuaXNWYWxpZC5gXG4gICk7XG5cbiAgcmV0dXJuIGFzc2VydCh2YWx1ZSwgc3BlYykgIT09IGludmFsaWQ7XG59XG5cbi8qKlxuICogRXhwbGFpbnMgd2h5IGEgdmFsdWUgcGFzc2VzL2ZhaWxzIGEgc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgY2hlY2tlZC5cbiAqIEBwYXJhbSB7U3BlYyB8IHN0cmluZ30gc3BlYyAtIFRoZSBzcGVmaWNpYXRpb24gdG8gYmUgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGxhaW4odmFsdWU6IGFueSwgc3BlYzogU3BlYyB8IHN0cmluZykge1xuICBpbnZhcmlhbnQoXG4gICAgdHlwZW9mIHNwZWMgPT09ICdzdHJpbmcnIHx8IHNwZWMgaW5zdGFuY2VvZiBTcGVjLFxuICAgIGBJbnZhbGlkIHNwZWNpZmljYXRpb24gJHtzcGVjfSBwYXNzZWQgdG8gc3BlY2pzLmV4cGxhaW4uYFxuICApO1xuXG4gIGNvbnN0IHNwZWNpZmljYXRpb24gPSBnZXRTcGVjKHNwZWMpO1xuXG4gIGlmIChzcGVjaWZpY2F0aW9uLmFzc2VydCh2YWx1ZSkgIT09IGludmFsaWQpIHtcbiAgICBjb25zb2xlLmxvZygnXFxuXFxuVmFsdWU6XFxuJyk7XG4gICAgY29uc29sZS5sb2coaXNJbW11dGFibGUodmFsdWUpID8gdmFsdWUudG9KUygpIDogdmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKGBcXG5cXG5QYXNzZXMgc3BlY2lmaWNhdGlvbiAke3NwZWNpZmljYXRpb24ubmFtZX0uYCk7XG4gICAgY29uc29sZS5sb2coYFxcbmApO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdcXG5cXG5WYWx1ZTpcXG4nKTtcbiAgICBjb25zb2xlLmxvZyhpc0ltbXV0YWJsZSh2YWx1ZSkgPyB2YWx1ZS50b0pTKCkgOiB2YWx1ZSk7XG4gICAgY29uc29sZS5sb2coYFxcblxcbkZhaWxzIHNwZWNpZmljYXRpb24ocyk6YCk7XG4gICAgc3BlY2lmaWNhdGlvbi5leHBsYWluKHZhbHVlLCBbXSk7XG4gICAgY29uc29sZS5sb2coYFxcbmApO1xuICB9XG59XG5cbi8qKlxuICogRXhwbGFpbnMgd2h5IGEgdmFsdWUgZmFpbHMgYSBzcGVjaWZpY2F0aW9uLiBMaWtlIHtAbGluayBleHBsYWlufSwgYnV0IG9ubHkgcHJvZHVjZXMgb3V0cHV0IGlmIGludmFsaWQuXG4gKlxuICogQHBhcmFtIHthbnl9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIGNoZWNrZWQuXG4gKiBAcGFyYW0ge1NwZWMgfCBzdHJpbmd9IHNwZWMgLSBUaGUgc3BlY2lmaWNpYXRpb24gdG8gYmUgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGxhaW5JZkludmFsaWQodmFsdWU6IGFueSwgc3BlYzogU3BlYyB8IHN0cmluZykge1xuICBpbnZhcmlhbnQoXG4gICAgdHlwZW9mIHNwZWMgPT09ICdzdHJpbmcnIHx8IHNwZWMgaW5zdGFuY2VvZiBTcGVjLFxuICAgIGBJbnZhbGlkIHNwZWNpZmljYXRpb24gJHtzcGVjfSBwYXNzZWQgdG8gc3BlY2pzLmV4cGxhaW5JZkludmFsaWQuYFxuICApO1xuXG4gIGNvbnN0IHNwZWNpZmljYXRpb24gPSBnZXRTcGVjKHNwZWMpO1xuXG4gIGlmIChzcGVjaWZpY2F0aW9uLmFzc2VydCh2YWx1ZSkgPT09IGludmFsaWQpIHtcbiAgICBjb25zb2xlLmxvZygnXFxuXFxuVmFsdWU6XFxuJyk7XG4gICAgY29uc29sZS5sb2coaXNJbW11dGFibGUodmFsdWUpID8gdmFsdWUudG9KUygpIDogdmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKGBcXG5cXG5GYWlscyBzcGVjaWZpY2F0aW9uKHMpOmApO1xuICAgIHNwZWNpZmljYXRpb24uZXhwbGFpbih2YWx1ZSwgW10pO1xuICAgIGNvbnNvbGUubG9nKGBcXG5gKTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmluZXMgYSBuZXcgc3BlYywgYWxsb3dpbmcgaXQgdG8gYmUgcmVmZXJlbmNlZCBhcyBzdWNoIGluIHRoZSBmdXR1cmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSB0aGF0IHdpbGwgYmUgdXNlZCB0byByZWZlciB0byB0aGUgc3BlYyBpbiB0aGUgZnV0dXJlLlxuICogQHBhcmFtIHtTcGVjfSBzcGVjIC0gVGhlIHNwZWMgdG8gYmUgZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZShuYW1lOiBzdHJpbmcsIHNwZWM6IFNwZWMpIHtcbiAgaW52YXJpYW50KCFkZWZzW25hbWVdLCBgU3BlY2ZpY2F0aW9uIGZvciAke25hbWV9IGFscmVhZHkgZXhpc3RzIWApO1xuICBpbnZhcmlhbnQoc3BlYyBpbnN0YW5jZW9mIFNwZWMsICdzcGVjanMuZGVmaW5lIGNhbGxlZCB3aXRoIGludmFsaWQgc3BlYy4nKTtcbiAgZGVmc1tuYW1lXSA9IHNwZWM7XG59XG5cbi8qKlxuICogRGVmaW5lcyBhIG5ldyBzcGVjLCBhbGxvd2luZyBpdCB0byBiZSByZWZlcmVuY2VkIGFzIHN1Y2ggaW4gdGhlIGZ1dHVyZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xTcGVjfSBtYXliZVNwZWMgLSBUaGUgbmFtZSBvZiB0aGUgc3BlYyBhcyBwcmV2aW91c2x5IGRlZmluZWQgaW5cbiAqIHtAbGluayBkZWZpbmV9IG9yIHRoZSBzcGVjIGl0c2VsZi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWMobWF5YmVTcGVjOiBzdHJpbmcgfCBTcGVjKSB7XG4gIGlmIChtYXliZVNwZWMgaW5zdGFuY2VvZiBTcGVjKSByZXR1cm4gbWF5YmVTcGVjO1xuXG4gIGludmFyaWFudChkZWZzW21heWJlU3BlY10sIGBTcGVjaWZpY2F0aW9uIGZvciAke21heWJlU3BlY30gZG9lcyBub3QgZXhpc3QhYCk7XG4gIHJldHVybiBkZWZzW21heWJlU3BlY107XG59XG4iXX0=
