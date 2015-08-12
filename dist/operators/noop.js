'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _coreBaseLfo = require('../core/base-lfo');

/**
 * a NoOp Lfo
 */

var _coreBaseLfo2 = _interopRequireDefault(_coreBaseLfo);

var Noop = (function (_BaseLfo) {
  _inherits(Noop, _BaseLfo);

  function Noop(previous) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Noop);

    _get(Object.getPrototypeOf(Noop.prototype), 'constructor', this).call(this, previous, options);
  }

  _createClass(Noop, [{
    key: 'process',
    value: function process(time, frame, metaData) {
      this.outFrame.set(frame, 0);
      this.time = time;
      this.metaData = metaData;

      this.output();
    }
  }]);

  return Noop;
})(_coreBaseLfo2['default']);

exports['default'] = Noop;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9vcGVyYXRvcnMvbm9vcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzJCQUFvQixrQkFBa0I7Ozs7Ozs7O0lBS2pCLElBQUk7WUFBSixJQUFJOztBQUNaLFdBRFEsSUFBSSxDQUNYLFFBQVEsRUFBZ0I7UUFBZCxPQUFPLHlEQUFHLEVBQUU7OzBCQURmLElBQUk7O0FBRXJCLCtCQUZpQixJQUFJLDZDQUVmLFFBQVEsRUFBRSxPQUFPLEVBQUU7R0FDMUI7O2VBSGtCLElBQUk7O1dBS2hCLGlCQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzdCLFVBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1QixVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixVQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7QUFFekIsVUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7OztTQVhrQixJQUFJOzs7cUJBQUosSUFBSSIsImZpbGUiOiJlczYvb3BlcmF0b3JzL25vb3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL2Jhc2UtbGZvJztcblxuLyoqXG4gKiBhIE5vT3AgTGZvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vb3AgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3IocHJldmlvdXMsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHByZXZpb3VzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByb2Nlc3ModGltZSwgZnJhbWUsIG1ldGFEYXRhKSB7XG4gICAgdGhpcy5vdXRGcmFtZS5zZXQoZnJhbWUsIDApO1xuICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgdGhpcy5tZXRhRGF0YSA9IG1ldGFEYXRhO1xuXG4gICAgdGhpcy5vdXRwdXQoKTtcbiAgfVxufVxuIl19