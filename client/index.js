'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sink = exports.source = exports.utils = exports.operator = exports.core = exports.version = undefined;

var _namespace = require('../common/operator/_namespace');

Object.defineProperty(exports, 'operator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace).default;
  }
});

var _namespace2 = require('./utils/_namespace');

Object.defineProperty(exports, 'utils', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace2).default;
  }
});

var _namespace3 = require('./source/_namespace');

Object.defineProperty(exports, 'source', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace3).default;
  }
});

var _namespace4 = require('./sink/_namespace');

Object.defineProperty(exports, 'sink', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace4).default;
  }
});

var _core2 = require('../core');

var _core = _interopRequireWildcard(_core2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '1.0.0';

var core = exports.core = _core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiLCJfY29yZSIsInZlcnNpb24iLCJjb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OENBSVNBLE87Ozs7Ozs7OzsrQ0FFQUEsTzs7Ozs7Ozs7OytDQUNBQSxPOzs7Ozs7Ozs7K0NBQ0FBLE87Ozs7QUFOVDs7SUFBWUMsSzs7Ozs7O0FBRkwsSUFBTUMsNEJBQVUsV0FBaEI7O0FBR0EsSUFBTUMsc0JBQU9GLEtBQWIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcldmVyc2lvbiUnO1xuXG5pbXBvcnQgKiBhcyBfY29yZSBmcm9tICcuLi9jb3JlJztcbmV4cG9ydCBjb25zdCBjb3JlID0gX2NvcmU7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG9wZXJhdG9yIH0gZnJvbSAnLi4vY29tbW9uL29wZXJhdG9yL19uYW1lc3BhY2UnO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHV0aWxzIH0gZnJvbSAnLi91dGlscy9fbmFtZXNwYWNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc291cmNlIH0gZnJvbSAnLi9zb3VyY2UvX25hbWVzcGFjZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNpbmsgfSBmcm9tICcuL3NpbmsvX25hbWVzcGFjZSc7XG4iXX0=