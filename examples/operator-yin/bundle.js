(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var min = Math.min;
var max = Math.max;

function clip(value) {
  var lower = arguments.length <= 1 || arguments[1] === undefined ? -Infinity : arguments[1];
  var upper = arguments.length <= 2 || arguments[2] === undefined ? +Infinity : arguments[2];

  return max(lower, min(upper, value));
}

/**
 * Dictionnary of the available types. Each key correspond to the type of the
 * implemented param while the corresponding object value should the
 * {@link `paramDefinition`} of the defined type.
 *
 * typedef {Object} paramTemplates
 * @type {Object<String, paramTemplate>}
 */

/**
 * Definition of a parameter. The definition should at least contain the entries
 * `type` and `default`. Every parameter can also accept optionnal configuration
 * entries `constant` and `metas`.
 * Available definitions are:
 * - {@link booleanDefinition}
 * - {@link integerDefinition}
 * - {@link floatDefinition}
 * - {@link stringDefinition}
 * - {@link enumDefinition}
 *
 * typedef {Object} paramDefinition
 * @property {String} type - Type of the parameter.
 * @property {Mixed} default - Default value of the parameter if no
 *  initialization value is provided.
 * @property {Boolean} [constant=false] - Define if the parameter can be change
 *  after its initialization.
 * @property {Object} [metas=null] - Any user defined data associated to the
 *  parameter that couls be usefull in the application.
 */

exports.default = {
  /**
   * @typedef {Object} booleanDefinition
   * @property {String} [type='boolean'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  boolean: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'boolean') throw new Error('Invalid value for boolean param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} integerDefinition
   * @property {String} [type='integer'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [min=-Infinity] - Minimum value of the parameter.
   * @property {Boolean} [max=+Infinity] - Maximum value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  integer: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (!(typeof value === 'number' && Math.floor(value) === value)) throw new Error('Invalid value for integer param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },

  /**
   * @typedef {Object} floatDefinition
   * @property {String} [type='float'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [min=-Infinity] - Minimum value of the parameter.
   * @property {Boolean} [max=+Infinity] - Maximum value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  float: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'number' || value !== value) // reject NaN
        throw new Error('Invalid value for float param "' + name + '": ' + value);

      return clip(value, definition.min, definition.max);
    }
  },

  /**
   * @typedef {Object} stringDefinition
   * @property {String} [type='string'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  string: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (typeof value !== 'string') throw new Error('Invalid value for string param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} enumDefinition
   * @property {String} [type='enum'] - Define a boolean parameter.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Array} list - Possible values of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  enum: {
    definitionTemplate: ['default', 'list'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      if (definition.list.indexOf(value) === -1) throw new Error('Invalid value for enum param "' + name + '": ' + value);

      return value;
    }
  },

  /**
   * @typedef {Object} anyDefinition
   * @property {String} [type='enum'] - Define a parameter of any type.
   * @property {Boolean} default - Default value of the parameter.
   * @property {Boolean} [constant=false] - Define if the parameter is constant.
   * @property {Object} [metas={}] - Optionnal metadata of the parameter.
   */
  any: {
    definitionTemplate: ['default'],
    typeCheckFunction: function typeCheckFunction(value, definition, name) {
      // no check as it can have any type...
      return value;
    }
  }
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramTemplates = require('./paramTemplates');

var _paramTemplates2 = _interopRequireDefault(_paramTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generic class for typed parameters.
 *
 * @param {String} name - Name of the parameter.
 * @param {Array} definitionTemplate - List of mandatory keys in the param
 *  definition.
 * @param {Function} typeCheckFunction - Function to be used in order to check
 *  the value against the param definition.
 * @param {Object} definition - Definition of the parameter.
 * @param {Mixed} value - Value of the parameter.
 * @private
 */
var Param = function () {
  function Param(name, definitionTemplate, typeCheckFunction, definition, value) {
    _classCallCheck(this, Param);

    definitionTemplate.forEach(function (key) {
      if (definition.hasOwnProperty(key) === false) throw new Error('Invalid definition for param "' + name + '", ' + key + ' is not defined');
    });

    this.name = name;
    this.type = definition.type;
    this.definition = definition;

    if (this.definition.nullable === true && value === null) this.value = null;else this.value = typeCheckFunction(value, definition, name);
    this._typeCheckFunction = typeCheckFunction;
  }

  /**
   * Returns the current value.
   * @return {Mixed}
   */


  _createClass(Param, [{
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }

    /**
     * Update the current value.
     * @param {Mixed} value - New value of the parameter.
     * @return {Boolean} - `true` if the param has been updated, false otherwise
     *  (e.g. if the parameter already had this value).
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this.definition.constant === true) throw new Error('Invalid assignement to constant param "' + this.name + '"');

      if (!(this.definition.nullable === true && value === null)) value = this._typeCheckFunction(value, this.definition, this.name);

      if (this.value !== value) {
        this.value = value;
        return true;
      }

      return false;
    }
  }]);

  return Param;
}();

/**
 * Bag of parameters. Main interface of the library
 */


var ParameterBag = function () {
  function ParameterBag(params, definitions) {
    _classCallCheck(this, ParameterBag);

    /**
     * List of parameters.
     *
     * @type {Object<String, Param>}
     * @name _params
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._params = params;

    /**
     * List of definitions with init values.
     *
     * @type {Object<String, paramDefinition>}
     * @name _definitions
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._definitions = definitions;

    /**
     * List of global listeners.
     *
     * @type {Set}
     * @name _globalListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._globalListeners = new Set();

    /**
     * List of params listeners.
     *
     * @type {Object<String, Set>}
     * @name _paramsListeners
     * @memberof ParameterBag
     * @instance
     * @private
     */
    this._paramsListeners = {};

    // initialize empty Set for each param
    for (var name in params) {
      this._paramsListeners[name] = new Set();
    }
  }

  /**
   * Return the given definitions along with the initialization values.
   *
   * @return {Object}
   */


  _createClass(ParameterBag, [{
    key: 'getDefinitions',
    value: function getDefinitions() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (name !== null) return this._definitions[name];else return this._definitions;
    }

    /**
     * Return the value of the given parameter.
     *
     * @param {String} name - Name of the parameter.
     * @return {Mixed} - Value of the parameter.
     */

  }, {
    key: 'get',
    value: function get(name) {
      if (!this._params[name]) throw new Error('Cannot read property value of undefined parameter "' + name + '"');

      return this._params[name].value;
    }

    /**
     * Set the value of a parameter. If the value of the parameter is updated
     * (aka if previous value is different from new value) all registered
     * callbacks are registered.
     *
     * @param {String} name - Name of the parameter.
     * @param {Mixed} value - Value of the parameter.
     * @return {Mixed} - New value of the parameter.
     */

  }, {
    key: 'set',
    value: function set(name, value) {
      var param = this._params[name];
      var updated = param.setValue(value);
      value = param.getValue();

      if (updated) {
        var metas = param.definition.metas;
        // trigger global listeners
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._globalListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;

            listener(name, value, metas);
          } // trigger param listeners
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._paramsListeners[name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _listener = _step2.value;

            _listener(value, metas);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return value;
    }

    /**
     * Define if the `name` parameter exists or not.
     *
     * @param {String} name - Name of the parameter.
     * @return {Boolean}
     */

  }, {
    key: 'has',
    value: function has(name) {
      return this._params[name] ? true : false;
    }

    /**
     * Reset a parameter to its init value. Reset all parameters if no argument.
     *
     * @param {String} [name=null] - Name of the parameter to reset.
     */

  }, {
    key: 'reset',
    value: function reset() {
      var _this = this;

      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (name !== null) this.set(name, param.definition.initValue);else Object.keys(this._params).forEach(function (name) {
        return _this.reset(name);
      });
    }

    /**
     * @callback ParameterBag~listenerCallback
     * @param {String} name - Parameter name.
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to all param updates.
     *
     * @param {ParameterBag~listenerCallack} callback - Listener to register.
     */

  }, {
    key: 'addListener',
    value: function addListener(callback) {
      this._globalListeners.add(callback);
    }

    /**
     * Remove listener from all param changes.
     *
     * @param {ParameterBag~listenerCallack} callback - Listener to remove. If
     *  `null` remove all listeners.
     */

  }, {
    key: 'removeListener',
    value: function removeListener() {
      var callback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (callback === null) this._globalListeners.clear();else this._globalListeners.delete(callback);
    }

    /**
     * @callback ParameterBag~paramListenerCallack
     * @param {Mixed} value - Updated value of the parameter.
     * @param {Object} [meta=] - Given meta data of the parameter.
     */

    /**
     * Add listener to a given param updates.
     *
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Function to apply
     *  when the value of the parameter changes.
     */

  }, {
    key: 'addParamListener',
    value: function addParamListener(name, callback) {
      this._paramsListeners[name].add(callback);
    }

    /**
     * Remove listener from a given param updates.
     *
     * @param {String} name - Parameter name.
     * @param {ParameterBag~paramListenerCallack} callback - Listener to remove.
     *  If `null` remove all listeners.
     */

  }, {
    key: 'removeParamListener',
    value: function removeParamListener(name) {
      var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (callback === null) this._paramsListeners[name].clear();else this._paramsListeners[name].delete(callback);
    }
  }]);

  return ParameterBag;
}();

/**
 * Factory for the `ParameterBag` class.
 *
 * @param {Object<String, paramDefinition>} definitions - Object describing the
 *  parameters.
 * @param {Object<String, Mixed>} values - Initialization values for the
 *  parameters.
 * @return {ParameterBag}
 */


function parameters(definitions) {
  var values = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var params = {};

  for (var name in values) {
    if (definitions.hasOwnProperty(name) === false) throw new Error('Unknown param "' + name + '"');
  }

  for (var _name in definitions) {
    if (params.hasOwnProperty(_name) === true) throw new Error('Parameter "' + _name + '" already defined');

    var definition = definitions[_name];

    if (!_paramTemplates2.default[definition.type]) throw new Error('Unknown param type "' + definition.type + '"');

    var _paramTemplates$defin = _paramTemplates2.default[definition.type];
    var definitionTemplate = _paramTemplates$defin.definitionTemplate;
    var typeCheckFunction = _paramTemplates$defin.typeCheckFunction;


    var value = void 0;

    if (values.hasOwnProperty(_name) === true) value = values[_name];else value = definition.default;

    // store init value in definition
    definition.initValue = value;

    if (!typeCheckFunction || !definitionTemplate) throw new Error('Invalid param type definition "' + definition.type + '"');

    params[_name] = new Param(_name, definitionTemplate, typeCheckFunction, definition, value);
  }

  return new ParameterBag(params, definitions);
}

/**
 * Register a new type for the `parameters` factory.
 * @param {String} typeName - Value that will be available as the `type` of a
 *  param definition.
 * @param {parameterDefinition} parameterDefinition - Object describing the
 *  parameter.
 */
parameters.defineType = function (typeName, parameterDefinition) {
  _paramTemplates2.default[typeName] = parameterDefinition;
};

exports.default = parameters;

},{"./paramTemplates":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = require('../common/core/_namespace');

Object.defineProperty(exports, 'core', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace).default;
  }
});

var _namespace2 = require('../common/operator/_namespace');

Object.defineProperty(exports, 'operator', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace2).default;
  }
});

var _namespace3 = require('../common/utils/_namespace');

Object.defineProperty(exports, 'utils', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace3).default;
  }
});

var _namespace4 = require('./source/_namespace');

Object.defineProperty(exports, 'source', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace4).default;
  }
});

var _namespace5 = require('./sink/_namespace');

Object.defineProperty(exports, 'sink', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_namespace5).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = exports.version = '1.0.0';

},{"../common/core/_namespace":17,"../common/operator/_namespace":34,"../common/utils/_namespace":41,"./sink/_namespace":12,"./source/_namespace":15}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonDefinitions = {
  min: {
    type: 'float',
    default: -1,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 1,
    metas: { kind: 'dynamic' }
  },
  width: {
    type: 'integer',
    default: 300,
    metas: { kind: 'dynamic' }
  },
  height: {
    type: 'integer',
    default: 150,
    metas: { kind: 'dynamic' }
  },
  container: {
    type: 'any',
    default: null,
    constant: true
  },
  canvas: {
    type: 'any',
    default: null,
    constant: true
  }
};

var hasDurationDefinitions = {
  duration: {
    type: 'float',
    min: 0,
    max: +Infinity,
    default: 1,
    metas: { kind: 'dynamic' }
  },
  referenceTime: {
    type: 'float',
    default: 0,
    constant: true
  }
};

/**
 * Base class to extend in order to create graphic sinks.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used to be extended._</span>
 *
 * @todo - fix float rounding errors (produce decays in sync draws)
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 */

var BaseDisplay = function (_BaseLfo) {
  (0, _inherits3.default)(BaseDisplay, _BaseLfo);

  function BaseDisplay(defs) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hasDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    (0, _classCallCheck3.default)(this, BaseDisplay);

    var commonDefs = void 0;

    if (hasDuration) commonDefs = (0, _assign2.default)({}, commonDefinitions, hasDurationDefinitions);else commonDefs = commonDefinitions;

    var definitions = (0, _assign2.default)({}, commonDefs, defs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseDisplay.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay)).call(this, definitions, options));

    if (_this.params.get('canvas') === null && _this.params.get('container') === null) throw new Error('Invalid parameter: `canvas` or `container` not defined');

    var canvasParam = _this.params.get('canvas');
    var containerParam = _this.params.get('container');

    // prepare canvas
    if (canvasParam) {
      if (typeof canvasParam === 'string') _this.canvas = document.querySelector(canvasParam);else _this.canvas = canvasParam;
    } else if (containerParam) {
      var container = void 0;

      if (typeof containerParam === 'string') container = document.querySelector(containerParam);else container = containerParam;

      _this.canvas = document.createElement('canvas');
      container.appendChild(_this.canvas);
    }

    _this.ctx = _this.canvas.getContext('2d');
    _this.cachedCanvas = document.createElement('canvas');
    _this.cachedCtx = _this.cachedCanvas.getContext('2d');

    _this.previousFrame = null;
    _this.currentTime = hasDuration ? _this.params.get('referenceTime') : null;

    /**
     * Instance of the `DisplaySync` used to synchronize the different displays
     * @private
     */
    _this.displaySync = false;

    //
    _this._stack;
    _this._rafId;

    _this.renderStack = _this.renderStack.bind(_this);
    _this.shiftError = 0;

    // initialize canvas size and y scale transfert function
    _this._resize();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(BaseDisplay, [{
    key: '_resize',
    value: function _resize() {
      var width = this.params.get('width');
      var height = this.params.get('height');

      var ctx = this.ctx;
      var cachedCtx = this.cachedCtx;

      var dPR = window.devicePixelRatio || 1;
      var bPR = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

      this.pixelRatio = dPR / bPR;

      var lastWidth = this.canvasWidth;
      var lastHeight = this.canvasHeight;
      this.canvasWidth = width * this.pixelRatio;
      this.canvasHeight = height * this.pixelRatio;

      cachedCtx.canvas.width = this.canvasWidth;
      cachedCtx.canvas.height = this.canvasHeight;

      // copy current image from ctx (resize)
      if (lastWidth && lastHeight) {
        cachedCtx.drawImage(ctx.canvas, 0, 0, lastWidth, lastHeight, 0, 0, this.canvasWidth, this.canvasHeight);
      }

      ctx.canvas.width = this.canvasWidth;
      ctx.canvas.height = this.canvasHeight;
      ctx.canvas.style.width = width + 'px';
      ctx.canvas.style.height = height + 'px';

      // update scale
      this._setYScale();
    }

    /**
     * Create the transfert function used to map values to pixel in the y axis
     * @private
     */

  }, {
    key: '_setYScale',
    value: function _setYScale() {
      var min = this.params.get('min');
      var max = this.params.get('max');
      var height = this.canvasHeight;

      var a = (0 - height) / (max - min);
      var b = height - a * min;

      this.getYPosition = function (x) {
        return a * x + b;
      };
    }

    /**
     * Returns the width in pixel a `vector` frame needs to be drawn.
     * @private
     */

  }, {
    key: 'getMinimumFrameWidth',
    value: function getMinimumFrameWidth() {
      return 1; // need one pixel to draw the line
    }

    /**
     * Callback function executed when a parameter is updated.
     *
     * @param {String} name - Parameter name.
     * @param {Mixed} value - Parameter value.
     * @param {Object} metas - Metadatas of the parameter.
     * @private
     */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      switch (name) {
        case 'min':
        case 'max':
          // @todo - make sure that min and max are different
          this._setYScale();
          break;
        case 'width':
        case 'height':
          this._resize();
      }
    }

    /** @private */

  }, {
    key: 'propagateStreamParams',
    value: function propagateStreamParams() {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'propagateStreamParams', this).call(this);

      this._stack = [];
      this._rafId = requestAnimationFrame(this.renderStack);
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'resetStream', this).call(this);

      var width = this.canvasWidth;
      var height = this.canvasHeight;

      this.ctx.clearRect(0, 0, width, height);
      this.cachedCtx.clearRect(0, 0, width, height);
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      this.currentTime = null;
      (0, _get3.default)(BaseDisplay.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseDisplay.prototype), 'finalizeStream', this).call(this, endTime);
      cancelAnimationFrame(this._rafId);
    }

    /**
     * Add the current frame to the frames to draw. Should not be overriden.
     * @private
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      var frameSize = this.streamParams.frameSize;
      var copy = new Float32Array(frameSize);
      var data = frame.data;

      // copy values of the input frame as they might be updated
      // in reference before being consumed in the draw function
      for (var i = 0; i < frameSize; i++) {
        copy[i] = data[i];
      }this._stack.push({
        time: frame.time,
        data: copy,
        metadata: frame.metadata
      });
    }

    /**
     * Render the accumulated frames. Method called in `requestAnimationFrame`.
     * @private
     */

  }, {
    key: 'renderStack',
    value: function renderStack() {
      if (this.params.has('duration')) {
        // render all frame since last `renderStack` call
        for (var i = 0, l = this._stack.length; i < l; i++) {
          this.scrollModeDraw(this._stack[i]);
        }
      } else {
        // only render last received frame if any
        if (this._stack.length > 0) {
          var frame = this._stack[this._stack.length - 1];
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.processFunction(frame);
        }
      }

      // reinit stack for next call
      this._stack.length = 0;
      this._rafId = requestAnimationFrame(this.renderStack);
    }

    /**
     * Draw data from right to left with scrolling
     * @private
     * @todo - check possibility of maintaining all values from one place to
     *         minimize float error tracking.
     */

  }, {
    key: 'scrollModeDraw',
    value: function scrollModeDraw(frame) {
      var frameType = this.streamParams.frameType;
      var frameRate = this.streamParams.frameRate;
      var frameSize = this.streamParams.frameSize;
      var sourceSampleRate = this.streamParams.sourceSampleRate;

      var canvasDuration = this.params.get('duration');
      var ctx = this.ctx;
      var canvasWidth = this.canvasWidth;
      var canvasHeight = this.canvasHeight;

      var previousFrame = this.previousFrame;

      // current time at the left of the canvas
      var currentTime = this.currentTime !== null ? this.currentTime : frame.time;
      var frameStartTime = frame.time;
      var lastFrameTime = previousFrame ? previousFrame.time : 0;
      var lastFrameDuration = this.lastFrameDuration ? this.lastFrameDuration : 0;

      var frameDuration = void 0;

      if (frameType === 'scalar' || frameType === 'vector') {
        var pixelDuration = canvasDuration / canvasWidth;
        frameDuration = this.getMinimumFrameWidth() * pixelDuration;
      } else if (this.streamParams.frameType === 'signal') {
        frameDuration = frameSize / sourceSampleRate;
      }

      var frameEndTime = frameStartTime + frameDuration;
      // define if we need to shift the canvas
      var shiftTime = frameEndTime - currentTime;

      // if the canvas is not synced, should never go to `else`
      if (shiftTime > 0) {
        // shift the canvas of shiftTime in pixels
        var fShift = shiftTime / canvasDuration * canvasWidth - this.shiftError;
        var iShift = Math.floor(fShift + 0.5);
        this.shiftError = fShift - iShift;

        var _currentTime = frameStartTime + frameDuration;
        this.shiftCanvas(iShift, _currentTime);

        // if siblings, share the information
        if (this.displaySync) this.displaySync.shiftSiblings(iShift, _currentTime, this);
      }

      // width of the frame in pixels
      var fFrameWidth = frameDuration / canvasDuration * canvasWidth;
      var frameWidth = Math.floor(fFrameWidth + 0.5);

      // define position of the head in the canvas
      var canvasStartTime = this.currentTime - canvasDuration;
      var startTimeRatio = (frameStartTime - canvasStartTime) / canvasDuration;
      var startTimePosition = startTimeRatio * canvasWidth;

      // number of pixels since last frame
      var pixelsSinceLastFrame = this.lastFrameWidth;

      if ((frameType === 'scalar' || frameType === 'vector') && previousFrame) {
        var frameInterval = frame.time - previousFrame.time;
        pixelsSinceLastFrame = frameInterval / canvasDuration * canvasWidth;
      }

      // draw current frame
      ctx.save();
      ctx.translate(startTimePosition, 0);
      this.processFunction(frame, frameWidth, pixelsSinceLastFrame);
      ctx.restore();

      // save current canvas state into cached canvas
      this.cachedCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.cachedCtx.drawImage(this.canvas, 0, 0, canvasWidth, canvasHeight);

      // update lastFrameDuration, lastFrameWidth
      this.lastFrameDuration = frameDuration;
      this.lastFrameWidth = frameWidth;
      this.previousFrame = frame;
    }

    /**
     * Shift canvas, also called from `DisplaySync`
     * @private
     */

  }, {
    key: 'shiftCanvas',
    value: function shiftCanvas(iShift, time) {
      var ctx = this.ctx;
      var cache = this.cachedCanvas;
      var cachedCtx = this.cachedCtx;
      var width = this.canvasWidth;
      var height = this.canvasHeight;
      var croppedWidth = width - iShift;
      this.currentTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(cache, iShift, 0, croppedWidth, height, 0, 0, croppedWidth, height);
      // save current canvas state into cached canvas
      cachedCtx.clearRect(0, 0, width, height);
      cachedCtx.drawImage(this.canvas, 0, 0, width, height);
    }

    // @todo - Fix trigger mode
    // allow to witch easily between the 2 modes
    // setTrigger(bool) {
    //   this.params.trigger = bool;
    //   // clear canvas and cache
    //   this.ctx.clearRect(0, 0, this.params.width, this.params.height);
    //   this.cachedCtx.clearRect(0, 0, this.params.width, this.params.height);
    //   // reset _currentXPosition
    //   this._currentXPosition = 0;
    //   this.lastShiftError = 0;
    // }

    // /**
    //  * Alternative drawing mode.
    //  * Draw from left to right, go back to left when > width
    //  */
    // triggerModeDraw(time, frame) {
    //   const width  = this.params.width;
    //   const height = this.params.height;
    //   const duration = this.params.duration;
    //   const ctx = this.ctx;

    //   const dt = time - this.previousTime;
    //   const fShift = (dt / duration) * width - this.lastShiftError; // px
    //   const iShift = Math.round(fShift);
    //   this.lastShiftError = iShift - fShift;

    //   this.currentXPosition += iShift;

    //   // draw the right part
    //   ctx.save();
    //   ctx.translate(this.currentXPosition, 0);
    //   ctx.clearRect(-iShift, 0, iShift, height);
    //   this.drawCurve(frame, iShift);
    //   ctx.restore();

    //   // go back to the left of the canvas and redraw the same thing
    //   if (this.currentXPosition > width) {
    //     // go back to start
    //     this.currentXPosition -= width;

    //     ctx.save();
    //     ctx.translate(this.currentXPosition, 0);
    //     ctx.clearRect(-iShift, 0, iShift, height);
    //     this.drawCurve(frame, this.previousFrame, iShift);
    //     ctx.restore();
    //   }
    // }

  }]);
  return BaseDisplay;
}(_BaseLfo3.default);

exports.default = BaseDisplay;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/assign":48,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  radius: {
    type: 'float',
    min: 0,
    default: 0,
    metas: { kind: 'dynamic' }
  },
  line: {
    type: 'boolean',
    default: true,
    metas: { kind: 'dynamic' }
  },
  colors: {
    type: 'any',
    default: null
  }
};

/**
 * Breakpoint Function, display a stream of type `vector`.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.colors=null] - Array of colors for each index of the
 *  vector. _dynamic parameter_
 * @param {String} [options.radius=0] - Radius of the dot at each value.
 *  _dynamic parameter_
 * @param {String} [options.line=true] - Display a line between each consecutive
 *  values of the vector. _dynamic parameter_
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 2,
 *   frameRate: 0.1,
 *   frameType: 'vector'
 * });
 *
 * const bpf = new lfo.sink.BpfDisplay({
 *   canvas: '#bpf',
 *   duration: 10,
 * });
 *
 * eventIn.connect(bpf);
 * eventIn.start();
 *
 * let time = 0;
 * const dt = 0.1;
 *
 * (function generateData() {
 *   eventIn.process(time, [Math.random() * 2 - 1, Math.random() * 2 - 1]);
 *   time += dt;
 *
 *   setTimeout(generateData, dt * 1000);
 * }());
 */

var BpfDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(BpfDisplay, _BaseDisplay);

  function BpfDisplay(options) {
    (0, _classCallCheck3.default)(this, BpfDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BpfDisplay.__proto__ || (0, _getPrototypeOf2.default)(BpfDisplay)).call(this, definitions, options));

    _this.prevFrame = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(BpfDisplay, [{
    key: 'getMinimumFrameWidth',
    value: function getMinimumFrameWidth() {
      return this.params.get('radius');
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      if (this.params.get('colors') === null) this.params.set('colors', (0, _displayUtils.getColors)('bpf', this.streamParams.frameSize));

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var colors = this.params.get('colors');
      var radius = this.params.get('radius');
      var drawLine = this.params.get('line');
      var frameSize = this.streamParams.frameSize;
      var ctx = this.ctx;
      var data = frame.data;
      var prevData = this.prevFrame ? this.prevFrame.data : null;

      ctx.save();

      for (var i = 0, l = frameSize; i < l; i++) {
        var posY = this.getYPosition(data[i]);
        var color = colors[i];

        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (prevData && drawLine) {
          var lastPosY = this.getYPosition(prevData[i]);
          ctx.beginPath();
          ctx.moveTo(-pixelsSinceLastFrame, lastPosY);
          ctx.lineTo(0, posY);
          ctx.stroke();
          ctx.closePath();
        }

        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(0, posY, radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();
        }
      }

      ctx.restore();

      this.prevFrame = frame;
    }
  }]);
  return BpfDisplay;
}(_BaseDisplay3.default);

exports.default = BpfDisplay;

},{"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  threshold: {
    type: 'float',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  thresholdIndex: {
    type: 'integer',
    default: 0,
    metas: { kind: 'dynamic' }
  },
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('marker'),
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Display a marker according to a `vector` input frame.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {String} options.color - Color of the marker.
 * @param {Number} [options.thresholdIndex=0] - Index of the incomming frame
 *  data to compare against the threshold. _Should be used in conjonction with
 *  `threshold`_.
 * @param {Number} [options.threshold=null] - Minimum value the incomming value
 *  must have to trigger the display of a marker. If null each incomming event
 *  triggers a marker. _Should be used in conjonction with `thresholdIndex`_.
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'scalar',
 * });
 *
 * const marker = new lfo.sink.MarkerDisplay({
 *   canvas: '#marker',
 *   threshold: 0.5,
 * });
 *
 * eventIn.connect(marker);
 * eventIn.start();
 *
 * let time = 0;
 * const period = 1;
 *
 * (function generateData() {
 *   eventIn.process(time, Math.random());
 *
 *   time += period;
 *   setTimeout(generateData, period * 1000);
 * }());
 */

var MarkerDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(MarkerDisplay, _BaseDisplay);

  function MarkerDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MarkerDisplay);
    return (0, _possibleConstructorReturn3.default)(this, (MarkerDisplay.__proto__ || (0, _getPrototypeOf2.default)(MarkerDisplay)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(MarkerDisplay, [{
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var color = this.params.get('color');
      var threshold = this.params.get('threshold');
      var thresholdIndex = this.params.get('thresholdIndex');
      var ctx = this.ctx;
      var height = ctx.height;
      var value = frame.data[thresholdIndex];

      if (threshold === null || value >= threshold) {
        var yMin = this.getYPosition(this.params.get('min'));
        var yMax = this.getYPosition(this.params.get('max'));

        if (yMin > yMax) {
          var v = yMax;
          yMax = yMin;
          yMin = v;
        }

        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, yMin, 1, yMax);
        ctx.restore();
      }
    }
  }]);
  return MarkerDisplay;
}(_BaseDisplay3.default);

exports.default = MarkerDisplay;

},{"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floor = Math.floor;
var ceil = Math.ceil;

function downSample(data, targetLength) {
  var length = data.length;
  var hop = length / targetLength;
  var target = new Float32Array(targetLength);
  var counter = 0;

  for (var i = 0; i < targetLength; i++) {
    var index = floor(counter);
    var phase = counter - index;
    var prev = data[index];
    var next = data[index + 1];

    target[i] = (next - prev) * phase + prev;
    counter += hop;
  }

  return target;
}

var definitions = {
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('signal'),
    nullable: true
  }
};

/**
 * Display a stream of type `signal` on a canvas.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.color='#00e600'] - Color of the signal.
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. This parameter only exists for operators that display several
 *  consecutive frames on the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class. This parameter only exists
 *  for operators that display several consecutive frames on the canvas.
 *
 * @memberof module:client.sink
 *
 * @example
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'signal',
 *   sampleRate: 8,
 *   frameSize: 4,
 * });
 *
 * const signalDisplay = new lfo.sink.SignalDisplay({
 *   canvas: '#signal-canvas',
 * });
 *
 * eventIn.connect(signalDisplay);
 * eventIn.start();
 *
 * // push triangle signal in the graph
 * eventIn.process(0, [0, 0.5, 1, 0.5]);
 * eventIn.process(0.5, [0, -0.5, -1, -0.5]);
 * // ...
 */

var SignalDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(SignalDisplay, _BaseDisplay);

  function SignalDisplay(options) {
    (0, _classCallCheck3.default)(this, SignalDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SignalDisplay.__proto__ || (0, _getPrototypeOf2.default)(SignalDisplay)).call(this, definitions, options, true));

    _this.lastPosY = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(SignalDisplay, [{
    key: 'processSignal',
    value: function processSignal(frame, frameWidth, pixelsSinceLastFrame) {
      var color = this.params.get('color');
      var frameSize = this.streamParams.frameSize;
      var ctx = this.ctx;
      var data = frame.data;

      if (frameWidth < frameSize) data = downSample(data, frameWidth);

      var length = data.length;
      var hopX = frameWidth / length;
      var posX = 0;
      var lastY = this.lastPosY;

      ctx.strokeStyle = color;
      ctx.beginPath();

      for (var i = 0; i < data.length; i++) {
        var posY = this.getYPosition(data[i]);

        if (lastY === null) {
          ctx.moveTo(posX, posY);
        } else {
          if (i === 0) ctx.moveTo(-hopX, lastY);

          ctx.lineTo(posX, posY);
        }

        posX += hopX;
        lastY = posY;
      }

      ctx.stroke();
      ctx.closePath();

      this.lastPosY = lastY;
    }
  }]);
  return SignalDisplay;
}(_BaseDisplay3.default);

exports.default = SignalDisplay;

},{"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _Fft = require('../../common/operator/Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  scale: {
    type: 'float',
    default: 1,
    metas: { kind: 'dynamic' }
  },
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('spectrum'),
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  min: {
    type: 'float',
    default: -80,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 6,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Display the spectrum of the incomming `signal` input.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.scale=1] - Scale display of the spectrogram.
 * @param {String} [options.color=null] - Color of the spectrogram.
 * @param {Number} [options.min=-80] - Minimum displayed value (in dB).
 * @param {Number} [options.max=6] - Maximum displayed value (in dB).
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 *
 * @todo - expose more `fft` config options
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     audioContext: audioContext,
 *     sourceNode: source,
 *   });
 *
 *   const spectrum = new lfo.sink.SpectrumDisplay({
 *     canvas: '#spectrum',
 *   });
 *
 *   audioInNode.connect(spectrum);
 *   audioInNode.start();
 * }
 */

var SpectrumDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(SpectrumDisplay, _BaseDisplay);

  function SpectrumDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SpectrumDisplay);
    return (0, _possibleConstructorReturn3.default)(this, (SpectrumDisplay.__proto__ || (0, _getPrototypeOf2.default)(SpectrumDisplay)).call(this, definitions, options, false));
  }

  /** @private */


  (0, _createClass3.default)(SpectrumDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.fft = new _Fft2.default({
        size: this.streamParams.frameSize,
        window: 'hann',
        norm: 'linear'
      });

      this.fft.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var bins = this.fft.inputSignal(frame.data);
      var nbrBins = bins.length;

      var width = this.canvasWidth;
      var height = this.canvasHeight;
      var scale = this.params.get('scale');

      var binWidth = width / nbrBins;
      var ctx = this.ctx;

      ctx.fillStyle = this.params.get('color');

      // error handling needs review...
      var error = 0;

      for (var i = 0; i < nbrBins; i++) {
        var x1Float = i * binWidth + error;
        var x1Int = Math.round(x1Float);
        var x2Float = x1Float + (binWidth - error);
        var x2Int = Math.round(x2Float);

        error = x2Int - x2Float;

        if (x1Int !== x2Int) {
          var _width = x2Int - x1Int;
          var db = 20 * (0, _log2.default)(bins[i]);
          var y = this.getYPosition(db * scale);
          ctx.fillRect(x1Int, y, _width, height - y);
        } else {
          error -= binWidth;
        }
      }
    }
  }]);
  return SpectrumDisplay;
}(_BaseDisplay3.default);

exports.default = SpectrumDisplay;

},{"../../common/operator/Fft":20,"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  color: {
    type: 'string',
    default: (0, _displayUtils.getColors)('trace'),
    metas: { kind: 'dynamic' }
  },
  colorScheme: {
    type: 'enum',
    default: 'none',
    list: ['none', 'hue', 'opacity']
  }
};

/**
 * Display a range value around a mean value (for example mean
 * and standart deviation).
 *
 * This sink can handle input of type `vector` of frameSize >= 2.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.color='orange'] - Color.
 * @param {String} [options.colorScheme='none'] - If a third value is available
 *  in the input, can be used to control the opacity or the hue. If input frame
 *  size is 2, this param is automatically set to `none`
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. _dynamic parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class.
 *
 * @memberof module:client.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const AudioContext = (window.AudioContext || window.webkitAudioContext);
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   // not sure it make sens but...
 *   const meanStddev = new lfo.operator.MeanStddev();
 *
 *   const traceDisplay = new lfo.sink.TraceDisplay({
 *     canvas: '#trace',
 *   });
 *
 *   const logger = new lfo.sink.Logger({ data: true });
 *
 *   audioInNode.connect(meanStddev);
 *   meanStddev.connect(traceDisplay);
 *
 *   audioInNode.start();
 * }
 */

var TraceDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(TraceDisplay, _BaseDisplay);

  function TraceDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TraceDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TraceDisplay.__proto__ || (0, _getPrototypeOf2.default)(TraceDisplay)).call(this, definitions, options));

    _this.prevFrame = null;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(TraceDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      if (this.streamParams.frameSize === 2) this.params.set('colorScheme', 'none');

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame, frameWidth, pixelsSinceLastFrame) {
      var colorScheme = this.params.get('colorScheme');
      var ctx = this.ctx;
      var prevData = this.prevFrame ? this.prevFrame.data : null;
      var data = frame.data;

      var halfRange = data[1] / 2;
      var mean = this.getYPosition(data[0]);
      var min = this.getYPosition(data[0] - halfRange);
      var max = this.getYPosition(data[0] + halfRange);

      var prevHalfRange = void 0;
      var prevMean = void 0;
      var prevMin = void 0;
      var prevMax = void 0;

      if (prevData !== null) {
        prevHalfRange = prevData[1] / 2;
        prevMean = this.getYPosition(prevData[0]);
        prevMin = this.getYPosition(prevData[0] - prevHalfRange);
        prevMax = this.getYPosition(prevData[0] + prevHalfRange);
      }

      var color = this.params.get('color');
      var gradient = void 0;
      var rgb = void 0;

      switch (colorScheme) {
        case 'none':
          rgb = (0, _displayUtils.hexToRGB)(color);
          ctx.fillStyle = 'rgba(' + rgb.join(',') + ', 0.7)';
          ctx.strokeStyle = color;
          break;
        case 'hue':
          gradient = ctx.createLinearGradient(-pixelsSinceLastFrame, 0, 0, 0);

          if (prevData) gradient.addColorStop(0, 'hsl(' + (0, _displayUtils.getHue)(prevData[2]) + ', 100%, 50%)');else gradient.addColorStop(0, 'hsl(' + (0, _displayUtils.getHue)(data[2]) + ', 100%, 50%)');

          gradient.addColorStop(1, 'hsl(' + (0, _displayUtils.getHue)(data[2]) + ', 100%, 50%)');
          ctx.fillStyle = gradient;
          break;
        case 'opacity':
          rgb = (0, _displayUtils.hexToRGB)(this.params.get('color'));
          gradient = ctx.createLinearGradient(-pixelsSinceLastFrame, 0, 0, 0);

          if (prevData) gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ', ' + prevData[2] + ')');else gradient.addColorStop(0, 'rgba(' + rgb.join(',') + ', ' + data[2] + ')');

          gradient.addColorStop(1, 'rgba(' + rgb.join(',') + ', ' + data[2] + ')');
          ctx.fillStyle = gradient;
          break;
      }

      ctx.save();
      // draw range
      ctx.beginPath();
      ctx.moveTo(0, mean);
      ctx.lineTo(0, max);

      if (prevData !== null) {
        ctx.lineTo(-pixelsSinceLastFrame, prevMax);
        ctx.lineTo(-pixelsSinceLastFrame, prevMin);
      }

      ctx.lineTo(0, min);
      ctx.closePath();

      ctx.fill();

      // draw mean
      if (colorScheme === 'none' && prevMean) {
        ctx.beginPath();
        ctx.moveTo(-pixelsSinceLastFrame, prevMean);
        ctx.lineTo(0, mean);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();

      this.prevFrame = frame;
    }
  }]);
  return TraceDisplay;
}(_BaseDisplay3.default);

;

exports.default = TraceDisplay;

},{"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _Rms = require('../../common/operator/Rms');

var _Rms2 = _interopRequireDefault(_Rms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log10 = _log2.default;

var definitions = {
  offset: {
    type: 'float',
    default: -14,
    metas: { kind: 'dyanmic' }
  },
  min: {
    type: 'float',
    default: -80,
    metas: { kind: 'dynamic' }
  },
  max: {
    type: 'float',
    default: 6,
    metas: { kind: 'dynamic' }
  },
  width: {
    type: 'integer',
    default: 6,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Simple VU-Meter to used on a `signal` stream.
 *
 * @memberof module:client.sink
 *
 * @param {Object} options - Override defaults parameters.
 * @param {Number} [options.offset=-14] - dB offset applied to the signal.
 * @param {Number} [options.min=-80] - Minimum displayed value (in dB).
 * @param {Number} [options.max=6] - Maximum displayed value (in dB).
 * @param {Number} [options.width=6] - Width of the display (in pixels).
 * @param {Number} [options.height=150] - Height of the canvas.
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas.
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new window.AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     audioContext: audioContext,
 *     sourceNode: source,
 *   });
 *
 *   const vuMeter = new lfo.sink.VuMeterDisplay({
 *     canvas: '#vu-meter',
 *   });
 *
 *   audioInNode.connect(vuMeter);
 *   audioInNode.start();
 * }
 */

var VuMeterDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(VuMeterDisplay, _BaseDisplay);

  function VuMeterDisplay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, VuMeterDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (VuMeterDisplay.__proto__ || (0, _getPrototypeOf2.default)(VuMeterDisplay)).call(this, definitions, options, false));

    _this.rmsOperator = new _Rms2.default();

    _this.lastDB = 0;
    _this.peak = {
      value: 0,
      time: 0
    };

    _this.peakLifetime = 1; // sec
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(VuMeterDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.rmsOperator.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var now = new Date().getTime() / 1000; // sec
      var offset = this.params.get('offset'); // offset zero of the vu meter
      var height = this.canvasHeight;
      var width = this.canvasWidth;
      var ctx = this.ctx;

      var lastDB = this.lastDB;
      var peak = this.peak;

      var red = '#ff2121';
      var yellow = '#ffff1f';
      var green = '#00ff00';

      // handle current db value
      var rms = this.rmsOperator.inputSignal(frame.data);
      var dB = 20 * log10(rms) - offset;

      // slow release (could probably be improved)
      if (lastDB > dB) dB = lastDB - 6;

      // handle peak
      if (dB > peak.value || now - peak.time > this.peakLifetime) {
        peak.value = dB;
        peak.time = now;
      }

      var y0 = this.getYPosition(0);
      var y = this.getYPosition(dB);
      var yPeak = this.getYPosition(peak.value);

      ctx.save();

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      var gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, green);
      gradient.addColorStop((height - y0) / height, yellow);
      gradient.addColorStop(1, red);

      // dB
      ctx.fillStyle = gradient;
      ctx.fillRect(0, y, width, height - y);

      // 0 dB marker
      ctx.fillStyle = '#dcdcdc';
      ctx.fillRect(0, y0, width, 2);

      // peak
      ctx.fillStyle = gradient;
      ctx.fillRect(0, yPeak, width, 2);

      ctx.restore();

      this.lastDB = dB;
    }
  }]);
  return VuMeterDisplay;
}(_BaseDisplay3.default);

exports.default = VuMeterDisplay;

},{"../../common/operator/Rms":29,"./BaseDisplay":4,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseDisplay2 = require('./BaseDisplay');

var _BaseDisplay3 = _interopRequireDefault(_BaseDisplay2);

var _MinMax = require('../../common/operator/MinMax');

var _MinMax2 = _interopRequireDefault(_MinMax);

var _Rms = require('../../common/operator/Rms');

var _Rms2 = _interopRequireDefault(_Rms);

var _displayUtils = require('../../common/utils/display-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  colors: {
    type: 'any',
    default: (0, _displayUtils.getColors)('waveform'),
    metas: { kind: 'dyanmic' }
  },
  rms: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dyanmic' }
  }
};

/**
 * Display a waveform (along with optionnal Rms) of a given `signal` input in
 * a canvas.
 *
 * @param {Object} options - Override default parameters.
 * @param {Array<String>} [options.colors=['waveform', 'rms']] - Array
 *  containing the color codes for the waveform (index 0) and rms (index 1).
 *  _dynamic parameter_
 * @param {Boolean} [options.rms=false] - Set to `true` to display the rms.
 *  _dynamic parameter_
 * @param {Number} [options.duration=1] - Duration (in seconds) represented in
 *  the canvas. _dynamic parameter_
 * @param {Number} [options.min=-1] - Minimum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.max=1] - Maximum value represented in the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.width=300] - Width of the canvas.
 *  _dynamic parameter_
 * @param {Number} [options.height=150] - Height of the canvas.
 *  _dynamic parameter_
 * @param {Element|CSSSelector} [options.container=null] - Container element
 *  in which to insert the canvas. _constant parameter_
 * @param {Element|CSSSelector} [options.canvas=null] - Canvas element
 *  in which to draw. _constant parameter_
 * @param {Number} [options.referenceTime=null] - Optionnal reference time the
 *  display should considerer as the origin. Is only usefull when synchronizing
 *  several display using the `DisplaySync` class.
 *
 * @memberof module:client.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new window.AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const audioIn = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     audioContext: audioContext,
 *     sourceNode: audioIn,
 *     frameSize: 512,
 *   });
 *
 *   const waveformDisplay = new lfo.sink.WaveformDisplay({
 *     canvas: '#waveform',
 *     duration: 3.5,
 *     rms: true,
 *   });
 *
 *   audioInNode.connect(waveformDisplay);
 *   audioInNode.start();
 * });
 */

var WaveformDisplay = function (_BaseDisplay) {
  (0, _inherits3.default)(WaveformDisplay, _BaseDisplay);

  function WaveformDisplay(options) {
    (0, _classCallCheck3.default)(this, WaveformDisplay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WaveformDisplay.__proto__ || (0, _getPrototypeOf2.default)(WaveformDisplay)).call(this, definitions, options, true));

    _this.minMaxOperator = new _MinMax2.default();
    _this.rmsOperator = new _Rms2.default();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(WaveformDisplay, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.minMaxOperator.initStream(this.streamParams);
      this.rmsOperator.initStream(this.streamParams);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame, frameWidth, pixelsSinceLastFrame) {
      // drop frames that cannot be displayed
      if (frameWidth < 1) return;

      var colors = this.params.get('colors');
      var showRms = this.params.get('rms');
      var ctx = this.ctx;
      var data = frame.data;
      var iSamplesPerPixels = Math.floor(data.length / frameWidth);

      for (var index = 0; index < frameWidth; index++) {
        var start = index * iSamplesPerPixels;
        var end = index === frameWidth - 1 ? undefined : start + iSamplesPerPixels;
        var slice = data.subarray(start, end);

        var minMax = this.minMaxOperator.inputSignal(slice);
        var minY = this.getYPosition(minMax[0]);
        var maxY = this.getYPosition(minMax[1]);

        ctx.strokeStyle = colors[0];
        ctx.beginPath();
        ctx.moveTo(index, minY);
        ctx.lineTo(index, maxY);
        ctx.closePath();
        ctx.stroke();

        if (showRms) {
          var rms = this.rmsOperator.inputSignal(slice);
          var rmsMaxY = this.getYPosition(rms);
          var rmsMinY = this.getYPosition(-rms);

          ctx.strokeStyle = colors[1];
          ctx.beginPath();
          ctx.moveTo(index, rmsMinY);
          ctx.lineTo(index, rmsMaxY);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }]);
  return WaveformDisplay;
}(_BaseDisplay3.default);

exports.default = WaveformDisplay;

},{"../../common/operator/MinMax":25,"../../common/operator/Rms":29,"../../common/utils/display-utils":42,"./BaseDisplay":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bridge = require('../../common/sink/Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _Logger = require('../../common/sink/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _DataRecorder = require('../../common/sink/DataRecorder');

var _DataRecorder2 = _interopRequireDefault(_DataRecorder);

var _SignalRecorder = require('../../common/sink/SignalRecorder');

var _SignalRecorder2 = _interopRequireDefault(_SignalRecorder);

var _BaseDisplay = require('./BaseDisplay');

var _BaseDisplay2 = _interopRequireDefault(_BaseDisplay);

var _BpfDisplay = require('./BpfDisplay');

var _BpfDisplay2 = _interopRequireDefault(_BpfDisplay);

var _MarkerDisplay = require('./MarkerDisplay');

var _MarkerDisplay2 = _interopRequireDefault(_MarkerDisplay);

var _SignalDisplay = require('./SignalDisplay');

var _SignalDisplay2 = _interopRequireDefault(_SignalDisplay);

var _SpectrumDisplay = require('./SpectrumDisplay');

var _SpectrumDisplay2 = _interopRequireDefault(_SpectrumDisplay);

var _TraceDisplay = require('./TraceDisplay');

var _TraceDisplay2 = _interopRequireDefault(_TraceDisplay);

var _VuMeterDisplay = require('./VuMeterDisplay');

var _VuMeterDisplay2 = _interopRequireDefault(_VuMeterDisplay);

var _WaveformDisplay = require('./WaveformDisplay');

var _WaveformDisplay2 = _interopRequireDefault(_WaveformDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Bridge: _Bridge2.default,
  Logger: _Logger2.default,
  DataRecorder: _DataRecorder2.default,
  SignalRecorder: _SignalRecorder2.default,

  BaseDisplay: _BaseDisplay2.default,
  BpfDisplay: _BpfDisplay2.default,
  MarkerDisplay: _MarkerDisplay2.default,
  SignalDisplay: _SignalDisplay2.default,
  SpectrumDisplay: _SpectrumDisplay2.default,
  TraceDisplay: _TraceDisplay2.default,
  VuMeterDisplay: _VuMeterDisplay2.default,
  WaveformDisplay: _WaveformDisplay2.default
};

},{"../../common/sink/Bridge":35,"../../common/sink/DataRecorder":36,"../../common/sink/Logger":37,"../../common/sink/SignalRecorder":38,"./BaseDisplay":4,"./BpfDisplay":5,"./MarkerDisplay":6,"./SignalDisplay":7,"./SpectrumDisplay":8,"./TraceDisplay":9,"./VuMeterDisplay":10,"./WaveformDisplay":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = (0, _defineProperty3.default)({
  audioBuffer: {
    type: 'any',
    default: null,
    constant: true
  },
  frameSize: {
    type: 'integer',
    default: 512,
    constant: true
  },
  channel: {
    type: 'integer',
    default: 0,
    constant: true
  },
  progressCallback: {
    type: 'any',
    default: null,
    nullable: true,
    constant: true
  }
}, 'progressCallback', {
  type: 'any',
  default: null,
  nullable: true,
  constant: true
});

var noop = function noop() {};

/**
 * Slice an `AudioBuffer` into signal blocks and propagate the resulting frames
 * through the graph.
 *
 * @param {Object} options - Override parameter' default values.
 * @param {AudioBuffer} [options.audioBuffer] - Audio buffer to process.
 * @param {Number} [options.frameSize=512] - Size of the output blocks.
 * @param {Number} [options.channel=0] - Number of the channel to process.
 * @param {Number} [options.progressCallback=null] - Callback to be excuted on each
 *  frame output, receive as argument the current progress ratio.
 *
 * @memberof module:client.source
 *
 * @todo - Allow to pass raw buffer and sampleRate (simplified use server-side)
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   frameSize: 512,
 * });
 *
 * const waveform = new lfo.sink.Waveform({
 *   canvas: '#waveform',
 *   duration: 1,
 *   color: 'steelblue',
 *   rms: true,
 * });
 *
 * audioInBuffer.connect(waveform);
 * audioInBuffer.start();
 */

var AudioInBuffer = function (_BaseLfo) {
  (0, _inherits3.default)(AudioInBuffer, _BaseLfo);

  function AudioInBuffer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AudioInBuffer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioInBuffer.__proto__ || (0, _getPrototypeOf2.default)(AudioInBuffer)).call(this, definitions, options));

    var audioBuffer = _this.params.get('audioBuffer');

    if (!audioBuffer) throw new Error('Invalid "audioBuffer" parameter');

    _this.endTime = 0;
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and start propagating frames.
   * When called, the slicing of the given `audioBuffer` starts immediately and
   * each resulting frame is propagated in graph.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:client.source.AudioInBuffer#stop}
   */


  (0, _createClass3.default)(AudioInBuffer, [{
    key: 'start',
    value: function start() {
      this.initStream();

      var channel = this.params.get('channel');
      var audioBuffer = this.params.get('audioBuffer');
      var buffer = audioBuffer.getChannelData(channel);
      this.endTime = 0;

      this.processFrame(buffer);
    }

    /**
     * Finalize the stream and stop the whole graph. When called, the slicing of
     * the `audioBuffer` stops immediately.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:client.source.AudioInBuffer#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.finalizeStream(this.endTime);
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var audioBuffer = this.params.get('audioBuffer');
      var frameSize = this.params.get('frameSize');
      var sourceSampleRate = audioBuffer.sampleRate;
      var frameRate = sourceSampleRate / frameSize;

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = frameRate;
      this.streamParams.frameType = 'signal';
      this.streamParams.sourceSampleRate = sourceSampleRate;
      this.streamParams.sourceSampleCount = frameSize;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(buffer) {
      var sampleRate = this.streamParams.sourceSampleRate;
      var frameSize = this.streamParams.frameSize;
      var progressCallback = this.params.get('progressCallback') || noop;
      var length = buffer.length;
      var nbrFrames = Math.ceil(buffer.length / frameSize);
      var data = this.frame.data;
      var that = this;
      var i = 0;

      (function slice() {
        var offset = i * frameSize;
        var nbrCopy = Math.min(length - offset, frameSize);

        for (var j = 0; j < frameSize; j++) {
          data[j] = j < nbrCopy ? buffer[offset + j] : 0;
        }that.frame.time = offset / sampleRate;
        that.endTime = that.frame.time + nbrCopy / sampleRate;
        that.propagateFrame();

        i += 1;
        progressCallback(i / nbrFrames);

        if (i < nbrFrames) setTimeout(slice, 0);else that.finalizeStream(that.endTime);
      })();
    }
  }]);
  return AudioInBuffer;
}(_BaseLfo3.default);

exports.default = AudioInBuffer;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/defineProperty":58,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioContext = window.AudioContext || window.webkitAudioContext;

var definitions = {
  frameSize: {
    type: 'integer',
    default: 512,
    constant: true
  },
  channel: {
    type: 'integer',
    default: 0,
    constant: true
  },
  sourceNode: {
    type: 'any',
    default: null,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    constant: true
  }
};

/**
 * Use a `WebAudio` node as a source for the graph.
 *
 * @param {Object} options - Override parameter' default values.
 * @param {AudioNode} [options.sourceNode=null] - Audio node to process
 *  (mandatory).
 * @param {AudioContext} [options.audioContext=null] - Audio context used to
 *  create the audio node (mandatory).
 * @param {Number} [options.frameSize=512] - Size of the output blocks, define
 *  the `frameSize` in the `streamParams`.
 * @param {Number} [options.channel=0] - Number of the channel to process.
 *
 * @memberof module:client.source
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 * const sine = audioContext.createOscillator();
 * sine.frequency.value = 2;
 *
 * const audioInNode = new lfo.source.AudioInNode({
 *   audioContext: audioContext,
 *   sourceNode: sine,
 * });
 *
 * const signalDisplay = new lfo.sink.SignalDisplay({
 *   canvas: '#signal',
 *   duration: 1,
 * });
 *
 * audioInNode.connect(signalDisplay);
 *
 * // start the sine oscillator node and the lfo graph
 * sine.start();
 * audioInNode.start();
 */

var AudioInNode = function (_BaseLfo) {
  (0, _inherits3.default)(AudioInNode, _BaseLfo);

  function AudioInNode() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AudioInNode);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioInNode.__proto__ || (0, _getPrototypeOf2.default)(AudioInNode)).call(this, definitions, options));

    var audioContext = _this.params.get('audioContext');
    var sourceNode = _this.params.get('sourceNode');

    if (!audioContext || !(audioContext instanceof AudioContext)) throw new Error('Invalid `audioContext` parameter');

    if (!sourceNode || !(sourceNode instanceof AudioNode)) throw new Error('Invalid `sourceNode` parameter');

    _this.sourceNode = sourceNode;
    _this._channel = _this.params.get('channel');
    _this._blockDuration = null;

    _this.processFrame = _this.processFrame.bind(_this);
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and start to propagate signal
   * blocks produced by the audio node into the graph.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:client.source.AudioInNode#stop}
   */


  (0, _createClass3.default)(AudioInNode, [{
    key: 'start',
    value: function start() {
      this.initStream();

      var audioContext = this.params.get('audioContext');
      this.frame.time = 0;

      var frameSize = this.params.get('frameSize');

      // @note: recreate each time because of a firefox weird behavior
      this.scriptProcessor = audioContext.createScriptProcessor(frameSize, 1, 1);
      this.scriptProcessor.onaudioprocess = this.processFrame;

      this.sourceNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(audioContext.destination);
    }

    /**
     * Finalize the stream and stop the whole graph.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:client.source.AudioInNode#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.finalizeStream(this.frame.time);

      this.sourceNode.disconnect();
      this.scriptProcessor.disconnect();
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var audioContext = this.params.get('audioContext');
      var frameSize = this.params.get('frameSize');
      var sampleRate = audioContext.sampleRate;

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = sampleRate / frameSize;
      this.streamParams.frameType = 'signal';
      this.streamParams.sourceSampleRate = sampleRate;
      this.streamParams.sourceSampleCount = frameSize;

      this._blockDuration = frameSize / sampleRate;

      this.propagateStreamParams();
    }

    /**
     * Basically the `scriptProcessor.onaudioprocess` callback
     * @private
     */

  }, {
    key: 'processFrame',
    value: function processFrame(e) {
      this.frame.data = e.inputBuffer.getChannelData(this._channel);
      this.propagateFrame();

      this.frame.time += this._blockDuration;
    }
  }]);
  return AudioInNode;
}(_BaseLfo3.default);

exports.default = AudioInNode;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AudioInBuffer = require('./AudioInBuffer');

var _AudioInBuffer2 = _interopRequireDefault(_AudioInBuffer);

var _AudioInNode = require('./AudioInNode');

var _AudioInNode2 = _interopRequireDefault(_AudioInNode);

var _EventIn = require('../../common/source/EventIn');

var _EventIn2 = _interopRequireDefault(_EventIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  AudioInBuffer: _AudioInBuffer2.default,
  AudioInNode: _AudioInNode2.default,
  EventIn: _EventIn2.default
};

},{"../../common/source/EventIn":39,"./AudioInBuffer":13,"./AudioInNode":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _parameters = require('parameters');

var _parameters2 = _interopRequireDefault(_parameters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 0;

/**
 * Base `lfo` class to be extended in order to create new nodes.
 *
 * Nodes are divided in 3 categories:
 * - **`source`** are responsible for acquering a signal and its properties
 *   (frameRate, frameSize, etc.)
 * - **`sink`** are endpoints of the graph, such nodes can be recorders,
 *   visualizers, etc.
 * - **`operator`** are used to make computation on the input signal and
 *   forward the results below in the graph.
 *
 * In most cases the methods to override / extend are:
 * - the **`constructor`** to define the parameters of the new lfo node.
 * - the **`processStreamParams`** method to define how the node modify the
 *   stream attributes (e.g. by changing the frame size)
 * - the **`process{FrameType}`** method to define the operations that the
 *   node apply on the stream. The type of input a node can handle is define
 *   by its implemented interface, if it implements `processSignal` a stream
 *   with `frameType === 'signal'` can be processed, `processVector` to handle
 *   an input of type `vector`.
 *
 * <span class="warning">_This class should be considered abstract and only
 * be used to be extended._</span>
 *
 *
 * // overview of the behavior of a node
 *
 * **processStreamParams(prevStreamParams)**
 *
 * `base` class (default implementation)
 * - call `preprocessStreamParams`
 * - call `propagateStreamParams`
 *
 * `child` class
 * - call `preprocessStreamParams`
 * - override some of the inherited `streamParams`
 * - creates the any related logic buffers
 * - call `propagateStreamParams`
 *
 * _should not call `super.processStreamParams`_
 *
 * **prepareStreamParams()**
 *
 * - assign prevStreamParams to this.streamParams
 * - check if the class implements the correct `processInput` method
 *
 * _shouldn't be extended, only consumed in `processStreamParams`_
 *
 * **propagateStreamParams()**
 *
 * - creates the `frameData` buffer
 * - propagate `streamParams` to children
 *
 * _shouldn't be extended, only consumed in `processStreamParams`_
 *
 * **processFrame()**
 *
 * `base` class (default implementation)
 * - call `preprocessFrame`
 * - assign frameTime and frameMetadata to identity
 * - call the proper function according to inputType
 * - call `propagateFrame`
 *
 * `child` class
 * - call `preprocessFrame`
 * - do whatever you want with incomming frame
 * - call `propagateFrame`
 *
 * _should not call `super.processFrame`_
 *
 * **prepareFrame()**
 *
 * - if `reinit` and trigger `processStreamParams` if needed
 *
 * _shouldn't be extended, only consumed in `processFrame`_
 *
 * **propagateFrame()**
 *
 * - propagate frame to children
 *
 * _shouldn't be extended, only consumed in `processFrame`_
 *
 * @memberof module:common.core
 */

var BaseLfo = function () {
  function BaseLfo() {
    var definitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, BaseLfo);

    this.cid = id++;

    /**
     * Parameter bag containing parameter instances.
     *
     * @type {Object}
     * @name params
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.params = (0, _parameters2.default)(definitions, options);
    // listen for param updates
    this.params.addListener(this.onParamUpdate.bind(this));

    /**
     * Description of the stream output of the node.
     * Set to `null` when the node is destroyed.
     *
     * @type {Object}
     * @property {Number} frameSize - Frame size at the output of the node.
     * @property {Number} frameRate - Frame rate at the output of the node.
     * @property {String} frameType - Frame type at the output of the node,
     *  possible values are `signal`, `vector` or `scalar`.
     * @property {Array|String} description - If type is `vector`, describe
     *  the dimension(s) of output stream.
     * @property {Number} sourceSampleRate - Sample rate of the source of the
     *  graph. _The value should be defined by sources and never modified_.
     * @property {Number} sourceSampleCount - Number of consecutive discrete
     *  time values contained in the data frame output by the source.
     *  _The value should be defined by sources and never modified_.
     *
     * @name streamParams
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.streamParams = {
      frameType: null,
      frameSize: 1,
      frameRate: 0,
      description: null,
      sourceSampleRate: 0,
      sourceSampleCount: null
    };

    /**
     * Current frame. This object and its data are updated at each incomming
     * frame without reallocating memory.
     *
     * @type {Object}
     * @name frame
     * @property {Number} time - Time of the current frame.
     * @property {Float32Array} data - Data of the current frame.
     * @property {Object} metadata - Metadata associted to the current frame.
     * @instance
     * @memberof module:common.core.BaseLfo
     */
    this.frame = {
      time: 0,
      data: null,
      metadata: {}
    };

    /**
     * List of nodes connected to the ouput of the node (lower in the graph).
     * At each frame, the node forward its `frame` to to all its `nextOps`.
     *
     * @type {Array<BaseLfo>}
     * @name nextOps
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.nextOps = [];

    /**
     * The node from which the node receive the frames (upper in the graph).
     *
     * @type {BaseLfo}
     * @name prevOp
     * @instance
     * @memberof module:common.core.BaseLfo
     * @see {@link module:common.core.BaseLfo#connect}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */
    this.prevOp = null;

    /**
     * Is set to true when a static parameter is updated. On the next input
     * frame all the subgraph streamParams starting from this node will be
     * updated.
     *
     * @type {Boolean}
     * @name _reinit
     * @instance
     * @memberof module:common.core.BaseLfo
     * @private
     */
    this._reinit = false;
  }

  /**
   * Returns an object describing each available parameter of the node.
   *
   * @return {Object}
   */


  (0, _createClass3.default)(BaseLfo, [{
    key: 'getParamsDescription',
    value: function getParamsDescription() {
      return this.params.getDefinitions();
    }

    /**
     * Reset all parameters to their initial value (as defined on instantication)
     *
     * @see {@link module:common.core.BaseLfo#streamParams}
     */

  }, {
    key: 'resetParams',
    value: function resetParams() {
      this.params.reset();
    }

    /**
     * Function called when a param is updated. By default set the `_reinit`
     * flag to `true` if the param is `static` one. This method should be
     * extended to handle particular logic bound to a specific parameter.
     *
     * @param {String} name - Name of the parameter.
     * @param {Mixed} value - Value of the parameter.
     * @param {Object} metas - Metadata associated to the parameter.
     */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value) {
      var metas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (metas.kind === 'static') this._reinit = true;
    }

    /**
     * Connect the current node (`prevOp`) to another node (`nextOp`).
     * A given node can be connected to several operators and propagate the
     * stream to each of them.
     *
     * @param {BaseLfo} next - Next operator in the graph.
     * @see {@link module:common.core.BaseLfo#processFrame}
     * @see {@link module:common.core.BaseLfo#disconnect}
     */

  }, {
    key: 'connect',
    value: function connect(next) {
      if (!(next instanceof BaseLfo)) throw new Error('Invalid connection: child node is not an instance of `BaseLfo`');

      if (this.streamParams === null || next.streamParams === null) throw new Error('Invalid connection: cannot connect a dead node');

      this.nextOps.push(next);
      next.prevOp = this;

      if (this.streamParams.frameType !== null) // graph has already been started
        next.processStreamParams(this.streamParams);
    }

    /**
     * Remove the given operator from its previous operators' `nextOps`.
     *
     * @param {BaseLfo} [next=null] - The operator to disconnect from the current
     *  operator. If `null` disconnect all the next operators.
     */

  }, {
    key: 'disconnect',
    value: function disconnect() {
      var _this = this;

      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (next === null) {
        this.nextOps.forEach(function (next) {
          return _this.disconnect(next);
        });
      } else {
        var index = this.nextOps.indexOf(this);
        this.nextOps.splice(index, 1);
        next.prevOp = null;
      }
    }

    /**
     * Destroy all the nodes in the sub-graph starting from the current node.
     * When detroyed, the `streamParams` of the node are set to `null`, the
     * operator is then considered as `dead` and cannot be reconnected.
     *
     * @see {@link module:common.core.BaseLfo#connect}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      // destroy all chidren
      var index = this.nextOps.length;

      while (index--) {
        this.nextOps[index].destroy();
      } // disconnect itself from the previous operator
      if (this.prevOp) this.prevOp.disconnect(this);

      // mark the object as dead
      this.streamParams = null;
    }

    /**
     * Helper to initialize the stream in standalone mode.
     *
     * @param {Object} [streamParams={}] - Stream parameters to be used.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#resetStream}
     */

  }, {
    key: 'initStream',
    value: function initStream() {
      var streamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.processStreamParams(streamParams);
      this.resetStream();
    }

    /**
     * Reset the `frame.data` buffer by setting all its values to 0.
     * A source operator should call `processStreamParams` and `resetStream` when
     * started, each of these method propagate through the graph automaticaly.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      // buttom up
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].resetStream();
      } // no buffer for `scalar` type or sink node
      if (this.streamParams.frameType !== 'scalar' && this.frame.data !== null) {
        var frameSize = this.streamParams.frameSize;
        var data = this.frame.data;

        for (var _i = 0; _i < frameSize; _i++) {
          data[_i] = 0;
        }
      }
    }

    /**
     * Finalize the stream. A source node should call this method when stopped,
     * `finalizeStream` is automatically propagated throught the graph.
     *
     * @param {Number} endTime - Logical time at which the graph is stopped.
     */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].finalizeStream(endTime);
      }
    }

    /**
     * Initialize or update the operator's `streamParams` according to the
     * previous operators `streamParams` values.
     *
     * When implementing a new operator this method should:
     * 1. call `this.prepareStreamParams` with the given `prevStreamParams`
     * 2. optionnally change values to `this.streamParams` according to the
     *    logic performed by the operator.
     * 3. optionnally allocate memory for ring buffers, etc.
     * 4. call `this.propagateStreamParams` to trigger the method on the next
     *    operators in the graph.
     *
     * @param {Object} prevStreamParams - `streamParams` of the previous operator.
     *
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     * @see {@link module:common.core.BaseLfo#propagateStreamParams}
     */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.prepareStreamParams(prevStreamParams);
      this.propagateStreamParams();
    }

    /**
     * Common logic to do at the beginning of the `processStreamParam`, must be
     * called at the beginning of any `processStreamParam` implementation.
     *
     * The method mainly check if the current node implement the interface to
     * handle the type of frame propagated by it's parent:
     * - to handle a `vector` frame type, the class must implement `processVector`
     * - to handle a `signal` frame type, the class must implement `processSignal`
     * - in case of a 'scalar' frame type, the class can implement any of the
     * following by order of preference: `processScalar`, `processVector`,
     * `processSignal`.
     *
     * @param {Object} prevStreamParams - `streamParams` of the previous operator.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#propagateStreamParams}
     */

  }, {
    key: 'prepareStreamParams',
    value: function prepareStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _assign2.default)(this.streamParams, prevStreamParams);
      var prevFrameType = prevStreamParams.frameType;

      switch (prevFrameType) {
        case 'scalar':
          if (this.processScalar) this.processFunction = this.processScalar;else if (this.processVector) this.processFunction = this.processVector;else if (this.processSignal) this.processFunction = this.processSignal;else throw new Error(this.constructor.name + ' - no "process" function found');
          break;
        case 'vector':
          if (!('processVector' in this)) throw new Error(this.constructor.name + ' - "processVector" is not defined');

          this.processFunction = this.processVector;
          break;
        case 'signal':
          if (!('processSignal' in this)) throw new Error(this.constructor.name + ' - "processSignal" is not defined');

          this.processFunction = this.processSignal;
          break;
        default:
          // defaults to processFunction
          break;
      }
    }

    /**
     * Create the `this.frame.data` buffer and forward the operator's `streamParam`
     * to all its next operators, must be called at the end of any
     * `processStreamParams` implementation.
     *
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     */

  }, {
    key: 'propagateStreamParams',
    value: function propagateStreamParams() {
      this.frame.data = new Float32Array(this.streamParams.frameSize);

      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].processStreamParams(this.streamParams);
      }
    }

    /**
     * Define the particular logic the operator applies to the stream.
     * According to the frame type of the previous node, the method calls one
     * of the following method `processVector`, `processSignal` or `processScalar`
     *
     * @param {Object} frame - Frame (time, data, and metadata) as given by the
     *  previous operator. The incomming frame should never be modified by
     *  the operator.
     *
     * @see {@link module:common.core.BaseLfo#prepareFrame}
     * @see {@link module:common.core.BaseLfo#propagateFrame}
     * @see {@link module:common.core.BaseLfo#processStreamParams}
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();

      // frameTime and frameMetadata defaults to identity
      this.frame.time = frame.time;
      this.frame.metadata = frame.metadata;

      this.processFunction(frame);
      this.propagateFrame();
    }

    /**
     * Pointer to the method called in `processFrame` according to the
     * frame type of the previous operator. Is dynamically assigned in
     * `prepareStreamParams`.
     *
     * @see {@link module:common.core.BaseLfo#prepareStreamParams}
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      this.frame = frame;
    }

    /**
     * Common logic to perform at the beginning of the `processFrame`.
     *
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'prepareFrame',
    value: function prepareFrame() {
      if (this._reinit === true) {
        var streamParams = this.prevOp !== null ? this.prevOp.streamParams : {};
        this.initStream(streamParams);
        this._reinit = false;
      }
    }

    /**
     * Forward the current `frame` to the next operators, is called at the end of
     * `processFrame`.
     *
     * @see {@link module:common.core.BaseLfo#processFrame}
     */

  }, {
    key: 'propagateFrame',
    value: function propagateFrame() {
      for (var i = 0, l = this.nextOps.length; i < l; i++) {
        this.nextOps[i].processFrame(this.frame);
      }
    }
  }]);
  return BaseLfo;
}();

exports.default = BaseLfo;

},{"babel-runtime/core-js/object/assign":48,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"parameters":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseLfo = require('./BaseLfo');

var _BaseLfo2 = _interopRequireDefault(_BaseLfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { BaseLfo: _BaseLfo2.default };

},{"./BaseLfo":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var pow = Math.pow;
var _2PI = Math.PI * 2;

// plot (from http://www.earlevel.com/scripts/widgets/20131013/biquads2.js)
// var len = 512;
// var magPlot = [];
// for (var idx = 0; idx < len; idx++) {
//   var w;
//   if (plotType == "linear")
//     w = idx / (len - 1) * Math.PI;  // 0 to pi, linear scale
//   else
//     w = Math.exp(Math.log(1 / 0.001) * idx / (len - 1)) * 0.001 * Math.PI;  // 0.001 to 1, times pi, log scale

//   var phi = Math.pow(Math.sin(w/2), 2);
//   var y = Math.log(Math.pow(a0+a1+a2, 2) - 4*(a0*a1 + 4*a0*a2 + a1*a2)*phi + 16*a0*a2*phi*phi) - Math.log(Math.pow(1+b1+b2, 2) - 4*(b1 + 4*b2 + b1*b2)*phi + 16*b2*phi*phi);
//   y = y * 10 / Math.LN10
//   if (y == -Infinity)
//     y = -200;

//   if (plotType == "linear")
//     magPlot.push([idx / (len - 1) * Fs / 2, y]);
//   else
//     magPlot.push([idx / (len - 1) / 2, y]);

//   if (idx == 0)
//     minVal = maxVal = y;
//   else if (y < minVal)
//     minVal = y;
//   else if (y > maxVal)
//     maxVal = y;
// }

var definitions = {
  type: {
    type: 'enum',
    default: 'lowpass',
    list: ['lowpass', 'highpass', 'bandpass_constant_skirt', 'bandpass', 'bandpass_constant_peak', 'notch', 'allpass', 'peaking', 'lowshelf', 'highshelf'],
    metas: { kind: 'dyanmic' }
  },
  f0: {
    type: 'float',
    default: 1,
    metas: { kind: 'dyanmic' }
  },
  gain: {
    type: 'float',
    default: 1,
    min: 0,
    metas: { kind: 'dyanmic' }
  },
  q: {
    type: 'float',
    default: 1,
    min: 0.001, // PIPO_BIQUAD_MIN_Q
    // max: 1,
    metas: { kind: 'dyanmic' }
  }
};

/**
 * Biquad filter (Direct form I). If input is of type `vector` the filter is
 * applied on each dimension i parallel.
 *
 * Based on the ["Cookbook formulae for audio EQ biquad filter coefficients"](http://www.musicdsp.org/files/Audio-EQ-Cookbook.txt)
 * by Robert Bristow-Johnson.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default values.
 * @param {String} [options.type='lowpass'] - Type of the filter. Available
 *  filters: 'lowpass', 'highpass', 'bandpass_constant_skirt', 'bandpass_constant_peak'
 *  (alias 'bandpass'), 'notch', 'allpass', 'peaking', 'lowshelf', 'highshelf'.
 * @param {Number} [options.f0=1] - Cutoff or center frequency of the filter
 *  according to its type.
 * @param {Number} [options.gain=1] - Gain of the filter (in dB).
 * @param {Number} [options.q=1] - Quality factor of the filter.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: buffer,
 * });
 *
 * const biquad = new lfo.operator.Biquad({
 *   type: 'lowpass',
 *   f0: 2000,
 *   gain: 3,
 *   q: 12,
 * });
 *
 * const spectrumDisplay = new lfo.sink.SpectrumDisplay({
 *   canvas: '#spectrum',
 * });
 *
 * audioInBuffer.connect(biquad);
 * biquad.connect(spectrumDisplay);
 *
 * audioInBuffer.start();
 */
var Biquad = function (_BaseLfo) {
  (0, _inherits3.default)(Biquad, _BaseLfo);

  function Biquad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Biquad);
    return (0, _possibleConstructorReturn3.default)(this, (Biquad.__proto__ || (0, _getPrototypeOf2.default)(Biquad)).call(this, definitions, options));
  }

  (0, _createClass3.default)(Biquad, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      this._calculateCoefs();
    }
  }, {
    key: '_calculateCoefs',
    value: function _calculateCoefs() {
      var sampleRate = this.streamParams.sourceSampleRate;
      var frameType = this.streamParams.frameType;
      var frameSize = this.streamParams.frameSize;

      var type = this.params.get('type');
      var f0 = this.params.get('f0');
      var gain = this.params.get('gain');
      var q = this.params.get('q');
      // const bandwidth = this.params.get('bandwidth');
      var bandwidth = null;

      var b0 = 0,
          b1 = 0,
          b2 = 0,
          a0 = 0,
          a1 = 0,
          a2 = 0;

      var A = pow(10, gain / 40);
      var w0 = _2PI * f0 / sampleRate;
      var cosW0 = cos(w0);
      var sinW0 = sin(w0);
      var alpha = void 0; // depend of the filter type
      var _2RootAAlpha = void 0; // intermediate value for lowshelf and highshelf

      switch (type) {
        // H(s) = 1 / (s^2 + s/Q + 1)
        case 'lowpass':
          alpha = sinW0 / (2 * q);
          b0 = (1 - cosW0) / 2;
          b1 = 1 - cosW0;
          b2 = b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = s^2 / (s^2 + s/Q + 1)
        case 'highpass':
          alpha = sinW0 / (2 * q);
          b0 = (1 + cosW0) / 2;
          b1 = -(1 + cosW0);
          b2 = b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = s / (s^2 + s/Q + 1)  (constant skirt gain, peak gain = Q)
        case 'bandpass_constant_skirt':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = sinW0 / 2;
          b1 = 0;
          b2 = -b0;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = (s/Q) / (s^2 + s/Q + 1)      (constant 0 dB peak gain)
        case 'bandpass': // looks like what is gnerally considered as a bandpass
        case 'bandpass_constant_peak':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = alpha;
          b1 = 0;
          b2 = -alpha;
          a0 = 1 + alpha;
          a1 = -2 * cosW0;
          a2 = 1 - alpha;
          break;
        // H(s) = (s^2 + 1) / (s^2 + s/Q + 1)
        case 'notch':
          alpha = sinW0 / (2 * q);
          b0 = 1;
          b1 = -2 * cosW0;
          b2 = 1;
          a0 = 1 + alpha;
          a1 = b1;
          a2 = 1 - alpha;
          break;
        // H(s) = (s^2 - s/Q + 1) / (s^2 + s/Q + 1)
        case 'allpass':
          alpha = sinW0 / (2 * q);
          b0 = 1 - alpha;
          b1 = -2 * cosW0;
          b2 = 1 + alpha;
          a0 = b2;
          a1 = b1;
          a2 = b0;
          break;
        // H(s) = (s^2 + s*(A/Q) + 1) / (s^2 + s/(A*Q) + 1)
        case 'peaking':
          if (bandwidth) {
            // sin(w0)*sinh( ln(2)/2 * BW * w0/sin(w0) )           (case: BW)
          } else {
            alpha = sinW0 / (2 * q);
          }

          b0 = 1 + alpha * A;
          b1 = -2 * cosW0;
          b2 = 1 - alpha * A;
          a0 = 1 + alpha / A;
          a1 = b1;
          a2 = 1 - alpha / A;
          break;
        // H(s) = A * (s^2 + (sqrt(A)/Q)*s + A)/(A*s^2 + (sqrt(A)/Q)*s + 1)
        case 'lowshelf':
          alpha = sinW0 / (2 * q);
          _2RootAAlpha = 2 * sqrt(A) * alpha;

          b0 = A * (A + 1 - (A - 1) * cosW0 + _2RootAAlpha);
          b1 = 2 * A * (A - 1 - (A + 1) * cosW0);
          b2 = A * (A + 1 - (A - 1) * cosW0 - _2RootAAlpha);
          a0 = A + 1 + (A - 1) * cosW0 + _2RootAAlpha;
          a1 = -2 * (A - 1 + (A + 1) * cosW0);
          a2 = A + 1 + (A - 1) * cosW0 - _2RootAAlpha;
          break;
        // H(s) = A * (A*s^2 + (sqrt(A)/Q)*s + 1)/(s^2 + (sqrt(A)/Q)*s + A)
        case 'highshelf':
          alpha = sinW0 / (2 * q);
          _2RootAAlpha = 2 * sqrt(A) * alpha;

          b0 = A * (A + 1 + (A - 1) * cosW0 + _2RootAAlpha);
          b1 = -2 * A * (A - 1 + (A + 1) * cosW0);
          b2 = A * (A + 1 + (A - 1) * cosW0 - _2RootAAlpha);
          a0 = A + 1 - (A - 1) * cosW0 + _2RootAAlpha;
          a1 = 2 * (A - 1 - (A + 1) * cosW0);
          a2 = A + 1 - (A - 1) * cosW0 - _2RootAAlpha;

          break;
      }

      this.coefs = {
        b0: b0 / a0,
        b1: b1 / a0,
        b2: b2 / a0,
        a1: a1 / a0,
        a2: a2 / a0
      };

      // reset state
      if (frameType === 'signal') {
        this.state = { x1: 0, x2: 0, y1: 0, y2: 0 };
      } else {
        this.state = {
          x1: new Float32Array(frameSize),
          x2: new Float32Array(frameSize),
          y1: new Float32Array(frameSize),
          y2: new Float32Array(frameSize)
        };
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      // if no `sampleRate` or `sampleRate` is 0 we shall halt!
      var sampleRate = this.streamParams.sourceSampleRate;

      if (!sampleRate || sampleRate <= 0) throw new Error('Invalid sampleRate value (0) for biquad');

      this._calculateCoefs();
      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      var frameSize = this.streamParams.frameSize;
      var outData = this.frame.data;
      var inData = frame.data;
      var state = this.state;
      var coefs = this.coefs;

      for (var i = 0; i < frameSize; i++) {
        var x = inData[i];
        var y = coefs.b0 * x + coefs.b1 * state.x1[i] + coefs.b2 * state.x2[i] - coefs.a1 * state.y1[i] - coefs.a2 * state.y2[i];

        outData[i] = y;

        // update states
        state.x2[i] = state.x1[i];
        state.x1[i] = x;
        state.y2[i] = state.y1[i];
        state.y1[i] = y;
      }
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var frameSize = this.streamParams.frameSize;
      var outData = this.frame.data;
      var inData = frame.data;
      var state = this.state;
      var coefs = this.coefs;

      for (var i = 0; i < frameSize; i++) {
        var x = inData[i];
        var y = coefs.b0 * x + coefs.b1 * state.x1 + coefs.b2 * state.x2 - coefs.a1 * state.y1 - coefs.a2 * state.y2;

        outData[i] = y;

        // update states
        state.x2 = state.x1;
        state.x1 = x;
        state.y2 = state.y1;
        state.y1 = y;
      }
    }
  }]);
  return Biquad;
}(_BaseLfo3.default);

exports.default = Biquad;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;
var cos = Math.cos;
var PI = Math.PI;

// Dct Type 2 - orthogonal matrix scaling
function getDctWeights(order, N) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'htk';

  var weights = new Float32Array(N * order);
  var piOverN = PI / N;
  var scale0 = 1 / sqrt(2);
  var scale = sqrt(2 / N);

  for (var k = 0; k < order; k++) {
    var s = k === 0 ? scale0 * scale : scale;
    // const s = scale; // rta doesn't apply k=0 scaling

    for (var n = 0; n < N; n++) {
      weights[k * N + n] = s * cos(k * (n + 0.5) * piOverN);
    }
  }

  return weights;
}

var definitions = {
  order: {
    type: 'integer',
    default: 12,
    metas: { kind: 'static' }
  }
};

/**
 * Compute the Discrete Cosine Transform of an input `signal` or `vector`.
 * (HTK style weighting).
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=12] - Number of computed bins.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * // assuming some audio buffer
 * const source = new AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   useWorker: false,
 * });
 *
 * const slicer = new Slicer({
 *   frameSize: 512,
 *   hopSize: 512,
 * });
 *
 * const dct = new Dct({
 *   order: 12,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * source.connect(slicer);
 * slicer.connect(dct);
 * dct.connect(logger);
 *
 * source.start();
 */

var Dct = function (_BaseLfo) {
  (0, _inherits3.default)(Dct, _BaseLfo);

  function Dct() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Dct);
    return (0, _possibleConstructorReturn3.default)(this, (Dct.__proto__ || (0, _getPrototypeOf2.default)(Dct)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Dct, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var order = this.params.get('order');
      var inFrameSize = prevStreamParams.frameSize;

      this.streamParams.frameSize = order;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      this.weightMatrix = getDctWeights(order, inFrameSize);

      this.propagateStreamParams();
    }

    /**
     * Use the `Dct` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} values - Input values.
     * @return {Array} - Dct of the input array.
     *
     * @example
     * const dct = new lfo.operator.Dct({ order: 12 });
     * // mandatory for use in standalone mode
     * dct.initStream({ frameSize: 512, frameType: 'signal' });
     * dct.inputSignal(data);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(values) {
      var order = this.params.get('order');
      var frameSize = values.length;
      var outFrame = this.frame.data;
      var weights = this.weightMatrix;

      for (var k = 0; k < order; k++) {
        var offset = k * frameSize;
        outFrame[k] = 0;

        for (var n = 0; n < frameSize; n++) {
          outFrame[k] += values[n] * weights[offset + n];
        }
      }

      return outFrame;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Dct;
}(_BaseLfo3.default);

exports.default = Dct;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _windows = require('../utils/windows');

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js
/*
 * Free Fft and convolution (JavaScript)
 *
 * Copyright (c) 2014 Project Nayuki
 * http://www.nayuki.io/page/free-small-fft-in-multiple-languages
 *
 * (MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 *
 * Slightly restructured by Chris Cannam, cannam@all-day-breakfast.com
 *
 * @private
 */
/*
 * Construct an object for calculating the discrete Fourier transform (DFT) of
 * size n, where n is a power of 2.
 *
 * @private
 */
function FftNayuki(n) {

  this.n = n;
  this.levels = -1;

  for (var i = 0; i < 32; i++) {
    if (1 << i == n) {
      this.levels = i; // Equal to log2(n)
    }
  }

  if (this.levels == -1) {
    throw "Length is not a power of 2";
  }

  this.cosTable = new Array(n / 2);
  this.sinTable = new Array(n / 2);

  for (var i = 0; i < n / 2; i++) {
    this.cosTable[i] = Math.cos(2 * Math.PI * i / n);
    this.sinTable[i] = Math.sin(2 * Math.PI * i / n);
  }

  /*
   * Computes the discrete Fourier transform (DFT) of the given complex vector,
   * storing the result back into the vector.
   * The vector's length must be equal to the size n that was passed to the
   * object constructor, and this must be a power of 2. Uses the Cooley-Tukey
   * decimation-in-time radix-2 algorithm.
   *
   * @private
   */
  this.forward = function (real, imag) {
    var n = this.n;

    // Bit-reversed addressing permutation
    for (var i = 0; i < n; i++) {
      var j = reverseBits(i, this.levels);

      if (j > i) {
        var temp = real[i];
        real[i] = real[j];
        real[j] = temp;
        temp = imag[i];
        imag[i] = imag[j];
        imag[j] = temp;
      }
    }

    // Cooley-Tukey decimation-in-time radix-2 Fft
    for (var size = 2; size <= n; size *= 2) {
      var halfsize = size / 2;
      var tablestep = n / size;

      for (var i = 0; i < n; i += size) {
        for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
          var tpre = real[j + halfsize] * this.cosTable[k] + imag[j + halfsize] * this.sinTable[k];
          var tpim = -real[j + halfsize] * this.sinTable[k] + imag[j + halfsize] * this.cosTable[k];
          real[j + halfsize] = real[j] - tpre;
          imag[j + halfsize] = imag[j] - tpim;
          real[j] += tpre;
          imag[j] += tpim;
        }
      }
    }

    // Returns the integer whose value is the reverse of the lowest 'bits'
    // bits of the integer 'x'.
    function reverseBits(x, bits) {
      var y = 0;

      for (var i = 0; i < bits; i++) {
        y = y << 1 | x & 1;
        x >>>= 1;
      }

      return y;
    }
  };

  /*
   * Computes the inverse discrete Fourier transform (IDFT) of the given complex
   * vector, storing the result back into the vector.
   * The vector's length must be equal to the size n that was passed to the
   * object constructor, and this must be a power of 2. This is a wrapper
   * function. This transform does not perform scaling, so the inverse is not
   * a true inverse.
   *
   * @private
   */
  this.inverse = function (real, imag) {
    forward(imag, real);
  };
}

var sqrt = Math.sqrt;

var isPowerOfTwo = function isPowerOfTwo(number) {
  while (number % 2 === 0 && number > 1) {
    number = number / 2;
  }return number === 1;
};

var definitions = {
  size: {
    type: 'integer',
    default: 1024,
    metas: { kind: 'static' }
  },
  window: {
    type: 'enum',
    list: ['none', 'hann', 'hanning', 'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'],
    default: 'none',
    metas: { kind: 'static' }
  },
  mode: {
    type: 'enum',
    list: ['magnitude', 'power'], // add complex output
    default: 'magnitude'
  },
  norm: {
    type: 'enum',
    default: 'auto',
    list: ['auto', 'none', 'linear', 'power']
  }
};

/**
 * Compute the Fast Fourier Transform of an incomming `signal`.
 *
 * Fft implementation by [Nayuki](https://code.soundsoftware.ac.uk/projects/js-dsp-test/repository/entry/fft/nayuki-obj/fft.js).
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.size=1024] - Size of the fft, should be a power of
 *  2. If the frame size of the incomming signal is lower than this value,
 *  it is zero padded to match the fft size.
 * @param {String} [options.window='none'] - Name of the window applied on the
 *  incomming signal. Available windows are: 'none', 'hann', 'hanning',
 *  'hamming', 'blackman', 'blackmanharris', 'sine', 'rectangle'.
 * @param {String} [options.mode='magnitude'] - Type of the output (`magnitude`
 *  or `power`)
 * @param {String} [options.norm='auto'] - Type of normalization applied on the
 *  output. Possible values are 'auto', 'none', 'linear', 'power'. When set to
 *  `auto`, a `linear` normalization is applied on the magnitude spectrum, while
 *  a `power` normalizetion is applied on the power spectrum.
 *
 * @example
 * // assuming an `audioBuffer` exists
 * const source = new AudioInBuffer({ audioBuffer });
 *
 * const slicer = new Slicer({
 *   frameSize: 256,
 * });
 *
 * const fft = new Fft({
 *   mode: 'power',
 *   window: 'hann',
 *   norm: 'power',
 *   size: 256,
 * });
 *
 * source.connect(slicer);
 * slicer.connect(fft);
 * source.start();
 *
 * // > outputs 129 bins containing the values of the power spectrum (including
 * // > DC and Nyuist frequencies).
 *
 * @todo - check if 'rectangle' and 'none' windows are not redondant.
 * @todo - check default values for all params.
 */

var Fft = function (_BaseLfo) {
  (0, _inherits3.default)(Fft, _BaseLfo);

  function Fft() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Fft);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Fft.__proto__ || (0, _getPrototypeOf2.default)(Fft)).call(this, definitions, options));

    _this.windowSize = null;
    _this.normalizeCoefs = null;
    _this.window = null;
    _this.real = null;
    _this.imag = null;
    _this.fft = null;

    if (!isPowerOfTwo(_this.params.get('size'))) throw new Error('fftSize must be a power of two');
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Fft, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      // set the output frame size
      var inFrameSize = prevStreamParams.frameSize;
      var fftSize = this.params.get('size');
      var mode = this.params.get('mode');
      var norm = this.params.get('norm');
      var windowName = this.params.get('window');
      // window `none` and `rectangle` are aliases
      if (windowName === 'none') windowName = 'rectangle';

      this.streamParams.frameSize = fftSize / 2 + 1;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];
      // size of the window to apply on the input frame
      this.windowSize = inFrameSize < fftSize ? inFrameSize : fftSize;

      // references to populate in the window functions (cf. `initWindow`)
      this.normalizeCoefs = { linear: 0, power: 0 };
      this.window = new Float32Array(this.windowSize);

      (0, _windows2.default)(windowName, // name of the window
      this.window, // buffer populated with the window signal
      this.windowSize, // size of the window
      this.normalizeCoefs // object populated with the normalization coefs
      );

      var _normalizeCoefs = this.normalizeCoefs,
          linear = _normalizeCoefs.linear,
          power = _normalizeCoefs.power;


      switch (norm) {
        case 'none':
          this.windowNorm = 1;
          break;

        case 'linear':
          this.windowNorm = linear;
          break;

        case 'power':
          this.windowNorm = power;
          break;

        case 'auto':
          if (mode === 'magnitude') this.windowNorm = linear;else if (mode === 'power') this.windowNorm = power;
          break;
      }

      this.real = new Float32Array(fftSize);
      this.imag = new Float32Array(fftSize);
      this.fft = new FftNayuki(fftSize);

      this.propagateStreamParams();
    }

    /**
     * Use the `Fft` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} signal - Input values.
     * @return {Array} - Fft of the input signal.
     *
     * @example
     * const fft = new lfo.operator.Fft({ size: 512, window: 'hann' });
     * // mandatory for use in standalone mode
     * fft.initStream({ frameSize: 256, frameType: 'signal' });
     * fft.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(signal) {
      var mode = this.params.get('mode');
      var windowSize = this.windowSize;
      var frameSize = this.streamParams.frameSize;
      var fftSize = this.params.get('size');
      var outData = this.frame.data;

      // apply window on the input signal and reset imag buffer
      for (var i = 0; i < windowSize; i++) {
        this.real[i] = signal[i] * this.window[i] * this.windowNorm;
        this.imag[i] = 0;
      }

      // if real is bigger than input signal, fill with zeros
      for (var _i = windowSize; _i < fftSize; _i++) {
        this.real[_i] = 0;
        this.imag[_i] = 0;
      }

      this.fft.forward(this.real, this.imag);

      if (mode === 'magnitude') {
        var norm = 1 / fftSize;

        // DC index
        var realDc = this.real[0];
        var imagDc = this.imag[0];
        outData[0] = sqrt(realDc * realDc + imagDc * imagDc) * norm;

        // Nquyst index
        var realNy = this.real[fftSize / 2];
        var imagNy = this.imag[fftSize / 2];
        outData[fftSize / 2] = sqrt(realNy * realNy + imagNy * imagNy) * norm;

        // power spectrum
        for (var _i2 = 1, j = fftSize - 1; _i2 < fftSize / 2; _i2++, j--) {
          var real = 0.5 * (this.real[_i2] + this.real[j]);
          var imag = 0.5 * (this.imag[_i2] - this.imag[j]);

          outData[_i2] = 2 * sqrt(real * real + imag * imag) * norm;
        }
      } else if (mode === 'power') {
        var _norm = 1 / (fftSize * fftSize);

        // DC index
        var _realDc = this.real[0];
        var _imagDc = this.imag[0];
        outData[0] = (_realDc * _realDc + _imagDc * _imagDc) * _norm;

        // Nquyst index
        var _realNy = this.real[fftSize / 2];
        var _imagNy = this.imag[fftSize / 2];
        outData[fftSize / 2] = (_realNy * _realNy + _imagNy * _imagNy) * _norm;

        // power spectrum
        for (var _i3 = 1, _j = fftSize - 1; _i3 < fftSize / 2; _i3++, _j--) {
          var _real = 0.5 * (this.real[_i3] + this.real[_j]);
          var _imag = 0.5 * (this.imag[_i3] - this.imag[_j]);

          outData[_i3] = 4 * (_real * _real + _imag * _imag) * _norm;
        }
      }

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Fft;
}(_BaseLfo3.default);

exports.default = Fft;

},{"../core/BaseLfo":16,"../utils/windows":43,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

var definitions = {
  normalize: {
    type: 'boolean',
    default: true,
    metas: { kind: 'dynamic' }
  },
  power: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute the magnitude of a `vector` input.
 *
 * _support `standalone` usage_
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.normalize=true] - Normalize output according to
 *  the vector size.
 * @param {Boolean} [options.power=false] - If true, returns the squared
 *  magnitude (power).
 *
 * @memberof module:common.operator
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({ frameSize: 2, frameType: 'vector' });
 * const magnitude = new lfo.operator.Magnitude();
 * const logger = new lfo.sink.Logger({ outFrame: true });
 *
 * eventIn.connect(magnitude);
 * magnitude.connect(logger);
 * eventIn.start();
 *
 * eventIn.process(null, [1, 1]);
 * > [1]
 * eventIn.process(null, [2, 2]);
 * > [2.82842712475]
 * eventIn.process(null, [3, 3]);
 * > [4.24264068712]
 */

var Magnitude = function (_BaseLfo) {
  (0, _inherits3.default)(Magnitude, _BaseLfo);

  function Magnitude() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Magnitude);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Magnitude.__proto__ || (0, _getPrototypeOf2.default)(Magnitude)).call(this, definitions, options));

    _this._normalize = _this.params.get('normalize');
    _this._power = _this.params.get('power');
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Magnitude, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(Magnitude.prototype.__proto__ || (0, _getPrototypeOf2.default)(Magnitude.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      switch (name) {
        case 'normalize':
          this._normalize = value;
          break;
        case 'power':
          this._power = value;
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      this.streamParams.frameSize = 1;
      this.streamParams.frameType = 'scalar';
      this.streamParams.description = ['magnitude'];
      this.propagateStreamParams();
    }

    /**
     * Use the `Magnitude` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} values - Values to process.
     * @return {Number} - Magnitude value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const magnitude = new lfo.operator.Magnitude({ power: true });
     * magnitude.initStream({ frameType: 'vector', frameSize: 3 });
     * magnitude.inputVector([3, 3]);
     * > 4.24264068712
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var length = values.length;
      var sum = 0;

      for (var i = 0; i < length; i++) {
        sum += values[i] * values[i];
      }var mag = sum;

      if (this._normalize) mag /= length;

      if (!this._power) mag = sqrt(mag);

      return mag;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.frame.data[0] = this.inputVector(frame.data);
    }
  }]);
  return Magnitude;
}(_BaseLfo3.default);

exports.default = Magnitude;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

/**
 * Compute mean and standard deviation of a given `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   const meanStddev = new lfo.operator.MeanStddev();
 *
 *   const traceDisplay = new lfo.sink.TraceDisplay({
 *     canvas: '#trace',
 *   });
 *
 *   audioInNode.connect(meanStddev);
 *   meanStddev.connect(traceDisplay);
 *   audioInNode.start();
 * }
 */

var MeanStddev = function (_BaseLfo) {
  (0, _inherits3.default)(MeanStddev, _BaseLfo);

  function MeanStddev() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MeanStddev);

    // no options available, just throw an error if some param try to be set.
    return (0, _possibleConstructorReturn3.default)(this, (MeanStddev.__proto__ || (0, _getPrototypeOf2.default)(MeanStddev)).call(this, {}, options));
  }

  /** @private */


  (0, _createClass3.default)(MeanStddev, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['mean', 'stddev'];

      this.propagateStreamParams();
    }

    /**
     * Use the `MeanStddev` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} values - Values to process.
     * @return {Array} - Mean and standart deviation of the input values.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const meanStddev = new lfo.operator.MeanStddev();
     * meanStddev.initStream({ frameType: 'vector', frameSize: 1024 });
     * meanStddev.inputVector(someSineSignal);
     * > [0, 0.7071]
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(values) {
      var outData = this.frame.data;
      var length = values.length;

      var mean = 0;
      var m2 = 0;

      // compute mean and variance with Welford algorithm
      // https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
      for (var i = 0; i < length; i++) {
        var x = values[i];
        var delta = x - mean;
        mean += delta / (i + 1);
        m2 += delta * (x - mean);
      }

      var variance = m2 / (length - 1);
      var stddev = sqrt(variance);

      outData[0] = mean;
      outData[1] = stddev;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return MeanStddev;
}(_BaseLfo3.default);

exports.default = MeanStddev;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _log = require('babel-runtime/core-js/math/log10');

var _log2 = _interopRequireDefault(_log);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var min = Math.min;
var max = Math.max;
var pow = Math.pow;
var log10 = _log2.default;

function hertzToMelHtk(freqHz) {
  return 2595 * (0, _log2.default)(1 + freqHz / 700);
}

function melToHertzHtk(freqMel) {
  return 700 * (Math.pow(10, freqMel / 2595) - 1);
}

/**
 * Returns a description of the weights to apply on the fft bins for each
 * Mel band filter.
 * @note - adapted from imtr-tools/rta
 *
 * @param {Number} nbrBins - Number of fft bins.
 * @param {Number} nbrFilter - Number of mel filters.
 * @param {Number} sampleRate - Sample Rate of the signal.
 * @param {Number} minFreq - Minimum Frequency to be considerered.
 * @param {Number} maxFreq - Maximum frequency to consider.
 * @return {Array<Object>} - Description of the weights to apply on the bins for
 *  each mel filter. Each description has the following structure:
 *  { startIndex: binIndex, centerFreq: binCenterFrequency, weights: [] }
 *
 * @private
 */
function getMelBandWeights(nbrBins, nbrBands, sampleRate, minFreq, maxFreq) {
  var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'htk';


  var hertzToMel = null;
  var melToHertz = null;
  var minMel = void 0;
  var maxMel = void 0;

  if (type === 'htk') {
    hertzToMel = hertzToMelHtk;
    melToHertz = melToHertzHtk;
    minMel = hertzToMel(minFreq);
    maxMel = hertzToMel(maxFreq);
  } else {
    throw new Error('Invalid mel band type: "' + type + '"');
  }

  var melBandDescriptions = new Array(nbrBands);
  // center frequencies of Fft bins
  var fftFreqs = new Float32Array(nbrBins);
  // center frequencies of mel bands - uniformly spaced in mel domain between
  // limits, there are 2 more frequencies than the actual number of filters in
  // order to calculate the slopes
  var filterFreqs = new Float32Array(nbrBands + 2);

  var fftSize = (nbrBins - 1) * 2;
  // compute bins center frequencies
  for (var i = 0; i < nbrBins; i++) {
    fftFreqs[i] = sampleRate * i / fftSize;
  }for (var _i = 0; _i < nbrBands + 2; _i++) {
    filterFreqs[_i] = melToHertz(minMel + _i / (nbrBands + 1) * (maxMel - minMel));
  } // loop throught filters
  for (var _i2 = 0; _i2 < nbrBands; _i2++) {
    var minWeightIndexDefined = 0;

    var description = {
      startIndex: null,
      centerFreq: null,
      weights: []
    };

    // define contribution of each bin for the filter at index (i + 1)
    // do not process the last spectrum component (Nyquist)
    for (var j = 0; j < nbrBins - 1; j++) {
      var posSlopeContrib = (fftFreqs[j] - filterFreqs[_i2]) / (filterFreqs[_i2 + 1] - filterFreqs[_i2]);

      var negSlopeContrib = (filterFreqs[_i2 + 2] - fftFreqs[j]) / (filterFreqs[_i2 + 2] - filterFreqs[_i2 + 1]);
      // lowerSlope and upper slope intersect at zero and with each other
      var contribution = max(0, min(posSlopeContrib, negSlopeContrib));

      if (contribution > 0) {
        if (description.startIndex === null) {
          description.startIndex = j;
          description.centerFreq = filterFreqs[_i2 + 1];
        }

        description.weights.push(contribution);
      }
    }

    // empty filter
    if (description.startIndex === null) {
      description.startIndex = 0;
      description.centerFreq = 0;
    }

    // @todo - do some scaling for Slaney-style mel
    melBandDescriptions[_i2] = description;
  }

  return melBandDescriptions;
}

var definitions = {
  log: {
    type: 'boolean',
    default: false,
    metas: { kind: 'static' }
  },
  nbrBands: {
    type: 'integer',
    default: 24,
    metas: { kind: 'static' }
  },
  minFreq: {
    type: 'float',
    default: 0,
    metas: { kind: 'static' }
  },
  maxFreq: {
    type: 'float',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  },
  power: {
    type: 'integer',
    default: 1,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute the mel bands spectrum from a given spectrum (`vector` type).
 * _Implement the `htk` mel band style._
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.log=false] - Apply a logarithmic scale on the output.
 * @param {Number} [options.nbrBands=24] - Number of filters defining the mel
 *  bands.
 * @param {Number} [options.minFreq=0] - Minimum frequency to consider.
 * @param {Number} [options.maxFreq=null] - Maximum frequency to consider.
 *  If `null`, is set to Nyquist frequency.
 * @param {Number} [options.power=1] - Apply a power scaling on each mel band.
 *
 * @todo - implement Slaney style mel bands
 *
 * @example
 * import lfo from 'waves-lfo/node'
 *
 * // read a file from path (node only source)
 * const audioInFile = new lfo.source.AudioInFile({
 *   filename: 'path/to/file',
 *   frameSize: 512,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 256,
 *   hopSize: 256,
 * });
 *
 * const fft = new lfo.operator.Fft({
 *   size: 1024,
 *   window: 'hann',
 *   mode: 'power',
 *   norm: 'power',
 * });
 *
 * const mel = new lfo.operator.Mel({
 *   log: true,
 *   nbrBands: 24,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInFile.connect(slicer);
 * slicer.connect(fft);
 * fft.connect(mel);
 * mel.connect(logger);
 *
 * audioInFile.start();
 */

var Mel = function (_BaseLfo) {
  (0, _inherits3.default)(Mel, _BaseLfo);

  function Mel() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Mel);
    return (0, _possibleConstructorReturn3.default)(this, (Mel.__proto__ || (0, _getPrototypeOf2.default)(Mel)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Mel, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var nbrBins = prevStreamParams.frameSize;
      var nbrBands = this.params.get('nbrBands');
      var sampleRate = this.streamParams.sourceSampleRate;
      var minFreq = this.params.get('minFreq');
      var maxFreq = this.params.get('maxFreq');

      //
      this.streamParams.frameSize = nbrBands;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      if (maxFreq === null) maxFreq = this.streamParams.sourceSampleRate / 2;

      this.melBandDescriptions = getMelBandWeights(nbrBins, nbrBands, sampleRate, minFreq, maxFreq);

      this.propagateStreamParams();
    }

    /**
     * Use the `Mel` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} spectrum - Fft bins.
     * @return {Array} - Mel bands.
     *
     * @example
     * const mel = new lfo.operator.Mel({ nbrBands: 24 });
     * // mandatory for use in standalone mode
     * mel.initStream({ frameSize: 256, frameType: 'vector' });
     * mel.inputVector(fftBins);
     */

  }, {
    key: 'inputVector',
    value: function inputVector(bins) {

      var power = this.params.get('power');
      var log = this.params.get('log');
      var melBands = this.frame.data;
      var nbrBands = this.streamParams.frameSize;
      var scale = 1;

      var minLogValue = 1e-48;
      var minLog = -480;

      if (log) scale *= nbrBands;

      for (var i = 0; i < nbrBands; i++) {
        var _melBandDescriptions$ = this.melBandDescriptions[i],
            startIndex = _melBandDescriptions$.startIndex,
            weights = _melBandDescriptions$.weights;

        var value = 0;

        for (var j = 0; j < weights.length; j++) {
          value += weights[j] * bins[startIndex + j];
        } // apply same logic as in PiPoBands
        if (scale !== 1) value *= scale;

        if (log) {
          if (value > minLogValue) value = 10 * log10(value);else value = minLog;
        }

        if (power !== 1) value = pow(value, power);

        melBands[i] = value;
      }

      return melBands;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }
  }]);
  return Mel;
}(_BaseLfo3.default);

exports.default = Mel;

},{"../core/BaseLfo":16,"babel-runtime/core-js/math/log10":46,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _Fft = require('./Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _Mel = require('./Mel');

var _Mel2 = _interopRequireDefault(_Mel);

var _Dct = require('./Dct');

var _Dct2 = _interopRequireDefault(_Dct);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  nbrBands: {
    type: 'integer',
    default: 24,
    meta: { kind: 'static' }
  },
  nbrCoefs: {
    type: 'integer',
    default: 12,
    meta: { kind: 'static' }
  },
  minFreq: {
    type: 'float',
    default: 0,
    meta: { kind: 'static' }
  },
  maxFreq: {
    type: 'float',
    default: null,
    nullable: true,
    meta: { kind: 'static' }
  }
};

/**
 * Compute the Mfcc of the incomming `signal`. Is basically a wrapper around
 * [`Fft`]{@link module:common.operator.Fft}, [`Mel`]{@link module:common.operator.Mel}
 * and [`Dct`]{@link module:common.operator.Dct}.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {nbrBands} [options.nbrBands=24] - Number of Mel bands.
 * @param {nbrCoefs} [options.nbrCoefs=12] - Number of output coefs.
 *
 * @see {@link module:common.operator.Fft}
 * @see {@link module:common.operator.Mel}
 * @see {@link module:common.operator.Dct}
 *
 * @example
 * import lfo from 'waves-lfo/node'
 *
 * const audioInFile = new lfo.source.AudioInFile({
 *   filename: 'path/to/file',
 *   frameSize: 512,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 256,
 * });
 *
 * const mfcc = new lfo.operator.Mfcc({
 *   nbrBands: 24,
 *   nbrCoefs: 12,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInFile.connect(slicer);
 * slicer.connect(mfcc);
 * mfcc.connect(logger);
 *
 * audioInFile.start();
 */

var Mfcc = function (_BaseLfo) {
  (0, _inherits3.default)(Mfcc, _BaseLfo);

  function Mfcc(options) {
    (0, _classCallCheck3.default)(this, Mfcc);
    return (0, _possibleConstructorReturn3.default)(this, (Mfcc.__proto__ || (0, _getPrototypeOf2.default)(Mfcc)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Mfcc, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var nbrBands = this.params.get('nbrBands');
      var nbrCoefs = this.params.get('nbrCoefs');
      var minFreq = this.params.get('minFreq');
      var maxFreq = this.params.get('maxFreq');
      var inputFrameSize = prevStreamParams.frameSize;
      var inputFrameRate = prevStreamParams.frameRate;
      var inputSampleRate = prevStreamParams.sourceSampleRate;
      var nbrBins = inputFrameSize / 2 + 1;

      this.streamParams.frameSize = nbrCoefs;
      this.streamParams.frameType = 'vector';
      this.streamParams.description = [];

      this.fft = new _Fft2.default({
        window: 'hann',
        mode: 'power',
        norm: 'power',
        size: inputFrameSize
      });

      this.mel = new _Mel2.default({
        nbrBands: nbrBands,
        log: true,
        power: 1,
        minFreq: minFreq,
        maxFreq: maxFreq
      });

      this.dct = new _Dct2.default({
        order: nbrCoefs
      });

      // init streams
      this.fft.initStream({
        frameType: 'signal',
        frameSize: inputFrameSize,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.mel.initStream({
        frameType: 'vector',
        frameSize: nbrBins,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.dct.initStream({
        frameType: 'vector',
        frameSize: nbrBands,
        frameRate: inputFrameRate,
        sourceSampleRate: inputSampleRate
      });

      this.propagateStreamParams();
    }

    /**
     * Use the `Mfcc` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array} data - Signal chunk to analyse.
     * @return {Array} - Mfcc coefficients.
     *
     * @example
     * const mfcc = new lfo.operator.Mfcc();
     * // mandatory for use in standalone mode
     * mfcc.initStream({ frameSize: 256, frameType: 'vector' });
     * mfcc.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(data) {
      var output = this.frame.data;
      var nbrCoefs = this.params.get('nbrCoefs');

      var bins = this.fft.inputSignal(data);
      var melBands = this.mel.inputVector(bins);
      // console.log(melBands);
      var coefs = this.dct.inputSignal(melBands);

      for (var i = 0; i < nbrCoefs; i++) {
        output[i] = coefs[i];
      }return output;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Mfcc;
}(_BaseLfo3.default);

exports.default = Mfcc;

},{"../core/BaseLfo":16,"./Dct":19,"./Fft":20,"./Mel":23,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find minimun and maximum values of a given `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 512,
 *   frameType: 'signal',
 *   sampleRate: 0,
 * });
 *
 * const minMax = new lfo.operator.MinMax();
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(minMax);
 * minMax.connect(logger);
 * eventIn.start()
 *
 * // create a frame
 * const signal = new Float32Array(512);
 * for (let i = 0; i < 512; i++)
 *   signal[i] = i + 1;
 *
 * eventIn.process(null, signal);
 * > [1, 512];
 */
var MinMax = function (_BaseLfo) {
  (0, _inherits3.default)(MinMax, _BaseLfo);

  function MinMax() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MinMax);

    // throw errors if options are given
    return (0, _possibleConstructorReturn3.default)(this, (MinMax.__proto__ || (0, _getPrototypeOf2.default)(MinMax)).call(this, {}, options));
  }

  /** @private */


  (0, _createClass3.default)(MinMax, [{
    key: 'processStreamParams',
    value: function processStreamParams() {
      var prevStreamParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['min', 'max'];

      this.propagateStreamParams();
    }

    /**
     * Use the `MinMax` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Float32Array|Array} data - Input signal.
     * @return {Array} - Min and max values.
     *
     * @example
     * const minMax = new MinMax();
     * minMax.initStream({ frameType: 'signal', frameSize: 10 });
     *
     * minMax.inputSignal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
     * > [0, 5]
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(data) {
      var outData = this.frame.data;
      var min = +Infinity;
      var max = -Infinity;

      for (var i = 0, l = data.length; i < l; i++) {
        var value = data[i];
        if (value < min) min = value;
        if (value > max) max = value;
      }

      outData[0] = min;
      outData[1] = max;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return MinMax;
}(_BaseLfo3.default);

exports.default = MinMax;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  order: {
    type: 'integer',
    min: 1,
    max: 1e9,
    default: 10,
    metas: { kind: 'dynamic' }
  },
  fill: {
    type: 'float',
    min: -Infinity,
    max: +Infinity,
    default: 0,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute a moving average operation on the incomming frames (`scalar` or
 * `vector` type). If the input is of type vector, the moving average is
 * computed for each dimension in parallel. If the source sample rate is defined
 * frame time is shifted to the middle of the window defined by the order.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=10] - Number of successive values on which
 *  the average is computed.
 * @param {Number} [options.fill=0] - Value to fill the ring buffer with before
 *  the first input frame.
 *
 * @todo - Implement `processSignal` ?
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 2,
 *   frameType: 'vector'
 * });
 *
 * const movingAverage = new lfo.operator.MovingAverage({
 *   order: 5,
 *   fill: 0
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(movingAverage);
 * movingAverage.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.process(null, [1, 1]);
 * > [0.2, 0.2]
 * eventIn.process(null, [1, 1]);
 * > [0.4, 0.4]
 * eventIn.process(null, [1, 1]);
 * > [0.6, 0.6]
 * eventIn.process(null, [1, 1]);
 * > [0.8, 0.8]
 * eventIn.process(null, [1, 1]);
 * > [1, 1]
 */

var MovingAverage = function (_BaseLfo) {
  (0, _inherits3.default)(MovingAverage, _BaseLfo);

  function MovingAverage() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MovingAverage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MovingAverage.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage)).call(this, definitions, options));

    _this.sum = null;
    _this.ringBuffer = null;
    _this.ringIndex = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(MovingAverage, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(MovingAverage.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      // @todo - should be done lazily in process
      switch (name) {
        case 'order':
          this.processStreamParams();
          this.resetStream();
          break;
        case 'fill':
          this.resetStream();
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var frameSize = this.streamParams.frameSize;
      var order = this.params.get('order');

      this.ringBuffer = new Float32Array(order * frameSize);

      if (frameSize > 1) this.sum = new Float32Array(frameSize);else this.sum = 0;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(MovingAverage.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingAverage.prototype), 'resetStream', this).call(this);

      var order = this.params.get('order');
      var fill = this.params.get('fill');
      var ringBuffer = this.ringBuffer;
      var ringLength = ringBuffer.length;

      for (var i = 0; i < ringLength; i++) {
        ringBuffer[i] = fill;
      }var fillSum = order * fill;
      var frameSize = this.streamParams.frameSize;

      if (frameSize > 1) {
        for (var _i = 0; _i < frameSize; _i++) {
          this.sum[_i] = fillSum;
        }
      } else {
        this.sum = fillSum;
      }

      this.ringIndex = 0;
    }

    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(value) {
      this.frame.data[0] = this.inputScalar(frame.data[0]);
    }

    /**
     * Use the `MovingAverage` operator in `standalone` mode (i.e. outside of a
     * graph) with a `scalar` input.
     *
     * @param {Number} value - Value to feed the moving average with.
     * @return {Number} - Average value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingAverage = new lfo.operator.MovingAverage({ order: 5 });
     * movingAverage.initStream({ frameSize: 1, frameType: 'scalar' });
     *
     * movingAverage.inputScalar(1);
     * > 0.2
     * movingAverage.inputScalar(1);
     * > 0.4
     * movingAverage.inputScalar(1);
     * > 0.6
     */

  }, {
    key: 'inputScalar',
    value: function inputScalar(value) {
      var order = this.params.get('order');
      var ringIndex = this.ringIndex;
      var ringBuffer = this.ringBuffer;
      var sum = this.sum;

      sum -= ringBuffer[ringIndex];
      sum += value;

      this.sum = sum;
      this.ringBuffer[ringIndex] = value;
      this.ringIndex = (ringIndex + 1) % order;

      return sum / order;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }

    /**
     * Use the `MovingAverage` operator in `standalone` mode (i.e. outside of a
     * graph) with a `vector` input.
     *
     * @param {Array} values - Values to feed the moving average with.
     * @return {Float32Array} - Average value for each dimension.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingAverage = new lfo.operator.MovingAverage({ order: 5 });
     * movingAverage.initStream({ frameSize: 2, frameType: 'scalar' });
     *
     * movingAverage.inputArray([1, 1]);
     * > [0.2, 0.2]
     * movingAverage.inputArray([1, 1]);
     * > [0.4, 0.4]
     * movingAverage.inputArray([1, 1]);
     * > [0.6, 0.6]
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var order = this.params.get('order');
      var outFrame = this.frame.data;
      var frameSize = this.streamParams.frameSize;
      var ringIndex = this.ringIndex;
      var ringOffset = ringIndex * frameSize;
      var ringBuffer = this.ringBuffer;
      var sum = this.sum;
      var scale = 1 / order;

      for (var i = 0; i < frameSize; i++) {
        var ringBufferIndex = ringOffset + i;
        var value = values[i];
        var localSum = sum[i];

        localSum -= ringBuffer[ringBufferIndex];
        localSum += value;

        this.sum[i] = localSum;
        outFrame[i] = localSum * scale;
        ringBuffer[ringBufferIndex] = value;
      }

      this.ringIndex = (ringIndex + 1) % order;

      return outFrame;
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);

      var order = this.params.get('order');
      var time = frame.time;
      // shift time to take account of the added latency
      if (this.streamParams.sourceSampleRate) time -= 0.5 * (order - 1) / this.streamParams.sourceSampleRate;

      this.frame.time = time;
      this.frame.metadata = frame.metadata;

      this.propagateFrame();
    }
  }]);
  return MovingAverage;
}(_BaseLfo3.default);

exports.default = MovingAverage;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  order: {
    type: 'integer',
    min: 1,
    max: 1e9,
    default: 9,
    metas: { kind: 'dynamic' }
  },
  fill: {
    type: 'float',
    min: -Infinity,
    max: +Infinity,
    default: 0,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute a moving median operation on the incomming frames (`scalar` or
 * `vector` type). If the input is of type vector, the moving median is
 * computed for each dimension in parallel. If the source sample rate is defined
 * frame time is shifted to the middle of the window defined by the order.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.order=9] - Number of successive values in which
 *  the median is searched. This value must be odd. _dynamic parameter_
 * @param {Number} [options.fill=0] - Value to fill the ring buffer with before
 *  the first input frame. _dynamic parameter_
 *
 * @todo - Implement `processSignal`
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameSize: 2,
 *   frameType: 'vector',
 * });
 *
 * const movingMedian = new lfo.operator.MovingMedian({
 *   order: 5,
 *   fill: 0,
 * });
 *
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * eventIn.connect(movingMedian);
 * movingMedian.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.processFrame(null, [1, 1]);
 * > [0, 0]
 * eventIn.processFrame(null, [2, 2]);
 * > [0, 0]
 * eventIn.processFrame(null, [3, 3]);
 * > [1, 1]
 * eventIn.processFrame(null, [4, 4]);
 * > [2, 2]
 * eventIn.processFrame(null, [5, 5]);
 * > [3, 3]
 */

var MovingMedian = function (_BaseLfo) {
  (0, _inherits3.default)(MovingMedian, _BaseLfo);

  function MovingMedian() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MovingMedian);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MovingMedian.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian)).call(this, definitions, options));

    _this.ringBuffer = null;
    _this.sorter = null;
    _this.ringIndex = 0;

    _this._ensureOddOrder();
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(MovingMedian, [{
    key: '_ensureOddOrder',
    value: function _ensureOddOrder() {
      if (this.params.get('order') % 2 === 0) throw new Error('Invalid value ' + order + ' for param "order" - should be odd');
    }

    /** @private */

  }, {
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(MovingMedian.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      switch (name) {
        case 'order':
          this._ensureOddOrder();
          this.processStreamParams();
          this.resetStream();
          break;
        case 'fill':
          this.resetStream();
          break;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      // outType is similar to input type

      var frameSize = this.streamParams.frameSize;
      var order = this.params.get('order');

      this.ringBuffer = new Float32Array(frameSize * order);
      this.sortBuffer = new Float32Array(frameSize * order);

      this.minIndices = new Uint32Array(frameSize);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(MovingMedian.prototype.__proto__ || (0, _getPrototypeOf2.default)(MovingMedian.prototype), 'resetStream', this).call(this);

      var fill = this.params.get('fill');
      var ringBuffer = this.ringBuffer;
      var ringLength = ringBuffer.length;

      for (var i = 0; i < ringLength; i++) {
        this.ringBuffer[i] = fill;
      }this.ringIndex = 0;
    }

    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(frame) {
      this.frame.data[0] = this.inputScalar(frame.data[0]);
    }

    /**
     * Allows for the use of a `MovingMedian` outside a graph (e.g. inside
     * another node), in this case `processStreamParams` and `resetStream`
     * should be called manually on the node.
     *
     * @param {Number} value - Value to feed the moving median with.
     * @return {Number} - Median value.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingMedian = new MovingMedian({ order: 5 });
     * movingMedian.initStream({ frameSize: 1, frameType: 'scalar' });
     *
     * movingMedian.inputScalar(1);
     * > 0
     * movingMedian.inputScalar(2);
     * > 0
     * movingMedian.inputScalar(3);
     * > 1
     * movingMedian.inputScalar(4);
     * > 2
     */

  }, {
    key: 'inputScalar',
    value: function inputScalar(value) {
      var ringIndex = this.ringIndex;
      var ringBuffer = this.ringBuffer;
      var sortBuffer = this.sortBuffer;
      var order = this.params.get('order');
      var medianIndex = (order - 1) / 2;
      var startIndex = 0;

      ringBuffer[ringIndex] = value;

      for (var i = 0; i <= medianIndex; i++) {
        var min = +Infinity;
        var minIndex = null;

        for (var j = startIndex; j < order; j++) {
          if (i === 0) sortBuffer[j] = ringBuffer[j];

          if (sortBuffer[j] < min) {
            min = sortBuffer[j];
            minIndex = j;
          }
        }

        // swap minIndex and startIndex
        var cache = sortBuffer[startIndex];
        sortBuffer[startIndex] = sortBuffer[minIndex];
        sortBuffer[minIndex] = cache;

        startIndex += 1;
      }

      var median = sortBuffer[medianIndex];
      this.ringIndex = (ringIndex + 1) % order;

      return median;
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      this.inputVector(frame.data);
    }

    /**
     * Allows for the use of a `MovingMedian` outside a graph (e.g. inside
     * another node), in this case `processStreamParams` and `resetStream`
     * should be called manually on the node.
     *
     * @param {Array} values - Values to feed the moving median with.
     * @return {Float32Array} - Median values for each dimension.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const movingMedian = new MovingMedian({ order: 3, fill: 0 });
     * movingMedian.initStream({ frameSize: 3, frameType: 'vector' });
     *
     * movingMedian.inputArray([1, 1]);
     * > [0, 0]
     * movingMedian.inputArray([2, 2]);
     * > [1, 1]
     * movingMedian.inputArray([3, 3]);
     * > [2, 2]
     */

  }, {
    key: 'inputVector',
    value: function inputVector(values) {
      var order = this.params.get('order');
      var ringBuffer = this.ringBuffer;
      var ringIndex = this.ringIndex;
      var sortBuffer = this.sortBuffer;
      var outFrame = this.frame.data;
      var minIndices = this.minIndices;
      var frameSize = this.streamParams.frameSize;
      var medianIndex = Math.floor(order / 2);
      var startIndex = 0;

      for (var i = 0; i <= medianIndex; i++) {

        for (var j = 0; j < frameSize; j++) {
          outFrame[j] = +Infinity;
          minIndices[j] = 0;

          for (var k = startIndex; k < order; k++) {
            var index = k * frameSize + j;

            // update ring buffer corresponding to current
            if (k === ringIndex && i === 0) ringBuffer[index] = values[j];

            // copy value in sort buffer on first pass
            if (i === 0) sortBuffer[index] = ringBuffer[index];

            // find minium in the remaining array
            if (sortBuffer[index] < outFrame[j]) {
              outFrame[j] = sortBuffer[index];
              minIndices[j] = index;
            }
          }

          // swap minimum and curent index
          var swapIndex = startIndex * frameSize + j;
          var v = sortBuffer[swapIndex];
          sortBuffer[swapIndex] = sortBuffer[minIndices[j]];
          sortBuffer[minIndices[j]] = v;

          // store this minimum value as current result
          outFrame[j] = sortBuffer[swapIndex];
        }

        startIndex += 1;
      }

      this.ringIndex = (ringIndex + 1) % order;

      return this.frame.data;
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.preprocessFrame();
      this.processFunction(frame);

      var order = this.params.get('order');
      var time = frame.time;
      // shift time to take account of the added latency
      if (this.streamParams.sourceSampleRate) time -= 0.5 * (order - 1) / this.streamParams.sourceSampleRate;

      this.frame.time = time;
      this.frame.metadata = frame.metadata;

      this.propagateFrame(time, this.outFrame, metadata);
    }
  }]);
  return MovingMedian;
}(_BaseLfo3.default);

exports.default = MovingMedian;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  state: {
    type: 'enum',
    default: 'on',
    list: ['on', 'off'],
    metas: { kind: 'dynamic' }
  }
};

/**
 * The OnOff operator allows to stop the propagation of the stream in a
 * subgraph. When "on", frames are propagated, when "off" the propagation is
 * stopped.
 *
 * The `streamParams` propagation is never bypassed so the subsequent subgraph
 * is always ready for incomming frames.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {String} [options.state='on'] - Default state.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const frames = [
 *   { time: 0, data: [1, 2] },
 *   { time: 1, data: [3, 4] },
 *   { time: 2, data: [5, 6] },
 * ];
 *
 * const eventIn = new EventIn({
 *   frameSize: 2,
 *   frameRate: 0,
 *   frameType: 'vector',
 * });
 *
 * const onOff = new OnOff();
 *
 * const logger = new Logger({ data: true });
 *
 * eventIn.connect(onOff);
 * onOff.connect(logger);
 *
 * eventIn.start();
 *
 * eventIn.processFrame(frames[0]);
 * > [0, 1]
 *
 * // bypass subgraph
 * onOff.setState('off');
 * eventIn.processFrame(frames[1]);
 *
 * // re-open subgraph
 * onOff.setState('on');
 * eventIn.processFrame(frames[2]);
 * > [5, 6]
 */

var OnOff = function (_BaseLfo) {
  (0, _inherits3.default)(OnOff, _BaseLfo);

  function OnOff() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, OnOff);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OnOff.__proto__ || (0, _getPrototypeOf2.default)(OnOff)).call(this, definitions, options));

    _this.state = _this.params.get('state');
    return _this;
  }

  /**
   * Set the state of the `OnOff`.
   *
   * @param {String} state - New state of the operator (`on` or `off`)
   */


  (0, _createClass3.default)(OnOff, [{
    key: 'setState',
    value: function setState(state) {
      if (definitions.state.list.indexOf(state) === -1) throw new Error('Invalid switch state value "' + state + '" [valid values: "on"/"off"]');

      this.state = state;
    }

    // define all possible stream API
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (this.state === 'on') {
        this.prepareFrame();

        this.frame.time = frame.time;
        this.frame.metadata = frame.metadata;
        this.frame.data = frame.data;

        this.propagateFrame();
      }
    }
  }]);
  return OnOff;
}(_BaseLfo3.default);

exports.default = OnOff;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqrt = Math.sqrt;

var definitions = {
  power: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Compute the Root Mean Square of a `signal`.
 *
 * _support `standalone` usage_
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.power=false] - If `true` remove the "R" of the
 *  "Rms" and return the squared result (i.e. power).
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * // assuming some `AudioBuffer`
 * const audioInBuffer = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 *   frameSize: 512,
 * });
 *
 * const rms = new lfo.operator.Rms();
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * audioInBuffer.connect(rms);
 * rms.connect(logger);
 *
 * audioInBuffer.start();
 */

var Rms = function (_BaseLfo) {
  (0, _inherits3.default)(Rms, _BaseLfo);

  function Rms() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Rms);
    return (0, _possibleConstructorReturn3.default)(this, (Rms.__proto__ || (0, _getPrototypeOf2.default)(Rms)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Rms, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameSize = 1;
      this.streamParams.frameType = 'scalar';
      this.streamParams.description = ['rms'];

      this.propagateStreamParams();
    }

    /**
     * Allows for the use of a `Rms` outside a graph (e.g. inside
     * another node). Return the rms of the given signal block.
     *
     * @param {Number} signal - Signal block to be computed.
     * @return {Number} - rms of the input signal.
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const rms = new lfo.operator.Rms();
     * rms.initStream({ frameType: 'signal', frameSize: 1000 });
     *
     * const results = rms.inputSignal([...values]);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(signal) {
      var power = this.params.get('power');
      var length = signal.length;
      var rms = 0;

      for (var i = 0; i < length; i++) {
        rms += signal[i] * signal[i];
      }rms = rms / length;

      if (!power) rms = sqrt(rms);

      return rms;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.frame.data[0] = this.inputSignal(frame.data);
    }
  }]);
  return Rms;
}(_BaseLfo3.default);

exports.default = Rms;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

var _MovingAverage = require('./MovingAverage');

var _MovingAverage2 = _interopRequireDefault(_MovingAverage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var min = Math.min;
var max = Math.max;

var definitions = {
  logInput: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dyanmic' }
  },
  minInput: {
    type: 'float',
    default: 0.000000000001,
    metas: { kind: 'dyanmic' }
  },
  filterOrder: {
    type: 'integer',
    default: 5,
    metas: { kind: 'dyanmic' }
  },
  threshold: {
    type: 'float',
    default: 3,
    metas: { kind: 'dyanmic' }
  },
  offThreshold: {
    type: 'float',
    default: -Infinity,
    metas: { kind: 'dyanmic' }
  },
  minInter: {
    type: 'float',
    default: 0.050,
    metas: { kind: 'dyanmic' }
  },
  maxDuration: {
    type: 'float',
    default: Infinity,
    metas: { kind: 'dyanmic' }
  }
};

/**
 * Create segments based on attacks.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.logInput=false] - Apply log on the input.
 * @param {Number} [options.minInput=0.000000000001] - Minimum value to use as
 *  input.
 * @param {Number} [options.filterOrder=5] - Order of the internally used moving
 *  average.
 * @param {Number} [options.threshold=3] - Threshold that triggers a segment
 *  start.
 * @param {Number} [options.offThreshold=-Infinity] - Threshold that triggers
 *  a segment end.
 * @param {Number} [options.minInter=0.050] - Minimum delay between two semgents.
 * @param {Number} [options.maxDuration=Infinity] - Maximum duration of a segment.
 *
 * @example
 * // assuming a stream from the microphone
 * const source = audioContext.createMediaStreamSource(stream);
 *
 * const audioInNode = new lfo.source.AudioInNode({
 *   sourceNode: source,
 *   audioContext: audioContext,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: frameSize,
 *   hopSize: hopSize,
 *   centeredTimeTags: true
 * });
 *
 * const power = new lfo.operator.RMS({
 *   power: true,
 * });
 *
 * const segmenter = new lfo.operator.Segmenter({
 *   logInput: true,
 *   filterOrder: 5,
 *   threshold: 3,
 *   offThreshold: -Infinity,
 *   minInter: 0.050,
 *   maxDuration: 0.050,
 * });
 *
 * const logger = new lfo.sink.Logger({ time: true });
 *
 * audioInNode.connect(slicer);
 * slicer.connect(power);
 * power.connect(segmenter);
 * segmenter.connect(logger);
 *
 * audioInNode.start();
 */

var Segmenter = function (_BaseLfo) {
  (0, _inherits3.default)(Segmenter, _BaseLfo);

  function Segmenter(options) {
    (0, _classCallCheck3.default)(this, Segmenter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Segmenter.__proto__ || (0, _getPrototypeOf2.default)(Segmenter)).call(this, definitions, options));

    _this.insideSegment = false;
    _this.onsetTime = -Infinity;

    // stats
    _this.min = Infinity;
    _this.max = -Infinity;
    _this.sum = 0;
    _this.sumOfSquares = 0;
    _this.count = 0;

    var minInput = _this.params.get('minInput');
    var fill = minInput;

    if (_this.params.get('logInput') && minInput > 0) fill = Math.log(minInput);

    _this.movingAverage = new _MovingAverage2.default({
      order: _this.params.get('filterOrder'),
      fill: fill
    });

    _this.lastMvavrg = fill;
    return _this;
  }

  (0, _createClass3.default)(Segmenter, [{
    key: 'onParamUpdate',
    value: function onParamUpdate(name, value, metas) {
      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'onParamUpdate', this).call(this, name, value, metas);

      if (name === 'filterOrder') this.movingAverage.params.set('order', value);
    }
  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 5;
      this.streamParams.frameRate = 0;
      this.streamParams.description = ['duration', 'min', 'max', 'mean', 'stddev'];

      this.movingAverage.initStream(prevStreamParams);

      this.propagateStreamParams();
    }
  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'resetStream', this).call(this);
      this.movingAverage.resetStream();
      this.resetSegment();
    }
  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      if (this.insideSegment) this.outputSegment(endTime);

      (0, _get3.default)(Segmenter.prototype.__proto__ || (0, _getPrototypeOf2.default)(Segmenter.prototype), 'finalizeStream', this).call(this, endTime);
    }
  }, {
    key: 'resetSegment',
    value: function resetSegment() {
      this.insideSegment = false;
      this.onsetTime = -Infinity;
      // stats
      this.min = Infinity;
      this.max = -Infinity;
      this.sum = 0;
      this.sumOfSquares = 0;
      this.count = 0;
    }
  }, {
    key: 'outputSegment',
    value: function outputSegment(endTime) {
      var outData = this.frame.data;
      outData[0] = endTime - this.onsetTime;
      outData[1] = this.min;
      outData[2] = this.max;

      var norm = 1 / this.count;
      var mean = this.sum * norm;
      var meanOfSquare = this.sumOfSquares * norm;
      var squareOfmean = mean * mean;

      outData[3] = mean;
      outData[4] = 0;

      if (meanOfSquare > squareOfmean) outData[4] = Math.sqrt(meanOfSquare - squareOfmean);

      this.frame.time = this.onsetTime;

      this.propagateFrame();
    }
  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var logInput = this.params.get('logInput');
      var minInput = this.params.get('minInput');
      var threshold = this.params.get('threshold');
      var minInter = this.params.get('minInter');
      var maxDuration = this.params.get('maxDuration');
      var offThreshold = this.params.get('offThreshold');
      var rawValue = frame.data[0];
      var time = frame.time;
      var value = Math.max(rawValue, minInput);

      if (logInput) value = Math.log(value);

      var diff = value - this.lastMvavrg;
      this.lastMvavrg = this.movingAverage.inputScalar(value);

      // update frame metadata
      this.frame.metadata = frame.metadata;

      if (diff > threshold && time - this.onsetTime > minInter) {
        if (this.insideSegment) this.outputSegment(time);

        // start segment
        this.insideSegment = true;
        this.onsetTime = time;
        this.max = -Infinity;
      }

      if (this.insideSegment) {
        this.min = min(this.min, rawValue);
        this.max = max(this.max, rawValue);
        this.sum += rawValue;
        this.sumOfSquares += rawValue * rawValue;
        this.count++;

        if (time - this.onsetTime >= maxDuration || value <= offThreshold) {
          this.outputSegment(time);
          this.insideSegment = false;
        }
      }
    }
  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);
      // do not propagate here as the frameRate is now zero
    }
  }]);
  return Segmenter;
}(_BaseLfo3.default);

exports.default = Segmenter;

},{"../core/BaseLfo":16,"./MovingAverage":26,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  index: {
    type: 'integer',
    default: 0,
    metas: { kind: 'static' }
  },
  indices: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  }
};

/**
 * Select one or several indices from a `vector` input. If only one index is
 * selected, the output will be of type `scalar`, otherwise the output will
 * be a vector containing the selected indices.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default values.
 * @param {Number} options.index - Index to select from the input frame.
 * @param {Array<Number>} options.indices - Indices to select from the input
 *  frame, if defined, take precedance over `option.index`.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'vector',
 *   frameSize: 3,
 * });
 *
 * const select = new lfo.operator.Select({
 *   index: 1,
 * });
 *
 * eventIn.start();
 * eventIn.process(0, [0, 1, 2]);
 * > 1
 * eventIn.process(0, [3, 4, 5]);
 * > 4
 */

var Select = function (_BaseLfo) {
  (0, _inherits3.default)(Select, _BaseLfo);

  function Select() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Select);
    return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Select, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      var _this2 = this;

      this.prepareStreamParams(prevStreamParams);

      var index = this.params.get('index');
      var indices = this.params.get('indices');

      var max = indices !== null ? Math.max.apply(null, indices) : index;

      if (max >= prevStreamParams.frameSize) throw new Error('Invalid select index "' + max + '"');

      this.streamParams.frameType = indices !== null ? 'vector' : 'scalar';
      this.streamParams.frameSize = indices !== null ? indices.length : 1;

      this.select = indices !== null ? indices : [index];

      // steal description() from parent
      if (prevStreamParams.description) {
        this.select.forEach(function (val, index) {
          _this2.streamParams.description[index] = prevStreamParams.description[val];
        });
      }

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {
      var data = frame.data;
      var outData = this.frame.data;
      var select = this.select;

      for (var i = 0; i < select.length; i++) {
        outData[i] = data[select[i]];
      }
    }
  }]);
  return Select;
}(_BaseLfo3.default);

exports.default = Select;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  frameSize: {
    type: 'integer',
    default: 512,
    metas: { kind: 'static' }
  },
  hopSize: { // should be nullable
    type: 'integer',
    default: null,
    nullable: true,
    metas: { kind: 'static' }
  },
  centeredTimeTags: {
    type: 'boolean',
    default: false
  }
};

/**
 * Change the `frameSize` and `hopSize` of a `signal` input according to
 * the given options.
 * This operator updates the stream parameters according to its configuration.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.frameSize=512] - Frame size of the output signal.
 * @param {Number} [options.hopSize=null] - Number of samples between two
 *  consecutive frames. If null, `hopSize` is set to `frameSize`.
 * @param {Boolean} [options.centeredTimeTags] - Move the time tag to the middle
 *  of the frame.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'signal',
 *   frameSize: 10,
 *   sampleRate: 2,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 4,
 *   hopSize: 2
 * });
 *
 * const logger = new lfo.sink.Logger({ time: true, data: true });
 *
 * eventIn.connect(slicer);
 * slicer.connect(logger);
 * eventIn.start();
 *
 * eventIn.process(0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
 * > { time: 0, data: [0, 1, 2, 3] }
 * > { time: 1, data: [2, 3, 4, 5] }
 * > { time: 2, data: [4, 5, 6, 7] }
 * > { time: 3, data: [6, 7, 8, 9] }
 */

var Slicer = function (_BaseLfo) {
  (0, _inherits3.default)(Slicer, _BaseLfo);

  function Slicer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Slicer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Slicer.__proto__ || (0, _getPrototypeOf2.default)(Slicer)).call(this, definitions, options));

    var hopSize = _this.params.get('hopSize');
    var frameSize = _this.params.get('frameSize');

    if (!hopSize) _this.params.set('hopSize', frameSize);

    _this.params.addListener(_this.onParamUpdate.bind(_this));

    _this.frameIndex = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Slicer, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var hopSize = this.params.get('hopSize');
      var frameSize = this.params.get('frameSize');

      this.streamParams.frameSize = frameSize;
      this.streamParams.frameRate = prevStreamParams.sourceSampleRate / hopSize;

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'resetStream',
    value: function resetStream() {
      (0, _get3.default)(Slicer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Slicer.prototype), 'resetStream', this).call(this);
      this.frameIndex = 0;
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      if (this.frameIndex > 0) {
        var frameRate = this.streamParams.frameRate;
        var frameSize = this.streamParams.frameSize;
        var data = this.frame.data;
        // set the time of the last frame
        this.frame.time += 1 / frameRate;

        for (var i = this.frameIndex; i < frameSize; i++) {
          data[i] = 0;
        }this.propagateFrame();
      }

      (0, _get3.default)(Slicer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Slicer.prototype), 'finalizeStream', this).call(this, endTime);
    }

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();
      this.processFunction(frame);
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      var time = frame.time;
      var block = frame.data;
      var metadata = frame.metadata;

      var centeredTimeTags = this.params.get('centeredTimeTags');
      var hopSize = this.params.get('hopSize');
      var outFrame = this.frame.data;
      var frameSize = this.streamParams.frameSize;
      var sampleRate = this.streamParams.sourceSampleRate;
      var samplePeriod = 1 / sampleRate;
      var blockSize = block.length;

      var frameIndex = this.frameIndex;
      var blockIndex = 0;

      while (blockIndex < blockSize) {
        var numSkip = 0;

        // skip block samples for negative frameIndex (frameSize < hopSize)
        if (frameIndex < 0) {
          numSkip = -frameIndex;
          frameIndex = 0; // reset `frameIndex`
        }

        if (numSkip < blockSize) {
          blockIndex += numSkip; // skip block segment
          // can copy all the rest of the incoming block
          var numCopy = blockSize - blockIndex;
          // connot copy more than what fits into the frame
          var maxCopy = frameSize - frameIndex;

          if (numCopy >= maxCopy) numCopy = maxCopy;

          // copy block segment into frame
          var copy = block.subarray(blockIndex, blockIndex + numCopy);
          outFrame.set(copy, frameIndex);
          // advance block and frame index
          blockIndex += numCopy;
          frameIndex += numCopy;

          // send frame when completed
          if (frameIndex === frameSize) {
            // define time tag for the outFrame according to configuration
            if (centeredTimeTags) this.frame.time = time + (blockIndex - frameSize / 2) * samplePeriod;else this.frame.time = time + (blockIndex - frameSize) * samplePeriod;

            this.frame.metadata = metadata;
            // forward to next nodes
            this.propagateFrame();

            // shift frame left
            if (hopSize < frameSize) outFrame.set(outFrame.subarray(hopSize, frameSize), 0);

            frameIndex -= hopSize; // hop forward
          }
        } else {
          // skip entire block
          var blockRest = blockSize - blockIndex;
          frameIndex += blockRest;
          blockIndex += blockRest;
        }
      }

      this.frameIndex = frameIndex;
    }
  }]);
  return Slicer;
}(_BaseLfo3.default);

exports.default = Slicer;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/get":59,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ceil = Math.ceil;

/**
 * paper: http://recherche.ircam.fr/equipes/pcm/cheveign/pss/2002_JASA_YIN.pdf
 * implementation based on https://github.com/ashokfernandez/Yin-Pitch-Tracking
 * @private
 */

var definitions = {
  threshold: {
    type: 'float',
    default: 0.1, // default from paper
    metas: { kind: 'static' }
  },
  downSamplingExp: { // downsampling factor
    type: 'integer',
    default: 2,
    min: 0,
    max: 3,
    metas: { kind: 'static' }
  },
  minFreq: { //
    type: 'float',
    default: 60, // mean 735 samples
    min: 0,
    metas: { kind: 'static' }
  }
};

/**
 * Yin fundamental frequency estimator, based on algorithm described in
 * [YIN, a fundamental frequency estimator for speech and music](http://recherche.ircam.fr/equipes/pcm/cheveign/pss/2002_JASA_YIN.pdf)
 * by Cheveigne and Kawahara.
 * On each frame, this operator propagate a vector containing the following
 * values: `frequency`, `probability`.
 *
 * For good results the input frame size should be large (1024 or 2048).
 *
 * _support `standalone` usage_
 *
 * @note - In node for a frame of 2048 samples, average computation time is:
 *         0.00016742283339993389 second.
 *
 * @memberof module:common.operator
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.threshold=0.1] - Absolute threshold to test the
 *  normalized difference (see paper for more informations).
 * @param {Number} [options.downSamplingExp=2] - Down sample the input frame by
 *  a factor of 2 at the power of `downSamplingExp` (min=0 and max=3) for
 *  performance improvements.
 * @param {Number} [options.minFreq=60] - Minimum frequency the operator can
 *  search for. This parameter defines the size of the autocorrelation performed
 *  on the signal, the input frame size should be around 2 time this size for
 *  good results (i.e. `inputFrameSize ≈ 2 * (samplingRate / minFreq)`).
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * // assuming some AudioBuffer
 * const source = new lfo.source.AudioInBuffer({
 *   audioBuffer: audioBuffer,
 * });
 *
 * const slicer = new lfo.operator.Slicer({
 *   frameSize: 2048,
 * });
 *
 * const yin = new lfo.operator.Yin();
 * const logger = new lfo.sink.Logger({ data: true });
 *
 * source.connect(slicer);
 * slicer.connect(yin);
 * yin.connect(logger);
 *
 * source.start();
 */

var Yin = function (_BaseLfo) {
  (0, _inherits3.default)(Yin, _BaseLfo);

  function Yin(options) {
    (0, _classCallCheck3.default)(this, Yin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Yin.__proto__ || (0, _getPrototypeOf2.default)(Yin)).call(this, definitions, options));

    _this.probability = 0;
    _this.pitch = -1;

    _this.test = 0;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(Yin, [{
    key: '_downsample',
    value: function _downsample(input, size, output, downSamplingExp) {
      var outputSize = size >> downSamplingExp;
      var i = void 0,
          j = void 0;

      switch (downSamplingExp) {
        case 0:
          // no down sampling
          for (i = 0; i < size; i++) {
            output[i] = input[i];
          }break;
        case 1:
          for (i = 0, j = 0; i < outputSize; i++, j += 2) {
            output[i] = 0.5 * (input[j] + input[j + 1]);
          }break;
        case 2:
          for (i = 0, j = 0; i < outputSize; i++, j += 4) {
            output[i] = 0.25 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3]);
          }break;
        case 3:
          for (i = 0, j = 0; i < outputSize; i++, j += 8) {
            output[i] = 0.125 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3] + input[j + 4] + input[j + 5] + input[j + 6] + input[j + 7]);
          }break;
      }

      return outputSize;
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      this.streamParams.frameType = 'vector';
      this.streamParams.frameSize = 2;
      this.streamParams.description = ['frequency', 'confidence'];

      this.inputFrameSize = prevStreamParams.frameSize;
      // handle params
      var sourceSampleRate = this.streamParams.sourceSampleRate;
      var downSamplingExp = this.params.get('downSamplingExp');
      var downFactor = 1 << downSamplingExp; // 2^n
      var downSR = sourceSampleRate / downFactor;
      var downFrameSize = this.inputFrameSize / downFactor; // n_tick_down // 1 / 2^n

      var minFreq = this.params.get('minFreq');
      // limit min freq, cf. paper IV. sensitivity to parameters
      var minFreqNbrSamples = downSR / minFreq;
      // const bufferSize = prevStreamParams.frameSize;
      this.halfBufferSize = downFrameSize / 2;

      // minimum error to not crash but not enought to have results
      if (minFreqNbrSamples > this.halfBufferSize) throw new Error('Invalid input frame size, too small for given "minFreq"');

      this.downSamplingExp = downSamplingExp;
      this.downSamplingRate = downSR;
      this.downFrameSize = downFrameSize;
      this.buffer = new Float32Array(downFrameSize);
      // autocorrelation buffer
      this.yinBuffer = new Float32Array(this.halfBufferSize);

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: '_downsample',
    value: function _downsample(input, size, output, downSamplingExp) {
      var outputSize = size >> downSamplingExp;
      var i = void 0,
          j = void 0;

      switch (downSamplingExp) {
        case 0:
          // no down sampling
          for (i = 0; i < size; i++) {
            output[i] = input[i];
          }break;
        case 1:
          for (i = 0, j = 0; i < outputSize; i++, j += 2) {
            output[i] = 0.5 * (input[j] + input[j + 1]);
          }break;
        case 2:
          for (i = 0, j = 0; i < outputSize; i++, j += 4) {
            output[i] = 0.25 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3]);
          }break;
        case 3:
          for (i = 0, j = 0; i < outputSize; i++, j += 8) {
            output[i] = 0.125 * (input[j] + input[j + 1] + input[j + 2] + input[j + 3] + input[j + 4] + input[j + 5] + input[j + 6] + input[j + 7]);
          }break;
      }

      return outputSize;
    }

    /**
     * Step 1, 2 and 3 - Squared difference of the shifted signal with itself.
     * cumulative mean normalized difference.
     *
     * @private
     */

  }, {
    key: '_normalizedDifference',
    value: function _normalizedDifference(buffer) {
      var halfBufferSize = this.halfBufferSize;
      var yinBuffer = this.yinBuffer;
      var sum = 0;

      // difference for different shift values (tau)
      for (var tau = 0; tau < halfBufferSize; tau++) {
        var squaredDifference = 0; // reset buffer

        // take difference of the signal with a shifted version of itself then
        // sqaure the result
        for (var i = 0; i < halfBufferSize; i++) {
          var delta = buffer[i] - buffer[i + tau];
          squaredDifference += delta * delta;
        }

        // step 3 - normalize yinBuffer
        if (tau > 0) {
          sum += squaredDifference;
          yinBuffer[tau] = squaredDifference * (tau / sum);
        }
      }

      yinBuffer[0] = 1;
    }

    /**
     * Step 4 - find first best tau that is under the thresold.
     *
     * @private
     */

  }, {
    key: '_absoluteThreshold',
    value: function _absoluteThreshold() {
      var threshold = this.params.get('threshold');
      var yinBuffer = this.yinBuffer;
      var halfBufferSize = this.halfBufferSize;
      var tau = void 0;

      for (tau = 1; tau < halfBufferSize; tau++) {
        if (yinBuffer[tau] < threshold) {
          // keep increasing tau if next value is better
          while (tau + 1 < halfBufferSize && yinBuffer[tau + 1] < yinBuffer[tau]) {
            tau += 1;
          } // best tau found , yinBuffer[tau] can be seen as an estimation of
          // aperiodicity then: periodicity = 1 - aperiodicity
          this.probability = 1 - yinBuffer[tau];
          break;
        }
      }

      // return -1 if not match found
      return tau === halfBufferSize ? -1 : tau;
    }

    /**
     * Step 5 - Find a better fractionnal approximate of tau.
     * this can probably be simplified...
     *
     * @private
     */

  }, {
    key: '_parabolicInterpolation',
    value: function _parabolicInterpolation(tauEstimate) {
      var halfBufferSize = this.halfBufferSize;
      var yinBuffer = this.yinBuffer;
      var betterTau = void 0;
      // @note - tauEstimate cannot be zero as the loop start at 1 in step 4
      var x0 = tauEstimate - 1;
      var x2 = tauEstimate < halfBufferSize - 1 ? tauEstimate + 1 : tauEstimate;

      // if `tauEstimate` is last index, we can't interpolate
      if (x2 === tauEstimate) {
        betterTau = tauEstimate;
      } else {
        var s0 = yinBuffer[x0];
        var s1 = yinBuffer[tauEstimate];
        var s2 = yinBuffer[x2];

        // @note - don't fully understand this formula neither...
        betterTau = tauEstimate + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
      }

      return betterTau;
    }

    /**
     * Use the `Yin` operator in `standalone` mode (i.e. outside of a graph).
     *
     * @param {Array|Float32Array} input - The signal fragment to process.
     * @return {Array} - Array containing the `frequency`, `energy`, `periodicity`
     *  and `AC1`
     *
     * @example
     * import * as lfo from 'waves-lfo/client';
     *
     * const yin = new lfo.operator.Yin();
     * yin.initStream({
     *   frameSize: 2048,
     *   frameType: 'signal',
     *   sourceSampleRate: 44100
     * });
     *
     * const results = yin.inputSignal(signal);
     */

  }, {
    key: 'inputSignal',
    value: function inputSignal(input) {
      this.pitch = -1;
      this.probability = 0;

      var buffer = this.buffer;
      var inputFrameSize = this.inputFrameSize;
      var downSamplingExp = this.downSamplingExp;
      var sampleRate = this.downSamplingRate;
      var outData = this.frame.data;
      var tauEstimate = -1;

      // subsampling
      this._downsample(input, inputFrameSize, buffer, downSamplingExp);
      // step 1, 2, 3 - normalized squared difference of the signal with a
      // shifted version of itself
      this._normalizedDifference(buffer);
      // step 4 - find first best tau estimate that is over the threshold
      tauEstimate = this._absoluteThreshold();

      if (tauEstimate !== -1) {
        // step 5 - so far tau is an integer shift of the signal, check if
        // there is a better fractionnal value around
        tauEstimate = this._parabolicInterpolation(tauEstimate);
        this.pitch = sampleRate / tauEstimate;
      }

      outData[0] = this.pitch;
      outData[1] = this.probability;

      return outData;
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      this.inputSignal(frame.data);
    }
  }]);
  return Yin;
}(_BaseLfo3.default);

exports.default = Yin;

},{"../core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Biquad = require('./Biquad');

var _Biquad2 = _interopRequireDefault(_Biquad);

var _Dct = require('./Dct');

var _Dct2 = _interopRequireDefault(_Dct);

var _Fft = require('./Fft');

var _Fft2 = _interopRequireDefault(_Fft);

var _Magnitude = require('./Magnitude');

var _Magnitude2 = _interopRequireDefault(_Magnitude);

var _MeanStddev = require('./MeanStddev');

var _MeanStddev2 = _interopRequireDefault(_MeanStddev);

var _Mel = require('./Mel');

var _Mel2 = _interopRequireDefault(_Mel);

var _Mfcc = require('./Mfcc');

var _Mfcc2 = _interopRequireDefault(_Mfcc);

var _MinMax = require('./MinMax');

var _MinMax2 = _interopRequireDefault(_MinMax);

var _MovingAverage = require('./MovingAverage');

var _MovingAverage2 = _interopRequireDefault(_MovingAverage);

var _MovingMedian = require('./MovingMedian');

var _MovingMedian2 = _interopRequireDefault(_MovingMedian);

var _OnOff = require('./OnOff');

var _OnOff2 = _interopRequireDefault(_OnOff);

var _Rms = require('./Rms');

var _Rms2 = _interopRequireDefault(_Rms);

var _Segmenter = require('./Segmenter');

var _Segmenter2 = _interopRequireDefault(_Segmenter);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slicer = require('./Slicer');

var _Slicer2 = _interopRequireDefault(_Slicer);

var _Yin = require('./Yin');

var _Yin2 = _interopRequireDefault(_Yin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Biquad: _Biquad2.default,
  Dct: _Dct2.default,
  Fft: _Fft2.default,
  Magnitude: _Magnitude2.default,
  MeanStddev: _MeanStddev2.default,
  Mel: _Mel2.default,
  Mfcc: _Mfcc2.default,
  MinMax: _MinMax2.default,
  MovingAverage: _MovingAverage2.default,
  MovingMedian: _MovingMedian2.default,
  OnOff: _OnOff2.default,
  Rms: _Rms2.default,
  Segmenter: _Segmenter2.default,
  Select: _Select2.default,
  Slicer: _Slicer2.default,
  Yin: _Yin2.default
};

},{"./Biquad":18,"./Dct":19,"./Fft":20,"./Magnitude":21,"./MeanStddev":22,"./Mel":23,"./Mfcc":24,"./MinMax":25,"./MovingAverage":26,"./MovingMedian":27,"./OnOff":28,"./Rms":29,"./Segmenter":30,"./Select":31,"./Slicer":32,"./Yin":33}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  processFrame: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  finalizeStream: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Create a bridge between the graph and application logic. Handle `push`
 * and `pull` paradigms.
 *
 * This sink can handle any type of input (`signal`, `vector`, `scalar`)
 *
 * @memberof module:common.sink
 *
 * @param {Object} options - Override default parameters.
 * @param {Function} [options.processFrame=null] - Callback executed on each
 *  `processFrame` call.
 * @param {Function} [options.finalizeStream=null] - Callback executed on each
 *  `finalizeStream` call.
 *
 * @see {@link module:common.core.BaseLfo#processFrame}
 * @see {@link module:common.core.BaseLfo#processStreamParams}
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const frames = [
 *  { time: 0, data: [0, 1] },
 *  { time: 1, data: [1, 2] },
 * ];
 *
 * const eventIn = new EventIn({
 *   frameType: 'vector',
 *   frameSize: 2,
 *   frameRate: 1,
 * });
 *
 * const bridge = new Bridge({
 *   processFrame: (frame) => console.log(frame),
 * });
 *
 * eventIn.connect(bridge);
 * eventIn.start();
 *
 * // callback executed on each frame
 * eventIn.processFrame(frame[0]);
 * > { time: 0, data: [0, 1] }
 * eventIn.processFrame(frame[1]);
 * > { time: 1, data: [1, 2] }
 *
 * // pull current frame when needed
 * console.log(bridge.frame);
 * > { time: 1, data: [1, 2] }
 */

var Bridge = function (_BaseLfo) {
  (0, _inherits3.default)(Bridge, _BaseLfo);

  function Bridge() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Bridge);
    return (0, _possibleConstructorReturn3.default)(this, (Bridge.__proto__ || (0, _getPrototypeOf2.default)(Bridge)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Bridge, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      var finalizeStreamCallback = this.params.get('finalizeStream');

      if (finalizeStreamCallback !== null) finalizeStreamCallback(endTime);
    }

    // process any type
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar() {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector() {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal() {}

    /** @private */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      this.prepareFrame();

      var processFrameCallback = this.params.get('processFrame');
      var output = this.frame;
      output.data = new Float32Array(this.streamParams.frameSize);
      // pull interface (we copy data since we don't know what could
      // be done outside the graph)
      for (var i = 0; i < this.streamParams.frameSize; i++) {
        output.data[i] = frame.data[i];
      }output.time = frame.time;
      output.metadata = frame.metadata;

      // `push` interface
      if (processFrameCallback !== null) processFrameCallback(output);
    }
  }]);
  return Bridge;
}(_BaseLfo3.default);

exports.default = Bridge;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  separateArrays: {
    type: 'boolean',
    default: false,
    constant: true
  },
  callback: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Record input frames from a graph. This sink can handle `signal`, `vector`
 * or `scalar` inputs.
 *
 * When the recording is stopped (either by calling `stop` on the node or when
 * the stream is finalized), the callback given as parameter is executed with
 * the recorder data as argument.
 *
 *
 * @param {Object} options - Override default parameters.
 * @param {Boolean} [options.separateArrays=false] - Format of the retrieved
 *  values:
 *  - when `false`, format is [{ time, data }, { time, data }, ...]
 *  - when `true`, format is { time: [...], data: [...] }
 * @param {Function} [options.callback] - Callback to execute when a new record
 *  is ended. This can happen when: `stop` is called on the recorder, or `stop`
 *  is called on the source.
 *
 * @todo - Add auto record param.
 *
 * @memberof module:common.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *  frameType: 'vector',
 *  frameSize: 2,
 *  frameRate: 0,
 * });
 *
 * const recorder = new lfo.sink.DataRecorder({
 *   callback: (data) => console.log(data),
 * });
 *
 * eventIn.connect(recorder);
 * eventIn.start();
 * recorder.start();
 *
 * eventIn.process(0, [0, 1]);
 * eventIn.process(1, [1, 2]);
 *
 * recorder.stop();
 * > [{ time: 0, data: [0, 1] }, { time: 1, data: [1, 2] }];
 */

var DataRecorder = function (_BaseLfo) {
  (0, _inherits3.default)(DataRecorder, _BaseLfo);

  function DataRecorder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, DataRecorder);

    /**
     * Define if the node is currently recording.
     *
     * @type {Boolean}
     * @name isRecording
     * @instance
     * @memberof module:sink.SignalRecorder
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (DataRecorder.__proto__ || (0, _getPrototypeOf2.default)(DataRecorder)).call(this, definitions, options));

    _this.isRecording = false;
    return _this;
  }

  /** @private */


  (0, _createClass3.default)(DataRecorder, [{
    key: '_initStore',
    value: function _initStore() {
      var separateArrays = this.params.get('separateArrays');

      if (separateArrays) this._store = { time: [], data: [] };else this._store = [];
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);
      this._initStore();
      this.propagateStreamParams();
    }

    /**
     * Start recording.
     *
     * @see {@link module:client.sink.DataRecorder#stop}
     */

  }, {
    key: 'start',
    value: function start() {
      this.isRecording = true;
    }

    /**
     * Stop recording and execute the callback defined in parameters.
     *
     * @see {@link module:client.sink.DataRecorder#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.isRecording) {
        this.isRecording = false;
        var callback = this.params.get('callback');

        if (callback !== null) callback(this._store);

        this._initStore();
      }
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream() {
      this.stop();
    }

    // handle any input types
    /** @private */

  }, {
    key: 'processScalar',
    value: function processScalar(frame) {}
    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {}
    /** @private */

  }, {
    key: 'processVector',
    value: function processVector(frame) {}
  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (this.isRecording) {
        this.prepareFrame(frame);

        var separateArrays = this.params.get('separateArrays');
        var entry = {
          time: frame.time,
          data: new Float32Array(frame.data)
        };

        if (!separateArrays) {
          this._store.push(entry);
        } else {
          this._store.time.push(entry.time);
          this._store.data.push(entry.data);
        }
      }
    }
  }]);
  return DataRecorder;
}(_BaseLfo3.default);

exports.default = DataRecorder;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  time: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  data: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  metadata: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  streamParams: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  },
  frameIndex: {
    type: 'boolean',
    default: false,
    metas: { kind: 'dynamic' }
  }
};

/**
 * Log `frame.time`, `frame.data`, `frame.metadata` and/or
 * `streamAttributes` of any node in the console.
 *
 * This sink can handle any type if input (`signal`, `vector`, `scalar`)
 *
 * @param {Object} options - Override parameters default values.
 * @param {Boolean} [options.time=false] - Log incomming `frame.time` if `true`.
 * @param {Boolean} [options.data=false] - Log incomming `frame.data` if `true`.
 * @param {Boolean} [options.metadata=false] - Log incomming `frame.metadata`
 *  if `true`.
 * @param {Boolean} [options.streamParams=false] - Log `streamParams` of the
 *  previous node when graph is started.
 * @param {Boolean} [options.frameIndex=false] - Log index of the incomming
 *  `frame`.
 *
 * @memberof module:common.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const logger = new lfo.sink.Logger({ data: true });
 * whateverOperator.connect(logger);
 */

var Logger = function (_BaseLfo) {
  (0, _inherits3.default)(Logger, _BaseLfo);

  function Logger(options) {
    (0, _classCallCheck3.default)(this, Logger);
    return (0, _possibleConstructorReturn3.default)(this, (Logger.__proto__ || (0, _getPrototypeOf2.default)(Logger)).call(this, definitions, options));
  }

  /** @private */


  (0, _createClass3.default)(Logger, [{
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      if (this.params.get('streamParams') === true) console.log(prevStreamParams);

      this.frameIndex = 0;
    }

    /** @private */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      if (this.params.get('frameIndex') === true) console.log(this.frameIndex++);

      if (this.params.get('time') === true) console.log(frame.time);

      if (this.params.get('data') === true) console.log(frame.data);

      if (this.params.get('metadata') === true) console.log(frame.metadata);
    }
  }]);
  return Logger;
}(_BaseLfo3.default);

exports.default = Logger;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definitions = {
  duration: {
    type: 'float',
    default: 10,
    min: 0,
    metas: { kind: 'static' }
  },
  callback: {
    type: 'any',
    default: null,
    nullable: true,
    metas: { kind: 'dynamic' }
  },
  ignoreLeadingZeros: {
    type: 'boolean',
    default: true,
    metas: { kind: 'static' }
  },
  retrieveAudioBuffer: {
    type: 'boolean',
    default: false,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    nullable: true
  }
};

/**
 * Record an `signal` input stream of arbitrary duration and retrieve it
 * when done.
 *
 * When recording is stopped (either when the `stop` method is called, the
 * defined duration has been recorded, or the source of the graph finalized
 * the stream), the callback given as parameter is executed  with the
 * `AudioBuffer` or `Float32Array` containing the recorded signal as argument.
 *
 * @todo - add option to return only the Float32Array and not an audio buffer
 *  (node compliant) `retrieveAudioBuffer: false`
 *
 * @param {Object} options - Override default parameters.
 * @param {Number} [options.duration=10] - Maximum duration of the recording.
 * @param {Number} [options.callback] - Callback to execute when a new record is
 *  ended. This can happen: `stop` is called on the recorder, `stop` is called
 *  on the source or when the buffer is full according to the given `duration`.
 * @param {Object} [options.ignoreLeadingZeros=true] - Start the effective
 *  recording on the first non-zero value.
 * @param {Boolean} [options.retrieveAudioBuffer=false] - Define if an `AudioBuffer`
 *  should be retrieved or only the raw Float32Array of data.
 *  (works only in browser)
 * @param {AudioContext} [options.audioContext=null] - If
 *  `retrieveAudioBuffer` is set to `true`, audio context to be used
 *  in order to create the final audio buffer.
 *  (works only in browser)
 *
 * @memberof module:common.sink
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const audioContext = new AudioContext();
 *
 * navigator.mediaDevices
 *   .getUserMedia({ audio: true })
 *   .then(init)
 *   .catch((err) => console.error(err.stack));
 *
 * function init(stream) {
 *   const source = audioContext.createMediaStreamSource(stream);
 *
 *   const audioInNode = new lfo.source.AudioInNode({
 *     sourceNode: source,
 *     audioContext: audioContext,
 *   });
 *
 *   const signalRecorder = new lfo.sink.SignalRecorder({
 *     duration: 6,
 *     retrieveAudioBuffer: true,
 *     audioContext: audioContext,
 *     callback: (buffer) => {
 *       const bufferSource = audioContext.createBufferSource();
 *       bufferSource.buffer = buffer;
 *       bufferSource.connect(audioContext.destination);
 *       bufferSource.start();
 *     }
 *   });
 *
 *   audioInNode.connect(signalRecorder);
 *   audioInNode.start();
 *   signalRecorder.start();
 * });
 */

var SignalRecorder = function (_BaseLfo) {
  (0, _inherits3.default)(SignalRecorder, _BaseLfo);

  function SignalRecorder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SignalRecorder);

    /**
     * Define is the node is currently recording or not.
     *
     * @type {Boolean}
     * @name isRecording
     * @instance
     * @memberof module:client.sink.SignalRecorder
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (SignalRecorder.__proto__ || (0, _getPrototypeOf2.default)(SignalRecorder)).call(this, definitions, options));

    _this.isRecording = false;

    var retrieveAudioBuffer = _this.params.get('retrieveAudioBuffer');
    var audioContext = _this.params.get('audioContext');
    // needed to retrieve an AudioBuffer
    if (retrieveAudioBuffer && audioContext === null) throw new Error('Invalid parameter "audioContext": an AudioContext must be provided when `retrieveAudioBuffer` is set to `true`');

    _this._audioContext = audioContext;
    _this._ignoreZeros = false;
    _this._isInfiniteBuffer = false;
    _this._stack = [];
    _this._buffer = null;
    _this._bufferLength = null;
    _this._currentIndex = null;
    return _this;
  }

  (0, _createClass3.default)(SignalRecorder, [{
    key: '_initBuffer',
    value: function _initBuffer() {
      this._buffer = new Float32Array(this._bufferLength);
      this._stack.length = 0;
      this._currentIndex = 0;
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams(prevStreamParams) {
      this.prepareStreamParams(prevStreamParams);

      var duration = this.params.get('duration');
      var sampleRate = this.streamParams.sourceSampleRate;

      if (isFinite(duration)) {
        this._isInfiniteBuffer = false;
        this._bufferLength = sampleRate * duration;
      } else {
        this._isInfiniteBuffer = true;
        this._bufferLength = sampleRate * 10;
      }

      this._initBuffer();
      this.propagateStreamParams();
    }

    /**
     * Start recording.
     */

  }, {
    key: 'start',
    value: function start() {
      this.isRecording = true;
      this._ignoreZeros = this.params.get('ignoreLeadingZeros');
    }

    /**
     * Stop recording and execute the callback defined in parameters.
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.isRecording) {
        // ignore next incomming frame
        this.isRecording = false;

        var retrieveAudioBuffer = this.params.get('retrieveAudioBuffer');
        var callback = this.params.get('callback');
        var currentIndex = this._currentIndex;
        var buffer = this._buffer;
        var output = void 0;

        if (!this._isInfiniteBuffer) {
          output = new Float32Array(currentIndex);
          output.set(buffer.subarray(0, currentIndex), 0);
        } else {
          var bufferLength = this._bufferLength;
          var stack = this._stack;

          output = new Float32Array(stack.length * bufferLength + currentIndex);

          // copy all stacked buffers
          for (var i = 0; i < stack.length; i++) {
            var stackedBuffer = stack[i];
            output.set(stackedBuffer, bufferLength * i);
          };
          // copy data contained in current buffer
          output.set(buffer.subarray(0, currentIndex), stack.length * bufferLength);
        }

        if (retrieveAudioBuffer && this._audioContext) {
          var length = output.length;
          var sampleRate = this.streamParams.sourceSampleRate;
          var audioBuffer = this._audioContext.createBuffer(1, length, sampleRate);
          var channelData = audioBuffer.getChannelData(0);
          channelData.set(output, 0);

          callback(audioBuffer);
        } else {
          callback(output);
        }

        // reinit buffer, stack, and currentIndex
        this._initBuffer();
      }
    }

    /** @private */

  }, {
    key: 'finalizeStream',
    value: function finalizeStream(endTime) {
      this.stop();
    }

    /** @private */

  }, {
    key: 'processSignal',
    value: function processSignal(frame) {
      if (!this.isRecording) return;

      var block = null;
      var input = frame.data;
      var bufferLength = this._bufferLength;
      var buffer = this._buffer;

      if (this._ignoreZeros === false) {
        block = new Float32Array(input);
      } else if (input[input.length - 1] !== 0) {
        // find first index where value !== 0
        var i = void 0;

        for (i = 0; i < input.length; i++) {
          if (input[i] !== 0) break;
        } // copy non zero segment
        block = new Float32Array(input.subarray(i));
        // don't repeat this logic once a non-zero value has been found
        this._ignoreZeros = false;
      }

      if (block !== null) {
        var availableSpace = bufferLength - this._currentIndex;
        var currentBlock = void 0;

        if (availableSpace < block.length) currentBlock = block.subarray(0, availableSpace);else currentBlock = block;

        buffer.set(currentBlock, this._currentIndex);
        this._currentIndex += currentBlock.length;

        if (this._isInfiniteBuffer && this._currentIndex === bufferLength) {
          this._stack.push(buffer);

          currentBlock = block.subarray(availableSpace);
          this._buffer = new Float32Array(bufferLength);
          this._buffer.set(currentBlock, 0);
          this._currentIndex = currentBlock.length;
        }

        //  stop if the buffer is finite and full
        if (!this._isInfiniteBuffer && this._currentIndex === bufferLength) this.stop();
      }
    }
  }]);
  return SignalRecorder;
}(_BaseLfo3.default);

exports.default = SignalRecorder;

},{"../../common/core/BaseLfo":16,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],39:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseLfo2 = require('../../common/core/BaseLfo');

var _BaseLfo3 = _interopRequireDefault(_BaseLfo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioContext = window.AudioContext || window.webkitAudioContext;

/**
 * Create a function that returns time in seconds according to the current
 * environnement (node or browser).
 * If running in node the time rely on `process.hrtime`, while if in the browser
 * it is provided by the `currentTime` of an `AudioContext`, this context can
 * optionnaly be provided to keep time consistency between several `EventIn`
 * nodes.
 *
 * @param {AudioContext} [audioContext=null] - Optionnal audio context.
 * @return {Function}
 * @private
 */
function getTimeFunction() {
  var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof window === 'undefined') {
    return function () {
      var t = process.hrtime();
      return t[0] + t[1] * 1e-9;
    };
  } else {
    if (audioContext === null || !audioContext instanceof AudioContext) audioContext = new AudioContext();

    return function () {
      return audioContext.currentTime;
    };
  }
}

var definitions = {
  absoluteTime: {
    type: 'boolean',
    default: false,
    constant: true
  },
  audioContext: {
    type: 'any',
    default: null,
    constant: true,
    nullable: true
  },
  frameType: {
    type: 'enum',
    list: ['signal', 'vector', 'scalar'],
    default: 'signal',
    constant: true
  },
  frameSize: {
    type: 'integer',
    default: 1,
    min: 1,
    max: +Infinity, // not recommended...
    metas: { kind: 'static' }
  },
  sampleRate: {
    type: 'float',
    default: null,
    min: 0,
    max: +Infinity, // same here
    nullable: true,
    metas: { kind: 'static' }
  },
  frameRate: {
    type: 'float',
    default: null,
    min: 0,
    max: +Infinity, // same here
    nullable: true,
    metas: { kind: 'static' }
  },
  description: {
    type: 'any',
    default: null,
    constant: true
  }
};

/**
 * The `EventIn` operator allows to manually create a stream of data or to feed
 * a stream from another source (e.g. sensors) into a processing graph.
 *
 * @param {Object} options - Override parameters' default values.
 * @param {String} [options.frameType='signal'] - Type of the input - allowed
 * values: `signal`,  `vector` or `scalar`.
 * @param {Number} [options.frameSize=1] - Size of the output frame.
 * @param {Number} [options.sampleRate=null] - Sample rate of the source stream,
 *  if of type `signal`.
 * @param {Number} [options.frameRate=null] - Rate of the source stream, if of
 *  type `vector`.
 * @param {Array|String} [options.description] - Optionnal description
 *  describing the dimensions of the output frame
 * @param {Boolean} [options.absoluteTime=false] - Define if time should be used
 *  as forwarded as given in the process method, or relatively to the time of
 *  the first `process` call after start.
 *
 * @memberof module:common.source
 *
 * @todo - Add a `logicalTime` parameter to tag frame according to frame rate.
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn = new lfo.source.EventIn({
 *   frameType: 'vector',
 *   frameSize: 3,
 *   frameRate: 1 / 50,
 *   description: ['alpha', 'beta', 'gamma'],
 * });
 *
 * // connect source to operators and sink(s)
 *
 * // initialize and start the graph
 * eventIn.start();
 *
 * // feed `deviceorientation` data into the graph
 * window.addEventListener('deviceorientation', (e) => {
 *   const frame = {
 *     time: new Date().getTime(),
 *     data: [e.alpha, e.beta, e.gamma],
 *   };
 *
 *   eventIn.processFrame(frame);
 * }, false);
 */

var EventIn = function (_BaseLfo) {
  (0, _inherits3.default)(EventIn, _BaseLfo);

  function EventIn() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, EventIn);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventIn.__proto__ || (0, _getPrototypeOf2.default)(EventIn)).call(this, definitions, options));

    var audioContext = _this.params.get('audioContext');
    _this._getTime = getTimeFunction(audioContext);
    _this._isStarted = false;
    _this._startTime = null;
    _this._systemTime = null;
    _this._absoluteTime = _this.params.get('absoluteTime');
    return _this;
  }

  /**
   * Propagate the `streamParams` in the graph and allow to push frames into
   * the graph. Any call to `process` or `processFrame` before `start` will be
   * ignored.
   *
   * @see {@link module:common.core.BaseLfo#processStreamParams}
   * @see {@link module:common.core.BaseLfo#resetStream}
   * @see {@link module:common.source.EventIn#stop}
   */


  (0, _createClass3.default)(EventIn, [{
    key: 'start',
    value: function start() {
      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.initStream();

      this._startTime = startTime;
      this._isStarted = true;
      // values set in the first `process` call
      this._systemTime = null;
    }

    /**
     * Finalize the stream and stop the whole graph. Any call to `process` or
     * `processFrame` after `stop` will be ignored.
     *
     * @see {@link module:common.core.BaseLfo#finalizeStream}
     * @see {@link module:common.source.EventIn#start}
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this._isStarted && this._startTime !== null) {
        var currentTime = this._getTime();
        var endTime = this.frame.time + (currentTime - this._systemTime);

        this.finalizeStream(endTime);
        this._isStarted = false;
      }
    }

    /** @private */

  }, {
    key: 'processStreamParams',
    value: function processStreamParams() {
      var frameSize = this.params.get('frameSize');
      var frameType = this.params.get('frameType');
      var sampleRate = this.params.get('sampleRate');
      var frameRate = this.params.get('frameRate');
      var description = this.params.get('description');
      // init operator's stream params
      this.streamParams.frameSize = frameType === 'scalar' ? 1 : frameSize;
      this.streamParams.frameType = frameType;
      this.streamParams.description = description;

      if (frameType === 'signal') {
        if (sampleRate === null) throw new Error('Undefined "sampleRate" for "signal" stream');

        this.streamParams.sourceSampleRate = sampleRate;
        this.streamParams.frameRate = sampleRate / frameSize;
        this.streamParams.sourceSampleCount = frameSize;
      } else if (frameType === 'vector' || frameType === 'scalar') {
        if (frameRate === null) throw new Error('Undefined "frameRate" for "vector" stream');

        this.streamParams.frameRate = frameRate;
        this.streamParams.sourceSampleRate = frameRate;
        this.streamParams.sourceSampleCount = 1;
      }

      this.propagateStreamParams();
    }

    /** @private */

  }, {
    key: 'processFunction',
    value: function processFunction(frame) {
      var currentTime = this._getTime();
      var inData = frame.data.length ? frame.data : [frame.data];
      var outData = this.frame.data;
      // if no time provided, use system time
      var time = (0, _isFinite2.default)(frame.time) ? frame.time : currentTime;

      if (this._startTime === null) this._startTime = time;

      if (this._absoluteTime === false) time = time - this._startTime;

      for (var i = 0, l = this.streamParams.frameSize; i < l; i++) {
        outData[i] = inData[i];
      }this.frame.time = time;
      this.frame.metadata = frame.metadata;
      // store current time to compute `endTime` on stop
      this._systemTime = currentTime;
    }

    /**
     * Alternative interface to propagate a frame in the graph. Pack `time`,
     * `data` and `metadata` in a frame object.
     *
     * @param {Number} time - Frame time.
     * @param {Float32Array|Array} data - Frame data.
     * @param {Object} metadata - Optionnal frame metadata.
     *
     * @example
     * eventIn.process(1, [0, 1, 2]);
     * // is equivalent to
     * eventIn.processFrame({ time: 1, data: [0, 1, 2] });
     */

  }, {
    key: 'process',
    value: function process(time, data) {
      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.processFrame({ time: time, data: data, metadata: metadata });
    }

    /**
     * Propagate a frame object in the graph.
     *
     * @param {Object} frame - Input frame.
     * @param {Number} frame.time - Frame time.
     * @param {Float32Array|Array} frame.data - Frame data.
     * @param {Object} [frame.metadata=undefined] - Optionnal frame metadata.
     *
     * @example
     * eventIn.processFrame({ time: 1, data: [0, 1, 2] });
     */

  }, {
    key: 'processFrame',
    value: function processFrame(frame) {
      if (!this._isStarted) return;

      this.prepareFrame();
      this.processFunction(frame);
      this.propagateFrame();
    }
  }]);
  return EventIn;
}(_BaseLfo3.default);

exports.default = EventIn;

}).call(this,require('_process'))

},{"../../common/core/BaseLfo":16,"_process":45,"babel-runtime/core-js/number/is-finite":47,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57,"babel-runtime/helpers/inherits":60,"babel-runtime/helpers/possibleConstructorReturn":61}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Synchronize several display sinks to a common time.
 *
 * @param {...BaseDisplay} views - List of the display to synchronize.
 *
 * @memberof module:utils
 *
 * @example
 * import * as lfo from 'waves-lfo/client';
 *
 * const eventIn1 = new lfo.source.EventIn({
 *   frameType: 'scalar',
 *   frameSize: 1,
 * });
 *
 * const bpf1 = new lfo.sink.BpfDisplay({
 *   canvas: '#bpf-1',
 *   duration: 2,
 *   startTime: 0,
 *   min: 0,
 *   colors: ['steelblue'],
 * });
 *
 * eventIn1.connect(bpf1);
 *
 * const eventIn2 = new lfo.source.EventIn({
 *   frameType: 'scalar',
 *   frameSize: 1,
 * });
 *
 * const bpf2 = new lfo.sink.BpfDisplay({
 *   canvas: '#bpf-2',
 *   duration: 2,
 *   startTime: 7,
 *   min: 0,
 *   colors: ['orange'],
 * });
 *
 * const displaySync = new lfo.utils.DisplaySync(bpf1, bpf2);
 *
 * eventIn2.connect(bpf2);
 *
 * eventIn1.start();
 * eventIn2.start();
 *
 * let time = 0;
 * const period = 0.4;
 * const offset = 7.2;
 *
 * (function generateData() {
 *   const v = Math.random();
 *
 *   eventIn1.process(time, v);
 *   eventIn2.process(time + offset, v);
 *
 *   time += period;
 *
 *   setTimeout(generateData, period * 1000);
 * }());
 */
var DisplaySync = function () {
  function DisplaySync() {
    (0, _classCallCheck3.default)(this, DisplaySync);

    this.views = [];

    this.add.apply(this, arguments);
  }

  /** @private */


  (0, _createClass3.default)(DisplaySync, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, views = Array(_len), _key = 0; _key < _len; _key++) {
        views[_key] = arguments[_key];
      }

      views.forEach(function (view) {
        return _this.install(view);
      });
    }

    /** @private */

  }, {
    key: "install",
    value: function install(view) {
      this.views.push(view);

      view.displaySync = this;
    }

    /** @private */

  }, {
    key: "shiftSiblings",
    value: function shiftSiblings(iShift, time, view) {
      this.views.forEach(function (display) {
        if (display !== view) display.shiftCanvas(iShift, time);
      });
    }
  }]);
  return DisplaySync;
}();

exports.default = DisplaySync;

},{"babel-runtime/helpers/classCallCheck":56,"babel-runtime/helpers/createClass":57}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DisplaySync = require('./DisplaySync');

var _DisplaySync2 = _interopRequireDefault(_DisplaySync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  DisplaySync: _DisplaySync2.default
};

},{"./DisplaySync":40}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = ['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153'];

var getColors = exports.getColors = function getColors(type, nbr) {
  switch (type) {
    case 'signal':
      return colors[0]; // steelblue
      break;
    case 'bpf':
      if (nbr <= colors.length) {
        return colors.slice(0, nbr);
      } else {
        var _colors = colors.slice(0);
        while (_colors.length < nbr) {
          _colors.push(getRandomColor());
        }return _colors;
      }
      break;
    case 'waveform':
      return [colors[0], colors[5]]; // steelblue / darkblue
      break;
    case 'marker':
      return colors[3]; // red
      break;
    case 'spectrum':
      return colors[2]; // green
      break;
    case 'trace':
      return colors[1]; // orange
      break;
  }
};

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
var getRandomColor = exports.getRandomColor = function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// scale from domain [0, 1] to range [270, 0] to consume in
// hsl(x, 100%, 50%) color scheme
var getHue = exports.getHue = function getHue(x) {
  var domainMin = 0;
  var domainMax = 1;
  var rangeMin = 270;
  var rangeMax = 0;

  return (rangeMax - rangeMin) * (x - domainMin) / (domainMax - domainMin) + rangeMin;
};

var hexToRGB = exports.hexToRGB = function hexToRGB(hex) {
  hex = hex.substring(1, 7);
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// shortcuts / helpers
var PI = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;

// window creation functions
function initHannWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.5 - 0.5 * cos(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initHammingWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.54 - 0.46 * cos(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initBlackmanWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = 0.42 - 0.5 * cos(phi) + 0.08 * cos(2 * phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initBlackmanHarrisWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var a0 = 0.35875;
  var a1 = 0.48829;
  var a2 = 0.14128;
  var a3 = 0.01168;
  var step = 2 * PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = a0 - a1 * cos(phi) + a2 * cos(2 * phi);-a3 * cos(3 * phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initSineWindow(buffer, size, normCoefs) {
  var linSum = 0;
  var powSum = 0;
  var step = PI / size;

  for (var i = 0; i < size; i++) {
    var phi = i * step;
    var value = sin(phi);

    buffer[i] = value;

    linSum += value;
    powSum += value * value;
  }

  normCoefs.linear = size / linSum;
  normCoefs.power = sqrt(size / powSum);
}

function initRectangleWindow(buffer, size, normCoefs) {
  for (var i = 0; i < size; i++) {
    buffer[i] = 1;
  } // @todo - check if these are proper values
  normCoefs.linear = 1;
  normCoefs.power = 1;
}

/**
 * Create a buffer with window signal.
 *
 * @param {String} name - Name of the window.
 * @param {Float32Array} buffer - Buffer to be populated with the window signal.
 * @param {Number} size - Size of the buffer.
 * @param {Object} normCoefs - Object to be populated with the normailzation
 *  coefficients.
 */
function initWindow(name, buffer, size, normCoefs) {
  name = name.toLowerCase();

  switch (name) {
    case 'hann':
    case 'hanning':
      initHannWindow(buffer, size, normCoefs);
      break;
    case 'hamming':
      initHammingWindow(buffer, size, normCoefs);
      break;
    case 'blackman':
      initBlackmanWindow(buffer, size, normCoefs);
      break;
    case 'blackmanharris':
      initBlackmanHarrisWindow(buffer, size, normCoefs);
      break;
    case 'sine':
      initSineWindow(buffer, size, normCoefs);
      break;
    case 'rectangle':
      initRectangleWindow(buffer, size, normCoefs);
      break;
  }
}

exports.default = initWindow;

},{}],44:[function(require,module,exports){
'use strict';

var _client = require('waves-lfo/client');

var lfo = _interopRequireWildcard(_client);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

navigator.mediaDevices.getUserMedia({ audio: true }).then(init).catch(function (err) {
  return console.error(err.stack);
});

function init(stream) {
  var source = audioContext.createMediaStreamSource(stream);

  var audioInNode = new lfo.source.AudioInNode({
    sourceNode: source,
    audioContext: audioContext
  });

  var slicer = new lfo.operator.Slicer({
    frameSize: 2048,
    hopSize: 2048
  });

  var yin = new lfo.operator.Yin();

  var select = new lfo.operator.Select({
    index: 0
  });

  var bpfDisplay = new lfo.sink.BpfDisplay({
    canvas: '#yin',
    min: 0,
    max: 2000,
    duration: 10
  });

  audioInNode.connect(slicer);
  slicer.connect(yin);
  yin.connect(select);
  select.connect(bpfDisplay);

  audioInNode.start();
}

},{"waves-lfo/client":3}],45:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],46:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/log10"), __esModule: true };
},{"core-js/library/fn/math/log10":63}],47:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/number/is-finite"), __esModule: true };
},{"core-js/library/fn/number/is-finite":64}],48:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":65}],49:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":66}],50:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":67}],51:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":68}],52:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":69}],53:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":70}],54:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":71}],55:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":72}],56:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],57:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":50}],58:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":50}],59:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = require("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};
},{"../core-js/object/get-own-property-descriptor":51,"../core-js/object/get-prototype-of":52}],60:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":49,"../core-js/object/set-prototype-of":53,"../helpers/typeof":62}],61:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":62}],62:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":54,"../core-js/symbol/iterator":55}],63:[function(require,module,exports){
require('../../modules/es6.math.log10');
module.exports = require('../../modules/_core').Math.log10;
},{"../../modules/_core":78,"../../modules/es6.math.log10":133}],64:[function(require,module,exports){
require('../../modules/es6.number.is-finite');
module.exports = require('../../modules/_core').Number.isFinite;
},{"../../modules/_core":78,"../../modules/es6.number.is-finite":134}],65:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":78,"../../modules/es6.object.assign":135}],66:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":78,"../../modules/es6.object.create":136}],67:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":78,"../../modules/es6.object.define-property":137}],68:[function(require,module,exports){
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":78,"../../modules/es6.object.get-own-property-descriptor":138}],69:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":78,"../../modules/es6.object.get-prototype-of":139}],70:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":78,"../../modules/es6.object.set-prototype-of":140}],71:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":78,"../../modules/es6.object.to-string":141,"../../modules/es6.symbol":143,"../../modules/es7.symbol.async-iterator":144,"../../modules/es7.symbol.observable":145}],72:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":130,"../../modules/es6.string.iterator":142,"../../modules/web.dom.iterable":146}],73:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],74:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],75:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":94}],76:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":122,"./_to-iobject":124,"./_to-length":125}],77:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],78:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],79:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":73}],80:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],81:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":86}],82:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":87,"./_is-object":94}],83:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],84:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":109,"./_object-keys":112,"./_object-pie":113}],85:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":78,"./_ctx":79,"./_global":87,"./_hide":89}],86:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],87:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],88:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],89:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":81,"./_object-dp":104,"./_property-desc":115}],90:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":87}],91:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":81,"./_dom-create":82,"./_fails":86}],92:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":77}],93:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":77}],94:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],95:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":89,"./_object-create":103,"./_property-desc":115,"./_set-to-string-tag":118,"./_wks":131}],96:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":85,"./_has":88,"./_hide":89,"./_iter-create":95,"./_iterators":98,"./_library":100,"./_object-gpo":110,"./_redefine":116,"./_set-to-string-tag":118,"./_wks":131}],97:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],98:[function(require,module,exports){
module.exports = {};
},{}],99:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":112,"./_to-iobject":124}],100:[function(require,module,exports){
module.exports = true;
},{}],101:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":86,"./_has":88,"./_is-object":94,"./_object-dp":104,"./_uid":128}],102:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":86,"./_iobject":92,"./_object-gops":109,"./_object-keys":112,"./_object-pie":113,"./_to-object":126}],103:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":75,"./_dom-create":82,"./_enum-bug-keys":83,"./_html":90,"./_object-dps":105,"./_shared-key":119}],104:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":75,"./_descriptors":81,"./_ie8-dom-define":91,"./_to-primitive":127}],105:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":75,"./_descriptors":81,"./_object-dp":104,"./_object-keys":112}],106:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":81,"./_has":88,"./_ie8-dom-define":91,"./_object-pie":113,"./_property-desc":115,"./_to-iobject":124,"./_to-primitive":127}],107:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":108,"./_to-iobject":124}],108:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":83,"./_object-keys-internal":111}],109:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],110:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":88,"./_shared-key":119,"./_to-object":126}],111:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":76,"./_has":88,"./_shared-key":119,"./_to-iobject":124}],112:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":83,"./_object-keys-internal":111}],113:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],114:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":78,"./_export":85,"./_fails":86}],115:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],116:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":89}],117:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":75,"./_ctx":79,"./_is-object":94,"./_object-gopd":106}],118:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":88,"./_object-dp":104,"./_wks":131}],119:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":120,"./_uid":128}],120:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":87}],121:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":80,"./_to-integer":123}],122:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":123}],123:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],124:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":80,"./_iobject":92}],125:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":123}],126:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":80}],127:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":94}],128:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],129:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":78,"./_global":87,"./_library":100,"./_object-dp":104,"./_wks-ext":130}],130:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":131}],131:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":87,"./_shared":120,"./_uid":128}],132:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":74,"./_iter-define":96,"./_iter-step":97,"./_iterators":98,"./_to-iobject":124}],133:[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":85}],134:[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":85,"./_global":87}],135:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":85,"./_object-assign":102}],136:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":85,"./_object-create":103}],137:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":81,"./_export":85,"./_object-dp":104}],138:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":106,"./_object-sap":114,"./_to-iobject":124}],139:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":110,"./_object-sap":114,"./_to-object":126}],140:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":85,"./_set-proto":117}],141:[function(require,module,exports){

},{}],142:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":96,"./_string-at":121}],143:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":75,"./_descriptors":81,"./_enum-keys":84,"./_export":85,"./_fails":86,"./_global":87,"./_has":88,"./_hide":89,"./_is-array":93,"./_keyof":99,"./_library":100,"./_meta":101,"./_object-create":103,"./_object-dp":104,"./_object-gopd":106,"./_object-gopn":108,"./_object-gopn-ext":107,"./_object-gops":109,"./_object-keys":112,"./_object-pie":113,"./_property-desc":115,"./_redefine":116,"./_set-to-string-tag":118,"./_shared":120,"./_to-iobject":124,"./_to-primitive":127,"./_uid":128,"./_wks":131,"./_wks-define":129,"./_wks-ext":130}],144:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":129}],145:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":129}],146:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":87,"./_hide":89,"./_iterators":98,"./_wks":131,"./es6.array.iterator":132}]},{},[44])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9pcmNhbS1qc3Rvb2xzL3BhcmFtZXRlcnMvZGlzdC9wYXJhbVRlbXBsYXRlcy5qcyIsIi4uLy4uLy4uLy4uLy4uL2lyY2FtLWpzdG9vbHMvcGFyYW1ldGVycy9kaXN0L3BhcmFtZXRlcnMuanMiLCIuLi8uLi9jbGllbnQvaW5kZXguanMiLCIuLi8uLi9jbGllbnQvc2luay9CYXNlRGlzcGxheS5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL0JwZkRpc3BsYXkuanMiLCIuLi8uLi9jbGllbnQvc2luay9NYXJrZXJEaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvU2lnbmFsRGlzcGxheS5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL1NwZWN0cnVtRGlzcGxheS5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL1RyYWNlRGlzcGxheS5qcyIsIi4uLy4uL2NsaWVudC9zaW5rL1Z1TWV0ZXJEaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvV2F2ZWZvcm1EaXNwbGF5LmpzIiwiLi4vLi4vY2xpZW50L3NpbmsvX25hbWVzcGFjZS5qcyIsIi4uLy4uL2NsaWVudC9zb3VyY2UvQXVkaW9JbkJ1ZmZlci5qcyIsIi4uLy4uL2NsaWVudC9zb3VyY2UvQXVkaW9Jbk5vZGUuanMiLCIuLi8uLi9jbGllbnQvc291cmNlL19uYW1lc3BhY2UuanMiLCIuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvLmpzIiwiLi4vLi4vY29tbW9uL2NvcmUvX25hbWVzcGFjZS5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9CaXF1YWQuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvRGN0LmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL0ZmdC5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9NYWduaXR1ZGUuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTWVhblN0ZGRldi5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9NZWwuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTWZjYy5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9NaW5NYXguanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvTW92aW5nQXZlcmFnZS5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9Nb3ZpbmdNZWRpYW4uanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvT25PZmYuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvUm1zLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL1NlZ21lbnRlci5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9TZWxlY3QuanMiLCIuLi8uLi9jb21tb24vb3BlcmF0b3IvU2xpY2VyLmpzIiwiLi4vLi4vY29tbW9uL29wZXJhdG9yL1lpbi5qcyIsIi4uLy4uL2NvbW1vbi9vcGVyYXRvci9fbmFtZXNwYWNlLmpzIiwiLi4vLi4vY29tbW9uL3NpbmsvQnJpZGdlLmpzIiwiLi4vLi4vY29tbW9uL3NpbmsvRGF0YVJlY29yZGVyLmpzIiwiLi4vLi4vY29tbW9uL3NpbmsvTG9nZ2VyLmpzIiwiLi4vLi4vY29tbW9uL3NpbmsvU2lnbmFsUmVjb3JkZXIuanMiLCIuLi8uLi9jb21tb24vc291cmNlL0V2ZW50SW4uanMiLCIuLi8uLi9jb21tb24vdXRpbHMvRGlzcGxheVN5bmMuanMiLCIuLi8uLi9jb21tb24vdXRpbHMvX25hbWVzcGFjZS5qcyIsIi4uLy4uL2NvbW1vbi91dGlscy9kaXNwbGF5LXV0aWxzLmpzIiwiLi4vLi4vY29tbW9uL3V0aWxzL3dpbmRvd3MuanMiLCJkaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cxMC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbnVtYmVyL2lzLWZpbml0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzEwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9udW1iZXIvaXMtZmluaXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMTAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm51bWJlci5pcy1maW5pdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBTSxNQUFNLEtBQUssR0FBakI7QUFDQSxJQUFNLE1BQU0sS0FBSyxHQUFqQjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxLQUFkLEVBQTJEO0FBQUEsTUFBdEMsS0FBc0MseURBQTlCLENBQUMsUUFBNkI7QUFBQSxNQUFuQixLQUFtQix5REFBWCxDQUFDLFFBQVU7O0FBQ3pELFNBQU8sSUFBSSxLQUFKLEVBQVcsSUFBSSxLQUFKLEVBQVcsS0FBWCxDQUFYLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFxQmU7QUFDYjs7Ozs7OztBQU9BLFdBQVM7QUFDUCx3QkFBb0IsQ0FBQyxTQUFELENBRGI7QUFFUCxxQkFGTyw2QkFFVyxLQUZYLEVBRWtCLFVBRmxCLEVBRThCLElBRjlCLEVBRW9DO0FBQ3pDLFVBQUksT0FBTyxLQUFQLEtBQWlCLFNBQXJCLEVBQ0UsTUFBTSxJQUFJLEtBQUosdUNBQThDLElBQTlDLFdBQXdELEtBQXhELENBQU47O0FBRUYsYUFBTyxLQUFQO0FBQ0Q7QUFQTSxHQVJJOztBQWtCYjs7Ozs7Ozs7O0FBU0EsV0FBUztBQUNQLHdCQUFvQixDQUFDLFNBQUQsQ0FEYjtBQUVQLHFCQUZPLDZCQUVXLEtBRlgsRUFFa0IsVUFGbEIsRUFFOEIsSUFG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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BMQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBtaW4gPSBNYXRoLm1pbjtcbmNvbnN0IG1heCA9IE1hdGgubWF4O1xuXG5mdW5jdGlvbiBjbGlwKHZhbHVlLCBsb3dlciA9IC1JbmZpbml0eSwgdXBwZXIgPSArSW5maW5pdHkpIHtcbiAgcmV0dXJuIG1heChsb3dlciwgbWluKHVwcGVyLCB2YWx1ZSkpXG59XG5cbi8qKlxuICogRGljdGlvbm5hcnkgb2YgdGhlIGF2YWlsYWJsZSB0eXBlcy4gRWFjaCBrZXkgY29ycmVzcG9uZCB0byB0aGUgdHlwZSBvZiB0aGVcbiAqIGltcGxlbWVudGVkIHBhcmFtIHdoaWxlIHRoZSBjb3JyZXNwb25kaW5nIG9iamVjdCB2YWx1ZSBzaG91bGQgdGhlXG4gKiB7QGxpbmsgYHBhcmFtRGVmaW5pdGlvbmB9IG9mIHRoZSBkZWZpbmVkIHR5cGUuXG4gKlxuICogdHlwZWRlZiB7T2JqZWN0fSBwYXJhbVRlbXBsYXRlc1xuICogQHR5cGUge09iamVjdDxTdHJpbmcsIHBhcmFtVGVtcGxhdGU+fVxuICovXG5cbi8qKlxuICogRGVmaW5pdGlvbiBvZiBhIHBhcmFtZXRlci4gVGhlIGRlZmluaXRpb24gc2hvdWxkIGF0IGxlYXN0IGNvbnRhaW4gdGhlIGVudHJpZXNcbiAqIGB0eXBlYCBhbmQgYGRlZmF1bHRgLiBFdmVyeSBwYXJhbWV0ZXIgY2FuIGFsc28gYWNjZXB0IG9wdGlvbm5hbCBjb25maWd1cmF0aW9uXG4gKiBlbnRyaWVzIGBjb25zdGFudGAgYW5kIGBtZXRhc2AuXG4gKiBBdmFpbGFibGUgZGVmaW5pdGlvbnMgYXJlOlxuICogLSB7QGxpbmsgYm9vbGVhbkRlZmluaXRpb259XG4gKiAtIHtAbGluayBpbnRlZ2VyRGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIGZsb2F0RGVmaW5pdGlvbn1cbiAqIC0ge0BsaW5rIHN0cmluZ0RlZmluaXRpb259XG4gKiAtIHtAbGluayBlbnVtRGVmaW5pdGlvbn1cbiAqXG4gKiB0eXBlZGVmIHtPYmplY3R9IHBhcmFtRGVmaW5pdGlvblxuICogQHByb3BlcnR5IHtTdHJpbmd9IHR5cGUgLSBUeXBlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gKiBAcHJvcGVydHkge01peGVkfSBkZWZhdWx0IC0gRGVmYXVsdCB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGlmIG5vXG4gKiAgaW5pdGlhbGl6YXRpb24gdmFsdWUgaXMgcHJvdmlkZWQuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBjYW4gYmUgY2hhbmdlXG4gKiAgYWZ0ZXIgaXRzIGluaXRpYWxpemF0aW9uLlxuICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz1udWxsXSAtIEFueSB1c2VyIGRlZmluZWQgZGF0YSBhc3NvY2lhdGVkIHRvIHRoZVxuICogIHBhcmFtZXRlciB0aGF0IGNvdWxzIGJlIHVzZWZ1bGwgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGJvb2xlYW5EZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nYm9vbGVhbiddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBib29sZWFuOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGJvb2xlYW4gcGFyYW0gXCIke25hbWV9XCI6ICR7dmFsdWV9YCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IGludGVnZXJEZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0naW50ZWdlciddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWluPS1JbmZpbml0eV0gLSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW21heD0rSW5maW5pdHldIC0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGludGVnZXI6IHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGU6IFsnZGVmYXVsdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoISh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3IgaW50ZWdlciBwYXJhbSBcIiR7bmFtZX1cIjogJHt2YWx1ZX1gKTtcblxuICAgICAgcmV0dXJuIGNsaXAodmFsdWUsIGRlZmluaXRpb24ubWluLCBkZWZpbml0aW9uLm1heCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBmbG9hdERlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdmbG9hdCddIC0gRGVmaW5lIGEgYm9vbGVhbiBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVmYXVsdCAtIERlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbbWluPS1JbmZpbml0eV0gLSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW21heD0rSW5maW5pdHldIC0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFtjb25zdGFudD1mYWxzZV0gLSBEZWZpbmUgaWYgdGhlIHBhcmFtZXRlciBpcyBjb25zdGFudC5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IFttZXRhcz17fV0gLSBPcHRpb25uYWwgbWV0YWRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG4gIGZsb2F0OiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHzCoHZhbHVlICE9PSB2YWx1ZSkgLy8gcmVqZWN0IE5hTlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdmFsdWUgZm9yIGZsb2F0IHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gY2xpcCh2YWx1ZSwgZGVmaW5pdGlvbi5taW4sIGRlZmluaXRpb24ubWF4KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IHN0cmluZ0RlZmluaXRpb25cbiAgICogQHByb3BlcnR5IHtTdHJpbmd9IFt0eXBlPSdzdHJpbmcnXSAtIERlZmluZSBhIGJvb2xlYW4gcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgc3RyaW5nOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSBmb3Igc3RyaW5nIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBlbnVtRGVmaW5pdGlvblxuICAgKiBAcHJvcGVydHkge1N0cmluZ30gW3R5cGU9J2VudW0nXSAtIERlZmluZSBhIGJvb2xlYW4gcGFyYW1ldGVyLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGxpc3QgLSBQb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByb3BlcnR5IHtCb29sZWFufSBbY29uc3RhbnQ9ZmFsc2VdIC0gRGVmaW5lIGlmIHRoZSBwYXJhbWV0ZXIgaXMgY29uc3RhbnQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbbWV0YXM9e31dIC0gT3B0aW9ubmFsIG1ldGFkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuICBlbnVtOiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnLCAnbGlzdCddLFxuICAgIHR5cGVDaGVja0Z1bmN0aW9uKHZhbHVlLCBkZWZpbml0aW9uLCBuYW1lKSB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5saXN0LmluZGV4T2YodmFsdWUpID09PSAtMSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBlbnVtIHBhcmFtIFwiJHtuYW1lfVwiOiAke3ZhbHVlfWApO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBhbnlEZWZpbml0aW9uXG4gICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBbdHlwZT0nZW51bSddIC0gRGVmaW5lIGEgcGFyYW1ldGVyIG9mIGFueSB0eXBlLlxuICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlZmF1bHQgLSBEZWZhdWx0IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnN0YW50PWZhbHNlXSAtIERlZmluZSBpZiB0aGUgcGFyYW1ldGVyIGlzIGNvbnN0YW50LlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gW21ldGFzPXt9XSAtIE9wdGlvbm5hbCBtZXRhZGF0YSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgYW55OiB7XG4gICAgZGVmaW5pdGlvblRlbXBsYXRlOiBbJ2RlZmF1bHQnXSxcbiAgICB0eXBlQ2hlY2tGdW5jdGlvbih2YWx1ZSwgZGVmaW5pdGlvbiwgbmFtZSkge1xuICAgICAgLy8gbm8gY2hlY2sgYXMgaXQgY2FuIGhhdmUgYW55IHR5cGUuLi5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBwYXJhbVRlbXBsYXRlcyBmcm9tICcuL3BhcmFtVGVtcGxhdGVzJztcblxuLyoqXG4gKiBHZW5lcmljIGNsYXNzIGZvciB0eXBlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtBcnJheX0gZGVmaW5pdGlvblRlbXBsYXRlIC0gTGlzdCBvZiBtYW5kYXRvcnkga2V5cyBpbiB0aGUgcGFyYW1cbiAqICBkZWZpbml0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZUNoZWNrRnVuY3Rpb24gLSBGdW5jdGlvbiB0byBiZSB1c2VkIGluIG9yZGVyIHRvIGNoZWNrXG4gKiAgdGhlIHZhbHVlIGFnYWluc3QgdGhlIHBhcmFtIGRlZmluaXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiAtIERlZmluaXRpb24gb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFBhcmFtIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZGVmaW5pdGlvblRlbXBsYXRlLCB0eXBlQ2hlY2tGdW5jdGlvbiwgZGVmaW5pdGlvbiwgdmFsdWUpIHtcbiAgICBkZWZpbml0aW9uVGVtcGxhdGUuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChkZWZpbml0aW9uLmhhc093blByb3BlcnR5KGtleSkgPT09IGZhbHNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZGVmaW5pdGlvbiBmb3IgcGFyYW0gXCIke25hbWV9XCIsICR7a2V5fSBpcyBub3QgZGVmaW5lZGApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSBkZWZpbml0aW9uLnR5cGU7XG4gICAgdGhpcy5kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuICAgIGlmICh0aGlzLmRlZmluaXRpb24ubnVsbGFibGUgPT09IHRydWUgJiYgdmFsdWUgPT09IG51bGwpXG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICBlbHNlXG4gICAgICB0aGlzLnZhbHVlID0gdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIGRlZmluaXRpb24sIG5hbWUpO1xuICAgIHRoaXMuX3R5cGVDaGVja0Z1bmN0aW9uID0gdHlwZUNoZWNrRnVuY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogQHJldHVybiB7TWl4ZWR9XG4gICAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gTmV3IHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IC0gYHRydWVgIGlmIHRoZSBwYXJhbSBoYXMgYmVlbiB1cGRhdGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICogIChlLmcuIGlmIHRoZSBwYXJhbWV0ZXIgYWxyZWFkeSBoYWQgdGhpcyB2YWx1ZSkuXG4gICAqL1xuICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlZmluaXRpb24uY29uc3RhbnQgPT09IHRydWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXNzaWduZW1lbnQgdG8gY29uc3RhbnQgcGFyYW0gXCIke3RoaXMubmFtZX1cImApO1xuXG4gICAgaWYgKCEodGhpcy5kZWZpbml0aW9uLm51bGxhYmxlID09PSB0cnVlICYmIHZhbHVlID09PSBudWxsKSlcbiAgICAgIHZhbHVlID0gdGhpcy5fdHlwZUNoZWNrRnVuY3Rpb24odmFsdWUsIHRoaXMuZGVmaW5pdGlvbiwgdGhpcy5uYW1lKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cblxuLyoqXG4gKiBCYWcgb2YgcGFyYW1ldGVycy4gTWFpbiBpbnRlcmZhY2Ugb2YgdGhlIGxpYnJhcnlcbiAqL1xuY2xhc3MgUGFyYW1ldGVyQmFnIHtcbiAgY29uc3RydWN0b3IocGFyYW1zLCBkZWZpbml0aW9ucykge1xuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgcGFyYW1ldGVycy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBQYXJhbT59XG4gICAgICogQG5hbWUgX3BhcmFtc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2YgZGVmaW5pdGlvbnMgd2l0aCBpbml0IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3Q8U3RyaW5nLCBwYXJhbURlZmluaXRpb24+fVxuICAgICAqIEBuYW1lIF9kZWZpbml0aW9uc1xuICAgICAqIEBtZW1iZXJvZiBQYXJhbWV0ZXJCYWdcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2RlZmluaXRpb25zID0gZGVmaW5pdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGdsb2JhbCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7U2V0fVxuICAgICAqIEBuYW1lIF9nbG9iYWxMaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyb2YgUGFyYW1ldGVyQmFnXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMgPSBuZXcgU2V0KCk7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHBhcmFtcyBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0PFN0cmluZywgU2V0Pn1cbiAgICAgKiBAbmFtZSBfcGFyYW1zTGlzdGVuZXJzXG4gICAgICogQG1lbWJlcm9mIFBhcmFtZXRlckJhZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzID0ge307XG5cbiAgICAvLyBpbml0aWFsaXplIGVtcHR5IFNldCBmb3IgZWFjaCBwYXJhbVxuICAgIGZvciAobGV0IG5hbWUgaW4gcGFyYW1zKVxuICAgICAgdGhpcy5fcGFyYW1zTGlzdGVuZXJzW25hbWVdID0gbmV3IFNldCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ2l2ZW4gZGVmaW5pdGlvbnMgYWxvbmcgd2l0aCB0aGUgaW5pdGlhbGl6YXRpb24gdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBnZXREZWZpbml0aW9ucyhuYW1lID0gbnVsbCkge1xuICAgIGlmIChuYW1lICE9PSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMuX2RlZmluaXRpb25zW25hbWVdO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLl9kZWZpbml0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBwYXJhbWV0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJuIHtNaXhlZH0gLSBWYWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuX3BhcmFtc1tuYW1lXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlYWQgcHJvcGVydHkgdmFsdWUgb2YgdW5kZWZpbmVkIHBhcmFtZXRlciBcIiR7bmFtZX1cImApO1xuXG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtc1tuYW1lXS52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIG9mIGEgcGFyYW1ldGVyLiBJZiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBpcyB1cGRhdGVkXG4gICAqIChha2EgaWYgcHJldmlvdXMgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gbmV3IHZhbHVlKSBhbGwgcmVnaXN0ZXJlZFxuICAgKiBjYWxsYmFja3MgYXJlIHJlZ2lzdGVyZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm4ge01peGVkfSAtIE5ldyB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSB0aGlzLl9wYXJhbXNbbmFtZV07XG4gICAgY29uc3QgdXBkYXRlZCA9IHBhcmFtLnNldFZhbHVlKHZhbHVlKTtcbiAgICB2YWx1ZSA9IHBhcmFtLmdldFZhbHVlKCk7XG5cbiAgICBpZiAodXBkYXRlZCkge1xuICAgICAgY29uc3QgbWV0YXMgPSBwYXJhbS5kZWZpbml0aW9uLm1ldGFzO1xuICAgICAgLy8gdHJpZ2dlciBnbG9iYWwgbGlzdGVuZXJzXG4gICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMpXG4gICAgICAgIGxpc3RlbmVyKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICAgIC8vIHRyaWdnZXIgcGFyYW0gbGlzdGVuZXJzXG4gICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0pXG4gICAgICAgIGxpc3RlbmVyKHZhbHVlLCBtZXRhcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZSBpZiB0aGUgYG5hbWVgIHBhcmFtZXRlciBleGlzdHMgb3Igbm90LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGhhcyhuYW1lKSB7XG4gICAgcmV0dXJuICh0aGlzLl9wYXJhbXNbbmFtZV0pID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGEgcGFyYW1ldGVyIHRvIGl0cyBpbml0IHZhbHVlLiBSZXNldCBhbGwgcGFyYW1ldGVycyBpZiBubyBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lPW51bGxdIC0gTmFtZSBvZiB0aGUgcGFyYW1ldGVyIHRvIHJlc2V0LlxuICAgKi9cbiAgcmVzZXQobmFtZSA9IG51bGwpIHtcbiAgICBpZiAobmFtZSAhPT0gbnVsbClcbiAgICAgIHRoaXMuc2V0KG5hbWUsIHBhcmFtLmRlZmluaXRpb24uaW5pdFZhbHVlKTtcbiAgICBlbHNlXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl9wYXJhbXMpLmZvckVhY2goKG5hbWUpID0+IHRoaXMucmVzZXQobmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYmFja1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIFVwZGF0ZWQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IFttZXRhPV0gLSBHaXZlbiBtZXRhIGRhdGEgb2YgdGhlIHBhcmFtZXRlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIEFkZCBsaXN0ZW5lciB0byBhbGwgcGFyYW0gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlZ2lzdGVyLlxuICAgKi9cbiAgYWRkTGlzdGVuZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lcnMuYWRkKGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbGlzdGVuZXIgZnJvbSBhbGwgcGFyYW0gY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+bGlzdGVuZXJDYWxsYWNrfSBjYWxsYmFjayAtIExpc3RlbmVyIHRvIHJlbW92ZS4gSWZcbiAgICogIGBudWxsYCByZW1vdmUgYWxsIGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrID0gbnVsbCkge1xuICAgIGlmIChjYWxsYmFjayA9PT0gbnVsbClcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5jbGVhcigpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVycy5kZWxldGUoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSBVcGRhdGVkIHZhbHVlIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbbWV0YT1dIC0gR2l2ZW4gbWV0YSBkYXRhIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBZGQgbGlzdGVuZXIgdG8gYSBnaXZlbiBwYXJhbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFBhcmFtZXRlciBuYW1lLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlckJhZ35wYXJhbUxpc3RlbmVyQ2FsbGFja30gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBhcHBseVxuICAgKiAgd2hlbiB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBjaGFuZ2VzLlxuICAgKi9cbiAgYWRkUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3BhcmFtc0xpc3RlbmVyc1tuYW1lXS5hZGQoY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsaXN0ZW5lciBmcm9tIGEgZ2l2ZW4gcGFyYW0gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBQYXJhbWV0ZXIgbmFtZS5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJCYWd+cGFyYW1MaXN0ZW5lckNhbGxhY2t9IGNhbGxiYWNrIC0gTGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgKiAgSWYgYG51bGxgIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxuICAgKi9cbiAgcmVtb3ZlUGFyYW1MaXN0ZW5lcihuYW1lLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBpZiAoY2FsbGJhY2sgPT09IG51bGwpXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uY2xlYXIoKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLl9wYXJhbXNMaXN0ZW5lcnNbbmFtZV0uZGVsZXRlKGNhbGxiYWNrKTtcbiAgfVxufVxuXG4vKipcbiAqIEZhY3RvcnkgZm9yIHRoZSBgUGFyYW1ldGVyQmFnYCBjbGFzcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxTdHJpbmcsIHBhcmFtRGVmaW5pdGlvbj59IGRlZmluaXRpb25zIC0gT2JqZWN0IGRlc2NyaWJpbmcgdGhlXG4gKiAgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7T2JqZWN0PFN0cmluZywgTWl4ZWQ+fSB2YWx1ZXMgLSBJbml0aWFsaXphdGlvbiB2YWx1ZXMgZm9yIHRoZVxuICogIHBhcmFtZXRlcnMuXG4gKiBAcmV0dXJuIHtQYXJhbWV0ZXJCYWd9XG4gKi9cbmZ1bmN0aW9uIHBhcmFtZXRlcnMoZGVmaW5pdGlvbnMsIHZhbHVlcyA9IHt9KSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gIGZvciAobGV0IG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLmhhc093blByb3BlcnR5KG5hbWUpID09PSBmYWxzZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSBcIiR7bmFtZX1cImApO1xuICB9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBkZWZpbml0aW9ucykge1xuICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkgPT09IHRydWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcIiR7bmFtZX1cIiBhbHJlYWR5IGRlZmluZWRgKTtcblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSBkZWZpbml0aW9uc1tuYW1lXTtcblxuICAgIGlmICghcGFyYW1UZW1wbGF0ZXNbZGVmaW5pdGlvbi50eXBlXSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSB0eXBlIFwiJHtkZWZpbml0aW9uLnR5cGV9XCJgKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRlZmluaXRpb25UZW1wbGF0ZSxcbiAgICAgIHR5cGVDaGVja0Z1bmN0aW9uXG4gICAgfSA9IHBhcmFtVGVtcGxhdGVzW2RlZmluaXRpb24udHlwZV07XG5cbiAgICBsZXQgdmFsdWU7XG5cbiAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KG5hbWUpID09PSB0cnVlKVxuICAgICAgdmFsdWUgPSB2YWx1ZXNbbmFtZV07XG4gICAgZWxzZVxuICAgICAgdmFsdWUgPSBkZWZpbml0aW9uLmRlZmF1bHQ7XG5cbiAgICAvLyBzdG9yZSBpbml0IHZhbHVlIGluIGRlZmluaXRpb25cbiAgICBkZWZpbml0aW9uLmluaXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKCF0eXBlQ2hlY2tGdW5jdGlvbiB8fMKgIWRlZmluaXRpb25UZW1wbGF0ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYXJhbSB0eXBlIGRlZmluaXRpb24gXCIke2RlZmluaXRpb24udHlwZX1cImApO1xuXG4gICAgcGFyYW1zW25hbWVdID0gbmV3IFBhcmFtKG5hbWUsIGRlZmluaXRpb25UZW1wbGF0ZSwgdHlwZUNoZWNrRnVuY3Rpb24sIGRlZmluaXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUGFyYW1ldGVyQmFnKHBhcmFtcywgZGVmaW5pdGlvbnMpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IHR5cGUgZm9yIHRoZSBgcGFyYW1ldGVyc2AgZmFjdG9yeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlTmFtZSAtIFZhbHVlIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgYXMgdGhlIGB0eXBlYCBvZiBhXG4gKiAgcGFyYW0gZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSB7cGFyYW1ldGVyRGVmaW5pdGlvbn0gcGFyYW1ldGVyRGVmaW5pdGlvbiAtIE9iamVjdCBkZXNjcmliaW5nIHRoZVxuICogIHBhcmFtZXRlci5cbiAqL1xucGFyYW1ldGVycy5kZWZpbmVUeXBlID0gZnVuY3Rpb24odHlwZU5hbWUsIHBhcmFtZXRlckRlZmluaXRpb24pIHtcbiAgcGFyYW1UZW1wbGF0ZXNbdHlwZU5hbWVdID0gcGFyYW1ldGVyRGVmaW5pdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1ldGVycztcbiIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJyV2ZXJzaW9uJSc7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgY29yZSB9IGZyb20gJy4uL2NvbW1vbi9jb3JlL19uYW1lc3BhY2UnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBvcGVyYXRvciB9IGZyb20gJy4uL2NvbW1vbi9vcGVyYXRvci9fbmFtZXNwYWNlJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdXRpbHMgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvX25hbWVzcGFjZSc7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgc291cmNlIH0gZnJvbSAnLi9zb3VyY2UvX25hbWVzcGFjZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNpbmsgfSBmcm9tICcuL3NpbmsvX25hbWVzcGFjZSc7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvJztcblxuY29uc3QgY29tbW9uRGVmaW5pdGlvbnMgPSB7XG4gIG1pbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogLTEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1heDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgd2lkdGg6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMzAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBoZWlnaHQ6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTUwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBjb250YWluZXI6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBjYW52YXM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBudWxsLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuY29uc3QgaGFzRHVyYXRpb25EZWZpbml0aW9ucyA9IHtcbiAgZHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIG1pbjogMCxcbiAgICBtYXg6ICtJbmZpbml0eSxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICByZWZlcmVuY2VUaW1lOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxufTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGV4dGVuZCBpbiBvcmRlciB0byBjcmVhdGUgZ3JhcGhpYyBzaW5rcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cIndhcm5pbmdcIj5fVGhpcyBjbGFzcyBzaG91bGQgYmUgY29uc2lkZXJlZCBhYnN0cmFjdCBhbmQgb25seVxuICogYmUgdXNlZCB0byBiZSBleHRlbmRlZC5fPC9zcGFuPlxuICpcbiAqIEB0b2RvIC0gZml4IGZsb2F0IHJvdW5kaW5nIGVycm9ycyAocHJvZHVjZSBkZWNheXMgaW4gc3luYyBkcmF3cylcbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS0xXSAtIE1pbmltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZSByZXByZXNlbnRlZCBpbiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIFRoaXMgcGFyYW1ldGVyIG9ubHkgZXhpc3RzIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWxcbiAqICBjb25zZWN1dGl2ZSBmcmFtZXMgb24gdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnJlZmVyZW5jZVRpbWU9bnVsbF0gLSBPcHRpb25uYWwgcmVmZXJlbmNlIHRpbWUgdGhlXG4gKiAgZGlzcGxheSBzaG91bGQgY29uc2lkZXJlciBhcyB0aGUgb3JpZ2luLiBJcyBvbmx5IHVzZWZ1bGwgd2hlbiBzeW5jaHJvbml6aW5nXG4gKiAgc2V2ZXJhbCBkaXNwbGF5IHVzaW5nIHRoZSBgRGlzcGxheVN5bmNgIGNsYXNzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0c1xuICogIGZvciBvcGVyYXRvcnMgdGhhdCBkaXNwbGF5IHNldmVyYWwgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuXG4gKi9cbmNsYXNzIEJhc2VEaXNwbGF5IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKGRlZnMsIG9wdGlvbnMgPSB7fSwgaGFzRHVyYXRpb24gPSB0cnVlKSB7XG4gICAgbGV0IGNvbW1vbkRlZnM7XG5cbiAgICBpZiAoaGFzRHVyYXRpb24pXG4gICAgICBjb21tb25EZWZzID0gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uRGVmaW5pdGlvbnMsIGhhc0R1cmF0aW9uRGVmaW5pdGlvbnMpO1xuICAgIGVsc2VcbiAgICAgIGNvbW1vbkRlZnMgPSBjb21tb25EZWZpbml0aW9uc1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBjb21tb25EZWZzLCBkZWZzKTtcblxuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2NhbnZhcycpID09PSBudWxsICYmIHRoaXMucGFyYW1zLmdldCgnY29udGFpbmVyJykgPT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFyYW1ldGVyOiBgY2FudmFzYCBvciBgY29udGFpbmVyYCBub3QgZGVmaW5lZCcpO1xuXG4gICAgY29uc3QgY2FudmFzUGFyYW0gPSB0aGlzLnBhcmFtcy5nZXQoJ2NhbnZhcycpO1xuICAgIGNvbnN0IGNvbnRhaW5lclBhcmFtID0gdGhpcy5wYXJhbXMuZ2V0KCdjb250YWluZXInKTtcblxuICAgIC8vIHByZXBhcmUgY2FudmFzXG4gICAgaWYgKGNhbnZhc1BhcmFtKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbnZhc1BhcmFtID09PSAnc3RyaW5nJylcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhbnZhc1BhcmFtKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXNQYXJhbTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lclBhcmFtKSB7XG4gICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbnRhaW5lclBhcmFtID09PSAnc3RyaW5nJylcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJQYXJhbSk7XG4gICAgICBlbHNlXG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lclBhcmFtO1xuXG4gICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG5cbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5jYWNoZWRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmNhY2hlZEN0eCA9IHRoaXMuY2FjaGVkQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLnByZXZpb3VzRnJhbWUgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSBoYXNEdXJhdGlvbiA/IHRoaXMucGFyYW1zLmdldCgncmVmZXJlbmNlVGltZScpIDogbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEluc3RhbmNlIG9mIHRoZSBgRGlzcGxheVN5bmNgIHVzZWQgdG8gc3luY2hyb25pemUgdGhlIGRpZmZlcmVudCBkaXNwbGF5c1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kaXNwbGF5U3luYyA9IGZhbHNlO1xuXG4gICAgLy9cbiAgICB0aGlzLl9zdGFjaztcbiAgICB0aGlzLl9yYWZJZDtcblxuICAgIHRoaXMucmVuZGVyU3RhY2sgPSB0aGlzLnJlbmRlclN0YWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaGlmdEVycm9yID0gMDtcblxuICAgIC8vIGluaXRpYWxpemUgY2FudmFzIHNpemUgYW5kIHkgc2NhbGUgdHJhbnNmZXJ0IGZ1bmN0aW9uXG4gICAgdGhpcy5fcmVzaXplKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMucGFyYW1zLmdldCgnd2lkdGgnKTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2hlaWdodCcpO1xuXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgY2FjaGVkQ3R4ID0gdGhpcy5jYWNoZWRDdHg7XG5cbiAgICBjb25zdCBkUFIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGJQUiA9IGN0eC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHgubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm1zQmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgY3R4Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICBjdHguYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgdGhpcy5waXhlbFJhdGlvID0gZFBSIC8gYlBSO1xuXG4gICAgY29uc3QgbGFzdFdpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcbiAgICBjb25zdCBsYXN0SGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgdGhpcy5jYW52YXNXaWR0aCA9IHdpZHRoICogdGhpcy5waXhlbFJhdGlvO1xuICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5waXhlbFJhdGlvO1xuXG4gICAgY2FjaGVkQ3R4LmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY2FjaGVkQ3R4LmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcblxuICAgIC8vIGNvcHkgY3VycmVudCBpbWFnZSBmcm9tIGN0eCAocmVzaXplKVxuICAgIGlmIChsYXN0V2lkdGggJiYgbGFzdEhlaWdodCkge1xuICAgICAgY2FjaGVkQ3R4LmRyYXdJbWFnZShjdHguY2FudmFzLFxuICAgICAgICAwLCAwLCBsYXN0V2lkdGgsIGxhc3RIZWlnaHQsXG4gICAgICAgIDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0XG4gICAgICApO1xuICAgIH1cblxuICAgIGN0eC5jYW52YXMud2lkdGggPSB0aGlzLmNhbnZhc1dpZHRoO1xuICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY3R4LmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICBjdHguY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG5cbiAgICAvLyB1cGRhdGUgc2NhbGVcbiAgICB0aGlzLl9zZXRZU2NhbGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIHRyYW5zZmVydCBmdW5jdGlvbiB1c2VkIHRvIG1hcCB2YWx1ZXMgdG8gcGl4ZWwgaW4gdGhlIHkgYXhpc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldFlTY2FsZSgpIHtcbiAgICBjb25zdCBtaW4gPSB0aGlzLnBhcmFtcy5nZXQoJ21pbicpO1xuICAgIGNvbnN0IG1heCA9IHRoaXMucGFyYW1zLmdldCgnbWF4Jyk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBhID0gKDAgLSBoZWlnaHQpIC8gKG1heCAtIG1pbik7XG4gICAgY29uc3QgYiA9IGhlaWdodCAtIChhICogbWluKTtcblxuICAgIHRoaXMuZ2V0WVBvc2l0aW9uID0gKHgpID0+IGEgKiB4ICsgYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBpbiBwaXhlbCBhIGB2ZWN0b3JgIGZyYW1lIG5lZWRzIHRvIGJlIGRyYXduLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWluaW11bUZyYW1lV2lkdGgoKSB7XG4gICAgcmV0dXJuIDE7IC8vIG5lZWQgb25lIHBpeGVsIHRvIGRyYXcgdGhlIGxpbmVcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBleGVjdXRlZCB3aGVuIGEgcGFyYW1ldGVyIGlzIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gUGFyYW1ldGVyIG5hbWUuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gUGFyYW1ldGVyIHZhbHVlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YXMgLSBNZXRhZGF0YXMgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdtaW4nOlxuICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgLy8gQHRvZG8gLSBtYWtlIHN1cmUgdGhhdCBtaW4gYW5kIG1heCBhcmUgZGlmZmVyZW50XG4gICAgICAgIHRoaXMuX3NldFlTY2FsZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgIHRoaXMuX3Jlc2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9wYWdhdGVTdHJlYW1QYXJhbXMoKSB7XG4gICAgc3VwZXIucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG5cbiAgICB0aGlzLl9zdGFjayA9IFtdO1xuICAgIHRoaXMuX3JhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyU3RhY2spO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5jYWNoZWRDdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gbnVsbDtcbiAgICBzdXBlci5maW5hbGl6ZVN0cmVhbShlbmRUaW1lKTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9yYWZJZCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBjdXJyZW50IGZyYW1lIHRvIHRoZSBmcmFtZXMgdG8gZHJhdy4gU2hvdWxkIG5vdCBiZSBvdmVycmlkZW4uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY29weSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBjb25zdCBkYXRhID0gZnJhbWUuZGF0YTtcblxuICAgIC8vIGNvcHkgdmFsdWVzIG9mIHRoZSBpbnB1dCBmcmFtZSBhcyB0aGV5IG1pZ2h0IGJlIHVwZGF0ZWRcbiAgICAvLyBpbiByZWZlcmVuY2UgYmVmb3JlIGJlaW5nIGNvbnN1bWVkIGluIHRoZSBkcmF3IGZ1bmN0aW9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgIGNvcHlbaV0gPSBkYXRhW2ldO1xuXG4gICAgdGhpcy5fc3RhY2sucHVzaCh7XG4gICAgICB0aW1lOiBmcmFtZS50aW1lLFxuICAgICAgZGF0YTogY29weSxcbiAgICAgIG1ldGFkYXRhOiBmcmFtZS5tZXRhZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGFjY3VtdWxhdGVkIGZyYW1lcy4gTWV0aG9kIGNhbGxlZCBpbiBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlbmRlclN0YWNrKCkge1xuICAgIGlmICh0aGlzLnBhcmFtcy5oYXMoJ2R1cmF0aW9uJykpIHtcbiAgICAgIC8vIHJlbmRlciBhbGwgZnJhbWUgc2luY2UgbGFzdCBgcmVuZGVyU3RhY2tgIGNhbGxcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5fc3RhY2subGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICB0aGlzLnNjcm9sbE1vZGVEcmF3KHRoaXMuX3N0YWNrW2ldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb25seSByZW5kZXIgbGFzdCByZWNlaXZlZCBmcmFtZSBpZiBhbnlcbiAgICAgIGlmICh0aGlzLl9zdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZWluaXQgc3RhY2sgZm9yIG5leHQgY2FsbFxuICAgIHRoaXMuX3N0YWNrLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJTdGFjayk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBkYXRhIGZyb20gcmlnaHQgdG8gbGVmdCB3aXRoIHNjcm9sbGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKiBAdG9kbyAtIGNoZWNrIHBvc3NpYmlsaXR5IG9mIG1haW50YWluaW5nIGFsbCB2YWx1ZXMgZnJvbSBvbmUgcGxhY2UgdG9cbiAgICogICAgICAgICBtaW5pbWl6ZSBmbG9hdCBlcnJvciB0cmFja2luZy5cbiAgICovXG4gIHNjcm9sbE1vZGVEcmF3KGZyYW1lKSB7XG4gICAgY29uc3QgZnJhbWVUeXBlID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgc291cmNlU2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG5cbiAgICBjb25zdCBjYW52YXNEdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZHVyYXRpb24nKTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgY2FudmFzSGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG5cbiAgICBjb25zdCBwcmV2aW91c0ZyYW1lID0gdGhpcy5wcmV2aW91c0ZyYW1lO1xuXG4gICAgLy8gY3VycmVudCB0aW1lIGF0IHRoZSBsZWZ0IG9mIHRoZSBjYW52YXNcbiAgICBjb25zdCBjdXJyZW50VGltZSA9ICh0aGlzLmN1cnJlbnRUaW1lICE9PSBudWxsKSA/IHRoaXMuY3VycmVudFRpbWUgOiBmcmFtZS50aW1lO1xuICAgIGNvbnN0IGZyYW1lU3RhcnRUaW1lID0gZnJhbWUudGltZTtcbiAgICBjb25zdCBsYXN0RnJhbWVUaW1lID0gcHJldmlvdXNGcmFtZSA/IHByZXZpb3VzRnJhbWUudGltZSA6IDA7XG4gICAgY29uc3QgbGFzdEZyYW1lRHVyYXRpb24gPSB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID8gdGhpcy5sYXN0RnJhbWVEdXJhdGlvbiA6IDA7XG5cbiAgICBsZXQgZnJhbWVEdXJhdGlvbjtcblxuICAgIGlmIChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpIHtcbiAgICAgIGNvbnN0IHBpeGVsRHVyYXRpb24gPSBjYW52YXNEdXJhdGlvbiAvIGNhbnZhc1dpZHRoO1xuICAgICAgZnJhbWVEdXJhdGlvbiA9IHRoaXMuZ2V0TWluaW11bUZyYW1lV2lkdGgoKSAqIHBpeGVsRHVyYXRpb247XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPT09ICdzaWduYWwnKSB7XG4gICAgICBmcmFtZUR1cmF0aW9uID0gZnJhbWVTaXplIC8gc291cmNlU2FtcGxlUmF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFtZUVuZFRpbWUgPSBmcmFtZVN0YXJ0VGltZSArIGZyYW1lRHVyYXRpb247XG4gICAgLy8gZGVmaW5lIGlmIHdlIG5lZWQgdG8gc2hpZnQgdGhlIGNhbnZhc1xuICAgIGNvbnN0IHNoaWZ0VGltZSA9IGZyYW1lRW5kVGltZSAtIGN1cnJlbnRUaW1lO1xuXG4gICAgLy8gaWYgdGhlIGNhbnZhcyBpcyBub3Qgc3luY2VkLCBzaG91bGQgbmV2ZXIgZ28gdG8gYGVsc2VgXG4gICAgaWYgKHNoaWZ0VGltZSA+IDApIHtcbiAgICAgIC8vIHNoaWZ0IHRoZSBjYW52YXMgb2Ygc2hpZnRUaW1lIGluIHBpeGVsc1xuICAgICAgY29uc3QgZlNoaWZ0ID0gKHNoaWZ0VGltZSAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoIC0gdGhpcy5zaGlmdEVycm9yO1xuICAgICAgY29uc3QgaVNoaWZ0ID0gTWF0aC5mbG9vcihmU2hpZnQgKyAwLjUpO1xuICAgICAgdGhpcy5zaGlmdEVycm9yID0gZlNoaWZ0IC0gaVNoaWZ0O1xuXG4gICAgICBjb25zdCBjdXJyZW50VGltZSA9IGZyYW1lU3RhcnRUaW1lICsgZnJhbWVEdXJhdGlvbjtcbiAgICAgIHRoaXMuc2hpZnRDYW52YXMoaVNoaWZ0LCBjdXJyZW50VGltZSk7XG5cbiAgICAgIC8vIGlmIHNpYmxpbmdzLCBzaGFyZSB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGlmICh0aGlzLmRpc3BsYXlTeW5jKVxuICAgICAgICB0aGlzLmRpc3BsYXlTeW5jLnNoaWZ0U2libGluZ3MoaVNoaWZ0LCBjdXJyZW50VGltZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gd2lkdGggb2YgdGhlIGZyYW1lIGluIHBpeGVsc1xuICAgIGNvbnN0IGZGcmFtZVdpZHRoID0gKGZyYW1lRHVyYXRpb24gLyBjYW52YXNEdXJhdGlvbikgKiBjYW52YXNXaWR0aDtcbiAgICBjb25zdCBmcmFtZVdpZHRoID0gTWF0aC5mbG9vcihmRnJhbWVXaWR0aCArIDAuNSk7XG5cbiAgICAvLyBkZWZpbmUgcG9zaXRpb24gb2YgdGhlIGhlYWQgaW4gdGhlIGNhbnZhc1xuICAgIGNvbnN0IGNhbnZhc1N0YXJ0VGltZSA9IHRoaXMuY3VycmVudFRpbWUgLSBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVSYXRpbyA9IChmcmFtZVN0YXJ0VGltZSAtIGNhbnZhc1N0YXJ0VGltZSkgLyBjYW52YXNEdXJhdGlvbjtcbiAgICBjb25zdCBzdGFydFRpbWVQb3NpdGlvbiA9IHN0YXJ0VGltZVJhdGlvICogY2FudmFzV2lkdGg7XG5cbiAgICAvLyBudW1iZXIgb2YgcGl4ZWxzIHNpbmNlIGxhc3QgZnJhbWVcbiAgICBsZXQgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSB0aGlzLmxhc3RGcmFtZVdpZHRoO1xuXG4gICAgaWYgKChmcmFtZVR5cGUgPT09ICdzY2FsYXInIHx8IGZyYW1lVHlwZSA9PT0gJ3ZlY3RvcicpICYmIHByZXZpb3VzRnJhbWUpIHtcbiAgICAgIGNvbnN0IGZyYW1lSW50ZXJ2YWwgPSBmcmFtZS50aW1lIC0gcHJldmlvdXNGcmFtZS50aW1lO1xuICAgICAgcGl4ZWxzU2luY2VMYXN0RnJhbWUgPSAoZnJhbWVJbnRlcnZhbCAvIGNhbnZhc0R1cmF0aW9uKSAqIGNhbnZhc1dpZHRoO1xuICAgIH1cblxuICAgIC8vIGRyYXcgY3VycmVudCBmcmFtZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZShzdGFydFRpbWVQb3NpdGlvbiwgMCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gc2F2ZSBjdXJyZW50IGNhbnZhcyBzdGF0ZSBpbnRvIGNhY2hlZCBjYW52YXNcbiAgICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XG4gICAgdGhpcy5jYWNoZWRDdHguZHJhd0ltYWdlKHRoaXMuY2FudmFzLCAwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcblxuICAgIC8vIHVwZGF0ZSBsYXN0RnJhbWVEdXJhdGlvbiwgbGFzdEZyYW1lV2lkdGhcbiAgICB0aGlzLmxhc3RGcmFtZUR1cmF0aW9uID0gZnJhbWVEdXJhdGlvbjtcbiAgICB0aGlzLmxhc3RGcmFtZVdpZHRoID0gZnJhbWVXaWR0aDtcbiAgICB0aGlzLnByZXZpb3VzRnJhbWUgPSBmcmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCBjYW52YXMsIGFsc28gY2FsbGVkIGZyb20gYERpc3BsYXlTeW5jYFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKSB7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgY2FjaGUgPSB0aGlzLmNhY2hlZENhbnZhcztcbiAgICBjb25zdCBjYWNoZWRDdHggPSB0aGlzLmNhY2hlZEN0eDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgY29uc3QgY3JvcHBlZFdpZHRoID0gd2lkdGggLSBpU2hpZnQ7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHRpbWU7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIGN0eC5kcmF3SW1hZ2UoY2FjaGUsIGlTaGlmdCwgMCwgY3JvcHBlZFdpZHRoLCBoZWlnaHQsIDAsIDAsIGNyb3BwZWRXaWR0aCwgaGVpZ2h0KTtcbiAgICAvLyBzYXZlIGN1cnJlbnQgY2FudmFzIHN0YXRlIGludG8gY2FjaGVkIGNhbnZhc1xuICAgIGNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgY2FjaGVkQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvLyBAdG9kbyAtIEZpeCB0cmlnZ2VyIG1vZGVcbiAgLy8gYWxsb3cgdG8gd2l0Y2ggZWFzaWx5IGJldHdlZW4gdGhlIDIgbW9kZXNcbiAgLy8gc2V0VHJpZ2dlcihib29sKSB7XG4gIC8vICAgdGhpcy5wYXJhbXMudHJpZ2dlciA9IGJvb2w7XG4gIC8vICAgLy8gY2xlYXIgY2FudmFzIGFuZCBjYWNoZVxuICAvLyAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLnBhcmFtcy53aWR0aCwgdGhpcy5wYXJhbXMuaGVpZ2h0KTtcbiAgLy8gICB0aGlzLmNhY2hlZEN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5wYXJhbXMud2lkdGgsIHRoaXMucGFyYW1zLmhlaWdodCk7XG4gIC8vICAgLy8gcmVzZXQgX2N1cnJlbnRYUG9zaXRpb25cbiAgLy8gICB0aGlzLl9jdXJyZW50WFBvc2l0aW9uID0gMDtcbiAgLy8gICB0aGlzLmxhc3RTaGlmdEVycm9yID0gMDtcbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBBbHRlcm5hdGl2ZSBkcmF3aW5nIG1vZGUuXG4gIC8vICAqIERyYXcgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBnbyBiYWNrIHRvIGxlZnQgd2hlbiA+IHdpZHRoXG4gIC8vICAqL1xuICAvLyB0cmlnZ2VyTW9kZURyYXcodGltZSwgZnJhbWUpIHtcbiAgLy8gICBjb25zdCB3aWR0aCAgPSB0aGlzLnBhcmFtcy53aWR0aDtcbiAgLy8gICBjb25zdCBoZWlnaHQgPSB0aGlzLnBhcmFtcy5oZWlnaHQ7XG4gIC8vICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnBhcmFtcy5kdXJhdGlvbjtcbiAgLy8gICBjb25zdCBjdHggPSB0aGlzLmN0eDtcblxuICAvLyAgIGNvbnN0IGR0ID0gdGltZSAtIHRoaXMucHJldmlvdXNUaW1lO1xuICAvLyAgIGNvbnN0IGZTaGlmdCA9IChkdCAvIGR1cmF0aW9uKSAqIHdpZHRoIC0gdGhpcy5sYXN0U2hpZnRFcnJvcjsgLy8gcHhcbiAgLy8gICBjb25zdCBpU2hpZnQgPSBNYXRoLnJvdW5kKGZTaGlmdCk7XG4gIC8vICAgdGhpcy5sYXN0U2hpZnRFcnJvciA9IGlTaGlmdCAtIGZTaGlmdDtcblxuICAvLyAgIHRoaXMuY3VycmVudFhQb3NpdGlvbiArPSBpU2hpZnQ7XG5cbiAgLy8gICAvLyBkcmF3IHRoZSByaWdodCBwYXJ0XG4gIC8vICAgY3R4LnNhdmUoKTtcbiAgLy8gICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgY3R4LmNsZWFyUmVjdCgtaVNoaWZ0LCAwLCBpU2hpZnQsIGhlaWdodCk7XG4gIC8vICAgdGhpcy5kcmF3Q3VydmUoZnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgY3R4LnJlc3RvcmUoKTtcblxuICAvLyAgIC8vIGdvIGJhY2sgdG8gdGhlIGxlZnQgb2YgdGhlIGNhbnZhcyBhbmQgcmVkcmF3IHRoZSBzYW1lIHRoaW5nXG4gIC8vICAgaWYgKHRoaXMuY3VycmVudFhQb3NpdGlvbiA+IHdpZHRoKSB7XG4gIC8vICAgICAvLyBnbyBiYWNrIHRvIHN0YXJ0XG4gIC8vICAgICB0aGlzLmN1cnJlbnRYUG9zaXRpb24gLT0gd2lkdGg7XG5cbiAgLy8gICAgIGN0eC5zYXZlKCk7XG4gIC8vICAgICBjdHgudHJhbnNsYXRlKHRoaXMuY3VycmVudFhQb3NpdGlvbiwgMCk7XG4gIC8vICAgICBjdHguY2xlYXJSZWN0KC1pU2hpZnQsIDAsIGlTaGlmdCwgaGVpZ2h0KTtcbiAgLy8gICAgIHRoaXMuZHJhd0N1cnZlKGZyYW1lLCB0aGlzLnByZXZpb3VzRnJhbWUsIGlTaGlmdCk7XG4gIC8vICAgICBjdHgucmVzdG9yZSgpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VEaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgcmFkaXVzOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBtaW46IDAsXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBsaW5lOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGNvbG9yczoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gIH1cbn1cblxuXG4vKipcbiAqIEJyZWFrcG9pbnQgRnVuY3Rpb24sIGRpc3BsYXkgYSBzdHJlYW0gb2YgdHlwZSBgdmVjdG9yYC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29sb3JzPW51bGxdIC0gQXJyYXkgb2YgY29sb3JzIGZvciBlYWNoIGluZGV4IG9mIHRoZVxuICogIHZlY3Rvci4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJhZGl1cz0wXSAtIFJhZGl1cyBvZiB0aGUgZG90IGF0IGVhY2ggdmFsdWUuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmxpbmU9dHJ1ZV0gLSBEaXNwbGF5IGEgbGluZSBiZXR3ZWVuIGVhY2ggY29uc2VjdXRpdmVcbiAqICB2YWx1ZXMgb2YgdGhlIHZlY3Rvci4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVSYXRlOiAwLjEsXG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcidcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGJwZiA9IG5ldyBsZm8uc2luay5CcGZEaXNwbGF5KHtcbiAqICAgY2FudmFzOiAnI2JwZicsXG4gKiAgIGR1cmF0aW9uOiAxMCxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChicGYpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IGR0ID0gMC4xO1xuICpcbiAqIChmdW5jdGlvbiBnZW5lcmF0ZURhdGEoKSB7XG4gKiAgIGV2ZW50SW4ucHJvY2Vzcyh0aW1lLCBbTWF0aC5yYW5kb20oKSAqIDIgLSAxLCBNYXRoLnJhbmRvbSgpICogMiAtIDFdKTtcbiAqICAgdGltZSArPSBkdDtcbiAqXG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBkdCAqIDEwMDApO1xuICogfSgpKTtcbiAqL1xuY2xhc3MgQnBmRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMucHJldkZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBnZXRNaW5pbXVtRnJhbWVXaWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbXMuZ2V0KCdyYWRpdXMnKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdjb2xvcnMnKSA9PT0gbnVsbClcbiAgICAgIHRoaXMucGFyYW1zLnNldCgnY29sb3JzJywgZ2V0Q29sb3JzKCdicGYnLCB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUpKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSwgZnJhbWVXaWR0aCwgcGl4ZWxzU2luY2VMYXN0RnJhbWUpIHtcbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpO1xuICAgIGNvbnN0IHJhZGl1cyA9IHRoaXMucGFyYW1zLmdldCgncmFkaXVzJyk7XG4gICAgY29uc3QgZHJhd0xpbmUgPSB0aGlzLnBhcmFtcy5nZXQoJ2xpbmUnKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgZGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3QgcHJldkRhdGEgPSB0aGlzLnByZXZGcmFtZSA/IHRoaXMucHJldkZyYW1lLmRhdGEgOiBudWxsO1xuXG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZnJhbWVTaXplOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NZID0gdGhpcy5nZXRZUG9zaXRpb24oZGF0YVtpXSk7XG4gICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tpXTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cbiAgICAgIGlmIChwcmV2RGF0YSAmJiBkcmF3TGluZSkge1xuICAgICAgICBjb25zdCBsYXN0UG9zWSA9IHRoaXMuZ2V0WVBvc2l0aW9uKHByZXZEYXRhW2ldKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgbGFzdFBvc1kpO1xuICAgICAgICBjdHgubGluZVRvKDAsIHBvc1kpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJhZGl1cyA+IDApIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKDAsIHBvc1ksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIHRoaXMucHJldkZyYW1lID0gZnJhbWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnBmRGlzcGxheTtcbiIsImltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCB7IGdldENvbG9ycyB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHRocmVzaG9sZDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgdGhyZXNob2xkSW5kZXg6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29sb3I6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ21hcmtlcicpLFxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9XG59O1xuXG4vKipcbiAqIERpc3BsYXkgYSBtYXJrZXIgYWNjb3JkaW5nIHRvIGEgYHZlY3RvcmAgaW5wdXQgZnJhbWUuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBDb2xvciBvZiB0aGUgbWFya2VyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZEluZGV4PTBdIC0gSW5kZXggb2YgdGhlIGluY29tbWluZyBmcmFtZVxuICogIGRhdGEgdG8gY29tcGFyZSBhZ2FpbnN0IHRoZSB0aHJlc2hvbGQuIF9TaG91bGQgYmUgdXNlZCBpbiBjb25qb25jdGlvbiB3aXRoXG4gKiAgYHRocmVzaG9sZGBfLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZD1udWxsXSAtIE1pbmltdW0gdmFsdWUgdGhlIGluY29tbWluZyB2YWx1ZVxuICogIG11c3QgaGF2ZSB0byB0cmlnZ2VyIHRoZSBkaXNwbGF5IG9mIGEgbWFya2VyLiBJZiBudWxsIGVhY2ggaW5jb21taW5nIGV2ZW50XG4gKiAgdHJpZ2dlcnMgYSBtYXJrZXIuIF9TaG91bGQgYmUgdXNlZCBpbiBjb25qb25jdGlvbiB3aXRoIGB0aHJlc2hvbGRJbmRleGBfLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndpZHRoPTMwMF0gLSBXaWR0aCBvZiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oZWlnaHQ9MTUwXSAtIEhlaWdodCBvZiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY29udGFpbmVyPW51bGxdIC0gQ29udGFpbmVyIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBpbnNlcnQgdGhlIGNhbnZhcy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY2FudmFzPW51bGxdIC0gQ2FudmFzIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBkcmF3LiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTFdIC0gRHVyYXRpb24gKGluIHNlY29uZHMpIHJlcHJlc2VudGVkIGluXG4gKiAgdGhlIGNhbnZhcy4gVGhpcyBwYXJhbWV0ZXIgb25seSBleGlzdHMgZm9yIG9wZXJhdG9ycyB0aGF0IGRpc3BsYXkgc2V2ZXJhbFxuICogIGNvbnNlY3V0aXZlIGZyYW1lcyBvbiB0aGUgY2FudmFzLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuIFRoaXMgcGFyYW1ldGVyIG9ubHkgZXhpc3RzXG4gKiAgZm9yIG9wZXJhdG9ycyB0aGF0IGRpc3BsYXkgc2V2ZXJhbCBjb25zZWN1dGl2ZSBmcmFtZXMgb24gdGhlIGNhbnZhcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgbGZvLnNvdXJjZS5FdmVudEluKHtcbiAqICAgZnJhbWVUeXBlOiAnc2NhbGFyJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG1hcmtlciA9IG5ldyBsZm8uc2luay5NYXJrZXJEaXNwbGF5KHtcbiAqICAgY2FudmFzOiAnI21hcmtlcicsXG4gKiAgIHRocmVzaG9sZDogMC41LFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG1hcmtlcik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogbGV0IHRpbWUgPSAwO1xuICogY29uc3QgcGVyaW9kID0gMTtcbiAqXG4gKiAoZnVuY3Rpb24gZ2VuZXJhdGVEYXRhKCkge1xuICogICBldmVudEluLnByb2Nlc3ModGltZSwgTWF0aC5yYW5kb20oKSk7XG4gKlxuICogICB0aW1lICs9IHBlcmlvZDtcbiAqICAgc2V0VGltZW91dChnZW5lcmF0ZURhdGEsIHBlcmlvZCAqIDEwMDApO1xuICogfSgpKTtcbiAqL1xuY2xhc3MgTWFya2VyRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9yJyk7XG4gICAgY29uc3QgdGhyZXNob2xkID0gdGhpcy5wYXJhbXMuZ2V0KCd0aHJlc2hvbGQnKTtcbiAgICBjb25zdCB0aHJlc2hvbGRJbmRleCA9IHRoaXMucGFyYW1zLmdldCgndGhyZXNob2xkSW5kZXgnKTtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcbiAgICBjb25zdCBoZWlnaHQgPSBjdHguaGVpZ2h0O1xuICAgIGNvbnN0IHZhbHVlID0gZnJhbWUuZGF0YVt0aHJlc2hvbGRJbmRleF07XG5cbiAgICBpZiAodGhyZXNob2xkID09PSBudWxsIHx8IHZhbHVlID49IHRocmVzaG9sZCkge1xuICAgICAgbGV0IHlNaW4gPSB0aGlzLmdldFlQb3NpdGlvbih0aGlzLnBhcmFtcy5nZXQoJ21pbicpKTtcbiAgICAgIGxldCB5TWF4ID0gdGhpcy5nZXRZUG9zaXRpb24odGhpcy5wYXJhbXMuZ2V0KCdtYXgnKSk7XG5cbiAgICAgIGlmICh5TWluID4geU1heCkge1xuICAgICAgICBjb25zdCB2ID0geU1heDtcbiAgICAgICAgeU1heCA9IHlNaW47XG4gICAgICAgIHlNaW4gPSB2O1xuICAgICAgfVxuXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIHlNaW4sIDEsIHlNYXgpO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFya2VyRGlzcGxheTtcbiIsImltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCB7IGdldENvbG9ycyB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscy9kaXNwbGF5LXV0aWxzJztcblxuY29uc3QgZmxvb3IgPSBNYXRoLmZsb29yO1xuY29uc3QgY2VpbCA9IE1hdGguY2VpbDtcblxuZnVuY3Rpb24gZG93blNhbXBsZShkYXRhLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gIGNvbnN0IGhvcCA9IGxlbmd0aCAvIHRhcmdldExlbmd0aDtcbiAgY29uc3QgdGFyZ2V0ID0gbmV3IEZsb2F0MzJBcnJheSh0YXJnZXRMZW5ndGgpO1xuICBsZXQgY291bnRlciA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluZGV4ID0gZmxvb3IoY291bnRlcik7XG4gICAgY29uc3QgcGhhc2UgPSBjb3VudGVyIC0gaW5kZXg7XG4gICAgY29uc3QgcHJldiA9IGRhdGFbaW5kZXhdO1xuICAgIGNvbnN0IG5leHQgPSBkYXRhW2luZGV4ICsgMV07XG5cbiAgICB0YXJnZXRbaV0gPSAobmV4dCAtIHByZXYpICogcGhhc2UgKyBwcmV2O1xuICAgIGNvdW50ZXIgKz0gaG9wO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGNvbG9yOiB7XG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogZ2V0Q29sb3JzKCdzaWduYWwnKSxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgfSxcbn07XG5cbi8qKlxuICogRGlzcGxheSBhIHN0cmVhbSBvZiB0eXBlIGBzaWduYWxgIG9uIGEgY2FudmFzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbG9yPScjMDBlNjAwJ10gLSBDb2xvciBvZiB0aGUgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZHVyYXRpb249MV0gLSBEdXJhdGlvbiAoaW4gc2Vjb25kcykgcmVwcmVzZW50ZWQgaW5cbiAqICB0aGUgY2FudmFzLiBUaGlzIHBhcmFtZXRlciBvbmx5IGV4aXN0cyBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsXG4gKiAgY29uc2VjdXRpdmUgZnJhbWVzIG9uIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy4gVGhpcyBwYXJhbWV0ZXIgb25seSBleGlzdHNcbiAqICBmb3Igb3BlcmF0b3JzIHRoYXQgZGlzcGxheSBzZXZlcmFsIGNvbnNlY3V0aXZlIGZyYW1lcyBvbiB0aGUgY2FudmFzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiA4LFxuICogICBmcmFtZVNpemU6IDQsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzaWduYWxEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNpZ25hbERpc3BsYXkoe1xuICogICBjYW52YXM6ICcjc2lnbmFsLWNhbnZhcycsXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3Qoc2lnbmFsRGlzcGxheSk7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogLy8gcHVzaCB0cmlhbmdsZSBzaWduYWwgaW4gdGhlIGdyYXBoXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDAuNSwgMSwgMC41XSk7XG4gKiBldmVudEluLnByb2Nlc3MoMC41LCBbMCwgLTAuNSwgLTEsIC0wLjVdKTtcbiAqIC8vIC4uLlxuICovXG5jbGFzcyBTaWduYWxEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIHRydWUpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IG51bGw7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSwgZnJhbWVXaWR0aCwgcGl4ZWxzU2luY2VMYXN0RnJhbWUpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgbGV0IGRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgaWYgKGZyYW1lV2lkdGggPCBmcmFtZVNpemUpXG4gICAgICBkYXRhID0gZG93blNhbXBsZShkYXRhLCBmcmFtZVdpZHRoKTtcblxuICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IGhvcFggPSBmcmFtZVdpZHRoIC8gbGVuZ3RoO1xuICAgIGxldCBwb3NYID0gMDtcbiAgICBsZXQgbGFzdFkgPSB0aGlzLmxhc3RQb3NZO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NZID0gdGhpcy5nZXRZUG9zaXRpb24oZGF0YVtpXSk7XG5cbiAgICAgIGlmIChsYXN0WSA9PT0gbnVsbCkge1xuICAgICAgICBjdHgubW92ZVRvKHBvc1gsIHBvc1kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgY3R4Lm1vdmVUbygtaG9wWCwgbGFzdFkpO1xuXG4gICAgICAgIGN0eC5saW5lVG8ocG9zWCwgcG9zWSk7XG4gICAgICB9XG5cbiAgICAgIHBvc1ggKz0gaG9wWDtcbiAgICAgIGxhc3RZID0gcG9zWTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5sYXN0UG9zWSA9IGxhc3RZO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbERpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgRmZ0IGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9GZnQnO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBzY2FsZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29sb3I6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3NwZWN0cnVtJyksXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1pbjoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogLTgwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDYsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH1cbn07XG5cblxuLyoqXG4gKiBEaXNwbGF5IHRoZSBzcGVjdHJ1bSBvZiB0aGUgaW5jb21taW5nIGBzaWduYWxgIGlucHV0LlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zY2FsZT0xXSAtIFNjYWxlIGRpc3BsYXkgb2YgdGhlIHNwZWN0cm9ncmFtLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbG9yPW51bGxdIC0gQ29sb3Igb2YgdGhlIHNwZWN0cm9ncmFtLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tODBdIC0gTWluaW11bSBkaXNwbGF5ZWQgdmFsdWUgKGluIGRCKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXg9Nl0gLSBNYXhpbXVtIGRpc3BsYXllZCB2YWx1ZSAoaW4gZEIpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndpZHRoPTMwMF0gLSBXaWR0aCBvZiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oZWlnaHQ9MTUwXSAtIEhlaWdodCBvZiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY29udGFpbmVyPW51bGxdIC0gQ29udGFpbmVyIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBpbnNlcnQgdGhlIGNhbnZhcy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY2FudmFzPW51bGxdIC0gQ2FudmFzIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBkcmF3LiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICpcbiAqIEB0b2RvIC0gZXhwb3NlIG1vcmUgYGZmdGAgY29uZmlnIG9wdGlvbnNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiAgIGNvbnN0IGF1ZGlvSW5Ob2RlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9Jbk5vZGUoe1xuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICAgIHNvdXJjZU5vZGU6IHNvdXJjZSxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCBzcGVjdHJ1bSA9IG5ldyBsZm8uc2luay5TcGVjdHJ1bURpc3BsYXkoe1xuICogICAgIGNhbnZhczogJyNzcGVjdHJ1bScsXG4gKiAgIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdChzcGVjdHJ1bSk7XG4gKiAgIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKiB9XG4gKi9cbmNsYXNzIFNwZWN0cnVtRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLmZmdCA9IG5ldyBGZnQoe1xuICAgICAgc2l6ZTogdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplLFxuICAgICAgd2luZG93OiAnaGFubicsXG4gICAgICBub3JtOiAnbGluZWFyJyxcbiAgICB9KTtcblxuICAgIHRoaXMuZmZ0LmluaXRTdHJlYW0odGhpcy5zdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgY29uc3QgYmlucyA9IHRoaXMuZmZ0LmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICAgIGNvbnN0IG5ickJpbnMgPSBiaW5zLmxlbmd0aDtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMucGFyYW1zLmdldCgnc2NhbGUnKTtcblxuICAgIGNvbnN0IGJpbldpZHRoID0gd2lkdGggLyBuYnJCaW5zO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucGFyYW1zLmdldCgnY29sb3InKTtcblxuICAgIC8vIGVycm9yIGhhbmRsaW5nIG5lZWRzIHJldmlldy4uLlxuICAgIGxldCBlcnJvciA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ickJpbnM7IGkrKykge1xuICAgICAgY29uc3QgeDFGbG9hdCA9IGkgKiBiaW5XaWR0aCArIGVycm9yO1xuICAgICAgY29uc3QgeDFJbnQgPSBNYXRoLnJvdW5kKHgxRmxvYXQpO1xuICAgICAgY29uc3QgeDJGbG9hdCA9IHgxRmxvYXQgKyAoYmluV2lkdGggLSBlcnJvcik7XG4gICAgICBjb25zdCB4MkludCA9IE1hdGgucm91bmQoeDJGbG9hdCk7XG5cbiAgICAgIGVycm9yID0geDJJbnQgLSB4MkZsb2F0O1xuXG4gICAgICBpZiAoeDFJbnQgIT09IHgySW50KSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0geDJJbnQgLSB4MUludDtcbiAgICAgICAgY29uc3QgZGIgPSAyMCAqIE1hdGgubG9nMTAoYmluc1tpXSk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLmdldFlQb3NpdGlvbihkYiAqIHNjYWxlKTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgxSW50LCB5LCB3aWR0aCwgaGVpZ2h0IC0geSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvciAtPSBiaW5XaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3BlY3RydW1EaXNwbGF5O1xuIiwiaW1wb3J0IEJhc2VEaXNwbGF5IGZyb20gJy4vQmFzZURpc3BsYXknO1xuaW1wb3J0IHsgZ2V0Q29sb3JzLCBnZXRIdWUsIGhleFRvUkdCIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBjb2xvcjoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6IGdldENvbG9ycygndHJhY2UnKSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgY29sb3JTY2hlbWU6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIGxpc3Q6IFsnbm9uZScsICdodWUnLCAnb3BhY2l0eSddLFxuICB9LFxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgcmFuZ2UgdmFsdWUgYXJvdW5kIGEgbWVhbiB2YWx1ZSAoZm9yIGV4YW1wbGUgbWVhblxuICogYW5kIHN0YW5kYXJ0IGRldmlhdGlvbikuXG4gKlxuICogVGhpcyBzaW5rIGNhbiBoYW5kbGUgaW5wdXQgb2YgdHlwZSBgdmVjdG9yYCBvZiBmcmFtZVNpemUgPj0gMi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb2xvcj0nb3JhbmdlJ10gLSBDb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb2xvclNjaGVtZT0nbm9uZSddIC0gSWYgYSB0aGlyZCB2YWx1ZSBpcyBhdmFpbGFibGVcbiAqICBpbiB0aGUgaW5wdXQsIGNhbiBiZSB1c2VkIHRvIGNvbnRyb2wgdGhlIG9wYWNpdHkgb3IgdGhlIGh1ZS4gSWYgaW5wdXQgZnJhbWVcbiAqICBzaXplIGlzIDIsIHRoaXMgcGFyYW0gaXMgYXV0b21hdGljYWxseSBzZXQgdG8gYG5vbmVgXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluPS0xXSAtIE1pbmltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4PTFdIC0gTWF4aW11bSB2YWx1ZSByZXByZXNlbnRlZCBpbiB0aGUgY2FudmFzLlxuICogIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy53aWR0aD0zMDBdIC0gV2lkdGggb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNvbnRhaW5lcj1udWxsXSAtIENvbnRhaW5lciBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gaW5zZXJ0IHRoZSBjYW52YXMuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge0VsZW1lbnR8Q1NTU2VsZWN0b3J9IFtvcHRpb25zLmNhbnZhcz1udWxsXSAtIENhbnZhcyBlbGVtZW50XG4gKiAgaW4gd2hpY2ggdG8gZHJhdy4gX2NvbnN0YW50IHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xXSAtIER1cmF0aW9uIChpbiBzZWNvbmRzKSByZXByZXNlbnRlZCBpblxuICogIHRoZSBjYW52YXMuIF9keW5hbWljIHBhcmFtZXRlcl9cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5yZWZlcmVuY2VUaW1lPW51bGxdIC0gT3B0aW9ubmFsIHJlZmVyZW5jZSB0aW1lIHRoZVxuICogIGRpc3BsYXkgc2hvdWxkIGNvbnNpZGVyZXIgYXMgdGhlIG9yaWdpbi4gSXMgb25seSB1c2VmdWxsIHdoZW4gc3luY2hyb25pemluZ1xuICogIHNldmVyYWwgZGlzcGxheSB1c2luZyB0aGUgYERpc3BsYXlTeW5jYCBjbGFzcy5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNsaWVudC5zaW5rXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBBdWRpb0NvbnRleHQgPSAod2luZG93LkF1ZGlvQ29udGV4dCB8fMKgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCk7XG4gKiBjb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gKlxuICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICogICAuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSlcbiAqICAgLnRoZW4oaW5pdClcbiAqICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKSk7XG4gKlxuICogZnVuY3Rpb24gaW5pdChzdHJlYW0pIHtcbiAqICAgY29uc3Qgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBzb3VyY2VOb2RlOiBzb3VyY2UsXG4gKiAgICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgIH0pO1xuICpcbiAqICAgLy8gbm90IHN1cmUgaXQgbWFrZSBzZW5zIGJ1dC4uLlxuICogICBjb25zdCBtZWFuU3RkZGV2ID0gbmV3IGxmby5vcGVyYXRvci5NZWFuU3RkZGV2KCk7XG4gKlxuICogICBjb25zdCB0cmFjZURpc3BsYXkgPSBuZXcgbGZvLnNpbmsuVHJhY2VEaXNwbGF5KHtcbiAqICAgICBjYW52YXM6ICcjdHJhY2UnLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyBkYXRhOiB0cnVlIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdChtZWFuU3RkZGV2KTtcbiAqICAgbWVhblN0ZGRldi5jb25uZWN0KHRyYWNlRGlzcGxheSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfVxuICovXG5jbGFzcyBUcmFjZURpc3BsYXkgZXh0ZW5kcyBCYXNlRGlzcGxheSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMucHJldkZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID09PSAyKVxuICAgICAgdGhpcy5wYXJhbXMuc2V0KCdjb2xvclNjaGVtZScsICdub25lJyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKSB7XG4gICAgY29uc3QgY29sb3JTY2hlbWUgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9yU2NoZW1lJyk7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG4gICAgY29uc3QgcHJldkRhdGEgPSB0aGlzLnByZXZGcmFtZSA/IHRoaXMucHJldkZyYW1lLmRhdGEgOiBudWxsO1xuICAgIGNvbnN0IGRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgY29uc3QgaGFsZlJhbmdlID0gZGF0YVsxXSAvIDI7XG4gICAgY29uc3QgbWVhbiA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRhdGFbMF0pO1xuICAgIGNvbnN0IG1pbiA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRhdGFbMF0gLSBoYWxmUmFuZ2UpO1xuICAgIGNvbnN0IG1heCA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRhdGFbMF0gKyBoYWxmUmFuZ2UpO1xuXG4gICAgbGV0IHByZXZIYWxmUmFuZ2U7XG4gICAgbGV0IHByZXZNZWFuO1xuICAgIGxldCBwcmV2TWluO1xuICAgIGxldCBwcmV2TWF4O1xuXG4gICAgaWYgKHByZXZEYXRhICE9PSBudWxsKSB7XG4gICAgICBwcmV2SGFsZlJhbmdlID0gcHJldkRhdGFbMV0gLyAyO1xuICAgICAgcHJldk1lYW4gPSB0aGlzLmdldFlQb3NpdGlvbihwcmV2RGF0YVswXSk7XG4gICAgICBwcmV2TWluID0gdGhpcy5nZXRZUG9zaXRpb24ocHJldkRhdGFbMF0gLSBwcmV2SGFsZlJhbmdlKTtcbiAgICAgIHByZXZNYXggPSB0aGlzLmdldFlQb3NpdGlvbihwcmV2RGF0YVswXSArIHByZXZIYWxmUmFuZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5wYXJhbXMuZ2V0KCdjb2xvcicpO1xuICAgIGxldCBncmFkaWVudDtcbiAgICBsZXQgcmdiO1xuXG4gICAgc3dpdGNoIChjb2xvclNjaGVtZSkge1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHJnYiA9IGhleFRvUkdCKGNvbG9yKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2JhKCR7cmdiLmpvaW4oJywnKX0sIDAuNylgO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaHVlJzpcbiAgICAgICAgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLXBpeGVsc1NpbmNlTGFzdEZyYW1lLCAwLCAwLCAwKTtcblxuICAgICAgICBpZiAocHJldkRhdGEpXG4gICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGBoc2woJHtnZXRIdWUocHJldkRhdGFbMl0pfSwgMTAwJSwgNTAlKWApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGBoc2woJHtnZXRIdWUoZGF0YVsyXSl9LCAxMDAlLCA1MCUpYCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIGBoc2woJHtnZXRIdWUoZGF0YVsyXSl9LCAxMDAlLCA1MCUpYCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgIHJnYiA9IGhleFRvUkdCKHRoaXMucGFyYW1zLmdldCgnY29sb3InKSk7XG4gICAgICAgIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgMCwgMCwgMCk7XG5cbiAgICAgICAgaWYgKHByZXZEYXRhKVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgcmdiYSgke3JnYi5qb2luKCcsJyl9LCAke3ByZXZEYXRhWzJdfSlgKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBgcmdiYSgke3JnYi5qb2luKCcsJyl9LCAke2RhdGFbMl19KWApO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBgcmdiYSgke3JnYi5qb2luKCcsJyl9LCAke2RhdGFbMl19KWApO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIC8vIGRyYXcgcmFuZ2VcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCBtZWFuKTtcbiAgICBjdHgubGluZVRvKDAsIG1heCk7XG5cbiAgICBpZiAocHJldkRhdGEgIT09IG51bGwpIHtcbiAgICAgIGN0eC5saW5lVG8oLXBpeGVsc1NpbmNlTGFzdEZyYW1lLCBwcmV2TWF4KTtcbiAgICAgIGN0eC5saW5lVG8oLXBpeGVsc1NpbmNlTGFzdEZyYW1lLCBwcmV2TWluKTtcbiAgICB9XG5cbiAgICBjdHgubGluZVRvKDAsIG1pbik7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgY3R4LmZpbGwoKTtcblxuICAgIC8vIGRyYXcgbWVhblxuICAgIGlmIChjb2xvclNjaGVtZSA9PT0gJ25vbmUnICYmIHByZXZNZWFuKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKC1waXhlbHNTaW5jZUxhc3RGcmFtZSwgcHJldk1lYW4pO1xuICAgICAgY3R4LmxpbmVUbygwLCBtZWFuKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cblxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICB0aGlzLnByZXZGcmFtZSA9IGZyYW1lO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUcmFjZURpc3BsYXk7XG4iLCJpbXBvcnQgQmFzZURpc3BsYXkgZnJvbSAnLi9CYXNlRGlzcGxheSc7XG5pbXBvcnQgUm1zIGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9SbXMnO1xuXG5jb25zdCBsb2cxMCA9IE1hdGgubG9nMTA7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvZmZzZXQ6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IC0xNCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgbWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtODAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIG1heDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogNixcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbiAgd2lkdGg6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogNixcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBWVS1NZXRlciB0byB1c2VkIG9uIGEgYHNpZ25hbGAgc3RyZWFtLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHRzIHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub2Zmc2V0PS0xNF0gLSBkQiBvZmZzZXQgYXBwbGllZCB0byB0aGUgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tODBdIC0gTWluaW11bSBkaXNwbGF5ZWQgdmFsdWUgKGluIGRCKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXg9Nl0gLSBNYXhpbXVtIGRpc3BsYXllZCB2YWx1ZSAoaW4gZEIpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLndpZHRoPTZdIC0gV2lkdGggb2YgdGhlIGRpc3BsYXkgKGluIHBpeGVscykuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuaGVpZ2h0PTE1MF0gLSBIZWlnaHQgb2YgdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY29udGFpbmVyPW51bGxdIC0gQ29udGFpbmVyIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBpbnNlcnQgdGhlIGNhbnZhcy5cbiAqIEBwYXJhbSB7RWxlbWVudHxDU1NTZWxlY3Rvcn0gW29wdGlvbnMuY2FudmFzPW51bGxdIC0gQ2FudmFzIGVsZW1lbnRcbiAqICBpbiB3aGljaCB0byBkcmF3LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiAgIGNvbnN0IGF1ZGlvSW5Ob2RlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9Jbk5vZGUoe1xuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICAgIHNvdXJjZU5vZGU6IHNvdXJjZSxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCB2dU1ldGVyID0gbmV3IGxmby5zaW5rLlZ1TWV0ZXJEaXNwbGF5KHtcbiAqICAgICBjYW52YXM6ICcjdnUtbWV0ZXInLFxuICogICB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3QodnVNZXRlcik7XG4gKiAgIGF1ZGlvSW5Ob2RlLnN0YXJ0KCk7XG4gKiB9XG4gKi9cbmNsYXNzIFZ1TWV0ZXJEaXNwbGF5IGV4dGVuZHMgQmFzZURpc3BsYXkge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucywgZmFsc2UpO1xuXG4gICAgdGhpcy5ybXNPcGVyYXRvciA9IG5ldyBSbXMoKTtcblxuICAgIHRoaXMubGFzdERCID0gMDtcbiAgICB0aGlzLnBlYWsgPSB7XG4gICAgICB2YWx1ZTogMCxcbiAgICAgIHRpbWU6IDAsXG4gICAgfVxuXG4gICAgdGhpcy5wZWFrTGlmZXRpbWUgPSAxOyAvLyBzZWNcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnJtc09wZXJhdG9yLmluaXRTdHJlYW0odGhpcy5zdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwOyAvLyBzZWNcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBhcmFtcy5nZXQoJ29mZnNldCcpOyAvLyBvZmZzZXQgemVybyBvZiB0aGUgdnUgbWV0ZXJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XG5cbiAgICBjb25zdCBsYXN0REIgPSB0aGlzLmxhc3REQjtcbiAgICBjb25zdCBwZWFrID0gdGhpcy5wZWFrO1xuXG4gICAgY29uc3QgcmVkID0gJyNmZjIxMjEnO1xuICAgIGNvbnN0IHllbGxvdyA9ICcjZmZmZjFmJztcbiAgICBjb25zdCBncmVlbiA9ICcjMDBmZjAwJztcblxuICAgIC8vIGhhbmRsZSBjdXJyZW50IGRiIHZhbHVlXG4gICAgY29uc3Qgcm1zID0gdGhpcy5ybXNPcGVyYXRvci5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgICBsZXQgZEIgPSAyMCAqIGxvZzEwKHJtcykgLSBvZmZzZXQ7XG5cbiAgICAvLyBzbG93IHJlbGVhc2UgKGNvdWxkIHByb2JhYmx5IGJlIGltcHJvdmVkKVxuICAgIGlmIChsYXN0REIgPiBkQilcbiAgICAgIGRCID0gbGFzdERCIC0gNjtcblxuICAgIC8vIGhhbmRsZSBwZWFrXG4gICAgaWYgKGRCID4gcGVhay52YWx1ZSB8fMKgKG5vdyAtIHBlYWsudGltZSkgPiB0aGlzLnBlYWtMaWZldGltZSkge1xuICAgICAgcGVhay52YWx1ZSA9IGRCO1xuICAgICAgcGVhay50aW1lID0gbm93O1xuICAgIH1cblxuICAgIGNvbnN0IHkwID0gdGhpcy5nZXRZUG9zaXRpb24oMCk7XG4gICAgY29uc3QgeSA9IHRoaXMuZ2V0WVBvc2l0aW9uKGRCKTtcbiAgICBjb25zdCB5UGVhayA9IHRoaXMuZ2V0WVBvc2l0aW9uKHBlYWsudmFsdWUpO1xuXG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgY29uc3QgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgaGVpZ2h0LCAwLCAwKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgZ3JlZW4pO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgoaGVpZ2h0IC0geTApIC8gaGVpZ2h0LCB5ZWxsb3cpO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCByZWQpO1xuXG4gICAgLy8gZEJcbiAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgY3R4LmZpbGxSZWN0KDAsIHksIHdpZHRoLCBoZWlnaHQgLSB5KTtcblxuICAgIC8vIDAgZEIgbWFya2VyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZGNkY2RjJztcbiAgICBjdHguZmlsbFJlY3QoMCwgeTAsIHdpZHRoLCAyKTtcblxuICAgIC8vIHBlYWtcbiAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgY3R4LmZpbGxSZWN0KDAsIHlQZWFrLCB3aWR0aCwgMik7XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgdGhpcy5sYXN0REIgPSBkQjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWdU1ldGVyRGlzcGxheTtcbiIsImltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCBNaW5NYXggZnJvbSAnLi4vLi4vY29tbW9uL29wZXJhdG9yL01pbk1heCc7XG5pbXBvcnQgUm1zIGZyb20gJy4uLy4uL2NvbW1vbi9vcGVyYXRvci9SbXMnO1xuaW1wb3J0IHsgZ2V0Q29sb3JzIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzL2Rpc3BsYXktdXRpbHMnO1xuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBjb2xvcnM6IHtcbiAgICB0eXBlOiAnYW55JyxcbiAgICBkZWZhdWx0OiBnZXRDb2xvcnMoJ3dhdmVmb3JtJyksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHJtczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBEaXNwbGF5IGEgd2F2ZWZvcm0gKGFsb25nIHdpdGggb3B0aW9ubmFsIFJtcykgb2YgYSBnaXZlbiBgc2lnbmFsYCBpbnB1dCBpblxuICogYSBjYW52YXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IFtvcHRpb25zLmNvbG9ycz1bJ3dhdmVmb3JtJywgJ3JtcyddXSAtIEFycmF5XG4gKiAgY29udGFpbmluZyB0aGUgY29sb3IgY29kZXMgZm9yIHRoZSB3YXZlZm9ybSAoaW5kZXggMCkgYW5kIHJtcyAoaW5kZXggMSkuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ybXM9ZmFsc2VdIC0gU2V0IHRvIGB0cnVlYCB0byBkaXNwbGF5IHRoZSBybXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTFdIC0gRHVyYXRpb24gKGluIHNlY29uZHMpIHJlcHJlc2VudGVkIGluXG4gKiAgdGhlIGNhbnZhcy4gX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1pbj0tMV0gLSBNaW5pbXVtIHZhbHVlIHJlcHJlc2VudGVkIGluIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heD0xXSAtIE1heGltdW0gdmFsdWUgcmVwcmVzZW50ZWQgaW4gdGhlIGNhbnZhcy5cbiAqICBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMud2lkdGg9MzAwXSAtIFdpZHRoIG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhlaWdodD0xNTBdIC0gSGVpZ2h0IG9mIHRoZSBjYW52YXMuXG4gKiAgX2R5bmFtaWMgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jb250YWluZXI9bnVsbF0gLSBDb250YWluZXIgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGluc2VydCB0aGUgY2FudmFzLiBfY29uc3RhbnQgcGFyYW1ldGVyX1xuICogQHBhcmFtIHtFbGVtZW50fENTU1NlbGVjdG9yfSBbb3B0aW9ucy5jYW52YXM9bnVsbF0gLSBDYW52YXMgZWxlbWVudFxuICogIGluIHdoaWNoIHRvIGRyYXcuIF9jb25zdGFudCBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucmVmZXJlbmNlVGltZT1udWxsXSAtIE9wdGlvbm5hbCByZWZlcmVuY2UgdGltZSB0aGVcbiAqICBkaXNwbGF5IHNob3VsZCBjb25zaWRlcmVyIGFzIHRoZSBvcmlnaW4uIElzIG9ubHkgdXNlZnVsbCB3aGVuIHN5bmNocm9uaXppbmdcbiAqICBzZXZlcmFsIGRpc3BsYXkgdXNpbmcgdGhlIGBEaXNwbGF5U3luY2AgY2xhc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IHdpbmRvdy5BdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBhdWRpb0luID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gKlxuICogICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgICBzb3VyY2VOb2RlOiBhdWRpb0luLFxuICogICAgIGZyYW1lU2l6ZTogNTEyLFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHdhdmVmb3JtRGlzcGxheSA9IG5ldyBsZm8uc2luay5XYXZlZm9ybURpc3BsYXkoe1xuICogICAgIGNhbnZhczogJyN3YXZlZm9ybScsXG4gKiAgICAgZHVyYXRpb246IDMuNSxcbiAqICAgICBybXM6IHRydWUsXG4gKiAgIH0pO1xuICpcbiAqICAgYXVkaW9Jbk5vZGUuY29ubmVjdCh3YXZlZm9ybURpc3BsYXkpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfSk7XG4gKi9cbmNsYXNzIFdhdmVmb3JtRGlzcGxheSBleHRlbmRzIEJhc2VEaXNwbGF5IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zLCB0cnVlKTtcblxuICAgIHRoaXMubWluTWF4T3BlcmF0b3IgPSBuZXcgTWluTWF4KCk7XG4gICAgdGhpcy5ybXNPcGVyYXRvciA9IG5ldyBSbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLm1pbk1heE9wZXJhdG9yLmluaXRTdHJlYW0odGhpcy5zdHJlYW1QYXJhbXMpO1xuICAgIHRoaXMucm1zT3BlcmF0b3IuaW5pdFN0cmVhbSh0aGlzLnN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUsIGZyYW1lV2lkdGgsIHBpeGVsc1NpbmNlTGFzdEZyYW1lKSB7XG4gICAgLy8gZHJvcCBmcmFtZXMgdGhhdCBjYW5ub3QgYmUgZGlzcGxheWVkXG4gICAgaWYgKGZyYW1lV2lkdGggPCAxKSByZXR1cm47XG5cbiAgICBjb25zdCBjb2xvcnMgPSB0aGlzLnBhcmFtcy5nZXQoJ2NvbG9ycycpO1xuICAgIGNvbnN0IHNob3dSbXMgPSB0aGlzLnBhcmFtcy5nZXQoJ3JtcycpO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xuICAgIGNvbnN0IGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IGlTYW1wbGVzUGVyUGl4ZWxzID0gTWF0aC5mbG9vcihkYXRhLmxlbmd0aCAvIGZyYW1lV2lkdGgpO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZyYW1lV2lkdGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKiBpU2FtcGxlc1BlclBpeGVscztcbiAgICAgIGNvbnN0IGVuZCA9IGluZGV4ID09PSBmcmFtZVdpZHRoIC0gMSA/IHVuZGVmaW5lZCA6IHN0YXJ0ICsgaVNhbXBsZXNQZXJQaXhlbHM7XG4gICAgICBjb25zdCBzbGljZSA9IGRhdGEuc3ViYXJyYXkoc3RhcnQsIGVuZCk7XG5cbiAgICAgIGNvbnN0IG1pbk1heCA9IHRoaXMubWluTWF4T3BlcmF0b3IuaW5wdXRTaWduYWwoc2xpY2UpO1xuICAgICAgY29uc3QgbWluWSA9IHRoaXMuZ2V0WVBvc2l0aW9uKG1pbk1heFswXSk7XG4gICAgICBjb25zdCBtYXhZID0gdGhpcy5nZXRZUG9zaXRpb24obWluTWF4WzFdKTtcblxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzBdO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpbmRleCwgbWluWSk7XG4gICAgICBjdHgubGluZVRvKGluZGV4LCBtYXhZKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgaWYgKHNob3dSbXMpIHtcbiAgICAgICAgY29uc3Qgcm1zID0gdGhpcy5ybXNPcGVyYXRvci5pbnB1dFNpZ25hbChzbGljZSk7XG4gICAgICAgIGNvbnN0IHJtc01heFkgPSB0aGlzLmdldFlQb3NpdGlvbihybXMpO1xuICAgICAgICBjb25zdCBybXNNaW5ZID0gdGhpcy5nZXRZUG9zaXRpb24oLXJtcyk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JzWzFdO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oaW5kZXgsIHJtc01pblkpO1xuICAgICAgICBjdHgubGluZVRvKGluZGV4LCBybXNNYXhZKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhdmVmb3JtRGlzcGxheTtcbiIsImltcG9ydCBCcmlkZ2UgZnJvbSAnLi4vLi4vY29tbW9uL3NpbmsvQnJpZGdlJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vLi4vY29tbW9uL3NpbmsvTG9nZ2VyJztcbmltcG9ydCBEYXRhUmVjb3JkZXIgZnJvbSAnLi4vLi4vY29tbW9uL3NpbmsvRGF0YVJlY29yZGVyJztcbmltcG9ydCBTaWduYWxSZWNvcmRlciBmcm9tICcuLi8uLi9jb21tb24vc2luay9TaWduYWxSZWNvcmRlcic7XG5cbmltcG9ydCBCYXNlRGlzcGxheSBmcm9tICcuL0Jhc2VEaXNwbGF5JztcbmltcG9ydCBCcGZEaXNwbGF5IGZyb20gJy4vQnBmRGlzcGxheSc7XG5pbXBvcnQgTWFya2VyRGlzcGxheSBmcm9tICcuL01hcmtlckRpc3BsYXknO1xuaW1wb3J0IFNpZ25hbERpc3BsYXkgZnJvbSAnLi9TaWduYWxEaXNwbGF5JztcbmltcG9ydCBTcGVjdHJ1bURpc3BsYXkgZnJvbSAnLi9TcGVjdHJ1bURpc3BsYXknO1xuaW1wb3J0IFRyYWNlRGlzcGxheSBmcm9tICcuL1RyYWNlRGlzcGxheSc7XG5pbXBvcnQgVnVNZXRlckRpc3BsYXkgZnJvbSAnLi9WdU1ldGVyRGlzcGxheSc7XG5pbXBvcnQgV2F2ZWZvcm1EaXNwbGF5IGZyb20gJy4vV2F2ZWZvcm1EaXNwbGF5JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBCcmlkZ2UsXG4gIExvZ2dlcixcbiAgRGF0YVJlY29yZGVyLFxuICBTaWduYWxSZWNvcmRlcixcblxuICBCYXNlRGlzcGxheSxcbiAgQnBmRGlzcGxheSxcbiAgTWFya2VyRGlzcGxheSxcbiAgU2lnbmFsRGlzcGxheSxcbiAgU3BlY3RydW1EaXNwbGF5LFxuICBUcmFjZURpc3BsYXksXG4gIFZ1TWV0ZXJEaXNwbGF5LFxuICBXYXZlZm9ybURpc3BsYXksXG59O1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vLi4vY29tbW9uL2NvcmUvQmFzZUxmbyc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGF1ZGlvQnVmZmVyOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgZnJhbWVTaXplOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUxMixcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgY2hhbm5lbDoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIGNvbnN0YW50OiB0cnVlLFxuICB9LFxuICBwcm9ncmVzc0NhbGxiYWNrOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgcHJvZ3Jlc3NDYWxsYmFjazoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG59O1xuXG5jb25zdCBub29wID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBTbGljZSBhbiBgQXVkaW9CdWZmZXJgIGludG8gc2lnbmFsIGJsb2NrcyBhbmQgcHJvcGFnYXRlIHRoZSByZXN1bHRpbmcgZnJhbWVzXG4gKiB0aHJvdWdoIHRoZSBncmFwaC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIHBhcmFtZXRlcicgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0F1ZGlvQnVmZmVyfSBbb3B0aW9ucy5hdWRpb0J1ZmZlcl0gLSBBdWRpbyBidWZmZXIgdG8gcHJvY2Vzcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVNpemU9NTEyXSAtIFNpemUgb2YgdGhlIG91dHB1dCBibG9ja3MuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2hhbm5lbD0wXSAtIE51bWJlciBvZiB0aGUgY2hhbm5lbCB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnByb2dyZXNzQ2FsbGJhY2s9bnVsbF0gLSBDYWxsYmFjayB0byBiZSBleGN1dGVkIG9uIGVhY2hcbiAqICBmcmFtZSBvdXRwdXQsIHJlY2VpdmUgYXMgYXJndW1lbnQgdGhlIGN1cnJlbnQgcHJvZ3Jlc3MgcmF0aW8uXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc291cmNlXG4gKlxuICogQHRvZG8gLSBBbGxvdyB0byBwYXNzIHJhdyBidWZmZXIgYW5kIHNhbXBsZVJhdGUgKHNpbXBsaWZpZWQgdXNlIHNlcnZlci1zaWRlKVxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9JbkJ1ZmZlciA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5CdWZmZXIoe1xuICogICBhdWRpb0J1ZmZlcjogYXVkaW9CdWZmZXIsXG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgd2F2ZWZvcm0gPSBuZXcgbGZvLnNpbmsuV2F2ZWZvcm0oe1xuICogICBjYW52YXM6ICcjd2F2ZWZvcm0nLFxuICogICBkdXJhdGlvbjogMSxcbiAqICAgY29sb3I6ICdzdGVlbGJsdWUnLFxuICogICBybXM6IHRydWUsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luQnVmZmVyLmNvbm5lY3Qod2F2ZWZvcm0pO1xuICogYXVkaW9JbkJ1ZmZlci5zdGFydCgpO1xuICovXG5jbGFzcyBBdWRpb0luQnVmZmVyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0J1ZmZlcicpO1xuXG4gICAgaWYgKCFhdWRpb0J1ZmZlcilcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcImF1ZGlvQnVmZmVyXCIgcGFyYW1ldGVyJyk7XG5cbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSB0aGUgYHN0cmVhbVBhcmFtc2AgaW4gdGhlIGdyYXBoIGFuZCBzdGFydCBwcm9wYWdhdGluZyBmcmFtZXMuXG4gICAqIFdoZW4gY2FsbGVkLCB0aGUgc2xpY2luZyBvZiB0aGUgZ2l2ZW4gYGF1ZGlvQnVmZmVyYCBzdGFydHMgaW1tZWRpYXRlbHkgYW5kXG4gICAqIGVhY2ggcmVzdWx0aW5nIGZyYW1lIGlzIHByb3BhZ2F0ZWQgaW4gZ3JhcGguXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Jlc2V0U3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNvdXJjZS5BdWRpb0luQnVmZmVyI3N0b3B9XG4gICAqL1xuICBzdGFydCgpIHtcbiAgICB0aGlzLmluaXRTdHJlYW0oKTtcblxuICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLnBhcmFtcy5nZXQoJ2NoYW5uZWwnKTtcbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9CdWZmZXInKTtcbiAgICBjb25zdCBidWZmZXIgPSBhdWRpb0J1ZmZlci5nZXRDaGFubmVsRGF0YShjaGFubmVsKTtcbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xuXG4gICAgdGhpcy5wcm9jZXNzRnJhbWUoYnVmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbGl6ZSB0aGUgc3RyZWFtIGFuZCBzdG9wIHRoZSB3aG9sZSBncmFwaC4gV2hlbiBjYWxsZWQsIHRoZSBzbGljaW5nIG9mXG4gICAqIHRoZSBgYXVkaW9CdWZmZXJgIHN0b3BzIGltbWVkaWF0ZWx5LlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNmaW5hbGl6ZVN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zb3VyY2UuQXVkaW9JbkJ1ZmZlciNzdGFydH1cbiAgICovXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5maW5hbGl6ZVN0cmVhbSh0aGlzLmVuZFRpbWUpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMoKSB7XG4gICAgY29uc3QgYXVkaW9CdWZmZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQnVmZmVyJyk7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcbiAgICBjb25zdCBzb3VyY2VTYW1wbGVSYXRlID0gYXVkaW9CdWZmZXIuc2FtcGxlUmF0ZTtcbiAgICBjb25zdCBmcmFtZVJhdGUgPSBzb3VyY2VTYW1wbGVSYXRlIC8gZnJhbWVTaXplO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAnc2lnbmFsJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlID0gc291cmNlU2FtcGxlUmF0ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVDb3VudCA9IGZyYW1lU2l6ZTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGJ1ZmZlcikge1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBwcm9ncmVzc0NhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdwcm9ncmVzc0NhbGxiYWNrJykgfHzCoG5vb3A7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aDtcbiAgICBjb25zdCBuYnJGcmFtZXMgPSBNYXRoLmNlaWwoYnVmZmVyLmxlbmd0aCAvIGZyYW1lU2l6ZSk7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICAoZnVuY3Rpb24gc2xpY2UoKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBpICogZnJhbWVTaXplO1xuICAgICAgY29uc3QgbmJyQ29weSA9IE1hdGgubWluKGxlbmd0aCAtIG9mZnNldCwgZnJhbWVTaXplKTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZVNpemU7IGorKylcbiAgICAgICAgZGF0YVtqXSA9IGogPCBuYnJDb3B5ID8gYnVmZmVyW29mZnNldCArIGpdIDogMDtcblxuICAgICAgdGhhdC5mcmFtZS50aW1lID0gb2Zmc2V0IC8gc2FtcGxlUmF0ZTtcbiAgICAgIHRoYXQuZW5kVGltZSA9IHRoYXQuZnJhbWUudGltZSArIG5ickNvcHkgLyBzYW1wbGVSYXRlO1xuICAgICAgdGhhdC5wcm9wYWdhdGVGcmFtZSgpO1xuXG4gICAgICBpICs9IDE7XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrKGkgLyBuYnJGcmFtZXMpO1xuXG4gICAgICBpZiAoaSA8IG5ickZyYW1lcylcbiAgICAgICAgc2V0VGltZW91dChzbGljZSwgMCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoYXQuZmluYWxpemVTdHJlYW0odGhhdC5lbmRUaW1lKTtcbiAgICB9KCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvSW5CdWZmZXI7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvJztcblxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fMKgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGZyYW1lU2l6ZToge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiA1MTIsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGNoYW5uZWw6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfSxcbiAgc291cmNlTm9kZToge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGF1ZGlvQ29udGV4dDoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG59O1xuXG4vKipcbiAqIFVzZSBhIGBXZWJBdWRpb2Agbm9kZSBhcyBhIHNvdXJjZSBmb3IgdGhlIGdyYXBoLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVyJyBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7QXVkaW9Ob2RlfSBbb3B0aW9ucy5zb3VyY2VOb2RlPW51bGxdIC0gQXVkaW8gbm9kZSB0byBwcm9jZXNzXG4gKiAgKG1hbmRhdG9yeSkuXG4gKiBAcGFyYW0ge0F1ZGlvQ29udGV4dH0gW29wdGlvbnMuYXVkaW9Db250ZXh0PW51bGxdIC0gQXVkaW8gY29udGV4dCB1c2VkIHRvXG4gKiAgY3JlYXRlIHRoZSBhdWRpbyBub2RlIChtYW5kYXRvcnkpLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lU2l6ZT01MTJdIC0gU2l6ZSBvZiB0aGUgb3V0cHV0IGJsb2NrcywgZGVmaW5lXG4gKiAgdGhlIGBmcmFtZVNpemVgIGluIHRoZSBgc3RyZWFtUGFyYW1zYC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jaGFubmVsPTBdIC0gTnVtYmVyIG9mIHRoZSBjaGFubmVsIHRvIHByb2Nlc3MuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjbGllbnQuc291cmNlXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gKiBjb25zdCBzaW5lID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAqIHNpbmUuZnJlcXVlbmN5LnZhbHVlID0gMjtcbiAqXG4gKiBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gKiAgIHNvdXJjZU5vZGU6IHNpbmUsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzaWduYWxEaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNpZ25hbERpc3BsYXkoe1xuICogICBjYW52YXM6ICcjc2lnbmFsJyxcbiAqICAgZHVyYXRpb246IDEsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luTm9kZS5jb25uZWN0KHNpZ25hbERpc3BsYXkpO1xuICpcbiAqIC8vIHN0YXJ0IHRoZSBzaW5lIG9zY2lsbGF0b3Igbm9kZSBhbmQgdGhlIGxmbyBncmFwaFxuICogc2luZS5zdGFydCgpO1xuICogYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqL1xuY2xhc3MgQXVkaW9Jbk5vZGUgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgYXVkaW9Db250ZXh0ID0gdGhpcy5wYXJhbXMuZ2V0KCdhdWRpb0NvbnRleHQnKTtcbiAgICBjb25zdCBzb3VyY2VOb2RlID0gdGhpcy5wYXJhbXMuZ2V0KCdzb3VyY2VOb2RlJyk7XG5cbiAgICBpZiAoIWF1ZGlvQ29udGV4dCB8fCAhKGF1ZGlvQ29udGV4dCBpbnN0YW5jZW9mIEF1ZGlvQ29udGV4dCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYGF1ZGlvQ29udGV4dGAgcGFyYW1ldGVyJyk7XG5cbiAgICBpZiAoIXNvdXJjZU5vZGUgfHwgIShzb3VyY2VOb2RlIGluc3RhbmNlb2YgQXVkaW9Ob2RlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgc291cmNlTm9kZWAgcGFyYW1ldGVyJyk7XG5cbiAgICB0aGlzLnNvdXJjZU5vZGUgPSBzb3VyY2VOb2RlO1xuICAgIHRoaXMuX2NoYW5uZWwgPSB0aGlzLnBhcmFtcy5nZXQoJ2NoYW5uZWwnKTtcbiAgICB0aGlzLl9ibG9ja0R1cmF0aW9uID0gbnVsbDtcblxuICAgIHRoaXMucHJvY2Vzc0ZyYW1lID0gdGhpcy5wcm9jZXNzRnJhbWUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9wYWdhdGUgdGhlIGBzdHJlYW1QYXJhbXNgIGluIHRoZSBncmFwaCBhbmQgc3RhcnQgdG8gcHJvcGFnYXRlIHNpZ25hbFxuICAgKiBibG9ja3MgcHJvZHVjZWQgYnkgdGhlIGF1ZGlvIG5vZGUgaW50byB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Jlc2V0U3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y2xpZW50LnNvdXJjZS5BdWRpb0luTm9kZSNzdG9wfVxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5pbml0U3RyZWFtKCk7XG5cbiAgICBjb25zdCBhdWRpb0NvbnRleHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQ29udGV4dCcpO1xuICAgIHRoaXMuZnJhbWUudGltZSA9IDA7XG5cbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuXG4gICAgLy8gQG5vdGU6IHJlY3JlYXRlIGVhY2ggdGltZSBiZWNhdXNlIG9mIGEgZmlyZWZveCB3ZWlyZCBiZWhhdmlvclxuICAgIHRoaXMuc2NyaXB0UHJvY2Vzc29yID0gYXVkaW9Db250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcihmcmFtZVNpemUsIDEsIDEpO1xuICAgIHRoaXMuc2NyaXB0UHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gdGhpcy5wcm9jZXNzRnJhbWU7XG5cbiAgICB0aGlzLnNvdXJjZU5vZGUuY29ubmVjdCh0aGlzLnNjcmlwdFByb2Nlc3Nvcik7XG4gICAgdGhpcy5zY3JpcHRQcm9jZXNzb3IuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmFsaXplIHRoZSBzdHJlYW0gYW5kIHN0b3AgdGhlIHdob2xlIGdyYXBoLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNmaW5hbGl6ZVN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNsaWVudC5zb3VyY2UuQXVkaW9Jbk5vZGUjc3RhcnR9XG4gICAqL1xuICBzdG9wKCkge1xuICAgIHRoaXMuZmluYWxpemVTdHJlYW0odGhpcy5mcmFtZS50aW1lKTtcblxuXG4gICAgdGhpcy5zb3VyY2VOb2RlLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnNjcmlwdFByb2Nlc3Nvci5kaXNjb25uZWN0KCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcygpIHtcbiAgICBjb25zdCBhdWRpb0NvbnRleHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQ29udGV4dCcpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVTaXplJyk7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gZnJhbWVTaXplO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IHNhbXBsZVJhdGUgLyBmcmFtZVNpemU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3NpZ25hbCc7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSA9IHNhbXBsZVJhdGU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlQ291bnQgPSBmcmFtZVNpemU7XG5cbiAgICB0aGlzLl9ibG9ja0R1cmF0aW9uID0gZnJhbWVTaXplIC8gc2FtcGxlUmF0ZTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogQmFzaWNhbGx5IHRoZSBgc2NyaXB0UHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzYCBjYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvY2Vzc0ZyYW1lKGUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGEgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKHRoaXMuX2NoYW5uZWwpO1xuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSArPSB0aGlzLl9ibG9ja0R1cmF0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvSW5Ob2RlO1xuIiwiaW1wb3J0IEF1ZGlvSW5CdWZmZXIgZnJvbSAnLi9BdWRpb0luQnVmZmVyJztcbmltcG9ydCBBdWRpb0luTm9kZSBmcm9tICcuL0F1ZGlvSW5Ob2RlJztcbmltcG9ydCBFdmVudEluIGZyb20gJy4uLy4uL2NvbW1vbi9zb3VyY2UvRXZlbnRJbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQXVkaW9JbkJ1ZmZlcixcbiAgQXVkaW9Jbk5vZGUsXG4gIEV2ZW50SW4sXG59O1xuIiwiaW1wb3J0IHBhcmFtZXRlcnMgZnJvbSAncGFyYW1ldGVycyc7XG5cbmxldCBpZCA9IDA7XG5cbi8qKlxuICogQmFzZSBgbGZvYCBjbGFzcyB0byBiZSBleHRlbmRlZCBpbiBvcmRlciB0byBjcmVhdGUgbmV3IG5vZGVzLlxuICpcbiAqIE5vZGVzIGFyZSBkaXZpZGVkIGluIDMgY2F0ZWdvcmllczpcbiAqIC0gKipgc291cmNlYCoqIGFyZSByZXNwb25zaWJsZSBmb3IgYWNxdWVyaW5nIGEgc2lnbmFsIGFuZCBpdHMgcHJvcGVydGllc1xuICogICAoZnJhbWVSYXRlLCBmcmFtZVNpemUsIGV0Yy4pXG4gKiAtICoqYHNpbmtgKiogYXJlIGVuZHBvaW50cyBvZiB0aGUgZ3JhcGgsIHN1Y2ggbm9kZXMgY2FuIGJlIHJlY29yZGVycyxcbiAqICAgdmlzdWFsaXplcnMsIGV0Yy5cbiAqIC0gKipgb3BlcmF0b3JgKiogYXJlIHVzZWQgdG8gbWFrZSBjb21wdXRhdGlvbiBvbiB0aGUgaW5wdXQgc2lnbmFsIGFuZFxuICogICBmb3J3YXJkIHRoZSByZXN1bHRzIGJlbG93IGluIHRoZSBncmFwaC5cbiAqXG4gKiBJbiBtb3N0IGNhc2VzIHRoZSBtZXRob2RzIHRvIG92ZXJyaWRlIC8gZXh0ZW5kIGFyZTpcbiAqIC0gdGhlICoqYGNvbnN0cnVjdG9yYCoqIHRvIGRlZmluZSB0aGUgcGFyYW1ldGVycyBvZiB0aGUgbmV3IGxmbyBub2RlLlxuICogLSB0aGUgKipgcHJvY2Vzc1N0cmVhbVBhcmFtc2AqKiBtZXRob2QgdG8gZGVmaW5lIGhvdyB0aGUgbm9kZSBtb2RpZnkgdGhlXG4gKiAgIHN0cmVhbSBhdHRyaWJ1dGVzIChlLmcuIGJ5IGNoYW5naW5nIHRoZSBmcmFtZSBzaXplKVxuICogLSB0aGUgKipgcHJvY2Vzc3tGcmFtZVR5cGV9YCoqIG1ldGhvZCB0byBkZWZpbmUgdGhlIG9wZXJhdGlvbnMgdGhhdCB0aGVcbiAqICAgbm9kZSBhcHBseSBvbiB0aGUgc3RyZWFtLiBUaGUgdHlwZSBvZiBpbnB1dCBhIG5vZGUgY2FuIGhhbmRsZSBpcyBkZWZpbmVcbiAqICAgYnkgaXRzIGltcGxlbWVudGVkIGludGVyZmFjZSwgaWYgaXQgaW1wbGVtZW50cyBgcHJvY2Vzc1NpZ25hbGAgYSBzdHJlYW1cbiAqICAgd2l0aCBgZnJhbWVUeXBlID09PSAnc2lnbmFsJ2AgY2FuIGJlIHByb2Nlc3NlZCwgYHByb2Nlc3NWZWN0b3JgIHRvIGhhbmRsZVxuICogICBhbiBpbnB1dCBvZiB0eXBlIGB2ZWN0b3JgLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwid2FybmluZ1wiPl9UaGlzIGNsYXNzIHNob3VsZCBiZSBjb25zaWRlcmVkIGFic3RyYWN0IGFuZCBvbmx5XG4gKiBiZSB1c2VkIHRvIGJlIGV4dGVuZGVkLl88L3NwYW4+XG4gKlxuICpcbiAqIC8vIG92ZXJ2aWV3IG9mIHRoZSBiZWhhdmlvciBvZiBhIG5vZGVcbiAqXG4gKiAqKnByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykqKlxuICpcbiAqIGBiYXNlYCBjbGFzcyAoZGVmYXVsdCBpbXBsZW1lbnRhdGlvbilcbiAqIC0gY2FsbCBgcHJlcHJvY2Vzc1N0cmVhbVBhcmFtc2BcbiAqIC0gY2FsbCBgcHJvcGFnYXRlU3RyZWFtUGFyYW1zYFxuICpcbiAqIGBjaGlsZGAgY2xhc3NcbiAqIC0gY2FsbCBgcHJlcHJvY2Vzc1N0cmVhbVBhcmFtc2BcbiAqIC0gb3ZlcnJpZGUgc29tZSBvZiB0aGUgaW5oZXJpdGVkIGBzdHJlYW1QYXJhbXNgXG4gKiAtIGNyZWF0ZXMgdGhlIGFueSByZWxhdGVkIGxvZ2ljIGJ1ZmZlcnNcbiAqIC0gY2FsbCBgcHJvcGFnYXRlU3RyZWFtUGFyYW1zYFxuICpcbiAqIF9zaG91bGQgbm90IGNhbGwgYHN1cGVyLnByb2Nlc3NTdHJlYW1QYXJhbXNgX1xuICpcbiAqICoqcHJlcGFyZVN0cmVhbVBhcmFtcygpKipcbiAqXG4gKiAtIGFzc2lnbiBwcmV2U3RyZWFtUGFyYW1zIHRvIHRoaXMuc3RyZWFtUGFyYW1zXG4gKiAtIGNoZWNrIGlmIHRoZSBjbGFzcyBpbXBsZW1lbnRzIHRoZSBjb3JyZWN0IGBwcm9jZXNzSW5wdXRgIG1ldGhvZFxuICpcbiAqIF9zaG91bGRuJ3QgYmUgZXh0ZW5kZWQsIG9ubHkgY29uc3VtZWQgaW4gYHByb2Nlc3NTdHJlYW1QYXJhbXNgX1xuICpcbiAqICoqcHJvcGFnYXRlU3RyZWFtUGFyYW1zKCkqKlxuICpcbiAqIC0gY3JlYXRlcyB0aGUgYGZyYW1lRGF0YWAgYnVmZmVyXG4gKiAtIHByb3BhZ2F0ZSBgc3RyZWFtUGFyYW1zYCB0byBjaGlsZHJlblxuICpcbiAqIF9zaG91bGRuJ3QgYmUgZXh0ZW5kZWQsIG9ubHkgY29uc3VtZWQgaW4gYHByb2Nlc3NTdHJlYW1QYXJhbXNgX1xuICpcbiAqICoqcHJvY2Vzc0ZyYW1lKCkqKlxuICpcbiAqIGBiYXNlYCBjbGFzcyAoZGVmYXVsdCBpbXBsZW1lbnRhdGlvbilcbiAqIC0gY2FsbCBgcHJlcHJvY2Vzc0ZyYW1lYFxuICogLSBhc3NpZ24gZnJhbWVUaW1lIGFuZCBmcmFtZU1ldGFkYXRhIHRvIGlkZW50aXR5XG4gKiAtIGNhbGwgdGhlIHByb3BlciBmdW5jdGlvbiBhY2NvcmRpbmcgdG8gaW5wdXRUeXBlXG4gKiAtIGNhbGwgYHByb3BhZ2F0ZUZyYW1lYFxuICpcbiAqIGBjaGlsZGAgY2xhc3NcbiAqIC0gY2FsbCBgcHJlcHJvY2Vzc0ZyYW1lYFxuICogLSBkbyB3aGF0ZXZlciB5b3Ugd2FudCB3aXRoIGluY29tbWluZyBmcmFtZVxuICogLSBjYWxsIGBwcm9wYWdhdGVGcmFtZWBcbiAqXG4gKiBfc2hvdWxkIG5vdCBjYWxsIGBzdXBlci5wcm9jZXNzRnJhbWVgX1xuICpcbiAqICoqcHJlcGFyZUZyYW1lKCkqKlxuICpcbiAqIC0gaWYgYHJlaW5pdGAgYW5kIHRyaWdnZXIgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGlmIG5lZWRlZFxuICpcbiAqIF9zaG91bGRuJ3QgYmUgZXh0ZW5kZWQsIG9ubHkgY29uc3VtZWQgaW4gYHByb2Nlc3NGcmFtZWBfXG4gKlxuICogKipwcm9wYWdhdGVGcmFtZSgpKipcbiAqXG4gKiAtIHByb3BhZ2F0ZSBmcmFtZSB0byBjaGlsZHJlblxuICpcbiAqIF9zaG91bGRuJ3QgYmUgZXh0ZW5kZWQsIG9ubHkgY29uc3VtZWQgaW4gYHByb2Nlc3NGcmFtZWBfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uY29yZVxuICovXG5jbGFzcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3IoZGVmaW5pdGlvbnMgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5jaWQgPSBpZCsrO1xuXG4gICAgLyoqXG4gICAgICogUGFyYW1ldGVyIGJhZyBjb250YWluaW5nIHBhcmFtZXRlciBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBuYW1lIHBhcmFtc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqL1xuICAgIHRoaXMucGFyYW1zID0gcGFyYW1ldGVycyhkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgLy8gbGlzdGVuIGZvciBwYXJhbSB1cGRhdGVzXG4gICAgdGhpcy5wYXJhbXMuYWRkTGlzdGVuZXIodGhpcy5vblBhcmFtVXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb24gb2YgdGhlIHN0cmVhbSBvdXRwdXQgb2YgdGhlIG5vZGUuXG4gICAgICogU2V0IHRvIGBudWxsYCB3aGVuIHRoZSBub2RlIGlzIGRlc3Ryb3llZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyYW1lU2l6ZSAtIEZyYW1lIHNpemUgYXQgdGhlIG91dHB1dCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJhbWVSYXRlIC0gRnJhbWUgcmF0ZSBhdCB0aGUgb3V0cHV0IG9mIHRoZSBub2RlLlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBmcmFtZVR5cGUgLSBGcmFtZSB0eXBlIGF0IHRoZSBvdXRwdXQgb2YgdGhlIG5vZGUsXG4gICAgICogIHBvc3NpYmxlIHZhbHVlcyBhcmUgYHNpZ25hbGAsIGB2ZWN0b3JgIG9yIGBzY2FsYXJgLlxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl8U3RyaW5nfSBkZXNjcmlwdGlvbiAtIElmIHR5cGUgaXMgYHZlY3RvcmAsIGRlc2NyaWJlXG4gICAgICogIHRoZSBkaW1lbnNpb24ocykgb2Ygb3V0cHV0IHN0cmVhbS5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc291cmNlU2FtcGxlUmF0ZSAtIFNhbXBsZSByYXRlIG9mIHRoZSBzb3VyY2Ugb2YgdGhlXG4gICAgICogIGdyYXBoLiBfVGhlIHZhbHVlIHNob3VsZCBiZSBkZWZpbmVkIGJ5IHNvdXJjZXMgYW5kIG5ldmVyIG1vZGlmaWVkXy5cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc291cmNlU2FtcGxlQ291bnQgLSBOdW1iZXIgb2YgY29uc2VjdXRpdmUgZGlzY3JldGVcbiAgICAgKiAgdGltZSB2YWx1ZXMgY29udGFpbmVkIGluIHRoZSBkYXRhIGZyYW1lIG91dHB1dCBieSB0aGUgc291cmNlLlxuICAgICAqICBfVGhlIHZhbHVlIHNob3VsZCBiZSBkZWZpbmVkIGJ5IHNvdXJjZXMgYW5kIG5ldmVyIG1vZGlmaWVkXy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHN0cmVhbVBhcmFtc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqL1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zID0ge1xuICAgICAgZnJhbWVUeXBlOiBudWxsLFxuICAgICAgZnJhbWVTaXplOiAxLFxuICAgICAgZnJhbWVSYXRlOiAwLFxuICAgICAgZGVzY3JpcHRpb246IG51bGwsXG4gICAgICBzb3VyY2VTYW1wbGVSYXRlOiAwLFxuICAgICAgc291cmNlU2FtcGxlQ291bnQ6IG51bGwsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgZnJhbWUuIFRoaXMgb2JqZWN0IGFuZCBpdHMgZGF0YSBhcmUgdXBkYXRlZCBhdCBlYWNoIGluY29tbWluZ1xuICAgICAqIGZyYW1lIHdpdGhvdXQgcmVhbGxvY2F0aW5nIG1lbW9yeS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQG5hbWUgZnJhbWVcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZSAtIFRpbWUgb2YgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICogQHByb3BlcnR5IHtGbG9hdDMyQXJyYXl9IGRhdGEgLSBEYXRhIG9mIHRoZSBjdXJyZW50IGZyYW1lLlxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtZXRhZGF0YSAtIE1ldGFkYXRhIGFzc29jaXRlZCB0byB0aGUgY3VycmVudCBmcmFtZS5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKi9cbiAgICB0aGlzLmZyYW1lID0ge1xuICAgICAgdGltZTogMCxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgICBtZXRhZGF0YToge30sXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygbm9kZXMgY29ubmVjdGVkIHRvIHRoZSBvdXB1dCBvZiB0aGUgbm9kZSAobG93ZXIgaW4gdGhlIGdyYXBoKS5cbiAgICAgKiBBdCBlYWNoIGZyYW1lLCB0aGUgbm9kZSBmb3J3YXJkIGl0cyBgZnJhbWVgIHRvIHRvIGFsbCBpdHMgYG5leHRPcHNgLlxuICAgICAqXG4gICAgICogQHR5cGUge0FycmF5PEJhc2VMZm8+fVxuICAgICAqIEBuYW1lIG5leHRPcHNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm9cbiAgICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNjb25uZWN0fVxuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Rpc2Nvbm5lY3R9XG4gICAgICovXG4gICAgdGhpcy5uZXh0T3BzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSBub2RlIHJlY2VpdmUgdGhlIGZyYW1lcyAodXBwZXIgaW4gdGhlIGdyYXBoKS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCYXNlTGZvfVxuICAgICAqIEBuYW1lIHByZXZPcFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Nvbm5lY3R9XG4gICAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jZGlzY29ubmVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnByZXZPcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBJcyBzZXQgdG8gdHJ1ZSB3aGVuIGEgc3RhdGljIHBhcmFtZXRlciBpcyB1cGRhdGVkLiBPbiB0aGUgbmV4dCBpbnB1dFxuICAgICAqIGZyYW1lIGFsbCB0aGUgc3ViZ3JhcGggc3RyZWFtUGFyYW1zIHN0YXJ0aW5nIGZyb20gdGhpcyBub2RlIHdpbGwgYmVcbiAgICAgKiB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQG5hbWUgX3JlaW5pdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmb1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcmVpbml0ID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgZGVzY3JpYmluZyBlYWNoIGF2YWlsYWJsZSBwYXJhbWV0ZXIgb2YgdGhlIG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGdldFBhcmFtc0Rlc2NyaXB0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmFtcy5nZXREZWZpbml0aW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IGFsbCBwYXJhbWV0ZXJzIHRvIHRoZWlyIGluaXRpYWwgdmFsdWUgKGFzIGRlZmluZWQgb24gaW5zdGFudGljYXRpb24pXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3N0cmVhbVBhcmFtc31cbiAgICovXG4gIHJlc2V0UGFyYW1zKCkge1xuICAgIHRoaXMucGFyYW1zLnJlc2V0KCk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBwYXJhbSBpcyB1cGRhdGVkLiBCeSBkZWZhdWx0IHNldCB0aGUgYF9yZWluaXRgXG4gICAqIGZsYWcgdG8gYHRydWVgIGlmIHRoZSBwYXJhbSBpcyBgc3RhdGljYCBvbmUuIFRoaXMgbWV0aG9kIHNob3VsZCBiZVxuICAgKiBleHRlbmRlZCB0byBoYW5kbGUgcGFydGljdWxhciBsb2dpYyBib3VuZCB0byBhIHNwZWNpZmljIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gVmFsdWUgb2YgdGhlIHBhcmFtZXRlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG1ldGFzIC0gTWV0YWRhdGEgYXNzb2NpYXRlZCB0byB0aGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMgPSB7fSkge1xuICAgIGlmIChtZXRhcy5raW5kID09PSAnc3RhdGljJylcbiAgICAgIHRoaXMuX3JlaW5pdCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdCB0aGUgY3VycmVudCBub2RlIChgcHJldk9wYCkgdG8gYW5vdGhlciBub2RlIChgbmV4dE9wYCkuXG4gICAqIEEgZ2l2ZW4gbm9kZSBjYW4gYmUgY29ubmVjdGVkIHRvIHNldmVyYWwgb3BlcmF0b3JzIGFuZCBwcm9wYWdhdGUgdGhlXG4gICAqIHN0cmVhbSB0byBlYWNoIG9mIHRoZW0uXG4gICAqXG4gICAqIEBwYXJhbSB7QmFzZUxmb30gbmV4dCAtIE5leHQgb3BlcmF0b3IgaW4gdGhlIGdyYXBoLlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Rpc2Nvbm5lY3R9XG4gICAqL1xuICBjb25uZWN0KG5leHQpIHtcbiAgICBpZiAoIShuZXh0IGluc3RhbmNlb2YgQmFzZUxmbykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29ubmVjdGlvbjogY2hpbGQgbm9kZSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgYEJhc2VMZm9gJyk7XG5cbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMgPT09IG51bGwgfHxuZXh0LnN0cmVhbVBhcmFtcyA9PT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb25uZWN0aW9uOiBjYW5ub3QgY29ubmVjdCBhIGRlYWQgbm9kZScpO1xuXG4gICAgdGhpcy5uZXh0T3BzLnB1c2gobmV4dCk7XG4gICAgbmV4dC5wcmV2T3AgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSAhPT0gbnVsbCkgLy8gZ3JhcGggaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkXG4gICAgICBuZXh0LnByb2Nlc3NTdHJlYW1QYXJhbXModGhpcy5zdHJlYW1QYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgZ2l2ZW4gb3BlcmF0b3IgZnJvbSBpdHMgcHJldmlvdXMgb3BlcmF0b3JzJyBgbmV4dE9wc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7QmFzZUxmb30gW25leHQ9bnVsbF0gLSBUaGUgb3BlcmF0b3IgdG8gZGlzY29ubmVjdCBmcm9tIHRoZSBjdXJyZW50XG4gICAqICBvcGVyYXRvci4gSWYgYG51bGxgIGRpc2Nvbm5lY3QgYWxsIHRoZSBuZXh0IG9wZXJhdG9ycy5cbiAgICovXG4gIGRpc2Nvbm5lY3QobmV4dCA9IG51bGwpIHtcbiAgICBpZiAobmV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5uZXh0T3BzLmZvckVhY2goKG5leHQpID0+IHRoaXMuZGlzY29ubmVjdChuZXh0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5uZXh0T3BzLmluZGV4T2YodGhpcyk7XG4gICAgICB0aGlzLm5leHRPcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG5leHQucHJldk9wID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBhbGwgdGhlIG5vZGVzIGluIHRoZSBzdWItZ3JhcGggc3RhcnRpbmcgZnJvbSB0aGUgY3VycmVudCBub2RlLlxuICAgKiBXaGVuIGRldHJveWVkLCB0aGUgYHN0cmVhbVBhcmFtc2Agb2YgdGhlIG5vZGUgYXJlIHNldCB0byBgbnVsbGAsIHRoZVxuICAgKiBvcGVyYXRvciBpcyB0aGVuIGNvbnNpZGVyZWQgYXMgYGRlYWRgIGFuZCBjYW5ub3QgYmUgcmVjb25uZWN0ZWQuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2Nvbm5lY3R9XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIC8vIGRlc3Ryb3kgYWxsIGNoaWRyZW5cbiAgICBsZXQgaW5kZXggPSB0aGlzLm5leHRPcHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGluZGV4LS0pXG4gICAgICB0aGlzLm5leHRPcHNbaW5kZXhdLmRlc3Ryb3koKTtcblxuICAgIC8vIGRpc2Nvbm5lY3QgaXRzZWxmIGZyb20gdGhlIHByZXZpb3VzIG9wZXJhdG9yXG4gICAgaWYgKHRoaXMucHJldk9wKVxuICAgICAgdGhpcy5wcmV2T3AuZGlzY29ubmVjdCh0aGlzKTtcblxuICAgIC8vIG1hcmsgdGhlIG9iamVjdCBhcyBkZWFkXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBpbml0aWFsaXplIHRoZSBzdHJlYW0gaW4gc3RhbmRhbG9uZSBtb2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0cmVhbVBhcmFtcz17fV0gLSBTdHJlYW0gcGFyYW1ldGVycyB0byBiZSB1c2VkLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNyZXNldFN0cmVhbX1cbiAgICovXG4gIGluaXRTdHJlYW0oc3RyZWFtUGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnByb2Nlc3NTdHJlYW1QYXJhbXMoc3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIGBmcmFtZS5kYXRhYCBidWZmZXIgYnkgc2V0dGluZyBhbGwgaXRzIHZhbHVlcyB0byAwLlxuICAgKiBBIHNvdXJjZSBvcGVyYXRvciBzaG91bGQgY2FsbCBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgYW5kIGByZXNldFN0cmVhbWAgd2hlblxuICAgKiBzdGFydGVkLCBlYWNoIG9mIHRoZXNlIG1ldGhvZCBwcm9wYWdhdGUgdGhyb3VnaCB0aGUgZ3JhcGggYXV0b21hdGljYWx5LlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKi9cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgLy8gYnV0dG9tIHVwXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm5leHRPcHMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgdGhpcy5uZXh0T3BzW2ldLnJlc2V0U3RyZWFtKCk7XG5cbiAgICAvLyBubyBidWZmZXIgZm9yIGBzY2FsYXJgIHR5cGUgb3Igc2luayBub2RlXG4gICAgaWYgKHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSAhPT0gJ3NjYWxhcicgJiYgdGhpcy5mcmFtZS5kYXRhICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKVxuICAgICAgICBkYXRhW2ldID0gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluYWxpemUgdGhlIHN0cmVhbS4gQSBzb3VyY2Ugbm9kZSBzaG91bGQgY2FsbCB0aGlzIG1ldGhvZCB3aGVuIHN0b3BwZWQsXG4gICAqIGBmaW5hbGl6ZVN0cmVhbWAgaXMgYXV0b21hdGljYWxseSBwcm9wYWdhdGVkIHRocm91Z2h0IHRoZSBncmFwaC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGVuZFRpbWUgLSBMb2dpY2FsIHRpbWUgYXQgd2hpY2ggdGhlIGdyYXBoIGlzIHN0b3BwZWQuXG4gICAqL1xuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm5leHRPcHMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgdGhpcy5uZXh0T3BzW2ldLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgb3IgdXBkYXRlIHRoZSBvcGVyYXRvcidzIGBzdHJlYW1QYXJhbXNgIGFjY29yZGluZyB0byB0aGVcbiAgICogcHJldmlvdXMgb3BlcmF0b3JzIGBzdHJlYW1QYXJhbXNgIHZhbHVlcy5cbiAgICpcbiAgICogV2hlbiBpbXBsZW1lbnRpbmcgYSBuZXcgb3BlcmF0b3IgdGhpcyBtZXRob2Qgc2hvdWxkOlxuICAgKiAxLiBjYWxsIGB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXNgIHdpdGggdGhlIGdpdmVuIGBwcmV2U3RyZWFtUGFyYW1zYFxuICAgKiAyLiBvcHRpb25uYWxseSBjaGFuZ2UgdmFsdWVzIHRvIGB0aGlzLnN0cmVhbVBhcmFtc2AgYWNjb3JkaW5nIHRvIHRoZVxuICAgKiAgICBsb2dpYyBwZXJmb3JtZWQgYnkgdGhlIG9wZXJhdG9yLlxuICAgKiAzLiBvcHRpb25uYWxseSBhbGxvY2F0ZSBtZW1vcnkgZm9yIHJpbmcgYnVmZmVycywgZXRjLlxuICAgKiA0LiBjYWxsIGB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtc2AgdG8gdHJpZ2dlciB0aGUgbWV0aG9kIG9uIHRoZSBuZXh0XG4gICAqICAgIG9wZXJhdG9ycyBpbiB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmV2U3RyZWFtUGFyYW1zIC0gYHN0cmVhbVBhcmFtc2Agb2YgdGhlIHByZXZpb3VzIG9wZXJhdG9yLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcmVwYXJlU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9wYWdhdGVTdHJlYW1QYXJhbXN9XG4gICAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBsb2dpYyB0byBkbyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBgcHJvY2Vzc1N0cmVhbVBhcmFtYCwgbXVzdCBiZVxuICAgKiBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBhbnkgYHByb2Nlc3NTdHJlYW1QYXJhbWAgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIFRoZSBtZXRob2QgbWFpbmx5IGNoZWNrIGlmIHRoZSBjdXJyZW50IG5vZGUgaW1wbGVtZW50IHRoZSBpbnRlcmZhY2UgdG9cbiAgICogaGFuZGxlIHRoZSB0eXBlIG9mIGZyYW1lIHByb3BhZ2F0ZWQgYnkgaXQncyBwYXJlbnQ6XG4gICAqIC0gdG8gaGFuZGxlIGEgYHZlY3RvcmAgZnJhbWUgdHlwZSwgdGhlIGNsYXNzIG11c3QgaW1wbGVtZW50IGBwcm9jZXNzVmVjdG9yYFxuICAgKiAtIHRvIGhhbmRsZSBhIGBzaWduYWxgIGZyYW1lIHR5cGUsIHRoZSBjbGFzcyBtdXN0IGltcGxlbWVudCBgcHJvY2Vzc1NpZ25hbGBcbiAgICogLSBpbiBjYXNlIG9mIGEgJ3NjYWxhcicgZnJhbWUgdHlwZSwgdGhlIGNsYXNzIGNhbiBpbXBsZW1lbnQgYW55IG9mIHRoZVxuICAgKiBmb2xsb3dpbmcgYnkgb3JkZXIgb2YgcHJlZmVyZW5jZTogYHByb2Nlc3NTY2FsYXJgLCBgcHJvY2Vzc1ZlY3RvcmAsXG4gICAqIGBwcm9jZXNzU2lnbmFsYC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXZTdHJlYW1QYXJhbXMgLSBgc3RyZWFtUGFyYW1zYCBvZiB0aGUgcHJldmlvdXMgb3BlcmF0b3IuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb3BhZ2F0ZVN0cmVhbVBhcmFtc31cbiAgICovXG4gIHByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0cmVhbVBhcmFtcywgcHJldlN0cmVhbVBhcmFtcyk7XG4gICAgY29uc3QgcHJldkZyYW1lVHlwZSA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVUeXBlO1xuXG4gICAgc3dpdGNoIChwcmV2RnJhbWVUeXBlKSB7XG4gICAgICBjYXNlICdzY2FsYXInOlxuICAgICAgICBpZiAodGhpcy5wcm9jZXNzU2NhbGFyKVxuICAgICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzU2NhbGFyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NWZWN0b3IpXG4gICAgICAgICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24gPSB0aGlzLnByb2Nlc3NWZWN0b3I7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc1NpZ25hbClcbiAgICAgICAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbiA9IHRoaXMucHJvY2Vzc1NpZ25hbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0gbm8gXCJwcm9jZXNzXCIgZnVuY3Rpb24gZm91bmRgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2ZWN0b3InOlxuICAgICAgICBpZiAoISgncHJvY2Vzc1ZlY3RvcicgaW4gdGhpcykpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gLSBcInByb2Nlc3NWZWN0b3JcIiBpcyBub3QgZGVmaW5lZGApO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uID0gdGhpcy5wcm9jZXNzVmVjdG9yO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NpZ25hbCc6XG4gICAgICAgIGlmICghKCdwcm9jZXNzU2lnbmFsJyBpbiB0aGlzKSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtIFwicHJvY2Vzc1NpZ25hbFwiIGlzIG5vdCBkZWZpbmVkYCk7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24gPSB0aGlzLnByb2Nlc3NTaWduYWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gZGVmYXVsdHMgdG8gcHJvY2Vzc0Z1bmN0aW9uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGB0aGlzLmZyYW1lLmRhdGFgIGJ1ZmZlciBhbmQgZm9yd2FyZCB0aGUgb3BlcmF0b3IncyBgc3RyZWFtUGFyYW1gXG4gICAqIHRvIGFsbCBpdHMgbmV4dCBvcGVyYXRvcnMsIG11c3QgYmUgY2FsbGVkIGF0IHRoZSBlbmQgb2YgYW55XG4gICAqIGBwcm9jZXNzU3RyZWFtUGFyYW1zYCBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJlcGFyZVN0cmVhbVBhcmFtc31cbiAgICovXG4gIHByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubmV4dE9wcy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICB0aGlzLm5leHRPcHNbaV0ucHJvY2Vzc1N0cmVhbVBhcmFtcyh0aGlzLnN0cmVhbVBhcmFtcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lIHRoZSBwYXJ0aWN1bGFyIGxvZ2ljIHRoZSBvcGVyYXRvciBhcHBsaWVzIHRvIHRoZSBzdHJlYW0uXG4gICAqIEFjY29yZGluZyB0byB0aGUgZnJhbWUgdHlwZSBvZiB0aGUgcHJldmlvdXMgbm9kZSwgdGhlIG1ldGhvZCBjYWxscyBvbmVcbiAgICogb2YgdGhlIGZvbGxvd2luZyBtZXRob2QgYHByb2Nlc3NWZWN0b3JgLCBgcHJvY2Vzc1NpZ25hbGAgb3IgYHByb2Nlc3NTY2FsYXJgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFtZSAtIEZyYW1lICh0aW1lLCBkYXRhLCBhbmQgbWV0YWRhdGEpIGFzIGdpdmVuIGJ5IHRoZVxuICAgKiAgcHJldmlvdXMgb3BlcmF0b3IuIFRoZSBpbmNvbW1pbmcgZnJhbWUgc2hvdWxkIG5ldmVyIGJlIG1vZGlmaWVkIGJ5XG4gICAqICB0aGUgb3BlcmF0b3IuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3ByZXBhcmVGcmFtZX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvcGFnYXRlRnJhbWV9XG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NTdHJlYW1QYXJhbXN9XG4gICAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuXG4gICAgLy8gZnJhbWVUaW1lIGFuZCBmcmFtZU1ldGFkYXRhIGRlZmF1bHRzIHRvIGlkZW50aXR5XG4gICAgdGhpcy5mcmFtZS50aW1lID0gZnJhbWUudGltZTtcbiAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG5cbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIG1ldGhvZCBjYWxsZWQgaW4gYHByb2Nlc3NGcmFtZWAgYWNjb3JkaW5nIHRvIHRoZVxuICAgKiBmcmFtZSB0eXBlIG9mIHRoZSBwcmV2aW91cyBvcGVyYXRvci4gSXMgZHluYW1pY2FsbHkgYXNzaWduZWQgaW5cbiAgICogYHByZXBhcmVTdHJlYW1QYXJhbXNgLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcmVwYXJlU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzRnJhbWV9XG4gICAqL1xuICBwcm9jZXNzRnVuY3Rpb24oZnJhbWUpIHtcbiAgICB0aGlzLmZyYW1lID0gZnJhbWU7XG4gIH1cblxuICAvKipcbiAgICogQ29tbW9uIGxvZ2ljIHRvIHBlcmZvcm0gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYHByb2Nlc3NGcmFtZWAuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NGcmFtZX1cbiAgICovXG4gIHByZXBhcmVGcmFtZSgpIHtcbiAgICBpZiAodGhpcy5fcmVpbml0ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBzdHJlYW1QYXJhbXMgPSB0aGlzLnByZXZPcCAhPT0gbnVsbCA/IHRoaXMucHJldk9wLnN0cmVhbVBhcmFtcyA6IHt9O1xuICAgICAgdGhpcy5pbml0U3RyZWFtKHN0cmVhbVBhcmFtcyk7XG4gICAgICB0aGlzLl9yZWluaXQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yd2FyZCB0aGUgY3VycmVudCBgZnJhbWVgIHRvIHRoZSBuZXh0IG9wZXJhdG9ycywgaXMgY2FsbGVkIGF0IHRoZSBlbmQgb2ZcbiAgICogYHByb2Nlc3NGcmFtZWAuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI3Byb2Nlc3NGcmFtZX1cbiAgICovXG4gIHByb3BhZ2F0ZUZyYW1lKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5uZXh0T3BzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgIHRoaXMubmV4dE9wc1tpXS5wcm9jZXNzRnJhbWUodGhpcy5mcmFtZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUxmbztcblxuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi9CYXNlTGZvJztcblxuZXhwb3J0IGRlZmF1bHQgeyBCYXNlTGZvIH07XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzaW4gPSBNYXRoLnNpbjtcbmNvbnN0IGNvcyA9IE1hdGguY29zO1xuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcbmNvbnN0IHBvdyA9IE1hdGgucG93O1xuY29uc3QgXzJQSSA9IE1hdGguUEkgKiAyO1xuXG4vLyBwbG90IChmcm9tIGh0dHA6Ly93d3cuZWFybGV2ZWwuY29tL3NjcmlwdHMvd2lkZ2V0cy8yMDEzMTAxMy9iaXF1YWRzMi5qcylcbi8vIHZhciBsZW4gPSA1MTI7XG4vLyB2YXIgbWFnUGxvdCA9IFtdO1xuLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuOyBpZHgrKykge1xuLy8gICB2YXIgdztcbi8vICAgaWYgKHBsb3RUeXBlID09IFwibGluZWFyXCIpXG4vLyAgICAgdyA9IGlkeCAvIChsZW4gLSAxKSAqIE1hdGguUEk7ICAvLyAwIHRvIHBpLCBsaW5lYXIgc2NhbGVcbi8vICAgZWxzZVxuLy8gICAgIHcgPSBNYXRoLmV4cChNYXRoLmxvZygxIC8gMC4wMDEpICogaWR4IC8gKGxlbiAtIDEpKSAqIDAuMDAxICogTWF0aC5QSTsgIC8vIDAuMDAxIHRvIDEsIHRpbWVzIHBpLCBsb2cgc2NhbGVcblxuLy8gICB2YXIgcGhpID0gTWF0aC5wb3coTWF0aC5zaW4ody8yKSwgMik7XG4vLyAgIHZhciB5ID0gTWF0aC5sb2coTWF0aC5wb3coYTArYTErYTIsIDIpIC0gNCooYTAqYTEgKyA0KmEwKmEyICsgYTEqYTIpKnBoaSArIDE2KmEwKmEyKnBoaSpwaGkpIC0gTWF0aC5sb2coTWF0aC5wb3coMStiMStiMiwgMikgLSA0KihiMSArIDQqYjIgKyBiMSpiMikqcGhpICsgMTYqYjIqcGhpKnBoaSk7XG4vLyAgIHkgPSB5ICogMTAgLyBNYXRoLkxOMTBcbi8vICAgaWYgKHkgPT0gLUluZmluaXR5KVxuLy8gICAgIHkgPSAtMjAwO1xuXG4vLyAgIGlmIChwbG90VHlwZSA9PSBcImxpbmVhclwiKVxuLy8gICAgIG1hZ1Bsb3QucHVzaChbaWR4IC8gKGxlbiAtIDEpICogRnMgLyAyLCB5XSk7XG4vLyAgIGVsc2Vcbi8vICAgICBtYWdQbG90LnB1c2goW2lkeCAvIChsZW4gLSAxKSAvIDIsIHldKTtcblxuLy8gICBpZiAoaWR4ID09IDApXG4vLyAgICAgbWluVmFsID0gbWF4VmFsID0geTtcbi8vICAgZWxzZSBpZiAoeSA8IG1pblZhbClcbi8vICAgICBtaW5WYWwgPSB5O1xuLy8gICBlbHNlIGlmICh5ID4gbWF4VmFsKVxuLy8gICAgIG1heFZhbCA9IHk7XG4vLyB9XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICB0eXBlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdsb3dwYXNzJyxcbiAgICBsaXN0OiBbXG4gICAgICAnbG93cGFzcycsXG4gICAgICAnaGlnaHBhc3MnLFxuICAgICAgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JyxcbiAgICAgICdiYW5kcGFzcycsXG4gICAgICAnYmFuZHBhc3NfY29uc3RhbnRfcGVhaycsXG4gICAgICAnbm90Y2gnLFxuICAgICAgJ2FsbHBhc3MnLFxuICAgICAgJ3BlYWtpbmcnLFxuICAgICAgJ2xvd3NoZWxmJyxcbiAgICAgICdoaWdoc2hlbGYnLFxuICAgIF0sXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGYwOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBnYWluOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtaW46IDAuMDAxLCAvLyBQSVBPX0JJUVVBRF9NSU5fUVxuICAgIC8vIG1heDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgLy8gYmFuZHdpZHRoOiB7XG4gIC8vICAgdHlwZTogJ2Zsb2F0JyxcbiAgLy8gICBkZWZhdWx0OiBudWxsLFxuICAvLyAgIG51bGxhYmxlOiB0cnVlLFxuICAvLyAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICAvLyB9LFxufVxuXG5cbi8qKlxuICogQmlxdWFkIGZpbHRlciAoRGlyZWN0IGZvcm0gSSkuIElmIGlucHV0IGlzIG9mIHR5cGUgYHZlY3RvcmAgdGhlIGZpbHRlciBpc1xuICogYXBwbGllZCBvbiBlYWNoIGRpbWVuc2lvbiBpIHBhcmFsbGVsLlxuICpcbiAqIEJhc2VkIG9uIHRoZSBbXCJDb29rYm9vayBmb3JtdWxhZSBmb3IgYXVkaW8gRVEgYmlxdWFkIGZpbHRlciBjb2VmZmljaWVudHNcIl0oaHR0cDovL3d3dy5tdXNpY2RzcC5vcmcvZmlsZXMvQXVkaW8tRVEtQ29va2Jvb2sudHh0KVxuICogYnkgUm9iZXJ0IEJyaXN0b3ctSm9obnNvbi5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHlwZT0nbG93cGFzcyddIC0gVHlwZSBvZiB0aGUgZmlsdGVyLiBBdmFpbGFibGVcbiAqICBmaWx0ZXJzOiAnbG93cGFzcycsICdoaWdocGFzcycsICdiYW5kcGFzc19jb25zdGFudF9za2lydCcsICdiYW5kcGFzc19jb25zdGFudF9wZWFrJ1xuICogIChhbGlhcyAnYmFuZHBhc3MnKSwgJ25vdGNoJywgJ2FsbHBhc3MnLCAncGVha2luZycsICdsb3dzaGVsZicsICdoaWdoc2hlbGYnLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmYwPTFdIC0gQ3V0b2ZmIG9yIGNlbnRlciBmcmVxdWVuY3kgb2YgdGhlIGZpbHRlclxuICogIGFjY29yZGluZyB0byBpdHMgdHlwZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5nYWluPTFdIC0gR2FpbiBvZiB0aGUgZmlsdGVyIChpbiBkQikuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucT0xXSAtIFF1YWxpdHkgZmFjdG9yIG9mIHRoZSBmaWx0ZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBidWZmZXIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBiaXF1YWQgPSBuZXcgbGZvLm9wZXJhdG9yLkJpcXVhZCh7XG4gKiAgIHR5cGU6ICdsb3dwYXNzJyxcbiAqICAgZjA6IDIwMDAsXG4gKiAgIGdhaW46IDMsXG4gKiAgIHE6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc3BlY3RydW1EaXNwbGF5ID0gbmV3IGxmby5zaW5rLlNwZWN0cnVtRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNzcGVjdHJ1bScsXG4gKiB9KTtcbiAqXG4gKiBhdWRpb0luQnVmZmVyLmNvbm5lY3QoYmlxdWFkKTtcbiAqIGJpcXVhZC5jb25uZWN0KHNwZWN0cnVtRGlzcGxheSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5zdGFydCgpO1xuICovXG5jbGFzcyBCaXF1YWQgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICB0aGlzLl9jYWxjdWxhdGVDb2VmcygpO1xuICB9XG5cbiAgX2NhbGN1bGF0ZUNvZWZzKCkge1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IGZyYW1lVHlwZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBjb25zdCB0eXBlID0gdGhpcy5wYXJhbXMuZ2V0KCd0eXBlJyk7XG4gICAgY29uc3QgZjAgPSB0aGlzLnBhcmFtcy5nZXQoJ2YwJyk7XG4gICAgY29uc3QgZ2FpbiA9IHRoaXMucGFyYW1zLmdldCgnZ2FpbicpO1xuICAgIGNvbnN0IHEgPSB0aGlzLnBhcmFtcy5nZXQoJ3EnKTtcbiAgICAvLyBjb25zdCBiYW5kd2lkdGggPSB0aGlzLnBhcmFtcy5nZXQoJ2JhbmR3aWR0aCcpO1xuICAgIGNvbnN0IGJhbmR3aWR0aCA9IG51bGw7XG5cbiAgICBsZXQgYjAgPSAwLCBiMSA9IDAsIGIyID0gMCwgYTAgPSAwLCBhMSA9IDAsIGEyID0gMDtcblxuICAgIGNvbnN0IEEgPSBwb3coMTAsIGdhaW4gLyA0MCk7XG4gICAgY29uc3QgdzAgPSBfMlBJICogZjAgLyBzYW1wbGVSYXRlO1xuICAgIGNvbnN0IGNvc1cwID0gY29zKHcwKTtcbiAgICBjb25zdCBzaW5XMCA9IHNpbih3MCk7XG4gICAgbGV0IGFscGhhOyAvLyBkZXBlbmQgb2YgdGhlIGZpbHRlciB0eXBlXG4gICAgbGV0IF8yUm9vdEFBbHBoYTsgLy8gaW50ZXJtZWRpYXRlIHZhbHVlIGZvciBsb3dzaGVsZiBhbmQgaGlnaHNoZWxmXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIC8vIEgocykgPSAxIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdsb3dwYXNzJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIGIwID0gKDEgLSBjb3NXMCkgLyAyO1xuICAgICAgICBiMSA9IDEgLSBjb3NXMDtcbiAgICAgICAgYjIgPSBiMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC1hbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gc14yIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdoaWdocGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9ICgxICsgY29zVzApIC8gMjtcbiAgICAgICAgYjEgPSAtICgxICsgY29zVzApXG4gICAgICAgIGIyID0gYjA7XG4gICAgICAgIGEwID0gMSArIGFscGhhO1xuICAgICAgICBhMSA9IC0yICogY29zVzA7XG4gICAgICAgIGEyID0gMSAtIGFscGhhO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBzIC8gKHNeMiArIHMvUSArIDEpICAoY29uc3RhbnQgc2tpcnQgZ2FpbiwgcGVhayBnYWluID0gUSlcbiAgICAgIGNhc2UgJ2JhbmRwYXNzX2NvbnN0YW50X3NraXJ0JzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IHNpblcwIC8gMjtcbiAgICAgICAgYjEgPSAwO1xuICAgICAgICBiMiA9IC1iMDtcbiAgICAgICAgYTAgPSAxICsgYWxwaGE7XG4gICAgICAgIGExID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzL1EpIC8gKHNeMiArIHMvUSArIDEpICAgICAgKGNvbnN0YW50IDAgZEIgcGVhayBnYWluKVxuICAgICAgY2FzZSAnYmFuZHBhc3MnOiAvLyBsb29rcyBsaWtlIHdoYXQgaXMgZ25lcmFsbHkgY29uc2lkZXJlZCBhcyBhIGJhbmRwYXNzXG4gICAgICBjYXNlICdiYW5kcGFzc19jb25zdGFudF9wZWFrJzpcbiAgICAgICAgaWYgKGJhbmR3aWR0aCkge1xuICAgICAgICAgIC8vIHNpbih3MCkqc2luaCggbG4oMikvMiAqIEJXICogdzAvc2luKHcwKSApICAgICAgICAgICAoY2FzZTogQlcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIH1cblxuICAgICAgICBiMCA9IGFscGhhO1xuICAgICAgICBiMSA9IDA7XG4gICAgICAgIGIyID0gLWFscGhhO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBhMiA9IDEgLSBhbHBoYTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIDEpIC8gKHNeMiArIHMvUSArIDEpXG4gICAgICBjYXNlICdub3RjaCc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDE7XG4gICAgICAgIGIxID0gLTIgKiBjb3NXMDtcbiAgICAgICAgYjIgPSAxO1xuICAgICAgICBhMCA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IChzXjIgLSBzL1EgKyAxKSAvIChzXjIgKyBzL1EgKyAxKVxuICAgICAgY2FzZSAnYWxscGFzcyc6XG4gICAgICAgIGFscGhhID0gc2luVzAgLyAoMiAqIHEpO1xuICAgICAgICBiMCA9IDEgLSBhbHBoYTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgKyBhbHBoYTtcbiAgICAgICAgYTAgPSBiMjtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSBiMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBIKHMpID0gKHNeMiArIHMqKEEvUSkgKyAxKSAvIChzXjIgKyBzLyhBKlEpICsgMSlcbiAgICAgIGNhc2UgJ3BlYWtpbmcnOlxuICAgICAgICBpZiAoYmFuZHdpZHRoKSB7XG4gICAgICAgICAgLy8gc2luKHcwKSpzaW5oKCBsbigyKS8yICogQlcgKiB3MC9zaW4odzApICkgICAgICAgICAgIChjYXNlOiBCVylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbHBoYSA9IHNpblcwIC8gKDIgKiBxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGIwID0gMSArIGFscGhhICogQTtcbiAgICAgICAgYjEgPSAtMiAqIGNvc1cwO1xuICAgICAgICBiMiA9IDEgLSBhbHBoYSAqIEE7XG4gICAgICAgIGEwID0gMSArIGFscGhhIC8gQTtcbiAgICAgICAgYTEgPSBiMTtcbiAgICAgICAgYTIgPSAxIC0gYWxwaGEgLyBBO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIEgocykgPSBBICogKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKS8oQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSlcbiAgICAgIGNhc2UgJ2xvd3NoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhKTtcbiAgICAgICAgYjEgPSAyICogQSAqICgoQSAtIDEpIC0gKEEgKyAxKSAqIGNvc1cwKTtcbiAgICAgICAgYjIgPSAgICAgQSAqICgoQSArIDEpIC0gKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwICsgXzJSb290QUFscGhhO1xuICAgICAgICBhMSA9ICAgIC0yICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBhMiA9ICAgICAgICAgIChBICsgMSkgKyAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gSChzKSA9IEEgKiAoQSpzXjIgKyAoc3FydChBKS9RKSpzICsgMSkvKHNeMiArIChzcXJ0KEEpL1EpKnMgKyBBKVxuICAgICAgY2FzZSAnaGlnaHNoZWxmJzpcbiAgICAgICAgYWxwaGEgPSBzaW5XMCAvICgyICogcSk7XG4gICAgICAgIF8yUm9vdEFBbHBoYSA9IDIgKiBzcXJ0KEEpICogYWxwaGE7XG5cbiAgICAgICAgYjAgPSAgICAgIEEgKiAoKEEgKyAxKSArIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYSk7XG4gICAgICAgIGIxID0gLTIgKiBBICogKChBIC0gMSkgKyAoQSArIDEpICogY29zVzApO1xuICAgICAgICBiMiA9ICAgICAgQSAqICgoQSArIDEpICsgKEEgLSAxKSAqIGNvc1cwIC0gXzJSb290QUFscGhhKTtcbiAgICAgICAgYTAgPSAgICAgICAgICAgKEEgKyAxKSAtIChBIC0gMSkgKiBjb3NXMCArIF8yUm9vdEFBbHBoYTtcbiAgICAgICAgYTEgPSAgICAgIDIgKiAoKEEgLSAxKSAtIChBICsgMSkgKiBjb3NXMCk7XG4gICAgICAgIGEyID0gICAgICAgICAgIChBICsgMSkgLSAoQSAtIDEpICogY29zVzAgLSBfMlJvb3RBQWxwaGE7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5jb2VmcyA9IHtcbiAgICAgIGIwOiBiMCAvIGEwLFxuICAgICAgYjE6IGIxIC8gYTAsXG4gICAgICBiMjogYjIgLyBhMCxcbiAgICAgIGExOiBhMSAvIGEwLFxuICAgICAgYTI6IGEyIC8gYTAsXG4gICAgfTtcblxuICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgaWYgKGZyYW1lVHlwZSA9PT0gJ3NpZ25hbCcpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7IHgxOiAwLCB4MjogMCwgeTE6IDAsIHkyOiAwIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIHgxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHgyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkxOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICAgIHkyOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lU2l6ZSksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICAvLyBpZiBubyBgc2FtcGxlUmF0ZWAgb3IgYHNhbXBsZVJhdGVgIGlzIDAgd2Ugc2hhbGwgaGFsdCFcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcblxuICAgIGlmICghc2FtcGxlUmF0ZSB8fCBzYW1wbGVSYXRlIDw9IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc2FtcGxlUmF0ZSB2YWx1ZSAoMCkgZm9yIGJpcXVhZCcpO1xuXG4gICAgdGhpcy5fY2FsY3VsYXRlQ29lZnMoKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBpbkRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuY29lZnM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gaW5EYXRhW2ldO1xuICAgICAgY29uc3QgeSA9IGNvZWZzLmIwICogeFxuICAgICAgICAgICAgICArIGNvZWZzLmIxICogc3RhdGUueDFbaV0gKyBjb2Vmcy5iMiAqIHN0YXRlLngyW2ldXG4gICAgICAgICAgICAgIC0gY29lZnMuYTEgKiBzdGF0ZS55MVtpXSAtIGNvZWZzLmEyICogc3RhdGUueTJbaV07XG5cbiAgICAgIG91dERhdGFbaV0gPSB5O1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGVzXG4gICAgICBzdGF0ZS54MltpXSA9IHN0YXRlLngxW2ldO1xuICAgICAgc3RhdGUueDFbaV0gPSB4O1xuICAgICAgc3RhdGUueTJbaV0gPSBzdGF0ZS55MVtpXTtcbiAgICAgIHN0YXRlLnkxW2ldID0geTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGluRGF0YSA9IGZyYW1lLmRhdGE7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGNvZWZzID0gdGhpcy5jb2VmcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IHggPSBpbkRhdGFbaV07XG4gICAgICBjb25zdCB5ID0gY29lZnMuYjAgKiB4XG4gICAgICAgICAgICAgICsgY29lZnMuYjEgKiBzdGF0ZS54MSArIGNvZWZzLmIyICogc3RhdGUueDJcbiAgICAgICAgICAgICAgLSBjb2Vmcy5hMSAqIHN0YXRlLnkxIC0gY29lZnMuYTIgKiBzdGF0ZS55MjtcblxuICAgICAgb3V0RGF0YVtpXSA9IHk7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZXNcbiAgICAgIHN0YXRlLngyID0gc3RhdGUueDE7XG4gICAgICBzdGF0ZS54MSA9IHg7XG4gICAgICBzdGF0ZS55MiA9IHN0YXRlLnkxO1xuICAgICAgc3RhdGUueTEgPSB5O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCaXF1YWQ7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuY29uc3QgY29zID0gTWF0aC5jb3M7XG5jb25zdCBQSSA9IE1hdGguUEk7XG5cbi8vIERjdCBUeXBlIDIgLSBvcnRob2dvbmFsIG1hdHJpeCBzY2FsaW5nXG5mdW5jdGlvbiBnZXREY3RXZWlnaHRzKG9yZGVyLCBOLCB0eXBlID0gJ2h0aycpIHtcbiAgY29uc3Qgd2VpZ2h0cyA9IG5ldyBGbG9hdDMyQXJyYXkoTiAqIG9yZGVyKTtcbiAgY29uc3QgcGlPdmVyTiA9IFBJIC8gTjtcbiAgY29uc3Qgc2NhbGUwID0gMSAvIHNxcnQoMik7XG4gIGNvbnN0IHNjYWxlID0gc3FydCgyIC8gTik7XG5cbiAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgY29uc3QgcyA9IChrID09PSAwKSA/IChzY2FsZTAgKiBzY2FsZSkgOiBzY2FsZTtcbiAgICAvLyBjb25zdCBzID0gc2NhbGU7IC8vIHJ0YSBkb2Vzbid0IGFwcGx5IGs9MCBzY2FsaW5nXG5cbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IE47IG4rKylcbiAgICAgIHdlaWdodHNbayAqIE4gKyBuXSA9IHMgKiBjb3MoayAqIChuICsgMC41KSAqIHBpT3Zlck4pO1xuICB9XG5cbiAgcmV0dXJuIHdlaWdodHM7XG59XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxMixcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBEaXNjcmV0ZSBDb3NpbmUgVHJhbnNmb3JtIG9mIGFuIGlucHV0IGBzaWduYWxgIG9yIGB2ZWN0b3JgLlxuICogKEhUSyBzdHlsZSB3ZWlnaHRpbmcpLlxuICpcbiAqIF9zdXBwb3J0IGBzdGFuZGFsb25lYCB1c2FnZV9cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm9yZGVyPTEyXSAtIE51bWJlciBvZiBjb21wdXRlZCBiaW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBhdWRpbyBidWZmZXJcbiAqIGNvbnN0IHNvdXJjZSA9IG5ldyBBdWRpb0luQnVmZmVyKHtcbiAqICAgYXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxuICogICB1c2VXb3JrZXI6IGZhbHNlLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IFNsaWNlcih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBob3BTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBkY3QgPSBuZXcgRGN0KHtcbiAqICAgb3JkZXI6IDEyLFxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogc291cmNlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KGRjdCk7XG4gKiBkY3QuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIHNvdXJjZS5zdGFydCgpO1xuICovXG5jbGFzcyBEY3QgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGluRnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBvcmRlcjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy53ZWlnaHRNYXRyaXggPSBnZXREY3RXZWlnaHRzKG9yZGVyLCBpbkZyYW1lU2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYERjdGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gSW5wdXQgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBEY3Qgb2YgdGhlIGlucHV0IGFycmF5LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBkY3QgPSBuZXcgbGZvLm9wZXJhdG9yLkRjdCh7IG9yZGVyOiAxMiB9KTtcbiAgICogLy8gbWFuZGF0b3J5IGZvciB1c2UgaW4gc3RhbmRhbG9uZSBtb2RlXG4gICAqIGRjdC5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiA1MTIsIGZyYW1lVHlwZTogJ3NpZ25hbCcgfSk7XG4gICAqIGRjdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICovXG4gIGlucHV0U2lnbmFsKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHZhbHVlcy5sZW5ndGg7XG4gICAgY29uc3Qgb3V0RnJhbWUgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3Qgd2VpZ2h0cyA9IHRoaXMud2VpZ2h0TWF0cml4O1xuXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBrICogZnJhbWVTaXplO1xuICAgICAgb3V0RnJhbWVba10gPSAwO1xuXG4gICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGZyYW1lU2l6ZTsgbisrKVxuICAgICAgICBvdXRGcmFtZVtrXSArPSB2YWx1ZXNbbl0gKiB3ZWlnaHRzW29mZnNldCArIG5dO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRGcmFtZTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEY3Q7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IGluaXRXaW5kb3cgZnJvbSAnLi4vdXRpbHMvd2luZG93cyc7XG5cbi8vIGh0dHBzOi8vY29kZS5zb3VuZHNvZnR3YXJlLmFjLnVrL3Byb2plY3RzL2pzLWRzcC10ZXN0L3JlcG9zaXRvcnkvZW50cnkvZmZ0L25heXVraS1vYmovZmZ0LmpzXG4vKlxuICogRnJlZSBGZnQgYW5kIGNvbnZvbHV0aW9uIChKYXZhU2NyaXB0KVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQcm9qZWN0IE5heXVraVxuICogaHR0cDovL3d3dy5uYXl1a2kuaW8vcGFnZS9mcmVlLXNtYWxsLWZmdC1pbi1tdWx0aXBsZS1sYW5ndWFnZXNcbiAqXG4gKiAoTUlUIExpY2Vuc2UpXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4gKiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4gKiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4gKiB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuICogdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAtIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiAgIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogLSBUaGUgU29mdHdhcmUgaXMgcHJvdmlkZWQgXCJhcyBpc1wiLCB3aXRob3V0IHdhcnJhbnR5IG9mIGFueSBraW5kLCBleHByZXNzIG9yXG4gKiAgIGltcGxpZWQsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHdhcnJhbnRpZXMgb2YgbWVyY2hhbnRhYmlsaXR5LFxuICogICBmaXRuZXNzIGZvciBhIHBhcnRpY3VsYXIgcHVycG9zZSBhbmQgbm9uaW5mcmluZ2VtZW50LiBJbiBubyBldmVudCBzaGFsbCB0aGVcbiAqICAgYXV0aG9ycyBvciBjb3B5cmlnaHQgaG9sZGVycyBiZSBsaWFibGUgZm9yIGFueSBjbGFpbSwgZGFtYWdlcyBvciBvdGhlclxuICogICBsaWFiaWxpdHksIHdoZXRoZXIgaW4gYW4gYWN0aW9uIG9mIGNvbnRyYWN0LCB0b3J0IG9yIG90aGVyd2lzZSwgYXJpc2luZyBmcm9tLFxuICogICBvdXQgb2Ygb3IgaW4gY29ubmVjdGlvbiB3aXRoIHRoZSBTb2Z0d2FyZSBvciB0aGUgdXNlIG9yIG90aGVyIGRlYWxpbmdzIGluIHRoZVxuICogICBTb2Z0d2FyZS5cbiAqXG4gKiBTbGlnaHRseSByZXN0cnVjdHVyZWQgYnkgQ2hyaXMgQ2FubmFtLCBjYW5uYW1AYWxsLWRheS1icmVha2Zhc3QuY29tXG4gKlxuICogQHByaXZhdGVcbiAqL1xuLypcbiAqIENvbnN0cnVjdCBhbiBvYmplY3QgZm9yIGNhbGN1bGF0aW5nIHRoZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoREZUKSBvZlxuICogc2l6ZSBuLCB3aGVyZSBuIGlzIGEgcG93ZXIgb2YgMi5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBGZnROYXl1a2kobikge1xuXG4gIHRoaXMubiA9IG47XG4gIHRoaXMubGV2ZWxzID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgaSsrKSB7XG4gICAgaWYgKDEgPDwgaSA9PSBuKSB7XG4gICAgICB0aGlzLmxldmVscyA9IGk7ICAvLyBFcXVhbCB0byBsb2cyKG4pXG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMubGV2ZWxzID09IC0xKSB7XG4gICAgdGhyb3cgXCJMZW5ndGggaXMgbm90IGEgcG93ZXIgb2YgMlwiO1xuICB9XG5cbiAgdGhpcy5jb3NUYWJsZSA9IG5ldyBBcnJheShuIC8gMik7XG4gIHRoaXMuc2luVGFibGUgPSBuZXcgQXJyYXkobiAvIDIpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbiAvIDI7IGkrKykge1xuICAgIHRoaXMuY29zVGFibGVbaV0gPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgLyBuKTtcbiAgICB0aGlzLnNpblRhYmxlW2ldID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpIC8gbik7XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgZGlzY3JldGUgRm91cmllciB0cmFuc2Zvcm0gKERGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9yLFxuICAgKiBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVXNlcyB0aGUgQ29vbGV5LVR1a2V5XG4gICAqIGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIGFsZ29yaXRobS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRoaXMuZm9yd2FyZCA9IGZ1bmN0aW9uKHJlYWwsIGltYWcpIHtcbiAgICB2YXIgbiA9IHRoaXMubjtcblxuICAgIC8vIEJpdC1yZXZlcnNlZCBhZGRyZXNzaW5nIHBlcm11dGF0aW9uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHZhciBqID0gcmV2ZXJzZUJpdHMoaSwgdGhpcy5sZXZlbHMpO1xuXG4gICAgICBpZiAoaiA+IGkpIHtcbiAgICAgICAgdmFyIHRlbXAgPSByZWFsW2ldO1xuICAgICAgICByZWFsW2ldID0gcmVhbFtqXTtcbiAgICAgICAgcmVhbFtqXSA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSBpbWFnW2ldO1xuICAgICAgICBpbWFnW2ldID0gaW1hZ1tqXTtcbiAgICAgICAgaW1hZ1tqXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29vbGV5LVR1a2V5IGRlY2ltYXRpb24taW4tdGltZSByYWRpeC0yIEZmdFxuICAgIGZvciAodmFyIHNpemUgPSAyOyBzaXplIDw9IG47IHNpemUgKj0gMikge1xuICAgICAgdmFyIGhhbGZzaXplID0gc2l6ZSAvIDI7XG4gICAgICB2YXIgdGFibGVzdGVwID0gbiAvIHNpemU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArPSBzaXplKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBpLCBrID0gMDsgaiA8IGkgKyBoYWxmc2l6ZTsgaisrLCBrICs9IHRhYmxlc3RlcCkge1xuICAgICAgICAgIHZhciB0cHJlID0gIHJlYWxbaitoYWxmc2l6ZV0gKiB0aGlzLmNvc1RhYmxlW2tdICtcbiAgICAgICAgICAgICAgICAgICAgICBpbWFnW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXTtcbiAgICAgICAgICB2YXIgdHBpbSA9IC1yZWFsW2oraGFsZnNpemVdICogdGhpcy5zaW5UYWJsZVtrXSArXG4gICAgICAgICAgICAgICAgICAgICAgaW1hZ1tqK2hhbGZzaXplXSAqIHRoaXMuY29zVGFibGVba107XG4gICAgICAgICAgcmVhbFtqICsgaGFsZnNpemVdID0gcmVhbFtqXSAtIHRwcmU7XG4gICAgICAgICAgaW1hZ1tqICsgaGFsZnNpemVdID0gaW1hZ1tqXSAtIHRwaW07XG4gICAgICAgICAgcmVhbFtqXSArPSB0cHJlO1xuICAgICAgICAgIGltYWdbal0gKz0gdHBpbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybnMgdGhlIGludGVnZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIGxvd2VzdCAnYml0cydcbiAgICAvLyBiaXRzIG9mIHRoZSBpbnRlZ2VyICd4Jy5cbiAgICBmdW5jdGlvbiByZXZlcnNlQml0cyh4LCBiaXRzKSB7XG4gICAgICB2YXIgeSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYml0czsgaSsrKSB7XG4gICAgICAgIHkgPSAoeSA8PCAxKSB8ICh4ICYgMSk7XG4gICAgICAgIHggPj4+PSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBDb21wdXRlcyB0aGUgaW52ZXJzZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoSURGVCkgb2YgdGhlIGdpdmVuIGNvbXBsZXhcbiAgICogdmVjdG9yLCBzdG9yaW5nIHRoZSByZXN1bHQgYmFjayBpbnRvIHRoZSB2ZWN0b3IuXG4gICAqIFRoZSB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgc2l6ZSBuIHRoYXQgd2FzIHBhc3NlZCB0byB0aGVcbiAgICogb2JqZWN0IGNvbnN0cnVjdG9yLCBhbmQgdGhpcyBtdXN0IGJlIGEgcG93ZXIgb2YgMi4gVGhpcyBpcyBhIHdyYXBwZXJcbiAgICogZnVuY3Rpb24uIFRoaXMgdHJhbnNmb3JtIGRvZXMgbm90IHBlcmZvcm0gc2NhbGluZywgc28gdGhlIGludmVyc2UgaXMgbm90XG4gICAqIGEgdHJ1ZSBpbnZlcnNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdGhpcy5pbnZlcnNlID0gZnVuY3Rpb24ocmVhbCwgaW1hZykge1xuICAgIGZvcndhcmQoaW1hZywgcmVhbCk7XG4gIH1cbn1cblxuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5jb25zdCBpc1Bvd2VyT2ZUd28gPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgd2hpbGUgKChudW1iZXIgJSAyID09PSAwKSAmJiBudW1iZXIgPiAxKVxuICAgIG51bWJlciA9IG51bWJlciAvIDI7XG5cbiAgcmV0dXJuIG51bWJlciA9PT0gMTtcbn1cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHNpemU6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTAyNCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICB3aW5kb3c6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydub25lJywgJ2hhbm4nLCAnaGFubmluZycsICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJ10sXG4gICAgZGVmYXVsdDogJ25vbmUnLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1vZGU6IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgbGlzdDogWydtYWduaXR1ZGUnLCAncG93ZXInXSwgLy8gYWRkIGNvbXBsZXggb3V0cHV0XG4gICAgZGVmYXVsdDogJ21hZ25pdHVkZScsXG4gIH0sXG4gIG5vcm06IHtcbiAgICB0eXBlOiAnZW51bScsXG4gICAgZGVmYXVsdDogJ2F1dG8nLFxuICAgIGxpc3Q6IFsnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlciddLFxuICB9LFxufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIEZhc3QgRm91cmllciBUcmFuc2Zvcm0gb2YgYW4gaW5jb21taW5nIGBzaWduYWxgLlxuICpcbiAqIEZmdCBpbXBsZW1lbnRhdGlvbiBieSBbTmF5dWtpXShodHRwczovL2NvZGUuc291bmRzb2Z0d2FyZS5hYy51ay9wcm9qZWN0cy9qcy1kc3AtdGVzdC9yZXBvc2l0b3J5L2VudHJ5L2ZmdC9uYXl1a2ktb2JqL2ZmdC5qcykuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuc2l6ZT0xMDI0XSAtIFNpemUgb2YgdGhlIGZmdCwgc2hvdWxkIGJlIGEgcG93ZXIgb2ZcbiAqICAyLiBJZiB0aGUgZnJhbWUgc2l6ZSBvZiB0aGUgaW5jb21taW5nIHNpZ25hbCBpcyBsb3dlciB0aGFuIHRoaXMgdmFsdWUsXG4gKiAgaXQgaXMgemVybyBwYWRkZWQgdG8gbWF0Y2ggdGhlIGZmdCBzaXplLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLndpbmRvdz0nbm9uZSddIC0gTmFtZSBvZiB0aGUgd2luZG93IGFwcGxpZWQgb24gdGhlXG4gKiAgaW5jb21taW5nIHNpZ25hbC4gQXZhaWxhYmxlIHdpbmRvd3MgYXJlOiAnbm9uZScsICdoYW5uJywgJ2hhbm5pbmcnLFxuICogICdoYW1taW5nJywgJ2JsYWNrbWFuJywgJ2JsYWNrbWFuaGFycmlzJywgJ3NpbmUnLCAncmVjdGFuZ2xlJy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tb2RlPSdtYWduaXR1ZGUnXSAtIFR5cGUgb2YgdGhlIG91dHB1dCAoYG1hZ25pdHVkZWBcbiAqICBvciBgcG93ZXJgKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm5vcm09J2F1dG8nXSAtIFR5cGUgb2Ygbm9ybWFsaXphdGlvbiBhcHBsaWVkIG9uIHRoZVxuICogIG91dHB1dC4gUG9zc2libGUgdmFsdWVzIGFyZSAnYXV0bycsICdub25lJywgJ2xpbmVhcicsICdwb3dlcicuIFdoZW4gc2V0IHRvXG4gKiAgYGF1dG9gLCBhIGBsaW5lYXJgIG5vcm1hbGl6YXRpb24gaXMgYXBwbGllZCBvbiB0aGUgbWFnbml0dWRlIHNwZWN0cnVtLCB3aGlsZVxuICogIGEgYHBvd2VyYCBub3JtYWxpemV0aW9uIGlzIGFwcGxpZWQgb24gdGhlIHBvd2VyIHNwZWN0cnVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhc3N1bWluZyBhbiBgYXVkaW9CdWZmZXJgIGV4aXN0c1xuICogY29uc3Qgc291cmNlID0gbmV3IEF1ZGlvSW5CdWZmZXIoeyBhdWRpb0J1ZmZlciB9KTtcbiAqXG4gKiBjb25zdCBzbGljZXIgPSBuZXcgU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBmZnQgPSBuZXcgRmZ0KHtcbiAqICAgbW9kZTogJ3Bvd2VyJyxcbiAqICAgd2luZG93OiAnaGFubicsXG4gKiAgIG5vcm06ICdwb3dlcicsXG4gKiAgIHNpemU6IDI1NixcbiAqIH0pO1xuICpcbiAqIHNvdXJjZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChmZnQpO1xuICogc291cmNlLnN0YXJ0KCk7XG4gKlxuICogLy8gPiBvdXRwdXRzIDEyOSBiaW5zIGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgcG93ZXIgc3BlY3RydW0gKGluY2x1ZGluZ1xuICogLy8gPiBEQyBhbmQgTnl1aXN0IGZyZXF1ZW5jaWVzKS5cbiAqXG4gKiBAdG9kbyAtIGNoZWNrIGlmICdyZWN0YW5nbGUnIGFuZCAnbm9uZScgd2luZG93cyBhcmUgbm90IHJlZG9uZGFudC5cbiAqIEB0b2RvIC0gY2hlY2sgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCBwYXJhbXMuXG4gKi9cbmNsYXNzIEZmdCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLndpbmRvd1NpemUgPSBudWxsO1xuICAgIHRoaXMubm9ybWFsaXplQ29lZnMgPSBudWxsO1xuICAgIHRoaXMud2luZG93ID0gbnVsbDtcbiAgICB0aGlzLnJlYWwgPSBudWxsO1xuICAgIHRoaXMuaW1hZyA9IG51bGw7XG4gICAgdGhpcy5mZnQgPSBudWxsO1xuXG4gICAgaWYgKCFpc1Bvd2VyT2ZUd28odGhpcy5wYXJhbXMuZ2V0KCdzaXplJykpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmZnRTaXplIG11c3QgYmUgYSBwb3dlciBvZiB0d28nKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG4gICAgLy8gc2V0IHRoZSBvdXRwdXQgZnJhbWUgc2l6ZVxuICAgIGNvbnN0IGluRnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgZmZ0U2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnc2l6ZScpO1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLnBhcmFtcy5nZXQoJ21vZGUnKTtcbiAgICBjb25zdCBub3JtID0gdGhpcy5wYXJhbXMuZ2V0KCdub3JtJyk7XG4gICAgbGV0IHdpbmRvd05hbWUgPSB0aGlzLnBhcmFtcy5nZXQoJ3dpbmRvdycpO1xuICAgIC8vIHdpbmRvdyBgbm9uZWAgYW5kIGByZWN0YW5nbGVgIGFyZSBhbGlhc2VzXG4gICAgaWYgKHdpbmRvd05hbWUgPT09ICdub25lJylcbiAgICAgIHdpbmRvd05hbWUgPSAncmVjdGFuZ2xlJztcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZmdFNpemUgLyAyICsgMTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuICAgIC8vIHNpemUgb2YgdGhlIHdpbmRvdyB0byBhcHBseSBvbiB0aGUgaW5wdXQgZnJhbWVcbiAgICB0aGlzLndpbmRvd1NpemUgPSAoaW5GcmFtZVNpemUgPCBmZnRTaXplKSA/IGluRnJhbWVTaXplIDogZmZ0U2l6ZTtcblxuICAgIC8vIHJlZmVyZW5jZXMgdG8gcG9wdWxhdGUgaW4gdGhlIHdpbmRvdyBmdW5jdGlvbnMgKGNmLiBgaW5pdFdpbmRvd2ApXG4gICAgdGhpcy5ub3JtYWxpemVDb2VmcyA9IHsgbGluZWFyOiAwLCBwb3dlcjogMCB9O1xuICAgIHRoaXMud2luZG93ID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLndpbmRvd1NpemUpO1xuXG4gICAgaW5pdFdpbmRvdyhcbiAgICAgIHdpbmRvd05hbWUsICAgICAgICAgLy8gbmFtZSBvZiB0aGUgd2luZG93XG4gICAgICB0aGlzLndpbmRvdywgICAgICAgIC8vIGJ1ZmZlciBwb3B1bGF0ZWQgd2l0aCB0aGUgd2luZG93IHNpZ25hbFxuICAgICAgdGhpcy53aW5kb3dTaXplLCAgICAvLyBzaXplIG9mIHRoZSB3aW5kb3dcbiAgICAgIHRoaXMubm9ybWFsaXplQ29lZnMgLy8gb2JqZWN0IHBvcHVsYXRlZCB3aXRoIHRoZSBub3JtYWxpemF0aW9uIGNvZWZzXG4gICAgKTtcblxuICAgIGNvbnN0IHsgbGluZWFyLCBwb3dlciB9ID0gdGhpcy5ub3JtYWxpemVDb2VmcztcblxuICAgIHN3aXRjaCAobm9ybSkge1xuICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgIHRoaXMud2luZG93Tm9ybSA9IDE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdsaW5lYXInOlxuICAgICAgICB0aGlzLndpbmRvd05vcm0gPSBsaW5lYXI7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdwb3dlcic6XG4gICAgICAgIHRoaXMud2luZG93Tm9ybSA9IHBvd2VyO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYXV0byc6XG4gICAgICAgIGlmIChtb2RlID09PSAnbWFnbml0dWRlJylcbiAgICAgICAgICB0aGlzLndpbmRvd05vcm0gPSBsaW5lYXI7XG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT09ICdwb3dlcicpXG4gICAgICAgICAgdGhpcy53aW5kb3dOb3JtID0gcG93ZXI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMucmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoZmZ0U2l6ZSk7XG4gICAgdGhpcy5pbWFnID0gbmV3IEZsb2F0MzJBcnJheShmZnRTaXplKTtcbiAgICB0aGlzLmZmdCA9IG5ldyBGZnROYXl1a2koZmZ0U2l6ZSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYEZmdGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gc2lnbmFsIC0gSW5wdXQgdmFsdWVzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBGZnQgb2YgdGhlIGlucHV0IHNpZ25hbC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgZmZ0ID0gbmV3IGxmby5vcGVyYXRvci5GZnQoeyBzaXplOiA1MTIsIHdpbmRvdzogJ2hhbm4nIH0pO1xuICAgKiAvLyBtYW5kYXRvcnkgZm9yIHVzZSBpbiBzdGFuZGFsb25lIG1vZGVcbiAgICogZmZ0LmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAnc2lnbmFsJyB9KTtcbiAgICogZmZ0LmlucHV0U2lnbmFsKHNpZ25hbCk7XG4gICAqL1xuICBpbnB1dFNpZ25hbChzaWduYWwpIHtcbiAgICBjb25zdCBtb2RlID0gdGhpcy5wYXJhbXMuZ2V0KCdtb2RlJyk7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IHRoaXMud2luZG93U2l6ZTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgZmZ0U2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnc2l6ZScpO1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG5cbiAgICAvLyBhcHBseSB3aW5kb3cgb24gdGhlIGlucHV0IHNpZ25hbCBhbmQgcmVzZXQgaW1hZyBidWZmZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvd1NpemU7IGkrKykge1xuICAgICAgdGhpcy5yZWFsW2ldID0gc2lnbmFsW2ldICogdGhpcy53aW5kb3dbaV0gKiB0aGlzLndpbmRvd05vcm07XG4gICAgICB0aGlzLmltYWdbaV0gPSAwO1xuICAgIH1cblxuICAgIC8vIGlmIHJlYWwgaXMgYmlnZ2VyIHRoYW4gaW5wdXQgc2lnbmFsLCBmaWxsIHdpdGggemVyb3NcbiAgICBmb3IgKGxldCBpID0gd2luZG93U2l6ZTsgaSA8IGZmdFNpemU7IGkrKykge1xuICAgICAgdGhpcy5yZWFsW2ldID0gMDtcbiAgICAgIHRoaXMuaW1hZ1tpXSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5mZnQuZm9yd2FyZCh0aGlzLnJlYWwsIHRoaXMuaW1hZyk7XG5cbiAgICBpZiAobW9kZSA9PT0gJ21hZ25pdHVkZScpIHtcbiAgICAgIGNvbnN0IG5vcm0gPSAxIC8gZmZ0U2l6ZTtcblxuICAgICAgLy8gREMgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxEYyA9IHRoaXMucmVhbFswXTtcbiAgICAgIGNvbnN0IGltYWdEYyA9IHRoaXMuaW1hZ1swXTtcbiAgICAgIG91dERhdGFbMF0gPSBzcXJ0KHJlYWxEYyAqIHJlYWxEYyArIGltYWdEYyAqIGltYWdEYykgKiBub3JtO1xuXG4gICAgICAvLyBOcXV5c3QgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxOeSA9IHRoaXMucmVhbFtmZnRTaXplIC8gMl07XG4gICAgICBjb25zdCBpbWFnTnkgPSB0aGlzLmltYWdbZmZ0U2l6ZSAvIDJdO1xuICAgICAgb3V0RGF0YVtmZnRTaXplIC8gMl0gPSBzcXJ0KHJlYWxOeSAqIHJlYWxOeSArIGltYWdOeSAqIGltYWdOeSkgKiBub3JtO1xuXG4gICAgICAvLyBwb3dlciBzcGVjdHJ1bVxuICAgICAgZm9yIChsZXQgaSA9IDEsIGogPSBmZnRTaXplIC0gMTsgaSA8IGZmdFNpemUgLyAyOyBpKyssIGotLSkge1xuICAgICAgICBjb25zdCByZWFsID0gMC41ICogKHRoaXMucmVhbFtpXSArIHRoaXMucmVhbFtqXSk7XG4gICAgICAgIGNvbnN0IGltYWcgPSAwLjUgKiAodGhpcy5pbWFnW2ldIC0gdGhpcy5pbWFnW2pdKTtcblxuICAgICAgICBvdXREYXRhW2ldID0gMiAqIHNxcnQocmVhbCAqIHJlYWwgKyBpbWFnICogaW1hZykgKiBub3JtO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAncG93ZXInKSB7XG4gICAgICBjb25zdCBub3JtID0gMSAvIChmZnRTaXplICogZmZ0U2l6ZSk7XG5cbiAgICAgIC8vIERDIGluZGV4XG4gICAgICBjb25zdCByZWFsRGMgPSB0aGlzLnJlYWxbMF07XG4gICAgICBjb25zdCBpbWFnRGMgPSB0aGlzLmltYWdbMF07XG4gICAgICBvdXREYXRhWzBdID0gKHJlYWxEYyAqIHJlYWxEYyArIGltYWdEYyAqIGltYWdEYykgKiBub3JtO1xuXG4gICAgICAvLyBOcXV5c3QgaW5kZXhcbiAgICAgIGNvbnN0IHJlYWxOeSA9IHRoaXMucmVhbFtmZnRTaXplIC8gMl07XG4gICAgICBjb25zdCBpbWFnTnkgPSB0aGlzLmltYWdbZmZ0U2l6ZSAvIDJdO1xuICAgICAgb3V0RGF0YVtmZnRTaXplIC8gMl0gPSAocmVhbE55ICogcmVhbE55ICsgaW1hZ055ICogaW1hZ055KSAqIG5vcm07XG5cbiAgICAgIC8vIHBvd2VyIHNwZWN0cnVtXG4gICAgICBmb3IgKGxldCBpID0gMSwgaiA9IGZmdFNpemUgLSAxOyBpIDwgZmZ0U2l6ZSAvIDI7IGkrKywgai0tKSB7XG4gICAgICAgIGNvbnN0IHJlYWwgPSAwLjUgKiAodGhpcy5yZWFsW2ldICsgdGhpcy5yZWFsW2pdKTtcbiAgICAgICAgY29uc3QgaW1hZyA9IDAuNSAqICh0aGlzLmltYWdbaV0gLSB0aGlzLmltYWdbal0pO1xuXG4gICAgICAgIG91dERhdGFbaV0gPSA0ICogKHJlYWwgKiByZWFsICsgaW1hZyAqIGltYWcpICogbm9ybTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0RGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGZnQ7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgbm9ybWFsaXplOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIHBvd2VyOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9XG59XG5cbi8qKlxuICogQ29tcHV0ZSB0aGUgbWFnbml0dWRlIG9mIGEgYHZlY3RvcmAgaW5wdXQuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ub3JtYWxpemU9dHJ1ZV0gLSBOb3JtYWxpemUgb3V0cHV0IGFjY29yZGluZyB0b1xuICogIHRoZSB2ZWN0b3Igc2l6ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucG93ZXI9ZmFsc2VdIC0gSWYgdHJ1ZSwgcmV0dXJucyB0aGUgc3F1YXJlZFxuICogIG1hZ25pdHVkZSAocG93ZXIpLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7IGZyYW1lU2l6ZTogMiwgZnJhbWVUeXBlOiAndmVjdG9yJyB9KTtcbiAqIGNvbnN0IG1hZ25pdHVkZSA9IG5ldyBsZm8ub3BlcmF0b3IuTWFnbml0dWRlKCk7XG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgb3V0RnJhbWU6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG1hZ25pdHVkZSk7XG4gKiBtYWduaXR1ZGUuY29ubmVjdChsb2dnZXIpO1xuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMV1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMiwgMl0pO1xuICogPiBbMi44Mjg0MjcxMjQ3NV1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMywgM10pO1xuICogPiBbNC4yNDI2NDA2ODcxMl1cbiAqL1xuY2xhc3MgTWFnbml0dWRlIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX25vcm1hbGl6ZSA9IHRoaXMucGFyYW1zLmdldCgnbm9ybWFsaXplJyk7XG4gICAgdGhpcy5fcG93ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3Bvd2VyJyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ25vcm1hbGl6ZSc6XG4gICAgICAgIHRoaXMuX25vcm1hbGl6ZSA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Bvd2VyJzpcbiAgICAgICAgdGhpcy5fcG93ZXIgPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydtYWduaXR1ZGUnXTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1hZ25pdHVkZWAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxGbG9hdDMyQXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gTWFnbml0dWRlIHZhbHVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1hZ25pdHVkZSA9IG5ldyBsZm8ub3BlcmF0b3IuTWFnbml0dWRlKHsgcG93ZXI6IHRydWUgfSk7XG4gICAqIG1hZ25pdHVkZS5pbml0U3RyZWFtKHsgZnJhbWVUeXBlOiAndmVjdG9yJywgZnJhbWVTaXplOiAzIH0pO1xuICAgKiBtYWduaXR1ZGUuaW5wdXRWZWN0b3IoWzMsIDNdKTtcbiAgICogPiA0LjI0MjY0MDY4NzEyXG4gICAqL1xuICBpbnB1dFZlY3Rvcih2YWx1ZXMpIHtcbiAgICBjb25zdCBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuICAgIGxldCBzdW0gPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgIHN1bSArPSAodmFsdWVzW2ldICogdmFsdWVzW2ldKTtcblxuICAgIGxldCBtYWcgPSBzdW07XG5cbiAgICBpZiAodGhpcy5fbm9ybWFsaXplKVxuICAgICAgbWFnIC89IGxlbmd0aDtcblxuICAgIGlmICghdGhpcy5fcG93ZXIpXG4gICAgICBtYWcgPSBzcXJ0KG1hZyk7XG5cbiAgICByZXR1cm4gbWFnO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGFbMF0gPSB0aGlzLmlucHV0VmVjdG9yKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hZ25pdHVkZTtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IHNxcnQgPSBNYXRoLnNxcnQ7XG5cbi8qKlxuICogQ29tcHV0ZSBtZWFuIGFuZCBzdGFuZGFyZCBkZXZpYXRpb24gb2YgYSBnaXZlbiBgc2lnbmFsYC5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAqXG4gKiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG4gKiAgIC5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9KVxuICogICAudGhlbihpbml0KVxuICogICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbiAqXG4gKiBmdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICogICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiAgIGNvbnN0IGF1ZGlvSW5Ob2RlID0gbmV3IGxmby5zb3VyY2UuQXVkaW9Jbk5vZGUoe1xuICogICAgIHNvdXJjZU5vZGU6IHNvdXJjZSxcbiAqICAgICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqICAgfSk7XG4gKlxuICogICBjb25zdCBtZWFuU3RkZGV2ID0gbmV3IGxmby5vcGVyYXRvci5NZWFuU3RkZGV2KCk7XG4gKlxuICogICBjb25zdCB0cmFjZURpc3BsYXkgPSBuZXcgbGZvLnNpbmsuVHJhY2VEaXNwbGF5KHtcbiAqICAgICBjYW52YXM6ICcjdHJhY2UnLFxuICogICB9KTtcbiAqXG4gKiAgIGF1ZGlvSW5Ob2RlLmNvbm5lY3QobWVhblN0ZGRldik7XG4gKiAgIG1lYW5TdGRkZXYuY29ubmVjdCh0cmFjZURpc3BsYXkpO1xuICogICBhdWRpb0luTm9kZS5zdGFydCgpO1xuICogfVxuICovXG5jbGFzcyBNZWFuU3RkZGV2IGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIC8vIG5vIG9wdGlvbnMgYXZhaWxhYmxlLCBqdXN0IHRocm93IGFuIGVycm9yIGlmIHNvbWUgcGFyYW0gdHJ5IHRvIGJlIHNldC5cbiAgICBzdXBlcih7fSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnbWVhbicsICdzdGRkZXYnXTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoZSBgTWVhblN0ZGRldmAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxGbG9hdDMyQXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNZWFuIGFuZCBzdGFuZGFydCBkZXZpYXRpb24gb2YgdGhlIGlucHV0IHZhbHVlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtZWFuU3RkZGV2ID0gbmV3IGxmby5vcGVyYXRvci5NZWFuU3RkZGV2KCk7XG4gICAqIG1lYW5TdGRkZXYuaW5pdFN0cmVhbSh7IGZyYW1lVHlwZTogJ3ZlY3RvcicsIGZyYW1lU2l6ZTogMTAyNCB9KTtcbiAgICogbWVhblN0ZGRldi5pbnB1dFZlY3Rvcihzb21lU2luZVNpZ25hbCk7XG4gICAqID4gWzAsIDAuNzA3MV1cbiAgICovXG4gIGlucHV0U2lnbmFsKHZhbHVlcykge1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aDtcblxuICAgIGxldCBtZWFuID0gMDtcbiAgICBsZXQgbTIgPSAwO1xuXG4gICAgLy8gY29tcHV0ZSBtZWFuIGFuZCB2YXJpYW5jZSB3aXRoIFdlbGZvcmQgYWxnb3JpdGhtXG4gICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQWxnb3JpdGhtc19mb3JfY2FsY3VsYXRpbmdfdmFyaWFuY2VcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdmFsdWVzW2ldO1xuICAgICAgY29uc3QgZGVsdGEgPSB4IC0gbWVhbjtcbiAgICAgIG1lYW4gKz0gZGVsdGEgLyAoaSArIDEpO1xuICAgICAgbTIgKz0gZGVsdGEgKiAoeCAtIG1lYW4pO1xuICAgIH1cblxuICAgIGNvbnN0IHZhcmlhbmNlID0gbTIgLyAobGVuZ3RoIC0gMSk7XG4gICAgY29uc3Qgc3RkZGV2ID0gc3FydCh2YXJpYW5jZSk7XG5cbiAgICBvdXREYXRhWzBdID0gbWVhbjtcbiAgICBvdXREYXRhWzFdID0gc3RkZGV2O1xuXG4gICAgcmV0dXJuIG91dERhdGE7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRTaWduYWwoZnJhbWUuZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVhblN0ZGRldjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IG1pbiA9IE1hdGgubWluO1xuY29uc3QgbWF4ID0gTWF0aC5tYXg7XG5jb25zdCBwb3cgPSBNYXRoLnBvdztcbmNvbnN0IGxvZzEwID0gTWF0aC5sb2cxMDtcblxuZnVuY3Rpb24gaGVydHpUb01lbEh0ayhmcmVxSHopIHtcbiAgcmV0dXJuIDI1OTUgKiBNYXRoLmxvZzEwKDEgKyAoZnJlcUh6IC8gNzAwKSk7XG59XG5cbmZ1bmN0aW9uIG1lbFRvSGVydHpIdGsoZnJlcU1lbCkge1xuICByZXR1cm4gNzAwICogKE1hdGgucG93KDEwLCBmcmVxTWVsIC8gMjU5NSkgLSAxKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGVzY3JpcHRpb24gb2YgdGhlIHdlaWdodHMgdG8gYXBwbHkgb24gdGhlIGZmdCBiaW5zIGZvciBlYWNoXG4gKiBNZWwgYmFuZCBmaWx0ZXIuXG4gKiBAbm90ZSAtIGFkYXB0ZWQgZnJvbSBpbXRyLXRvb2xzL3J0YVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuYnJCaW5zIC0gTnVtYmVyIG9mIGZmdCBiaW5zLlxuICogQHBhcmFtIHtOdW1iZXJ9IG5ickZpbHRlciAtIE51bWJlciBvZiBtZWwgZmlsdGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBzYW1wbGVSYXRlIC0gU2FtcGxlIFJhdGUgb2YgdGhlIHNpZ25hbC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW5GcmVxIC0gTWluaW11bSBGcmVxdWVuY3kgdG8gYmUgY29uc2lkZXJlcmVkLlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heEZyZXEgLSBNYXhpbXVtIGZyZXF1ZW5jeSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5PE9iamVjdD59IC0gRGVzY3JpcHRpb24gb2YgdGhlIHdlaWdodHMgdG8gYXBwbHkgb24gdGhlIGJpbnMgZm9yXG4gKiAgZWFjaCBtZWwgZmlsdGVyLiBFYWNoIGRlc2NyaXB0aW9uIGhhcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcbiAqICB7IHN0YXJ0SW5kZXg6IGJpbkluZGV4LCBjZW50ZXJGcmVxOiBiaW5DZW50ZXJGcmVxdWVuY3ksIHdlaWdodHM6IFtdIH1cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRNZWxCYW5kV2VpZ2h0cyhuYnJCaW5zLCBuYnJCYW5kcywgc2FtcGxlUmF0ZSwgbWluRnJlcSwgbWF4RnJlcSwgdHlwZSA9ICdodGsnKSB7XG5cbiAgbGV0IGhlcnR6VG9NZWwgPSBudWxsO1xuICBsZXQgbWVsVG9IZXJ0eiA9IG51bGw7XG4gIGxldCBtaW5NZWw7XG4gIGxldCBtYXhNZWw7XG5cbiAgaWYgKHR5cGUgPT09ICdodGsnKSB7XG4gICAgaGVydHpUb01lbCA9IGhlcnR6VG9NZWxIdGs7XG4gICAgbWVsVG9IZXJ0eiA9IG1lbFRvSGVydHpIdGs7XG4gICAgbWluTWVsID0gaGVydHpUb01lbChtaW5GcmVxKTtcbiAgICBtYXhNZWwgPSBoZXJ0elRvTWVsKG1heEZyZXEpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtZWwgYmFuZCB0eXBlOiBcIiR7dHlwZX1cImApO1xuICB9XG5cbiAgY29uc3QgbWVsQmFuZERlc2NyaXB0aW9ucyA9IG5ldyBBcnJheShuYnJCYW5kcyk7XG4gIC8vIGNlbnRlciBmcmVxdWVuY2llcyBvZiBGZnQgYmluc1xuICBjb25zdCBmZnRGcmVxcyA9IG5ldyBGbG9hdDMyQXJyYXkobmJyQmlucyk7XG4gIC8vIGNlbnRlciBmcmVxdWVuY2llcyBvZiBtZWwgYmFuZHMgLSB1bmlmb3JtbHkgc3BhY2VkIGluIG1lbCBkb21haW4gYmV0d2VlblxuICAvLyBsaW1pdHMsIHRoZXJlIGFyZSAyIG1vcmUgZnJlcXVlbmNpZXMgdGhhbiB0aGUgYWN0dWFsIG51bWJlciBvZiBmaWx0ZXJzIGluXG4gIC8vIG9yZGVyIHRvIGNhbGN1bGF0ZSB0aGUgc2xvcGVzXG4gIGNvbnN0IGZpbHRlckZyZXFzID0gbmV3IEZsb2F0MzJBcnJheShuYnJCYW5kcyArIDIpO1xuXG4gIGNvbnN0IGZmdFNpemUgPSAobmJyQmlucyAtIDEpICogMjtcbiAgLy8gY29tcHV0ZSBiaW5zIGNlbnRlciBmcmVxdWVuY2llc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ickJpbnM7IGkrKylcbiAgICBmZnRGcmVxc1tpXSA9IHNhbXBsZVJhdGUgKiBpIC8gZmZ0U2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5ickJhbmRzICsgMjsgaSsrKVxuICAgIGZpbHRlckZyZXFzW2ldID0gbWVsVG9IZXJ0eihtaW5NZWwgKyBpIC8gKG5ickJhbmRzICsgMSkgKiAobWF4TWVsIC0gbWluTWVsKSk7XG5cbiAgLy8gbG9vcCB0aHJvdWdodCBmaWx0ZXJzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHM7IGkrKykge1xuICAgIGxldCBtaW5XZWlnaHRJbmRleERlZmluZWQgPSAwO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB7XG4gICAgICBzdGFydEluZGV4OiBudWxsLFxuICAgICAgY2VudGVyRnJlcTogbnVsbCxcbiAgICAgIHdlaWdodHM6IFtdLFxuICAgIH1cblxuICAgIC8vIGRlZmluZSBjb250cmlidXRpb24gb2YgZWFjaCBiaW4gZm9yIHRoZSBmaWx0ZXIgYXQgaW5kZXggKGkgKyAxKVxuICAgIC8vIGRvIG5vdCBwcm9jZXNzIHRoZSBsYXN0IHNwZWN0cnVtIGNvbXBvbmVudCAoTnlxdWlzdClcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ickJpbnMgLSAxOyBqKyspIHtcbiAgICAgIGNvbnN0IHBvc1Nsb3BlQ29udHJpYiA9IChmZnRGcmVxc1tqXSAtIGZpbHRlckZyZXFzW2ldKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVyRnJlcXNbaSsxXSAtIGZpbHRlckZyZXFzW2ldKTtcblxuICAgICAgY29uc3QgbmVnU2xvcGVDb250cmliID0gKGZpbHRlckZyZXFzW2krMl0gLSBmZnRGcmVxc1tqXSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpbHRlckZyZXFzW2krMl0gLSBmaWx0ZXJGcmVxc1tpKzFdKTtcbiAgICAgIC8vIGxvd2VyU2xvcGUgYW5kIHVwcGVyIHNsb3BlIGludGVyc2VjdCBhdCB6ZXJvIGFuZCB3aXRoIGVhY2ggb3RoZXJcbiAgICAgIGNvbnN0IGNvbnRyaWJ1dGlvbiA9IG1heCgwLCBtaW4ocG9zU2xvcGVDb250cmliLCBuZWdTbG9wZUNvbnRyaWIpKTtcblxuICAgICAgaWYgKGNvbnRyaWJ1dGlvbiA+IDApIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnN0YXJ0SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICBkZXNjcmlwdGlvbi5zdGFydEluZGV4ID0gajtcbiAgICAgICAgICBkZXNjcmlwdGlvbi5jZW50ZXJGcmVxID0gZmlsdGVyRnJlcXNbaSsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaXB0aW9uLndlaWdodHMucHVzaChjb250cmlidXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVtcHR5IGZpbHRlclxuICAgIGlmIChkZXNjcmlwdGlvbi5zdGFydEluZGV4ID09PSBudWxsKSB7XG4gICAgICBkZXNjcmlwdGlvbi5zdGFydEluZGV4ID0gMDtcbiAgICAgIGRlc2NyaXB0aW9uLmNlbnRlckZyZXEgPSAwO1xuICAgIH1cblxuICAgIC8vIEB0b2RvIC0gZG8gc29tZSBzY2FsaW5nIGZvciBTbGFuZXktc3R5bGUgbWVsXG4gICAgbWVsQmFuZERlc2NyaXB0aW9uc1tpXSA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgcmV0dXJuIG1lbEJhbmREZXNjcmlwdGlvbnM7XG59XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGxvZzoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBuYnJCYW5kczoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAyNCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIG1heEZyZXE6IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBtZWwgYmFuZHMgc3BlY3RydW0gZnJvbSBhIGdpdmVuIHNwZWN0cnVtIChgdmVjdG9yYCB0eXBlKS5cbiAqIF9JbXBsZW1lbnQgdGhlIGBodGtgIG1lbCBiYW5kIHN0eWxlLl9cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubG9nPWZhbHNlXSAtIEFwcGx5IGEgbG9nYXJpdGhtaWMgc2NhbGUgb24gdGhlIG91dHB1dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5uYnJCYW5kcz0yNF0gLSBOdW1iZXIgb2YgZmlsdGVycyBkZWZpbmluZyB0aGUgbWVsXG4gKiAgYmFuZHMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluRnJlcT0wXSAtIE1pbmltdW0gZnJlcXVlbmN5IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heEZyZXE9bnVsbF0gLSBNYXhpbXVtIGZyZXF1ZW5jeSB0byBjb25zaWRlci5cbiAqICBJZiBgbnVsbGAsIGlzIHNldCB0byBOeXF1aXN0IGZyZXF1ZW5jeS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wb3dlcj0xXSAtIEFwcGx5IGEgcG93ZXIgc2NhbGluZyBvbiBlYWNoIG1lbCBiYW5kLlxuICpcbiAqIEB0b2RvIC0gaW1wbGVtZW50IFNsYW5leSBzdHlsZSBtZWwgYmFuZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGxmbyBmcm9tICd3YXZlcy1sZm8vbm9kZSdcbiAqXG4gKiAvLyByZWFkIGEgZmlsZSBmcm9tIHBhdGggKG5vZGUgb25seSBzb3VyY2UpXG4gKiBjb25zdCBhdWRpb0luRmlsZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5GaWxlKHtcbiAqICAgZmlsZW5hbWU6ICdwYXRoL3RvL2ZpbGUnLFxuICogICBmcmFtZVNpemU6IDUxMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiAgIGhvcFNpemU6IDI1NixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGZmdCA9IG5ldyBsZm8ub3BlcmF0b3IuRmZ0KHtcbiAqICAgc2l6ZTogMTAyNCxcbiAqICAgd2luZG93OiAnaGFubicsXG4gKiAgIG1vZGU6ICdwb3dlcicsXG4gKiAgIG5vcm06ICdwb3dlcicsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtZWwgPSBuZXcgbGZvLm9wZXJhdG9yLk1lbCh7XG4gKiAgIGxvZzogdHJ1ZSxcbiAqICAgbmJyQmFuZHM6IDI0LFxuICogfSk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogYXVkaW9JbkZpbGUuY29ubmVjdChzbGljZXIpO1xuICogc2xpY2VyLmNvbm5lY3QoZmZ0KTtcbiAqIGZmdC5jb25uZWN0KG1lbCk7XG4gKiBtZWwuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5GaWxlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIE1lbCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgbmJyQmlucyA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG5ickJhbmRzID0gdGhpcy5wYXJhbXMuZ2V0KCduYnJCYW5kcycpO1xuICAgIGNvbnN0IHNhbXBsZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlO1xuICAgIGNvbnN0IG1pbkZyZXEgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbkZyZXEnKTtcbiAgICBsZXQgbWF4RnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWF4RnJlcScpO1xuXG4gICAgLy9cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBuYnJCYW5kcztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgaWYgKG1heEZyZXEgPT09IG51bGwpXG4gICAgICBtYXhGcmVxID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSAvIDI7XG5cbiAgICB0aGlzLm1lbEJhbmREZXNjcmlwdGlvbnMgPSBnZXRNZWxCYW5kV2VpZ2h0cyhuYnJCaW5zLCBuYnJCYW5kcywgc2FtcGxlUmF0ZSwgbWluRnJlcSwgbWF4RnJlcSk7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1lbGAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gc3BlY3RydW0gLSBGZnQgYmlucy5cbiAgICogQHJldHVybiB7QXJyYXl9IC0gTWVsIGJhbmRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBtZWwgPSBuZXcgbGZvLm9wZXJhdG9yLk1lbCh7IG5ickJhbmRzOiAyNCB9KTtcbiAgICogLy8gbWFuZGF0b3J5IGZvciB1c2UgaW4gc3RhbmRhbG9uZSBtb2RlXG4gICAqIG1lbC5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiAyNTYsIGZyYW1lVHlwZTogJ3ZlY3RvcicgfSk7XG4gICAqIG1lbC5pbnB1dFZlY3RvcihmZnRCaW5zKTtcbiAgICovXG4gIGlucHV0VmVjdG9yKGJpbnMpIHtcblxuICAgIGNvbnN0IHBvd2VyID0gdGhpcy5wYXJhbXMuZ2V0KCdwb3dlcicpO1xuICAgIGNvbnN0IGxvZyA9IHRoaXMucGFyYW1zLmdldCgnbG9nJyk7XG4gICAgY29uc3QgbWVsQmFuZHMgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3QgbmJyQmFuZHMgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgbGV0IHNjYWxlID0gMTtcblxuICAgIGNvbnN0IG1pbkxvZ1ZhbHVlID0gMWUtNDg7XG4gICAgY29uc3QgbWluTG9nID0gLTQ4MDtcblxuICAgIGlmIChsb2cpXG4gICAgICBzY2FsZSAqPSBuYnJCYW5kcztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQmFuZHM7IGkrKykge1xuICAgICAgY29uc3QgeyBzdGFydEluZGV4LCB3ZWlnaHRzIH0gPSB0aGlzLm1lbEJhbmREZXNjcmlwdGlvbnNbaV07XG4gICAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdlaWdodHMubGVuZ3RoOyBqKyspXG4gICAgICAgIHZhbHVlICs9IHdlaWdodHNbal0gKiBiaW5zW3N0YXJ0SW5kZXggKyBqXTtcblxuICAgICAgLy8gYXBwbHkgc2FtZSBsb2dpYyBhcyBpbiBQaVBvQmFuZHNcbiAgICAgIGlmIChzY2FsZSAhPT0gMSlcbiAgICAgICAgdmFsdWUgKj0gc2NhbGU7XG5cbiAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgaWYgKHZhbHVlID4gbWluTG9nVmFsdWUpXG4gICAgICAgICAgdmFsdWUgPSAxMCAqIGxvZzEwKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHZhbHVlID0gbWluTG9nO1xuICAgICAgfVxuXG4gICAgICBpZiAocG93ZXIgIT09IDEpXG4gICAgICAgIHZhbHVlID0gcG93KHZhbHVlLCBwb3dlcik7XG5cbiAgICAgIG1lbEJhbmRzW2ldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbEJhbmRzO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NWZWN0b3IoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0VmVjdG9yKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lbDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uL2NvcmUvQmFzZUxmbyc7XG5pbXBvcnQgRmZ0IGZyb20gJy4vRmZ0JztcbmltcG9ydCBNZWwgZnJvbSAnLi9NZWwnO1xuaW1wb3J0IERjdCBmcm9tICcuL0RjdCc7XG5cblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG5ickJhbmRzOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDI0LFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbmJyQ29lZnM6IHtcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogMTIsXG4gICAgbWV0YTogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGE6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgbWF4RnJlcToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBNZmNjIG9mIHRoZSBpbmNvbW1pbmcgYHNpZ25hbGAuIElzIGJhc2ljYWxseSBhIHdyYXBwZXIgYXJvdW5kXG4gKiBbYEZmdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fSwgW2BNZWxgXXtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLk1lbH1cbiAqIGFuZCBbYERjdGBde0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRGN0fS5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7bmJyQmFuZHN9IFtvcHRpb25zLm5ickJhbmRzPTI0XSAtIE51bWJlciBvZiBNZWwgYmFuZHMuXG4gKiBAcGFyYW0ge25ickNvZWZzfSBbb3B0aW9ucy5uYnJDb2Vmcz0xMl0gLSBOdW1iZXIgb2Ygb3V0cHV0IGNvZWZzLlxuICpcbiAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24ub3BlcmF0b3IuRmZ0fVxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5vcGVyYXRvci5NZWx9XG4gKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yLkRjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGxmbyBmcm9tICd3YXZlcy1sZm8vbm9kZSdcbiAqXG4gKiBjb25zdCBhdWRpb0luRmlsZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5GaWxlKHtcbiAqICAgZmlsZW5hbWU6ICdwYXRoL3RvL2ZpbGUnLFxuICogICBmcmFtZVNpemU6IDUxMixcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiAyNTYsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKHtcbiAqICAgbmJyQmFuZHM6IDI0LFxuICogICBuYnJDb2VmczogMTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBhdWRpb0luRmlsZS5jb25uZWN0KHNsaWNlcik7XG4gKiBzbGljZXIuY29ubmVjdChtZmNjKTtcbiAqIG1mY2MuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5GaWxlLnN0YXJ0KCk7XG4gKi9cbmNsYXNzIE1mY2MgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBuYnJCYW5kcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQmFuZHMnKTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcbiAgICBjb25zdCBtaW5GcmVxID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5GcmVxJyk7XG4gICAgY29uc3QgbWF4RnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWF4RnJlcScpO1xuICAgIGNvbnN0IGlucHV0RnJhbWVTaXplID0gcHJldlN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3QgaW5wdXRGcmFtZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lUmF0ZTtcbiAgICBjb25zdCBpbnB1dFNhbXBsZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgbmJyQmlucyA9IGlucHV0RnJhbWVTaXplIC8gMiArIDE7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBuYnJDb2VmcztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSAndmVjdG9yJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgdGhpcy5mZnQgPSBuZXcgRmZ0KHtcbiAgICAgIHdpbmRvdzogJ2hhbm4nLFxuICAgICAgbW9kZTogJ3Bvd2VyJyxcbiAgICAgIG5vcm06ICdwb3dlcicsXG4gICAgICBzaXplOiBpbnB1dEZyYW1lU2l6ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubWVsID0gbmV3IE1lbCh7XG4gICAgICBuYnJCYW5kczogbmJyQmFuZHMsXG4gICAgICBsb2c6IHRydWUsXG4gICAgICBwb3dlcjogMSxcbiAgICAgIG1pbkZyZXE6IG1pbkZyZXEsXG4gICAgICBtYXhGcmVxOiBtYXhGcmVxLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kY3QgPSBuZXcgRGN0KHtcbiAgICAgIG9yZGVyOiBuYnJDb2VmcyxcbiAgICB9KTtcblxuICAgIC8vIGluaXQgc3RyZWFtc1xuICAgIHRoaXMuZmZ0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAnc2lnbmFsJyxcbiAgICAgIGZyYW1lU2l6ZTogaW5wdXRGcmFtZVNpemUsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5tZWwuaW5pdFN0cmVhbSh7XG4gICAgICBmcmFtZVR5cGU6ICd2ZWN0b3InLFxuICAgICAgZnJhbWVTaXplOiBuYnJCaW5zLFxuICAgICAgZnJhbWVSYXRlOiBpbnB1dEZyYW1lUmF0ZSxcbiAgICAgIHNvdXJjZVNhbXBsZVJhdGU6IGlucHV0U2FtcGxlUmF0ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuZGN0LmluaXRTdHJlYW0oe1xuICAgICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAgICAgIGZyYW1lU2l6ZTogbmJyQmFuZHMsXG4gICAgICBmcmFtZVJhdGU6IGlucHV0RnJhbWVSYXRlLFxuICAgICAgc291cmNlU2FtcGxlUmF0ZTogaW5wdXRTYW1wbGVSYXRlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNZmNjYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGEgZ3JhcGgpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gU2lnbmFsIGNodW5rIHRvIGFuYWx5c2UuXG4gICAqIEByZXR1cm4ge0FycmF5fSAtIE1mY2MgY29lZmZpY2llbnRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBtZmNjID0gbmV3IGxmby5vcGVyYXRvci5NZmNjKCk7XG4gICAqIC8vIG1hbmRhdG9yeSBmb3IgdXNlIGluIHN0YW5kYWxvbmUgbW9kZVxuICAgKiBtZmNjLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDI1NiwgZnJhbWVUeXBlOiAndmVjdG9yJyB9KTtcbiAgICogbWZjYy5pbnB1dFNpZ25hbChzaWduYWwpO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoZGF0YSkge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBuYnJDb2VmcyA9IHRoaXMucGFyYW1zLmdldCgnbmJyQ29lZnMnKTtcblxuICAgIGNvbnN0IGJpbnMgPSB0aGlzLmZmdC5pbnB1dFNpZ25hbChkYXRhKTtcbiAgICBjb25zdCBtZWxCYW5kcyA9IHRoaXMubWVsLmlucHV0VmVjdG9yKGJpbnMpO1xuICAgIC8vIGNvbnNvbGUubG9nKG1lbEJhbmRzKTtcbiAgICBjb25zdCBjb2VmcyA9IHRoaXMuZGN0LmlucHV0U2lnbmFsKG1lbEJhbmRzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJyQ29lZnM7IGkrKylcbiAgICAgIG91dHB1dFtpXSA9IGNvZWZzW2ldO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZmNjO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuLyoqXG4gKiBGaW5kIG1pbmltdW4gYW5kIG1heGltdW0gdmFsdWVzIG9mIGEgZ2l2ZW4gYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogNTEyLFxuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBzYW1wbGVSYXRlOiAwLFxuICogfSk7XG4gKlxuICogY29uc3QgbWluTWF4ID0gbmV3IGxmby5vcGVyYXRvci5NaW5NYXgoKTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobWluTWF4KTtcbiAqIG1pbk1heC5jb25uZWN0KGxvZ2dlcik7XG4gKiBldmVudEluLnN0YXJ0KClcbiAqXG4gKiAvLyBjcmVhdGUgYSBmcmFtZVxuICogY29uc3Qgc2lnbmFsID0gbmV3IEZsb2F0MzJBcnJheSg1MTIpO1xuICogZm9yIChsZXQgaSA9IDA7IGkgPCA1MTI7IGkrKylcbiAqICAgc2lnbmFsW2ldID0gaSArIDE7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIHNpZ25hbCk7XG4gKiA+IFsxLCA1MTJdO1xuICovXG5jbGFzcyBNaW5NYXggZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gdGhyb3cgZXJyb3JzIGlmIG9wdGlvbnMgYXJlIGdpdmVuXG4gICAgc3VwZXIoe30sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyA9IHt9KSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnbWluJywgJ21heCddO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNaW5NYXhgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYSBncmFwaCkuXG4gICAqXG4gICAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fEFycmF5fSBkYXRhIC0gSW5wdXQgc2lnbmFsLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBNaW4gYW5kIG1heCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG1pbk1heCA9IG5ldyBNaW5NYXgoKTtcbiAgICogbWluTWF4LmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwIH0pO1xuICAgKlxuICAgKiBtaW5NYXguaW5wdXRTaWduYWwoWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKTtcbiAgICogPiBbMCwgNV1cbiAgICovXG4gIGlucHV0U2lnbmFsKGRhdGEpIHtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgbGV0IG1heCA9IC1JbmZpbml0eTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtpXTtcbiAgICAgIGlmICh2YWx1ZSA8IG1pbikgbWluID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUgPiBtYXgpIG1heCA9IHZhbHVlO1xuICAgIH1cblxuICAgIG91dERhdGFbMF0gPSBtaW47XG4gICAgb3V0RGF0YVsxXSA9IG1heDtcblxuICAgIHJldHVybiBvdXREYXRhO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pbk1heDtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uL2NvcmUvQmFzZUxmbyc7XG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBtaW46IDEsXG4gICAgbWF4OiAxZTksXG4gICAgZGVmYXVsdDogMTAsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH1cbiAgfSxcbiAgZmlsbDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgbWluOiAtSW5maW5pdHksXG4gICAgbWF4OiArSW5maW5pdHksXG4gICAgZGVmYXVsdDogMCxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQ29tcHV0ZSBhIG1vdmluZyBhdmVyYWdlIG9wZXJhdGlvbiBvbiB0aGUgaW5jb21taW5nIGZyYW1lcyAoYHNjYWxhcmAgb3JcbiAqIGB2ZWN0b3JgIHR5cGUpLiBJZiB0aGUgaW5wdXQgaXMgb2YgdHlwZSB2ZWN0b3IsIHRoZSBtb3ZpbmcgYXZlcmFnZSBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9MTBdIC0gTnVtYmVyIG9mIHN1Y2Nlc3NpdmUgdmFsdWVzIG9uIHdoaWNoXG4gKiAgdGhlIGF2ZXJhZ2UgaXMgY29tcHV0ZWQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLlxuICpcbiAqIEB0b2RvIC0gSW1wbGVtZW50IGBwcm9jZXNzU2lnbmFsYCA/XG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJ1xuICogfSk7XG4gKlxuICogY29uc3QgbW92aW5nQXZlcmFnZSA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nQXZlcmFnZSh7XG4gKiAgIG9yZGVyOiA1LFxuICogICBmaWxsOiAwXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nQXZlcmFnZSk7XG4gKiBtb3ZpbmdBdmVyYWdlLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjIsIDAuMl1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMC40LCAwLjRdXG4gKiBldmVudEluLnByb2Nlc3MobnVsbCwgWzEsIDFdKTtcbiAqID4gWzAuNiwgMC42XVxuICogZXZlbnRJbi5wcm9jZXNzKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLjgsIDAuOF1cbiAqIGV2ZW50SW4ucHJvY2VzcyhudWxsLCBbMSwgMV0pO1xuICogPiBbMSwgMV1cbiAqL1xuY2xhc3MgTW92aW5nQXZlcmFnZSBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnN1bSA9IG51bGw7XG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgb25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpIHtcbiAgICBzdXBlci5vblBhcmFtVXBkYXRlKG5hbWUsIHZhbHVlLCBtZXRhcyk7XG5cbiAgICAvLyBAdG9kbyAtIHNob3VsZCBiZSBkb25lIGxhemlseSBpbiBwcm9jZXNzXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcblxuICAgIHRoaXMucmluZ0J1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkob3JkZXIgKiBmcmFtZVNpemUpO1xuXG4gICAgaWYgKGZyYW1lU2l6ZSA+IDEpXG4gICAgICB0aGlzLnN1bSA9IG5ldyBGbG9hdDMyQXJyYXkoZnJhbWVTaXplKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnN1bSA9IDA7XG5cbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlc2V0U3RyZWFtKCkge1xuICAgIHN1cGVyLnJlc2V0U3RyZWFtKCk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBmaWxsID0gdGhpcy5wYXJhbXMuZ2V0KCdmaWxsJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nTGVuZ3RoID0gcmluZ0J1ZmZlci5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJpbmdMZW5ndGg7IGkrKylcbiAgICAgIHJpbmdCdWZmZXJbaV0gPSBmaWxsO1xuXG4gICAgY29uc3QgZmlsbFN1bSA9IG9yZGVyICogZmlsbDtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG5cbiAgICBpZiAoZnJhbWVTaXplID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVNpemU7IGkrKylcbiAgICAgICAgdGhpcy5zdW1baV0gPSBmaWxsU3VtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bSA9IGZpbGxTdW07XG4gICAgfVxuXG4gICAgdGhpcy5yaW5nSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIodmFsdWUpIHtcbiAgICB0aGlzLmZyYW1lLmRhdGFbMF0gPSB0aGlzLmlucHV0U2NhbGFyKGZyYW1lLmRhdGFbMF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYE1vdmluZ0F2ZXJhZ2VgIG9wZXJhdG9yIGluIGBzdGFuZGFsb25lYCBtb2RlIChpLmUuIG91dHNpZGUgb2YgYVxuICAgKiBncmFwaCkgd2l0aCBhIGBzY2FsYXJgIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBmZWVkIHRoZSBtb3ZpbmcgYXZlcmFnZSB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gQXZlcmFnZSB2YWx1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMSwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjJcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjRcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwLjZcbiAgICovXG4gIGlucHV0U2NhbGFyKHZhbHVlKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0luZGV4ID0gdGhpcy5yaW5nSW5kZXg7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBsZXQgc3VtID0gdGhpcy5zdW07XG5cbiAgICBzdW0gLT0gcmluZ0J1ZmZlcltyaW5nSW5kZXhdO1xuICAgIHN1bSArPSB2YWx1ZTtcblxuICAgIHRoaXMuc3VtID0gc3VtO1xuICAgIHRoaXMucmluZ0J1ZmZlcltyaW5nSW5kZXhdID0gdmFsdWU7XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBzdW0gLyBvcmRlcjtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKGZyYW1lKSB7XG4gICAgdGhpcy5pbnB1dFZlY3RvcihmcmFtZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhlIGBNb3ZpbmdBdmVyYWdlYCBvcGVyYXRvciBpbiBgc3RhbmRhbG9uZWAgbW9kZSAoaS5lLiBvdXRzaWRlIG9mIGFcbiAgICogZ3JhcGgpIHdpdGggYSBgdmVjdG9yYCBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIC0gVmFsdWVzIHRvIGZlZWQgdGhlIG1vdmluZyBhdmVyYWdlIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBBdmVyYWdlIHZhbHVlIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdBdmVyYWdlID0gbmV3IGxmby5vcGVyYXRvci5Nb3ZpbmdBdmVyYWdlKHsgb3JkZXI6IDUgfSk7XG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbSh7IGZyYW1lU2l6ZTogMiwgZnJhbWVUeXBlOiAnc2NhbGFyJyB9KTtcbiAgICpcbiAgICogbW92aW5nQXZlcmFnZS5pbnB1dEFycmF5KFsxLCAxXSk7XG4gICAqID4gWzAuMiwgMC4yXVxuICAgKiBtb3ZpbmdBdmVyYWdlLmlucHV0QXJyYXkoWzEsIDFdKTtcbiAgICogPiBbMC40LCAwLjRdXG4gICAqIG1vdmluZ0F2ZXJhZ2UuaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLjYsIDAuNl1cbiAgICovXG4gIGlucHV0VmVjdG9yKHZhbHVlcykge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCByaW5nT2Zmc2V0ID0gcmluZ0luZGV4ICogZnJhbWVTaXplO1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5zdW07XG4gICAgY29uc3Qgc2NhbGUgPSAxIC8gb3JkZXI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCByaW5nQnVmZmVySW5kZXggPSByaW5nT2Zmc2V0ICsgaTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgbGV0IGxvY2FsU3VtID0gc3VtW2ldO1xuXG4gICAgICBsb2NhbFN1bSAtPSByaW5nQnVmZmVyW3JpbmdCdWZmZXJJbmRleF07XG4gICAgICBsb2NhbFN1bSArPSB2YWx1ZTtcblxuICAgICAgdGhpcy5zdW1baV0gPSBsb2NhbFN1bTtcbiAgICAgIG91dEZyYW1lW2ldID0gbG9jYWxTdW0gKiBzY2FsZTtcbiAgICAgIHJpbmdCdWZmZXJbcmluZ0J1ZmZlckluZGV4XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMucmluZ0luZGV4ID0gKHJpbmdJbmRleCArIDEpICUgb3JkZXI7XG5cbiAgICByZXR1cm4gb3V0RnJhbWU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG5cbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBsZXQgdGltZSA9IGZyYW1lLnRpbWU7XG4gICAgLy8gc2hpZnQgdGltZSB0byB0YWtlIGFjY291bnQgb2YgdGhlIGFkZGVkIGxhdGVuY3lcbiAgICBpZiAodGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSlcbiAgICAgIHRpbWUgLT0gKDAuNSAqIChvcmRlciAtIDEpIC8gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZSk7XG5cbiAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aW1lO1xuICAgIHRoaXMuZnJhbWUubWV0YWRhdGEgPSBmcmFtZS5tZXRhZGF0YTtcblxuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdBdmVyYWdlO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIG9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIG1pbjogMSxcbiAgICBtYXg6IDFlOSxcbiAgICBkZWZhdWx0OiA5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxuICBmaWxsOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBtaW46IC1JbmZpbml0eSxcbiAgICBtYXg6ICtJbmZpbml0eSxcbiAgICBkZWZhdWx0OiAwLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIGEgbW92aW5nIG1lZGlhbiBvcGVyYXRpb24gb24gdGhlIGluY29tbWluZyBmcmFtZXMgKGBzY2FsYXJgIG9yXG4gKiBgdmVjdG9yYCB0eXBlKS4gSWYgdGhlIGlucHV0IGlzIG9mIHR5cGUgdmVjdG9yLCB0aGUgbW92aW5nIG1lZGlhbiBpc1xuICogY29tcHV0ZWQgZm9yIGVhY2ggZGltZW5zaW9uIGluIHBhcmFsbGVsLiBJZiB0aGUgc291cmNlIHNhbXBsZSByYXRlIGlzIGRlZmluZWRcbiAqIGZyYW1lIHRpbWUgaXMgc2hpZnRlZCB0byB0aGUgbWlkZGxlIG9mIHRoZSB3aW5kb3cgZGVmaW5lZCBieSB0aGUgb3JkZXIuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMub3JkZXI9OV0gLSBOdW1iZXIgb2Ygc3VjY2Vzc2l2ZSB2YWx1ZXMgaW4gd2hpY2hcbiAqICB0aGUgbWVkaWFuIGlzIHNlYXJjaGVkLiBUaGlzIHZhbHVlIG11c3QgYmUgb2RkLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZmlsbD0wXSAtIFZhbHVlIHRvIGZpbGwgdGhlIHJpbmcgYnVmZmVyIHdpdGggYmVmb3JlXG4gKiAgdGhlIGZpcnN0IGlucHV0IGZyYW1lLiBfZHluYW1pYyBwYXJhbWV0ZXJfXG4gKlxuICogQHRvZG8gLSBJbXBsZW1lbnQgYHByb2Nlc3NTaWduYWxgXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBsZm8ub3BlcmF0b3IuTW92aW5nTWVkaWFuKHtcbiAqICAgb3JkZXI6IDUsXG4gKiAgIGZpbGw6IDAsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBsb2dnZXIgPSBuZXcgbGZvLnNpbmsuTG9nZ2VyKHsgZGF0YTogdHJ1ZSB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QobW92aW5nTWVkaWFuKTtcbiAqIG1vdmluZ01lZGlhbi5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFsxLCAxXSk7XG4gKiA+IFswLCAwXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzIsIDJdKTtcbiAqID4gWzAsIDBdXG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShudWxsLCBbMywgM10pO1xuICogPiBbMSwgMV1cbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKG51bGwsIFs0LCA0XSk7XG4gKiA+IFsyLCAyXVxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUobnVsbCwgWzUsIDVdKTtcbiAqID4gWzMsIDNdXG4gKi9cbmNsYXNzIE1vdmluZ01lZGlhbiBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLnJpbmdCdWZmZXIgPSBudWxsO1xuICAgIHRoaXMuc29ydGVyID0gbnVsbDtcbiAgICB0aGlzLnJpbmdJbmRleCA9IDA7XG5cbiAgICB0aGlzLl9lbnN1cmVPZGRPcmRlcigpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9lbnN1cmVPZGRPcmRlcigpIHtcbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpICUgMiA9PT0gMClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSAke29yZGVyfSBmb3IgcGFyYW0gXCJvcmRlclwiIC0gc2hvdWxkIGJlIG9kZGApO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdvcmRlcic6XG4gICAgICAgIHRoaXMuX2Vuc3VyZU9kZE9yZGVyKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc1N0cmVhbVBhcmFtcygpO1xuICAgICAgICB0aGlzLnJlc2V0U3RyZWFtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgIHRoaXMucmVzZXRTdHJlYW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICAvLyBvdXRUeXBlIGlzIHNpbWlsYXIgdG8gaW5wdXQgdHlwZVxuXG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuXG4gICAgdGhpcy5yaW5nQnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG4gICAgdGhpcy5zb3J0QnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShmcmFtZVNpemUgKiBvcmRlcik7XG5cbiAgICB0aGlzLm1pbkluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoZnJhbWVTaXplKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVzZXRTdHJlYW0oKSB7XG4gICAgc3VwZXIucmVzZXRTdHJlYW0oKTtcblxuICAgIGNvbnN0IGZpbGwgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZpbGwnKTtcbiAgICBjb25zdCByaW5nQnVmZmVyID0gdGhpcy5yaW5nQnVmZmVyO1xuICAgIGNvbnN0IHJpbmdMZW5ndGggPSByaW5nQnVmZmVyLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmluZ0xlbmd0aDsgaSsrKVxuICAgICAgdGhpcy5yaW5nQnVmZmVyW2ldID0gZmlsbDtcblxuICAgIHRoaXMucmluZ0luZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2NhbGFyKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNjYWxhcihmcmFtZS5kYXRhWzBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3MgZm9yIHRoZSB1c2Ugb2YgYSBgTW92aW5nTWVkaWFuYCBvdXRzaWRlIGEgZ3JhcGggKGUuZy4gaW5zaWRlXG4gICAqIGFub3RoZXIgbm9kZSksIGluIHRoaXMgY2FzZSBgcHJvY2Vzc1N0cmVhbVBhcmFtc2AgYW5kIGByZXNldFN0cmVhbWBcbiAgICogc2hvdWxkIGJlIGNhbGxlZCBtYW51YWxseSBvbiB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gZmVlZCB0aGUgbW92aW5nIG1lZGlhbiB3aXRoLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gTWVkaWFuIHZhbHVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IG1vdmluZ01lZGlhbiA9IG5ldyBNb3ZpbmdNZWRpYW4oeyBvcmRlcjogNSB9KTtcbiAgICogbW92aW5nTWVkaWFuLmluaXRTdHJlYW0oeyBmcmFtZVNpemU6IDEsIGZyYW1lVHlwZTogJ3NjYWxhcicgfSk7XG4gICAqXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigxKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigyKTtcbiAgICogPiAwXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcigzKTtcbiAgICogPiAxXG4gICAqIG1vdmluZ01lZGlhbi5pbnB1dFNjYWxhcig0KTtcbiAgICogPiAyXG4gICAqL1xuICBpbnB1dFNjYWxhcih2YWx1ZSkge1xuICAgIGNvbnN0IHJpbmdJbmRleCA9IHRoaXMucmluZ0luZGV4O1xuICAgIGNvbnN0IHJpbmdCdWZmZXIgPSB0aGlzLnJpbmdCdWZmZXI7XG4gICAgY29uc3Qgc29ydEJ1ZmZlciA9IHRoaXMuc29ydEJ1ZmZlcjtcbiAgICBjb25zdCBvcmRlciA9IHRoaXMucGFyYW1zLmdldCgnb3JkZXInKTtcbiAgICBjb25zdCBtZWRpYW5JbmRleCA9IChvcmRlciAtIDEpIC8gMjtcbiAgICBsZXQgc3RhcnRJbmRleCA9IDA7XG5cbiAgICByaW5nQnVmZmVyW3JpbmdJbmRleF0gPSB2YWx1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcbiAgICAgIGxldCBtaW4gPSArSW5maW5pdHk7XG4gICAgICBsZXQgbWluSW5kZXggPSBudWxsO1xuXG4gICAgICBmb3IgKGxldCBqID0gc3RhcnRJbmRleDsgaiA8IG9yZGVyOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgc29ydEJ1ZmZlcltqXSA9IHJpbmdCdWZmZXJbal07XG5cbiAgICAgICAgaWYgKHNvcnRCdWZmZXJbal0gPCBtaW4pIHtcbiAgICAgICAgICBtaW4gPSBzb3J0QnVmZmVyW2pdO1xuICAgICAgICAgIG1pbkluZGV4ID0gajtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzd2FwIG1pbkluZGV4IGFuZCBzdGFydEluZGV4XG4gICAgICBjb25zdCBjYWNoZSA9IHNvcnRCdWZmZXJbc3RhcnRJbmRleF07XG4gICAgICBzb3J0QnVmZmVyW3N0YXJ0SW5kZXhdID0gc29ydEJ1ZmZlclttaW5JbmRleF07XG4gICAgICBzb3J0QnVmZmVyW21pbkluZGV4XSA9IGNhY2hlO1xuXG4gICAgICBzdGFydEluZGV4ICs9IDE7XG4gICAgfVxuXG4gICAgY29uc3QgbWVkaWFuID0gc29ydEJ1ZmZlclttZWRpYW5JbmRleF07XG4gICAgdGhpcy5yaW5nSW5kZXggPSAocmluZ0luZGV4ICsgMSkgJSBvcmRlcjtcblxuICAgIHJldHVybiBtZWRpYW47XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge1xuICAgIHRoaXMuaW5wdXRWZWN0b3IoZnJhbWUuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYE1vdmluZ01lZGlhbmAgb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLCBpbiB0aGlzIGNhc2UgYHByb2Nlc3NTdHJlYW1QYXJhbXNgIGFuZCBgcmVzZXRTdHJlYW1gXG4gICAqIHNob3VsZCBiZSBjYWxsZWQgbWFudWFsbHkgb24gdGhlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyAtIFZhbHVlcyB0byBmZWVkIHRoZSBtb3ZpbmcgbWVkaWFuIHdpdGguXG4gICAqIEByZXR1cm4ge0Zsb2F0MzJBcnJheX0gLSBNZWRpYW4gdmFsdWVzIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICAgKlxuICAgKiBjb25zdCBtb3ZpbmdNZWRpYW4gPSBuZXcgTW92aW5nTWVkaWFuKHsgb3JkZXI6IDMsIGZpbGw6IDAgfSk7XG4gICAqIG1vdmluZ01lZGlhbi5pbml0U3RyZWFtKHsgZnJhbWVTaXplOiAzLCBmcmFtZVR5cGU6ICd2ZWN0b3InIH0pO1xuICAgKlxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMSwgMV0pO1xuICAgKiA+IFswLCAwXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMiwgMl0pO1xuICAgKiA+IFsxLCAxXVxuICAgKiBtb3ZpbmdNZWRpYW4uaW5wdXRBcnJheShbMywgM10pO1xuICAgKiA+IFsyLCAyXVxuICAgKi9cbiAgaW5wdXRWZWN0b3IodmFsdWVzKSB7XG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ29yZGVyJyk7XG4gICAgY29uc3QgcmluZ0J1ZmZlciA9IHRoaXMucmluZ0J1ZmZlcjtcbiAgICBjb25zdCByaW5nSW5kZXggPSB0aGlzLnJpbmdJbmRleDtcbiAgICBjb25zdCBzb3J0QnVmZmVyID0gdGhpcy5zb3J0QnVmZmVyO1xuICAgIGNvbnN0IG91dEZyYW1lID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGNvbnN0IG1pbkluZGljZXMgPSB0aGlzLm1pbkluZGljZXM7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIGNvbnN0IG1lZGlhbkluZGV4ID0gTWF0aC5mbG9vcihvcmRlciAvIDIpO1xuICAgIGxldCBzdGFydEluZGV4ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1lZGlhbkluZGV4OyBpKyspIHtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZVNpemU7IGorKykge1xuICAgICAgICBvdXRGcmFtZVtqXSA9ICtJbmZpbml0eTtcbiAgICAgICAgbWluSW5kaWNlc1tqXSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgayA9IHN0YXJ0SW5kZXg7IGsgPCBvcmRlcjsgaysrKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBrICogZnJhbWVTaXplICsgajtcblxuICAgICAgICAgIC8vIHVwZGF0ZSByaW5nIGJ1ZmZlciBjb3JyZXNwb25kaW5nIHRvIGN1cnJlbnRcbiAgICAgICAgICBpZiAoayA9PT0gcmluZ0luZGV4ICYmIGkgPT09IDApXG4gICAgICAgICAgICByaW5nQnVmZmVyW2luZGV4XSA9IHZhbHVlc1tqXTtcblxuICAgICAgICAgIC8vIGNvcHkgdmFsdWUgaW4gc29ydCBidWZmZXIgb24gZmlyc3QgcGFzc1xuICAgICAgICAgIGlmIChpID09PSAwKcKgXG4gICAgICAgICAgICBzb3J0QnVmZmVyW2luZGV4XSA9IHJpbmdCdWZmZXJbaW5kZXhdO1xuXG4gICAgICAgICAgLy8gZmluZCBtaW5pdW0gaW4gdGhlIHJlbWFpbmluZyBhcnJheVxuICAgICAgICAgIGlmIChzb3J0QnVmZmVyW2luZGV4XSA8IG91dEZyYW1lW2pdKSB7XG4gICAgICAgICAgICBvdXRGcmFtZVtqXSA9IHNvcnRCdWZmZXJbaW5kZXhdO1xuICAgICAgICAgICAgbWluSW5kaWNlc1tqXSA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgbWluaW11bSBhbmQgY3VyZW50IGluZGV4XG4gICAgICAgIGNvbnN0IHN3YXBJbmRleCA9IHN0YXJ0SW5kZXggKiBmcmFtZVNpemUgKyBqO1xuICAgICAgICBjb25zdCB2ID0gc29ydEJ1ZmZlcltzd2FwSW5kZXhdO1xuICAgICAgICBzb3J0QnVmZmVyW3N3YXBJbmRleF0gPSBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dO1xuICAgICAgICBzb3J0QnVmZmVyW21pbkluZGljZXNbal1dID0gdjtcblxuICAgICAgICAvLyBzdG9yZSB0aGlzIG1pbmltdW0gdmFsdWUgYXMgY3VycmVudCByZXN1bHRcbiAgICAgICAgb3V0RnJhbWVbal0gPSBzb3J0QnVmZmVyW3N3YXBJbmRleF07XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW5kZXggKz0gMTtcbiAgICB9XG5cbiAgICB0aGlzLnJpbmdJbmRleCA9IChyaW5nSW5kZXggKyAxKSAlIG9yZGVyO1xuXG4gICAgcmV0dXJuIHRoaXMuZnJhbWUuZGF0YTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXByb2Nlc3NGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcblxuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdvcmRlcicpO1xuICAgIGxldCB0aW1lID0gZnJhbWUudGltZTtcbiAgICAvLyBzaGlmdCB0aW1lIHRvIHRha2UgYWNjb3VudCBvZiB0aGUgYWRkZWQgbGF0ZW5jeVxuICAgIGlmICh0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKVxuICAgICAgdGltZSAtPSAoMC41ICogKG9yZGVyIC0gMSkgLyB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVSYXRlKTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVGcmFtZSh0aW1lLCB0aGlzLm91dEZyYW1lLCBtZXRhZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW92aW5nTWVkaWFuO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHN0YXRlOiB7XG4gICAgdHlwZTogJ2VudW0nLFxuICAgIGRlZmF1bHQ6ICdvbicsXG4gICAgbGlzdDogWydvbicsICdvZmYnXSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogVGhlIE9uT2ZmIG9wZXJhdG9yIGFsbG93cyB0byBzdG9wIHRoZSBwcm9wYWdhdGlvbiBvZiB0aGUgc3RyZWFtIGluIGFcbiAqIHN1YmdyYXBoLiBXaGVuIFwib25cIiwgZnJhbWVzIGFyZSBwcm9wYWdhdGVkLCB3aGVuIFwib2ZmXCIgdGhlIHByb3BhZ2F0aW9uIGlzXG4gKiBzdG9wcGVkLlxuICpcbiAqIFRoZSBgc3RyZWFtUGFyYW1zYCBwcm9wYWdhdGlvbiBpcyBuZXZlciBieXBhc3NlZCBzbyB0aGUgc3Vic2VxdWVudCBzdWJncmFwaFxuICogaXMgYWx3YXlzIHJlYWR5IGZvciBpbmNvbW1pbmcgZnJhbWVzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuc3RhdGU9J29uJ10gLSBEZWZhdWx0IHN0YXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgZnJhbWVzID0gW1xuICogICB7IHRpbWU6IDAsIGRhdGE6IFsxLCAyXSB9LFxuICogICB7IHRpbWU6IDEsIGRhdGE6IFszLCA0XSB9LFxuICogICB7IHRpbWU6IDIsIGRhdGE6IFs1LCA2XSB9LFxuICogXTtcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IEV2ZW50SW4oe1xuICogICBmcmFtZVNpemU6IDIsXG4gKiAgIGZyYW1lUmF0ZTogMCxcbiAqICAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IG9uT2ZmID0gbmV3IE9uT2ZmKCk7XG4gKlxuICogY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogZXZlbnRJbi5jb25uZWN0KG9uT2ZmKTtcbiAqIG9uT2ZmLmNvbm5lY3QobG9nZ2VyKTtcbiAqXG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKlxuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzBdKTtcbiAqID4gWzAsIDFdXG4gKlxuICogLy8gYnlwYXNzIHN1YmdyYXBoXG4gKiBvbk9mZi5zZXRTdGF0ZSgnb2ZmJyk7XG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZXNbMV0pO1xuICpcbiAqIC8vIHJlLW9wZW4gc3ViZ3JhcGhcbiAqIG9uT2ZmLnNldFN0YXRlKCdvbicpO1xuICogZXZlbnRJbi5wcm9jZXNzRnJhbWUoZnJhbWVzWzJdKTtcbiAqID4gWzUsIDZdXG4gKi9cbmNsYXNzIE9uT2ZmIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnBhcmFtcy5nZXQoJ3N0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBzdGF0ZSBvZiB0aGUgYE9uT2ZmYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gTmV3IHN0YXRlIG9mIHRoZSBvcGVyYXRvciAoYG9uYCBvciBgb2ZmYClcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKGRlZmluaXRpb25zLnN0YXRlLmxpc3QuaW5kZXhPZihzdGF0ZSkgPT09IC0xKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHN3aXRjaCBzdGF0ZSB2YWx1ZSBcIiR7c3RhdGV9XCIgW3ZhbGlkIHZhbHVlczogXCJvblwiL1wib2ZmXCJdYCk7XG5cbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICAvLyBkZWZpbmUgYWxsIHBvc3NpYmxlIHN0cmVhbSBBUElcbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIoKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKCkge31cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdvbicpIHtcbiAgICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG5cbiAgICAgIHRoaXMuZnJhbWUudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG4gICAgICB0aGlzLmZyYW1lLmRhdGEgPSBmcmFtZS5kYXRhO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9uT2ZmO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3Qgc3FydCA9IE1hdGguc3FydDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHBvd2VyOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9LFxuICB9LFxufTtcblxuLyoqXG4gKiBDb21wdXRlIHRoZSBSb290IE1lYW4gU3F1YXJlIG9mIGEgYHNpZ25hbGAuXG4gKlxuICogX3N1cHBvcnQgYHN0YW5kYWxvbmVgIHVzYWdlX1xuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnBvd2VyPWZhbHNlXSAtIElmIGB0cnVlYCByZW1vdmUgdGhlIFwiUlwiIG9mIHRoZVxuICogIFwiUm1zXCIgYW5kIHJldHVybiB0aGUgc3F1YXJlZCByZXN1bHQgKGkuZS4gcG93ZXIpLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogLy8gYXNzdW1pbmcgc29tZSBgQXVkaW9CdWZmZXJgXG4gKiBjb25zdCBhdWRpb0luQnVmZmVyID0gbmV3IGxmby5zb3VyY2UuQXVkaW9JbkJ1ZmZlcih7XG4gKiAgIGF1ZGlvQnVmZmVyOiBhdWRpb0J1ZmZlcixcbiAqICAgZnJhbWVTaXplOiA1MTIsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBybXMgPSBuZXcgbGZvLm9wZXJhdG9yLlJtcygpO1xuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogYXVkaW9JbkJ1ZmZlci5jb25uZWN0KHJtcyk7XG4gKiBybXMuY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIGF1ZGlvSW5CdWZmZXIuc3RhcnQoKTtcbiAqL1xuY2xhc3MgUm1zIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAxO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICdzY2FsYXInO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uID0gWydybXMnXTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciB0aGUgdXNlIG9mIGEgYFJtc2Agb3V0c2lkZSBhIGdyYXBoIChlLmcuIGluc2lkZVxuICAgKiBhbm90aGVyIG5vZGUpLiBSZXR1cm4gdGhlIHJtcyBvZiB0aGUgZ2l2ZW4gc2lnbmFsIGJsb2NrLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gc2lnbmFsIC0gU2lnbmFsIGJsb2NrIHRvIGJlIGNvbXB1dGVkLlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gcm1zIG9mIHRoZSBpbnB1dCBzaWduYWwuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAgICpcbiAgICogY29uc3Qgcm1zID0gbmV3IGxmby5vcGVyYXRvci5SbXMoKTtcbiAgICogcm1zLmluaXRTdHJlYW0oeyBmcmFtZVR5cGU6ICdzaWduYWwnLCBmcmFtZVNpemU6IDEwMDAgfSk7XG4gICAqXG4gICAqIGNvbnN0IHJlc3VsdHMgPSBybXMuaW5wdXRTaWduYWwoWy4uLnZhbHVlc10pO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoc2lnbmFsKSB7XG4gICAgY29uc3QgcG93ZXIgPSB0aGlzLnBhcmFtcy5nZXQoJ3Bvd2VyJyk7XG4gICAgY29uc3QgbGVuZ3RoID0gc2lnbmFsLmxlbmd0aDtcbiAgICBsZXQgcm1zID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICBybXMgKz0gKHNpZ25hbFtpXSAqIHNpZ25hbFtpXSk7XG5cbiAgICBybXMgPSBybXMgLyBsZW5ndGg7XG5cbiAgICBpZiAoIXBvd2VyKVxuICAgICAgcm1zID0gc3FydChybXMpO1xuXG4gICAgcmV0dXJuIHJtcztcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7XG4gICAgdGhpcy5mcmFtZS5kYXRhWzBdID0gdGhpcy5pbnB1dFNpZ25hbChmcmFtZS5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSbXM7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuaW1wb3J0IE1vdmluZ0F2ZXJhZ2UgZnJvbSAnLi9Nb3ZpbmdBdmVyYWdlJztcblxuY29uc3QgbWluID0gTWF0aC5taW47XG5jb25zdCBtYXggPSBNYXRoLm1heDtcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGxvZ0lucHV0OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxuICBtaW5JbnB1dDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMC4wMDAwMDAwMDAwMDEsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIGZpbHRlck9yZGVyOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIHRocmVzaG9sZDoge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogMyxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgb2ZmVGhyZXNob2xkOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAtSW5maW5pdHksXG4gICAgbWV0YXM6IHsga2luZDogJ2R5YW5taWMnIH0sXG4gIH0sXG4gIG1pbkludGVyOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLjA1MCxcbiAgICBtZXRhczogeyBraW5kOiAnZHlhbm1pYycgfSxcbiAgfSxcbiAgbWF4RHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IEluZmluaXR5LFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeWFubWljJyB9LFxuICB9LFxufVxuXG4vKipcbiAqIENyZWF0ZSBzZWdtZW50cyBiYXNlZCBvbiBhdHRhY2tzLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmxvZ0lucHV0PWZhbHNlXSAtIEFwcGx5IGxvZyBvbiB0aGUgaW5wdXQuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluSW5wdXQ9MC4wMDAwMDAwMDAwMDFdIC0gTWluaW11bSB2YWx1ZSB0byB1c2UgYXNcbiAqICBpbnB1dC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maWx0ZXJPcmRlcj01XSAtIE9yZGVyIG9mIHRoZSBpbnRlcm5hbGx5IHVzZWQgbW92aW5nXG4gKiAgYXZlcmFnZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9M10gLSBUaHJlc2hvbGQgdGhhdCB0cmlnZ2VycyBhIHNlZ21lbnRcbiAqICBzdGFydC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5vZmZUaHJlc2hvbGQ9LUluZmluaXR5XSAtIFRocmVzaG9sZCB0aGF0IHRyaWdnZXJzXG4gKiAgYSBzZWdtZW50IGVuZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5taW5JbnRlcj0wLjA1MF0gLSBNaW5pbXVtIGRlbGF5IGJldHdlZW4gdHdvIHNlbWdlbnRzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heER1cmF0aW9uPUluZmluaXR5XSAtIE1heGltdW0gZHVyYXRpb24gb2YgYSBzZWdtZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhc3N1bWluZyBhIHN0cmVhbSBmcm9tIHRoZSBtaWNyb3Bob25lXG4gKiBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcbiAqXG4gKiBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAqICAgc291cmNlTm9kZTogc291cmNlLFxuICogICBhdWRpb0NvbnRleHQ6IGF1ZGlvQ29udGV4dCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAqICAgZnJhbWVTaXplOiBmcmFtZVNpemUsXG4gKiAgIGhvcFNpemU6IGhvcFNpemUsXG4gKiAgIGNlbnRlcmVkVGltZVRhZ3M6IHRydWVcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHBvd2VyID0gbmV3IGxmby5vcGVyYXRvci5STVMoe1xuICogICBwb3dlcjogdHJ1ZSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHNlZ21lbnRlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2VnbWVudGVyKHtcbiAqICAgbG9nSW5wdXQ6IHRydWUsXG4gKiAgIGZpbHRlck9yZGVyOiA1LFxuICogICB0aHJlc2hvbGQ6IDMsXG4gKiAgIG9mZlRocmVzaG9sZDogLUluZmluaXR5LFxuICogICBtaW5JbnRlcjogMC4wNTAsXG4gKiAgIG1heER1cmF0aW9uOiAwLjA1MCxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyB0aW1lOiB0cnVlIH0pO1xuICpcbiAqIGF1ZGlvSW5Ob2RlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KHBvd2VyKTtcbiAqIHBvd2VyLmNvbm5lY3Qoc2VnbWVudGVyKTtcbiAqIHNlZ21lbnRlci5jb25uZWN0KGxvZ2dlcik7XG4gKlxuICogYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqL1xuY2xhc3MgU2VnbWVudGVyIGV4dGVuZHMgQmFzZUxmbyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluc2lkZVNlZ21lbnQgPSBmYWxzZTtcbiAgICB0aGlzLm9uc2V0VGltZSA9IC1JbmZpbml0eTtcblxuICAgIC8vIHN0YXRzXG4gICAgdGhpcy5taW4gPSBJbmZpbml0eTtcbiAgICB0aGlzLm1heCA9IC1JbmZpbml0eTtcbiAgICB0aGlzLnN1bSA9IDA7XG4gICAgdGhpcy5zdW1PZlNxdWFyZXMgPSAwO1xuICAgIHRoaXMuY291bnQgPSAwO1xuXG4gICAgY29uc3QgbWluSW5wdXQgPSB0aGlzLnBhcmFtcy5nZXQoJ21pbklucHV0Jyk7XG4gICAgbGV0IGZpbGwgPSBtaW5JbnB1dDtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2xvZ0lucHV0JykgJiYgbWluSW5wdXQgPiAwKVxuICAgICAgZmlsbCA9IE1hdGgubG9nKG1pbklucHV0KTtcblxuICAgIHRoaXMubW92aW5nQXZlcmFnZSA9IG5ldyBNb3ZpbmdBdmVyYWdlKHtcbiAgICAgIG9yZGVyOiB0aGlzLnBhcmFtcy5nZXQoJ2ZpbHRlck9yZGVyJyksXG4gICAgICBmaWxsOiBmaWxsLFxuICAgIH0pO1xuXG4gICAgdGhpcy5sYXN0TXZhdnJnID0gZmlsbDtcbiAgfVxuXG4gIG9uUGFyYW1VcGRhdGUobmFtZSwgdmFsdWUsIG1ldGFzKSB7XG4gICAgc3VwZXIub25QYXJhbVVwZGF0ZShuYW1lLCB2YWx1ZSwgbWV0YXMpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdmaWx0ZXJPcmRlcicpXG4gICAgICAgIHRoaXMubW92aW5nQXZlcmFnZS5wYXJhbXMuc2V0KCdvcmRlcicsIHZhbHVlKTtcbiAgfVxuXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lVHlwZSA9ICd2ZWN0b3InO1xuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IDU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gMDtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnZHVyYXRpb24nLCAnbWluJywgJ21heCcsICdtZWFuJywgJ3N0ZGRldiddO1xuXG5cbiAgICB0aGlzLm1vdmluZ0F2ZXJhZ2UuaW5pdFN0cmVhbShwcmV2U3RyZWFtUGFyYW1zKTtcblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICByZXNldFN0cmVhbSgpIHtcbiAgICBzdXBlci5yZXNldFN0cmVhbSgpO1xuICAgIHRoaXMubW92aW5nQXZlcmFnZS5yZXNldFN0cmVhbSgpO1xuICAgIHRoaXMucmVzZXRTZWdtZW50KCk7XG4gIH1cblxuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgaWYgKHRoaXMuaW5zaWRlU2VnbWVudClcbiAgICAgIHRoaXMub3V0cHV0U2VnbWVudChlbmRUaW1lKTtcblxuICAgIHN1cGVyLmZpbmFsaXplU3RyZWFtKGVuZFRpbWUpO1xuICB9XG5cbiAgcmVzZXRTZWdtZW50KCkge1xuICAgIHRoaXMuaW5zaWRlU2VnbWVudCA9IGZhbHNlO1xuICAgIHRoaXMub25zZXRUaW1lID0gLUluZmluaXR5O1xuICAgIC8vIHN0YXRzXG4gICAgdGhpcy5taW4gPSBJbmZpbml0eTtcbiAgICB0aGlzLm1heCA9IC1JbmZpbml0eTtcbiAgICB0aGlzLnN1bSA9IDA7XG4gICAgdGhpcy5zdW1PZlNxdWFyZXMgPSAwO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICB9XG5cbiAgb3V0cHV0U2VnbWVudChlbmRUaW1lKSB7XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBvdXREYXRhWzBdID0gZW5kVGltZSAtIHRoaXMub25zZXRUaW1lO1xuICAgIG91dERhdGFbMV0gPSB0aGlzLm1pbjtcbiAgICBvdXREYXRhWzJdID0gdGhpcy5tYXg7XG5cbiAgICBjb25zdCBub3JtID0gMSAvIHRoaXMuY291bnQ7XG4gICAgY29uc3QgbWVhbiA9IHRoaXMuc3VtICogbm9ybTtcbiAgICBjb25zdCBtZWFuT2ZTcXVhcmUgPSB0aGlzLnN1bU9mU3F1YXJlcyAqIG5vcm07XG4gICAgY29uc3Qgc3F1YXJlT2ZtZWFuID0gbWVhbiAqIG1lYW47XG5cbiAgICBvdXREYXRhWzNdID0gbWVhbjtcbiAgICBvdXREYXRhWzRdID0gMDtcblxuICAgIGlmIChtZWFuT2ZTcXVhcmUgPiBzcXVhcmVPZm1lYW4pXG4gICAgICBvdXREYXRhWzRdID0gTWF0aC5zcXJ0KG1lYW5PZlNxdWFyZSAtIHNxdWFyZU9mbWVhbik7XG5cbiAgICB0aGlzLmZyYW1lLnRpbWUgPSB0aGlzLm9uc2V0VGltZTtcblxuICAgIHRoaXMucHJvcGFnYXRlRnJhbWUoKTtcbiAgfVxuXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICBjb25zdCBsb2dJbnB1dCA9IHRoaXMucGFyYW1zLmdldCgnbG9nSW5wdXQnKTtcbiAgICBjb25zdCBtaW5JbnB1dCA9IHRoaXMucGFyYW1zLmdldCgnbWluSW5wdXQnKTtcbiAgICBjb25zdCB0aHJlc2hvbGQgPSB0aGlzLnBhcmFtcy5nZXQoJ3RocmVzaG9sZCcpO1xuICAgIGNvbnN0IG1pbkludGVyID0gdGhpcy5wYXJhbXMuZ2V0KCdtaW5JbnRlcicpO1xuICAgIGNvbnN0IG1heER1cmF0aW9uID0gdGhpcy5wYXJhbXMuZ2V0KCdtYXhEdXJhdGlvbicpO1xuICAgIGNvbnN0IG9mZlRocmVzaG9sZCA9IHRoaXMucGFyYW1zLmdldCgnb2ZmVGhyZXNob2xkJyk7XG4gICAgY29uc3QgcmF3VmFsdWUgPSBmcmFtZS5kYXRhWzBdO1xuICAgIGNvbnN0IHRpbWUgPSBmcmFtZS50aW1lO1xuICAgIGxldCB2YWx1ZSA9IE1hdGgubWF4KHJhd1ZhbHVlLCBtaW5JbnB1dCk7XG5cbiAgICBpZiAobG9nSW5wdXQpXG4gICAgICB2YWx1ZSA9IE1hdGgubG9nKHZhbHVlKTtcblxuICAgIGNvbnN0IGRpZmYgPSB2YWx1ZSAtIHRoaXMubGFzdE12YXZyZztcbiAgICB0aGlzLmxhc3RNdmF2cmcgPSB0aGlzLm1vdmluZ0F2ZXJhZ2UuaW5wdXRTY2FsYXIodmFsdWUpO1xuXG4gICAgLy8gdXBkYXRlIGZyYW1lIG1ldGFkYXRhXG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgaWYgKGRpZmYgPiB0aHJlc2hvbGQgJiYgdGltZSAtIHRoaXMub25zZXRUaW1lID4gbWluSW50ZXIpIHtcbiAgICAgIGlmICh0aGlzLmluc2lkZVNlZ21lbnQpXG4gICAgICAgIHRoaXMub3V0cHV0U2VnbWVudCh0aW1lKTtcblxuICAgICAgLy8gc3RhcnQgc2VnbWVudFxuICAgICAgdGhpcy5pbnNpZGVTZWdtZW50ID0gdHJ1ZTtcbiAgICAgIHRoaXMub25zZXRUaW1lID0gdGltZTtcbiAgICAgIHRoaXMubWF4ID0gLUluZmluaXR5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluc2lkZVNlZ21lbnQpIHtcbiAgICAgIHRoaXMubWluID0gbWluKHRoaXMubWluLCByYXdWYWx1ZSk7XG4gICAgICB0aGlzLm1heCA9IG1heCh0aGlzLm1heCwgcmF3VmFsdWUpO1xuICAgICAgdGhpcy5zdW0gKz0gcmF3VmFsdWU7XG4gICAgICB0aGlzLnN1bU9mU3F1YXJlcyArPSByYXdWYWx1ZSAqIHJhd1ZhbHVlO1xuICAgICAgdGhpcy5jb3VudCsrO1xuXG4gICAgICBpZiAodGltZSAtIHRoaXMub25zZXRUaW1lID49IG1heER1cmF0aW9uIHx8IHZhbHVlIDw9IG9mZlRocmVzaG9sZCkge1xuICAgICAgICB0aGlzLm91dHB1dFNlZ21lbnQodGltZSk7XG4gICAgICAgIHRoaXMuaW5zaWRlU2VnbWVudCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIHRoaXMucHJlcGFyZUZyYW1lKCk7XG4gICAgdGhpcy5wcm9jZXNzRnVuY3Rpb24oZnJhbWUpO1xuICAgIC8vIGRvIG5vdCBwcm9wYWdhdGUgaGVyZSBhcyB0aGUgZnJhbWVSYXRlIGlzIG5vdyB6ZXJvXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VnbWVudGVyO1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGluZGV4OiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgaW5kaWNlczoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3Qgb25lIG9yIHNldmVyYWwgaW5kaWNlcyBmcm9tIGEgYHZlY3RvcmAgaW5wdXQuIElmIG9ubHkgb25lIGluZGV4IGlzXG4gKiBzZWxlY3RlZCwgdGhlIG91dHB1dCB3aWxsIGJlIG9mIHR5cGUgYHNjYWxhcmAsIG90aGVyd2lzZSB0aGUgb3V0cHV0IHdpbGxcbiAqIGJlIGEgdmVjdG9yIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGVkIGluZGljZXMuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24ub3BlcmF0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgdmFsdWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaW5kZXggLSBJbmRleCB0byBzZWxlY3QgZnJvbSB0aGUgaW5wdXQgZnJhbWUuXG4gKiBAcGFyYW0ge0FycmF5PE51bWJlcj59IG9wdGlvbnMuaW5kaWNlcyAtIEluZGljZXMgdG8gc2VsZWN0IGZyb20gdGhlIGlucHV0XG4gKiAgZnJhbWUsIGlmIGRlZmluZWQsIHRha2UgcHJlY2VkYW5jZSBvdmVyIGBvcHRpb24uaW5kZXhgLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICd2ZWN0b3InLFxuICogICBmcmFtZVNpemU6IDMsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBzZWxlY3QgPSBuZXcgbGZvLm9wZXJhdG9yLlNlbGVjdCh7XG4gKiAgIGluZGV4OiAxLFxuICogfSk7XG4gKlxuICogZXZlbnRJbi5zdGFydCgpO1xuICogZXZlbnRJbi5wcm9jZXNzKDAsIFswLCAxLCAyXSk7XG4gKiA+IDFcbiAqIGV2ZW50SW4ucHJvY2VzcygwLCBbMywgNCwgNV0pO1xuICogPiA0XG4gKi9cbmNsYXNzIFNlbGVjdCBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmFtcy5nZXQoJ2luZGV4Jyk7XG4gICAgY29uc3QgaW5kaWNlcyA9IHRoaXMucGFyYW1zLmdldCgnaW5kaWNlcycpO1xuXG4gICAgbGV0IG1heCA9IChpbmRpY2VzICE9PSBudWxsKSA/ICBNYXRoLm1heC5hcHBseShudWxsLCBpbmRpY2VzKSA6IGluZGV4O1xuXG4gICAgaWYgKG1heCA+PSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzZWxlY3QgaW5kZXggXCIke21heH1cImApO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gKGluZGljZXMgIT09IG51bGwpID8gJ3ZlY3RvcicgOiAnc2NhbGFyJztcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSAoaW5kaWNlcyAhPT0gbnVsbCkgPyBpbmRpY2VzLmxlbmd0aCA6IDE7XG5cbiAgICB0aGlzLnNlbGVjdCA9IChpbmRpY2VzICE9PSBudWxsKSA/IGluZGljZXMgOiBbaW5kZXhdO1xuXG4gICAgLy8gc3RlYWwgZGVzY3JpcHRpb24oKSBmcm9tIHBhcmVudFxuICAgIGlmIChwcmV2U3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdC5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG4gICAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLmRlc2NyaXB0aW9uW2luZGV4XSA9IHByZXZTdHJlYW1QYXJhbXMuZGVzY3JpcHRpb25bdmFsXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge1xuICAgIGNvbnN0IGRhdGEgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IG91dERhdGEgPSB0aGlzLmZyYW1lLmRhdGE7XG4gICAgY29uc3Qgc2VsZWN0ID0gdGhpcy5zZWxlY3Q7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5sZW5ndGg7IGkrKylcbiAgICAgIG91dERhdGFbaV0gPSBkYXRhW3NlbGVjdFtpXV07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0O1xuIiwiaW1wb3J0IEJhc2VMZm8gZnJvbSAnLi4vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIGZyYW1lU2l6ZToge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiA1MTIsXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgaG9wU2l6ZTogeyAvLyBzaG91bGQgYmUgbnVsbGFibGVcbiAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBjZW50ZXJlZFRpbWVUYWdzOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICB9XG59XG5cbi8qKlxuICogQ2hhbmdlIHRoZSBgZnJhbWVTaXplYCBhbmQgYGhvcFNpemVgIG9mIGEgYHNpZ25hbGAgaW5wdXQgYWNjb3JkaW5nIHRvXG4gKiB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAqIFRoaXMgb3BlcmF0b3IgdXBkYXRlcyB0aGUgc3RyZWFtIHBhcmFtZXRlcnMgYWNjb3JkaW5nIHRvIGl0cyBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLm9wZXJhdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPdmVycmlkZSBkZWZhdWx0IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZnJhbWVTaXplPTUxMl0gLSBGcmFtZSBzaXplIG9mIHRoZSBvdXRwdXQgc2lnbmFsLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhvcFNpemU9bnVsbF0gLSBOdW1iZXIgb2Ygc2FtcGxlcyBiZXR3ZWVuIHR3b1xuICogIGNvbnNlY3V0aXZlIGZyYW1lcy4gSWYgbnVsbCwgYGhvcFNpemVgIGlzIHNldCB0byBgZnJhbWVTaXplYC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2VudGVyZWRUaW1lVGFnc10gLSBNb3ZlIHRoZSB0aW1lIHRhZyB0byB0aGUgbWlkZGxlXG4gKiAgb2YgdGhlIGZyYW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgZXZlbnRJbiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzaWduYWwnLFxuICogICBmcmFtZVNpemU6IDEwLFxuICogICBzYW1wbGVSYXRlOiAyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IGxmby5vcGVyYXRvci5TbGljZXIoe1xuICogICBmcmFtZVNpemU6IDQsXG4gKiAgIGhvcFNpemU6IDJcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyB0aW1lOiB0cnVlLCBkYXRhOiB0cnVlIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChzbGljZXIpO1xuICogc2xpY2VyLmNvbm5lY3QobG9nZ2VyKTtcbiAqIGV2ZW50SW4uc3RhcnQoKTtcbiAqXG4gKiBldmVudEluLnByb2Nlc3MoMCwgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldKTtcbiAqID4geyB0aW1lOiAwLCBkYXRhOiBbMCwgMSwgMiwgM10gfVxuICogPiB7IHRpbWU6IDEsIGRhdGE6IFsyLCAzLCA0LCA1XSB9XG4gKiA+IHsgdGltZTogMiwgZGF0YTogWzQsIDUsIDYsIDddIH1cbiAqID4geyB0aW1lOiAzLCBkYXRhOiBbNiwgNywgOCwgOV0gfVxuICovXG5jbGFzcyBTbGljZXIgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgY29uc3QgaG9wU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnaG9wU2l6ZScpO1xuICAgIGNvbnN0IGZyYW1lU2l6ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVTaXplJyk7XG5cbiAgICBpZiAoIWhvcFNpemUpXG4gICAgICB0aGlzLnBhcmFtcy5zZXQoJ2hvcFNpemUnLCBmcmFtZVNpemUpO1xuXG4gICAgdGhpcy5wYXJhbXMuYWRkTGlzdGVuZXIodGhpcy5vblBhcmFtVXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5mcmFtZUluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBob3BTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdob3BTaXplJyk7XG4gICAgY29uc3QgZnJhbWVTaXplID0gdGhpcy5wYXJhbXMuZ2V0KCdmcmFtZVNpemUnKTtcblxuICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSA9IGZyYW1lU2l6ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGUgPSBwcmV2U3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgLyBob3BTaXplO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZXNldFN0cmVhbSgpIHtcbiAgICBzdXBlci5yZXNldFN0cmVhbSgpO1xuICAgIHRoaXMuZnJhbWVJbmRleCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZmluYWxpemVTdHJlYW0oZW5kVGltZSkge1xuICAgIGlmICh0aGlzLmZyYW1lSW5kZXggPiAwKSB7XG4gICAgICBjb25zdCBmcmFtZVJhdGUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVJhdGU7XG4gICAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgICAgLy8gc2V0IHRoZSB0aW1lIG9mIHRoZSBsYXN0IGZyYW1lXG4gICAgICB0aGlzLmZyYW1lLnRpbWUgKz0gKDEgLyBmcmFtZVJhdGUpO1xuXG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5mcmFtZUluZGV4OyBpIDwgZnJhbWVTaXplOyBpKyspXG4gICAgICAgIGRhdGFbaV0gPSAwO1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gICAgfVxuXG4gICAgc3VwZXIuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc0ZyYW1lKGZyYW1lKSB7XG4gICAgdGhpcy5wcmVwYXJlRnJhbWUoKTtcbiAgICB0aGlzLnByb2Nlc3NGdW5jdGlvbihmcmFtZSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGNvbnN0IHRpbWUgPSBmcmFtZS50aW1lO1xuICAgIGNvbnN0IGJsb2NrID0gZnJhbWUuZGF0YTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuXG4gICAgY29uc3QgY2VudGVyZWRUaW1lVGFncyA9IHRoaXMucGFyYW1zLmdldCgnY2VudGVyZWRUaW1lVGFncycpO1xuICAgIGNvbnN0IGhvcFNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2hvcFNpemUnKTtcbiAgICBjb25zdCBvdXRGcmFtZSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemU7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3Qgc2FtcGxlUGVyaW9kID0gMSAvIHNhbXBsZVJhdGU7XG4gICAgY29uc3QgYmxvY2tTaXplID0gYmxvY2subGVuZ3RoO1xuXG4gICAgbGV0IGZyYW1lSW5kZXggPSB0aGlzLmZyYW1lSW5kZXg7XG4gICAgbGV0IGJsb2NrSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKGJsb2NrSW5kZXggPCBibG9ja1NpemUpIHtcbiAgICAgIGxldCBudW1Ta2lwID0gMDtcblxuICAgICAgLy8gc2tpcCBibG9jayBzYW1wbGVzIGZvciBuZWdhdGl2ZSBmcmFtZUluZGV4IChmcmFtZVNpemUgPCBob3BTaXplKVxuICAgICAgaWYgKGZyYW1lSW5kZXggPCAwKSB7XG4gICAgICAgIG51bVNraXAgPSAtZnJhbWVJbmRleDtcbiAgICAgICAgZnJhbWVJbmRleCA9IDA7IC8vIHJlc2V0IGBmcmFtZUluZGV4YFxuICAgICAgfVxuXG4gICAgICBpZiAobnVtU2tpcCA8IGJsb2NrU2l6ZSkge1xuICAgICAgICBibG9ja0luZGV4ICs9IG51bVNraXA7IC8vIHNraXAgYmxvY2sgc2VnbWVudFxuICAgICAgICAvLyBjYW4gY29weSBhbGwgdGhlIHJlc3Qgb2YgdGhlIGluY29taW5nIGJsb2NrXG4gICAgICAgIGxldCBudW1Db3B5ID0gYmxvY2tTaXplIC0gYmxvY2tJbmRleDtcbiAgICAgICAgLy8gY29ubm90IGNvcHkgbW9yZSB0aGFuIHdoYXQgZml0cyBpbnRvIHRoZSBmcmFtZVxuICAgICAgICBjb25zdCBtYXhDb3B5ID0gZnJhbWVTaXplIC0gZnJhbWVJbmRleDtcblxuICAgICAgICBpZiAobnVtQ29weSA+PSBtYXhDb3B5KVxuICAgICAgICAgIG51bUNvcHkgPSBtYXhDb3B5O1xuXG4gICAgICAgIC8vIGNvcHkgYmxvY2sgc2VnbWVudCBpbnRvIGZyYW1lXG4gICAgICAgIGNvbnN0IGNvcHkgPSBibG9jay5zdWJhcnJheShibG9ja0luZGV4LCBibG9ja0luZGV4ICsgbnVtQ29weSk7XG4gICAgICAgIG91dEZyYW1lLnNldChjb3B5LCBmcmFtZUluZGV4KTtcbiAgICAgICAgLy8gYWR2YW5jZSBibG9jayBhbmQgZnJhbWUgaW5kZXhcbiAgICAgICAgYmxvY2tJbmRleCArPSBudW1Db3B5O1xuICAgICAgICBmcmFtZUluZGV4ICs9IG51bUNvcHk7XG5cbiAgICAgICAgLy8gc2VuZCBmcmFtZSB3aGVuIGNvbXBsZXRlZFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA9PT0gZnJhbWVTaXplKSB7XG4gICAgICAgICAgLy8gZGVmaW5lIHRpbWUgdGFnIGZvciB0aGUgb3V0RnJhbWUgYWNjb3JkaW5nIHRvIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICBpZiAoY2VudGVyZWRUaW1lVGFncylcbiAgICAgICAgICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWUgKyAoYmxvY2tJbmRleCAtIGZyYW1lU2l6ZSAvIDIpICogc2FtcGxlUGVyaW9kO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWUgKyAoYmxvY2tJbmRleCAtIGZyYW1lU2l6ZSkgKiBzYW1wbGVQZXJpb2Q7XG5cbiAgICAgICAgICB0aGlzLmZyYW1lLm1ldGFkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgICAgLy8gZm9yd2FyZCB0byBuZXh0IG5vZGVzXG4gICAgICAgICAgdGhpcy5wcm9wYWdhdGVGcmFtZSgpO1xuXG4gICAgICAgICAgLy8gc2hpZnQgZnJhbWUgbGVmdFxuICAgICAgICAgIGlmIChob3BTaXplIDwgZnJhbWVTaXplKVxuICAgICAgICAgICAgb3V0RnJhbWUuc2V0KG91dEZyYW1lLnN1YmFycmF5KGhvcFNpemUsIGZyYW1lU2l6ZSksIDApO1xuXG4gICAgICAgICAgZnJhbWVJbmRleCAtPSBob3BTaXplOyAvLyBob3AgZm9yd2FyZFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBza2lwIGVudGlyZSBibG9ja1xuICAgICAgICBjb25zdCBibG9ja1Jlc3QgPSBibG9ja1NpemUgLSBibG9ja0luZGV4O1xuICAgICAgICBmcmFtZUluZGV4ICs9IGJsb2NrUmVzdDtcbiAgICAgICAgYmxvY2tJbmRleCArPSBibG9ja1Jlc3Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mcmFtZUluZGV4ID0gZnJhbWVJbmRleDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTbGljZXI7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBjZWlsID0gTWF0aC5jZWlsO1xuXG4vKipcbiAqIHBhcGVyOiBodHRwOi8vcmVjaGVyY2hlLmlyY2FtLmZyL2VxdWlwZXMvcGNtL2NoZXZlaWduL3Bzcy8yMDAyX0pBU0FfWUlOLnBkZlxuICogaW1wbGVtZW50YXRpb24gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2FzaG9rZmVybmFuZGV6L1lpbi1QaXRjaC1UcmFja2luZ1xuICogQHByaXZhdGVcbiAqL1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgdGhyZXNob2xkOiB7XG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiAwLjEsIC8vIGRlZmF1bHQgZnJvbSBwYXBlclxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGRvd25TYW1wbGluZ0V4cDogeyAvLyBkb3duc2FtcGxpbmcgZmFjdG9yXG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlZmF1bHQ6IDIsXG4gICAgbWluOiAwLFxuICAgIG1heDogMyxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBtaW5GcmVxOiB7IC8vXG4gICAgdHlwZTogJ2Zsb2F0JyxcbiAgICBkZWZhdWx0OiA2MCwgLy8gbWVhbiA3MzUgc2FtcGxlc1xuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxufVxuXG4vKipcbiAqIFlpbiBmdW5kYW1lbnRhbCBmcmVxdWVuY3kgZXN0aW1hdG9yLCBiYXNlZCBvbiBhbGdvcml0aG0gZGVzY3JpYmVkIGluXG4gKiBbWUlOLCBhIGZ1bmRhbWVudGFsIGZyZXF1ZW5jeSBlc3RpbWF0b3IgZm9yIHNwZWVjaCBhbmQgbXVzaWNdKGh0dHA6Ly9yZWNoZXJjaGUuaXJjYW0uZnIvZXF1aXBlcy9wY20vY2hldmVpZ24vcHNzLzIwMDJfSkFTQV9ZSU4ucGRmKVxuICogYnkgQ2hldmVpZ25lIGFuZCBLYXdhaGFyYS5cbiAqIE9uIGVhY2ggZnJhbWUsIHRoaXMgb3BlcmF0b3IgcHJvcGFnYXRlIGEgdmVjdG9yIGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZ1xuICogdmFsdWVzOiBgZnJlcXVlbmN5YCwgYHByb2JhYmlsaXR5YC5cbiAqXG4gKiBGb3IgZ29vZCByZXN1bHRzIHRoZSBpbnB1dCBmcmFtZSBzaXplIHNob3VsZCBiZSBsYXJnZSAoMTAyNCBvciAyMDQ4KS5cbiAqXG4gKiBfc3VwcG9ydCBgc3RhbmRhbG9uZWAgdXNhZ2VfXG4gKlxuICogQG5vdGUgLSBJbiBub2RlIGZvciBhIGZyYW1lIG9mIDIwNDggc2FtcGxlcywgYXZlcmFnZSBjb21wdXRhdGlvbiB0aW1lIGlzOlxuICogICAgICAgICAwLjAwMDE2NzQyMjgzMzM5OTkzMzg5IHNlY29uZC5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5vcGVyYXRvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZD0wLjFdIC0gQWJzb2x1dGUgdGhyZXNob2xkIHRvIHRlc3QgdGhlXG4gKiAgbm9ybWFsaXplZCBkaWZmZXJlbmNlIChzZWUgcGFwZXIgZm9yIG1vcmUgaW5mb3JtYXRpb25zKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kb3duU2FtcGxpbmdFeHA9Ml0gLSBEb3duIHNhbXBsZSB0aGUgaW5wdXQgZnJhbWUgYnlcbiAqICBhIGZhY3RvciBvZiAyIGF0IHRoZSBwb3dlciBvZiBgZG93blNhbXBsaW5nRXhwYCAobWluPTAgYW5kIG1heD0zKSBmb3JcbiAqICBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudHMuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWluRnJlcT02MF0gLSBNaW5pbXVtIGZyZXF1ZW5jeSB0aGUgb3BlcmF0b3IgY2FuXG4gKiAgc2VhcmNoIGZvci4gVGhpcyBwYXJhbWV0ZXIgZGVmaW5lcyB0aGUgc2l6ZSBvZiB0aGUgYXV0b2NvcnJlbGF0aW9uIHBlcmZvcm1lZFxuICogIG9uIHRoZSBzaWduYWwsIHRoZSBpbnB1dCBmcmFtZSBzaXplIHNob3VsZCBiZSBhcm91bmQgMiB0aW1lIHRoaXMgc2l6ZSBmb3JcbiAqICBnb29kIHJlc3VsdHMgKGkuZS4gYGlucHV0RnJhbWVTaXplIOKJiCAyICogKHNhbXBsaW5nUmF0ZSAvIG1pbkZyZXEpYCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiAvLyBhc3N1bWluZyBzb21lIEF1ZGlvQnVmZmVyXG4gKiBjb25zdCBzb3VyY2UgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luQnVmZmVyKHtcbiAqICAgYXVkaW9CdWZmZXI6IGF1ZGlvQnVmZmVyLFxuICogfSk7XG4gKlxuICogY29uc3Qgc2xpY2VyID0gbmV3IGxmby5vcGVyYXRvci5TbGljZXIoe1xuICogICBmcmFtZVNpemU6IDIwNDgsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCB5aW4gPSBuZXcgbGZvLm9wZXJhdG9yLllpbigpO1xuICogY29uc3QgbG9nZ2VyID0gbmV3IGxmby5zaW5rLkxvZ2dlcih7IGRhdGE6IHRydWUgfSk7XG4gKlxuICogc291cmNlLmNvbm5lY3Qoc2xpY2VyKTtcbiAqIHNsaWNlci5jb25uZWN0KHlpbik7XG4gKiB5aW4uY29ubmVjdChsb2dnZXIpO1xuICpcbiAqIHNvdXJjZS5zdGFydCgpO1xuICovXG5jbGFzcyBZaW4gZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKGRlZmluaXRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMucHJvYmFiaWxpdHkgPSAwO1xuICAgIHRoaXMucGl0Y2ggPSAtMTtcblxuICAgIHRoaXMudGVzdCA9IDA7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX2Rvd25zYW1wbGUoaW5wdXQsIHNpemUsIG91dHB1dCwgZG93blNhbXBsaW5nRXhwKSB7XG4gICAgY29uc3Qgb3V0cHV0U2l6ZSA9IHNpemUgPj4gZG93blNhbXBsaW5nRXhwO1xuICAgIGxldCBpLCBqO1xuXG4gICAgc3dpdGNoIChkb3duU2FtcGxpbmdFeHApIHtcbiAgICAgIGNhc2UgMDogLy8gbm8gZG93biBzYW1wbGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSsrKVxuICAgICAgICAgIG91dHB1dFtpXSA9IGlucHV0W2ldO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSAyKVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSk7XG5cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gNClcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjI1ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdICsgaW5wdXRbaiArIDJdICsgaW5wdXRbaiArIDNdKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBvdXRwdXRTaXplOyBpKyssIGogKz0gOClcbiAgICAgICAgICBvdXRwdXRbaV0gPSAwLjEyNSAqIChpbnB1dFtqXSArIGlucHV0W2ogKyAxXSArIGlucHV0W2ogKyAyXSArIGlucHV0W2ogKyAzXSArIGlucHV0W2ogKyA0XSArIGlucHV0W2ogKyA1XSArIGlucHV0W2ogKyA2XSArIGlucHV0W2ogKyA3XSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFNpemU7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKSB7XG4gICAgdGhpcy5wcmVwYXJlU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpO1xuXG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVUeXBlID0gJ3ZlY3Rvcic7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplID0gMjtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5kZXNjcmlwdGlvbiA9IFsnZnJlcXVlbmN5JywgJ2NvbmZpZGVuY2UnXTtcblxuICAgIHRoaXMuaW5wdXRGcmFtZVNpemUgPSBwcmV2U3RyZWFtUGFyYW1zLmZyYW1lU2l6ZTtcbiAgICAvLyBoYW5kbGUgcGFyYW1zXG4gICAgY29uc3Qgc291cmNlU2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgY29uc3QgZG93blNhbXBsaW5nRXhwID0gdGhpcy5wYXJhbXMuZ2V0KCdkb3duU2FtcGxpbmdFeHAnKTtcbiAgICBjb25zdCBkb3duRmFjdG9yID0gMSA8PCBkb3duU2FtcGxpbmdFeHA7IC8vIDJeblxuICAgIGNvbnN0IGRvd25TUiA9IHNvdXJjZVNhbXBsZVJhdGUgLyBkb3duRmFjdG9yO1xuICAgIGNvbnN0IGRvd25GcmFtZVNpemUgPSB0aGlzLmlucHV0RnJhbWVTaXplIC8gZG93bkZhY3RvcjsgLy8gbl90aWNrX2Rvd24gLy8gMSAvIDJeblxuXG4gICAgY29uc3QgbWluRnJlcSA9IHRoaXMucGFyYW1zLmdldCgnbWluRnJlcScpO1xuICAgIC8vIGxpbWl0IG1pbiBmcmVxLCBjZi4gcGFwZXIgSVYuIHNlbnNpdGl2aXR5IHRvIHBhcmFtZXRlcnNcbiAgICBjb25zdCBtaW5GcmVxTmJyU2FtcGxlcyA9IGRvd25TUiAvIG1pbkZyZXE7XG4gICAgLy8gY29uc3QgYnVmZmVyU2l6ZSA9IHByZXZTdHJlYW1QYXJhbXMuZnJhbWVTaXplO1xuICAgIHRoaXMuaGFsZkJ1ZmZlclNpemUgPSBkb3duRnJhbWVTaXplIC8gMjtcblxuICAgIC8vIG1pbmltdW0gZXJyb3IgdG8gbm90IGNyYXNoIGJ1dCBub3QgZW5vdWdodCB0byBoYXZlIHJlc3VsdHNcbiAgICBpZiAobWluRnJlcU5iclNhbXBsZXMgPiB0aGlzLmhhbGZCdWZmZXJTaXplKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IGZyYW1lIHNpemUsIHRvbyBzbWFsbCBmb3IgZ2l2ZW4gXCJtaW5GcmVxXCInKTtcblxuICAgIHRoaXMuZG93blNhbXBsaW5nRXhwID0gZG93blNhbXBsaW5nRXhwO1xuICAgIHRoaXMuZG93blNhbXBsaW5nUmF0ZSA9IGRvd25TUjtcbiAgICB0aGlzLmRvd25GcmFtZVNpemUgPSBkb3duRnJhbWVTaXplO1xuICAgIHRoaXMuYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheShkb3duRnJhbWVTaXplKTtcbiAgICAvLyBhdXRvY29ycmVsYXRpb24gYnVmZmVyXG4gICAgdGhpcy55aW5CdWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuaGFsZkJ1ZmZlclNpemUpO1xuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBfZG93bnNhbXBsZShpbnB1dCwgc2l6ZSwgb3V0cHV0LCBkb3duU2FtcGxpbmdFeHApIHtcbiAgICBjb25zdCBvdXRwdXRTaXplID0gc2l6ZSA+PiBkb3duU2FtcGxpbmdFeHA7XG4gICAgbGV0IGksIGo7XG5cbiAgICBzd2l0Y2ggKGRvd25TYW1wbGluZ0V4cCkge1xuICAgICAgY2FzZSAwOiAvLyBubyBkb3duIHNhbXBsaW5nXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzaXplOyBpKyspXG4gICAgICAgICAgb3V0cHV0W2ldID0gaW5wdXRbaV07XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgb3V0cHV0U2l6ZTsgaSsrLCBqICs9IDIpXG4gICAgICAgICAgb3V0cHV0W2ldID0gMC41ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdKTtcblxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSA0KVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuMjUgKiAoaW5wdXRbal0gKyBpbnB1dFtqICsgMV0gKyBpbnB1dFtqICsgMl0gKyBpbnB1dFtqICsgM10pO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IG91dHB1dFNpemU7IGkrKywgaiArPSA4KVxuICAgICAgICAgIG91dHB1dFtpXSA9IDAuMTI1ICogKGlucHV0W2pdICsgaW5wdXRbaiArIDFdICsgaW5wdXRbaiArIDJdICsgaW5wdXRbaiArIDNdICsgaW5wdXRbaiArIDRdICsgaW5wdXRbaiArIDVdICsgaW5wdXRbaiArIDZdICsgaW5wdXRbaiArIDddKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0U2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGVwIDEsIDIgYW5kIDMgLSBTcXVhcmVkIGRpZmZlcmVuY2Ugb2YgdGhlIHNoaWZ0ZWQgc2lnbmFsIHdpdGggaXRzZWxmLlxuICAgKiBjdW11bGF0aXZlIG1lYW4gbm9ybWFsaXplZCBkaWZmZXJlbmNlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX25vcm1hbGl6ZWREaWZmZXJlbmNlKGJ1ZmZlcikge1xuICAgIGNvbnN0IGhhbGZCdWZmZXJTaXplID0gdGhpcy5oYWxmQnVmZmVyU2l6ZTtcbiAgICBjb25zdCB5aW5CdWZmZXIgPSB0aGlzLnlpbkJ1ZmZlcjtcbiAgICBsZXQgc3VtID0gMDtcblxuICAgIC8vIGRpZmZlcmVuY2UgZm9yIGRpZmZlcmVudCBzaGlmdCB2YWx1ZXMgKHRhdSlcbiAgICBmb3IgKGxldCB0YXUgPSAwOyB0YXUgPCBoYWxmQnVmZmVyU2l6ZTsgdGF1KyspIHtcbiAgICAgIGxldCBzcXVhcmVkRGlmZmVyZW5jZSA9IDA7IC8vIHJlc2V0IGJ1ZmZlclxuXG4gICAgICAvLyB0YWtlIGRpZmZlcmVuY2Ugb2YgdGhlIHNpZ25hbCB3aXRoIGEgc2hpZnRlZCB2ZXJzaW9uIG9mIGl0c2VsZiB0aGVuXG4gICAgICAvLyBzcWF1cmUgdGhlIHJlc3VsdFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYWxmQnVmZmVyU2l6ZTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gYnVmZmVyW2ldIC0gYnVmZmVyW2kgKyB0YXVdO1xuICAgICAgICBzcXVhcmVkRGlmZmVyZW5jZSArPSBkZWx0YSAqIGRlbHRhO1xuICAgICAgfVxuXG4gICAgICAvLyBzdGVwIDMgLSBub3JtYWxpemUgeWluQnVmZmVyXG4gICAgICBpZiAodGF1ID4gMCkge1xuICAgICAgICBzdW0gKz0gc3F1YXJlZERpZmZlcmVuY2U7XG4gICAgICAgIHlpbkJ1ZmZlclt0YXVdID0gc3F1YXJlZERpZmZlcmVuY2UgKiAodGF1IC8gc3VtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB5aW5CdWZmZXJbMF0gPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0ZXAgNCAtIGZpbmQgZmlyc3QgYmVzdCB0YXUgdGhhdCBpcyB1bmRlciB0aGUgdGhyZXNvbGQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWJzb2x1dGVUaHJlc2hvbGQoKSB7XG4gICAgY29uc3QgdGhyZXNob2xkID0gdGhpcy5wYXJhbXMuZ2V0KCd0aHJlc2hvbGQnKTtcbiAgICBjb25zdCB5aW5CdWZmZXIgPSB0aGlzLnlpbkJ1ZmZlcjtcbiAgICBjb25zdCBoYWxmQnVmZmVyU2l6ZSA9IHRoaXMuaGFsZkJ1ZmZlclNpemU7XG4gICAgbGV0IHRhdTtcblxuICAgIGZvciAodGF1ID0gMTsgdGF1IDwgaGFsZkJ1ZmZlclNpemU7IHRhdSsrKSB7XG4gICAgICBpZiAoeWluQnVmZmVyW3RhdV0gPCB0aHJlc2hvbGQpIHtcbiAgICAgICAgLy8ga2VlcCBpbmNyZWFzaW5nIHRhdSBpZiBuZXh0IHZhbHVlIGlzIGJldHRlclxuICAgICAgICB3aGlsZSAodGF1ICsgMSA8IGhhbGZCdWZmZXJTaXplICYmIHlpbkJ1ZmZlclt0YXUgKyAxXSA8IHlpbkJ1ZmZlclt0YXVdKVxuICAgICAgICAgIHRhdSArPSAxO1xuXG4gICAgICAgIC8vIGJlc3QgdGF1IGZvdW5kICwgeWluQnVmZmVyW3RhdV0gY2FuIGJlIHNlZW4gYXMgYW4gZXN0aW1hdGlvbiBvZlxuICAgICAgICAvLyBhcGVyaW9kaWNpdHkgdGhlbjogcGVyaW9kaWNpdHkgPSAxIC0gYXBlcmlvZGljaXR5XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHkgPSAxIC0geWluQnVmZmVyW3RhdV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiAtMSBpZiBub3QgbWF0Y2ggZm91bmRcbiAgICByZXR1cm4gKHRhdSA9PT0gaGFsZkJ1ZmZlclNpemUpID8gLTEgOiB0YXU7XG4gIH1cblxuICAvKipcbiAgICogU3RlcCA1IC0gRmluZCBhIGJldHRlciBmcmFjdGlvbm5hbCBhcHByb3hpbWF0ZSBvZiB0YXUuXG4gICAqIHRoaXMgY2FuIHByb2JhYmx5IGJlIHNpbXBsaWZpZWQuLi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJhYm9saWNJbnRlcnBvbGF0aW9uKHRhdUVzdGltYXRlKSB7XG4gICAgY29uc3QgaGFsZkJ1ZmZlclNpemUgPSB0aGlzLmhhbGZCdWZmZXJTaXplO1xuICAgIGNvbnN0IHlpbkJ1ZmZlciA9IHRoaXMueWluQnVmZmVyO1xuICAgIGxldCBiZXR0ZXJUYXU7XG4gICAgLy8gQG5vdGUgLSB0YXVFc3RpbWF0ZSBjYW5ub3QgYmUgemVybyBhcyB0aGUgbG9vcCBzdGFydCBhdCAxIGluIHN0ZXAgNFxuICAgIGNvbnN0IHgwID0gdGF1RXN0aW1hdGUgLSAxO1xuICAgIGNvbnN0IHgyID0gKHRhdUVzdGltYXRlIDwgaGFsZkJ1ZmZlclNpemUgLSAxKSA/IHRhdUVzdGltYXRlICsgMSA6IHRhdUVzdGltYXRlO1xuXG4gICAgLy8gaWYgYHRhdUVzdGltYXRlYCBpcyBsYXN0IGluZGV4LCB3ZSBjYW4ndCBpbnRlcnBvbGF0ZVxuICAgIGlmICh4MiA9PT0gdGF1RXN0aW1hdGUpIHtcbiAgICAgICAgYmV0dGVyVGF1ID0gdGF1RXN0aW1hdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHMwID0geWluQnVmZmVyW3gwXTtcbiAgICAgIGNvbnN0IHMxID0geWluQnVmZmVyW3RhdUVzdGltYXRlXTtcbiAgICAgIGNvbnN0IHMyID0geWluQnVmZmVyW3gyXTtcblxuICAgICAgLy8gQG5vdGUgLSBkb24ndCBmdWxseSB1bmRlcnN0YW5kIHRoaXMgZm9ybXVsYSBuZWl0aGVyLi4uXG4gICAgICBiZXR0ZXJUYXUgPSB0YXVFc3RpbWF0ZSArIChzMiAtIHMwKSAvICgyICogKDIgKiBzMSAtIHMyIC0gczApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmV0dGVyVGF1O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgYFlpbmAgb3BlcmF0b3IgaW4gYHN0YW5kYWxvbmVgIG1vZGUgKGkuZS4gb3V0c2lkZSBvZiBhIGdyYXBoKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheXxGbG9hdDMyQXJyYXl9IGlucHV0IC0gVGhlIHNpZ25hbCBmcmFnbWVudCB0byBwcm9jZXNzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBBcnJheSBjb250YWluaW5nIHRoZSBgZnJlcXVlbmN5YCwgYGVuZXJneWAsIGBwZXJpb2RpY2l0eWBcbiAgICogIGFuZCBgQUMxYFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gICAqXG4gICAqIGNvbnN0IHlpbiA9IG5ldyBsZm8ub3BlcmF0b3IuWWluKCk7XG4gICAqIHlpbi5pbml0U3RyZWFtKHtcbiAgICogICBmcmFtZVNpemU6IDIwNDgsXG4gICAqICAgZnJhbWVUeXBlOiAnc2lnbmFsJyxcbiAgICogICBzb3VyY2VTYW1wbGVSYXRlOiA0NDEwMFxuICAgKiB9KTtcbiAgICpcbiAgICogY29uc3QgcmVzdWx0cyA9IHlpbi5pbnB1dFNpZ25hbChzaWduYWwpO1xuICAgKi9cbiAgaW5wdXRTaWduYWwoaW5wdXQpIHtcbiAgICB0aGlzLnBpdGNoID0gLTE7XG4gICAgdGhpcy5wcm9iYWJpbGl0eSA9IDA7XG5cbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBjb25zdCBpbnB1dEZyYW1lU2l6ZSA9IHRoaXMuaW5wdXRGcmFtZVNpemU7XG4gICAgY29uc3QgZG93blNhbXBsaW5nRXhwID0gdGhpcy5kb3duU2FtcGxpbmdFeHA7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuZG93blNhbXBsaW5nUmF0ZTtcbiAgICBjb25zdCBvdXREYXRhID0gdGhpcy5mcmFtZS5kYXRhO1xuICAgIGxldCB0YXVFc3RpbWF0ZSA9IC0xO1xuXG4gICAgLy8gc3Vic2FtcGxpbmdcbiAgICB0aGlzLl9kb3duc2FtcGxlKGlucHV0LCBpbnB1dEZyYW1lU2l6ZSwgYnVmZmVyLCBkb3duU2FtcGxpbmdFeHApO1xuICAgIC8vIHN0ZXAgMSwgMiwgMyAtIG5vcm1hbGl6ZWQgc3F1YXJlZCBkaWZmZXJlbmNlIG9mIHRoZSBzaWduYWwgd2l0aCBhXG4gICAgLy8gc2hpZnRlZCB2ZXJzaW9uIG9mIGl0c2VsZlxuICAgIHRoaXMuX25vcm1hbGl6ZWREaWZmZXJlbmNlKGJ1ZmZlcik7XG4gICAgLy8gc3RlcCA0IC0gZmluZCBmaXJzdCBiZXN0IHRhdSBlc3RpbWF0ZSB0aGF0IGlzIG92ZXIgdGhlIHRocmVzaG9sZFxuICAgIHRhdUVzdGltYXRlID0gdGhpcy5fYWJzb2x1dGVUaHJlc2hvbGQoKTtcblxuICAgIGlmICh0YXVFc3RpbWF0ZSAhPT0gLTEpIHtcbiAgICAgIC8vIHN0ZXAgNSAtIHNvIGZhciB0YXUgaXMgYW4gaW50ZWdlciBzaGlmdCBvZiB0aGUgc2lnbmFsLCBjaGVjayBpZlxuICAgICAgLy8gdGhlcmUgaXMgYSBiZXR0ZXIgZnJhY3Rpb25uYWwgdmFsdWUgYXJvdW5kXG4gICAgICB0YXVFc3RpbWF0ZSA9IHRoaXMuX3BhcmFib2xpY0ludGVycG9sYXRpb24odGF1RXN0aW1hdGUpO1xuICAgICAgdGhpcy5waXRjaCA9IHNhbXBsZVJhdGUgLyB0YXVFc3RpbWF0ZTtcbiAgICB9XG5cbiAgICBvdXREYXRhWzBdID0gdGhpcy5waXRjaDtcbiAgICBvdXREYXRhWzFdID0gdGhpcy5wcm9iYWJpbGl0eTtcblxuICAgIHJldHVybiBvdXREYXRhO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoZnJhbWUpIHtcbiAgICB0aGlzLmlucHV0U2lnbmFsKGZyYW1lLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlpbjtcbiIsImltcG9ydCBCaXF1YWQgZnJvbSAnLi9CaXF1YWQnO1xuaW1wb3J0IERjdCBmcm9tICcuL0RjdCc7XG5pbXBvcnQgRmZ0IGZyb20gJy4vRmZ0JztcbmltcG9ydCBNYWduaXR1ZGUgZnJvbSAnLi9NYWduaXR1ZGUnO1xuaW1wb3J0IE1lYW5TdGRkZXYgZnJvbSAnLi9NZWFuU3RkZGV2JztcbmltcG9ydCBNZWwgZnJvbSAnLi9NZWwnO1xuaW1wb3J0IE1mY2MgZnJvbSAnLi9NZmNjJztcbmltcG9ydCBNaW5NYXggZnJvbSAnLi9NaW5NYXgnO1xuaW1wb3J0IE1vdmluZ0F2ZXJhZ2UgZnJvbSAnLi9Nb3ZpbmdBdmVyYWdlJztcbmltcG9ydCBNb3ZpbmdNZWRpYW4gZnJvbSAnLi9Nb3ZpbmdNZWRpYW4nO1xuaW1wb3J0IE9uT2ZmIGZyb20gJy4vT25PZmYnO1xuaW1wb3J0IFJtcyBmcm9tICcuL1Jtcyc7XG5pbXBvcnQgU2VnbWVudGVyIGZyb20gJy4vU2VnbWVudGVyJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuaW1wb3J0IFNsaWNlciBmcm9tICcuL1NsaWNlcic7XG5pbXBvcnQgWWluIGZyb20gJy4vWWluJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBCaXF1YWQsXG4gIERjdCxcbiAgRmZ0LFxuICBNYWduaXR1ZGUsXG4gIE1lYW5TdGRkZXYsXG4gIE1lbCxcbiAgTWZjYyxcbiAgTWluTWF4LFxuICBNb3ZpbmdBdmVyYWdlLFxuICBNb3ZpbmdNZWRpYW4sXG4gIE9uT2ZmLFxuICBSbXMsXG4gIFNlZ21lbnRlcixcbiAgU2VsZWN0LFxuICBTbGljZXIsXG4gIFlpbixcbn07XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvJztcblxuY29uc3QgZGVmaW5pdGlvbnMgPSB7XG4gIHByb2Nlc3NGcmFtZToge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGZpbmFsaXplU3RyZWFtOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgYnJpZGdlIGJldHdlZW4gdGhlIGdyYXBoIGFuZCBhcHBsaWNhdGlvbiBsb2dpYy4gSGFuZGxlIGBwdXNoYFxuICogYW5kIGBwdWxsYCBwYXJhZGlnbXMuXG4gKlxuICogVGhpcyBzaW5rIGNhbiBoYW5kbGUgYW55IHR5cGUgb2YgaW5wdXQgKGBzaWduYWxgLCBgdmVjdG9yYCwgYHNjYWxhcmApXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc2lua1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgZGVmYXVsdCBwYXJhbWV0ZXJzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvY2Vzc0ZyYW1lPW51bGxdIC0gQ2FsbGJhY2sgZXhlY3V0ZWQgb24gZWFjaFxuICogIGBwcm9jZXNzRnJhbWVgIGNhbGwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5maW5hbGl6ZVN0cmVhbT1udWxsXSAtIENhbGxiYWNrIGV4ZWN1dGVkIG9uIGVhY2hcbiAqICBgZmluYWxpemVTdHJlYW1gIGNhbGwuXG4gKlxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc0ZyYW1lfVxuICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5jb3JlLkJhc2VMZm8jcHJvY2Vzc1N0cmVhbVBhcmFtc31cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGZyYW1lcyA9IFtcbiAqICB7IHRpbWU6IDAsIGRhdGE6IFswLCAxXSB9LFxuICogIHsgdGltZTogMSwgZGF0YTogWzEsIDJdIH0sXG4gKiBdO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4gPSBuZXcgRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMixcbiAqICAgZnJhbWVSYXRlOiAxLFxuICogfSk7XG4gKlxuICogY29uc3QgYnJpZGdlID0gbmV3IEJyaWRnZSh7XG4gKiAgIHByb2Nlc3NGcmFtZTogKGZyYW1lKSA9PiBjb25zb2xlLmxvZyhmcmFtZSksXG4gKiB9KTtcbiAqXG4gKiBldmVudEluLmNvbm5lY3QoYnJpZGdlKTtcbiAqIGV2ZW50SW4uc3RhcnQoKTtcbiAqXG4gKiAvLyBjYWxsYmFjayBleGVjdXRlZCBvbiBlYWNoIGZyYW1lXG4gKiBldmVudEluLnByb2Nlc3NGcmFtZShmcmFtZVswXSk7XG4gKiA+IHsgdGltZTogMCwgZGF0YTogWzAsIDFdIH1cbiAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKGZyYW1lWzFdKTtcbiAqID4geyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfVxuICpcbiAqIC8vIHB1bGwgY3VycmVudCBmcmFtZSB3aGVuIG5lZWRlZFxuICogY29uc29sZS5sb2coYnJpZGdlLmZyYW1lKTtcbiAqID4geyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfVxuICovXG5jbGFzcyBCcmlkZ2UgZXh0ZW5kcyBCYXNlTGZvIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIHRoaXMucHJlcGFyZVN0cmVhbVBhcmFtcyhwcmV2U3RyZWFtUGFyYW1zKTtcbiAgICB0aGlzLnByb3BhZ2F0ZVN0cmVhbVBhcmFtcygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGZpbmFsaXplU3RyZWFtKGVuZFRpbWUpIHtcbiAgICBjb25zdCBmaW5hbGl6ZVN0cmVhbUNhbGxiYWNrID0gdGhpcy5wYXJhbXMuZ2V0KCdmaW5hbGl6ZVN0cmVhbScpO1xuXG4gICAgaWYgKGZpbmFsaXplU3RyZWFtQ2FsbGJhY2sgIT09IG51bGwpXG4gICAgICBmaW5hbGl6ZVN0cmVhbUNhbGxiYWNrKGVuZFRpbWUpO1xuICB9XG5cbiAgLy8gcHJvY2VzcyBhbnkgdHlwZVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NjYWxhcigpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzVmVjdG9yKCkge31cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTaWduYWwoKSB7fVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuXG4gICAgY29uc3QgcHJvY2Vzc0ZyYW1lQ2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ3Byb2Nlc3NGcmFtZScpO1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuZnJhbWU7XG4gICAgb3V0cHV0LmRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lU2l6ZSk7XG4gICAgLy8gcHVsbCBpbnRlcmZhY2UgKHdlIGNvcHkgZGF0YSBzaW5jZSB3ZSBkb24ndCBrbm93IHdoYXQgY291bGRcbiAgICAvLyBiZSBkb25lIG91dHNpZGUgdGhlIGdyYXBoKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplOyBpKyspXG4gICAgICBvdXRwdXQuZGF0YVtpXSA9IGZyYW1lLmRhdGFbaV07XG5cbiAgICBvdXRwdXQudGltZSA9IGZyYW1lLnRpbWU7XG4gICAgb3V0cHV0Lm1ldGFkYXRhID0gZnJhbWUubWV0YWRhdGE7XG5cbiAgICAvLyBgcHVzaGAgaW50ZXJmYWNlXG4gICAgaWYgKHByb2Nlc3NGcmFtZUNhbGxiYWNrICE9PSBudWxsKVxuICAgICAgcHJvY2Vzc0ZyYW1lQ2FsbGJhY2sob3V0cHV0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcmlkZ2U7XG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvJztcblxuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgc2VwYXJhdGVBcnJheXM6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGNhbGxiYWNrOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBudWxsYWJsZTogdHJ1ZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfSxcbiAgfSxcbn07XG5cbi8qKlxuICogUmVjb3JkIGlucHV0IGZyYW1lcyBmcm9tIGEgZ3JhcGguIFRoaXMgc2luayBjYW4gaGFuZGxlIGBzaWduYWxgLCBgdmVjdG9yYFxuICogb3IgYHNjYWxhcmAgaW5wdXRzLlxuICpcbiAqIFdoZW4gdGhlIHJlY29yZGluZyBpcyBzdG9wcGVkIChlaXRoZXIgYnkgY2FsbGluZyBgc3RvcGAgb24gdGhlIG5vZGUgb3Igd2hlblxuICogdGhlIHN0cmVhbSBpcyBmaW5hbGl6ZWQpLCB0aGUgY2FsbGJhY2sgZ2l2ZW4gYXMgcGFyYW1ldGVyIGlzIGV4ZWN1dGVkIHdpdGhcbiAqIHRoZSByZWNvcmRlciBkYXRhIGFzIGFyZ3VtZW50LlxuICpcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2VwYXJhdGVBcnJheXM9ZmFsc2VdIC0gRm9ybWF0IG9mIHRoZSByZXRyaWV2ZWRcbiAqICB2YWx1ZXM6XG4gKiAgLSB3aGVuIGBmYWxzZWAsIGZvcm1hdCBpcyBbeyB0aW1lLCBkYXRhIH0sIHsgdGltZSwgZGF0YSB9LCAuLi5dXG4gKiAgLSB3aGVuIGB0cnVlYCwgZm9ybWF0IGlzIHsgdGltZTogWy4uLl0sIGRhdGE6IFsuLi5dIH1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmNhbGxiYWNrXSAtIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBhIG5ldyByZWNvcmRcbiAqICBpcyBlbmRlZC4gVGhpcyBjYW4gaGFwcGVuIHdoZW46IGBzdG9wYCBpcyBjYWxsZWQgb24gdGhlIHJlY29yZGVyLCBvciBgc3RvcGBcbiAqICBpcyBjYWxsZWQgb24gdGhlIHNvdXJjZS5cbiAqXG4gKiBAdG9kbyAtIEFkZCBhdXRvIHJlY29yZCBwYXJhbS5cbiAqXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmNvbW1vbi5zaW5rXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgZnJhbWVUeXBlOiAndmVjdG9yJyxcbiAqICBmcmFtZVNpemU6IDIsXG4gKiAgZnJhbWVSYXRlOiAwLFxuICogfSk7XG4gKlxuICogY29uc3QgcmVjb3JkZXIgPSBuZXcgbGZvLnNpbmsuRGF0YVJlY29yZGVyKHtcbiAqICAgY2FsbGJhY2s6IChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAqIH0pO1xuICpcbiAqIGV2ZW50SW4uY29ubmVjdChyZWNvcmRlcik7XG4gKiBldmVudEluLnN0YXJ0KCk7XG4gKiByZWNvcmRlci5zdGFydCgpO1xuICpcbiAqIGV2ZW50SW4ucHJvY2VzcygwLCBbMCwgMV0pO1xuICogZXZlbnRJbi5wcm9jZXNzKDEsIFsxLCAyXSk7XG4gKlxuICogcmVjb3JkZXIuc3RvcCgpO1xuICogPiBbeyB0aW1lOiAwLCBkYXRhOiBbMCwgMV0gfSwgeyB0aW1lOiAxLCBkYXRhOiBbMSwgMl0gfV07XG4gKi9cbmNsYXNzIERhdGFSZWNvcmRlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgaWYgdGhlIG5vZGUgaXMgY3VycmVudGx5IHJlY29yZGluZy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBuYW1lIGlzUmVjb3JkaW5nXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpzaW5rLlNpZ25hbFJlY29yZGVyXG4gICAgICovXG4gICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9pbml0U3RvcmUoKSB7XG4gICAgY29uc3Qgc2VwYXJhdGVBcnJheXMgPSB0aGlzLnBhcmFtcy5nZXQoJ3NlcGFyYXRlQXJyYXlzJyk7XG5cbiAgICBpZiAoc2VwYXJhdGVBcnJheXMpXG4gICAgICB0aGlzLl9zdG9yZSA9IHsgdGltZTogW10sIGRhdGE6IFtdIH07XG4gICAgZWxzZVxuICAgICAgdGhpcy5fc3RvcmUgPSBbXTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG4gICAgdGhpcy5faW5pdFN0b3JlKCk7XG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCByZWNvcmRpbmcuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjbGllbnQuc2luay5EYXRhUmVjb3JkZXIjc3RvcH1cbiAgICovXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuaXNSZWNvcmRpbmcgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgcmVjb3JkaW5nIGFuZCBleGVjdXRlIHRoZSBjYWxsYmFjayBkZWZpbmVkIGluIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjbGllbnQuc2luay5EYXRhUmVjb3JkZXIjc3RhcnR9XG4gICAqL1xuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmlzUmVjb3JkaW5nKSB7XG4gICAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMucGFyYW1zLmdldCgnY2FsbGJhY2snKTtcblxuICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsKVxuICAgICAgICBjYWxsYmFjayh0aGlzLl9zdG9yZSk7XG5cbiAgICAgIHRoaXMuX2luaXRTdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBmaW5hbGl6ZVN0cmVhbSgpIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgfVxuXG4gIC8vIGhhbmRsZSBhbnkgaW5wdXQgdHlwZXNcbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTY2FsYXIoZnJhbWUpIHt9XG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU2lnbmFsKGZyYW1lKSB7fVxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1ZlY3RvcihmcmFtZSkge31cblxuICBwcm9jZXNzRnJhbWUoZnJhbWUpIHtcbiAgICBpZiAodGhpcy5pc1JlY29yZGluZykge1xuICAgICAgdGhpcy5wcmVwYXJlRnJhbWUoZnJhbWUpO1xuXG4gICAgICBjb25zdCBzZXBhcmF0ZUFycmF5cyA9IHRoaXMucGFyYW1zLmdldCgnc2VwYXJhdGVBcnJheXMnKTtcbiAgICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgICB0aW1lOiBmcmFtZS50aW1lLFxuICAgICAgICBkYXRhOiBuZXcgRmxvYXQzMkFycmF5KGZyYW1lLmRhdGEpLFxuICAgICAgfTtcblxuICAgICAgaWYgKCFzZXBhcmF0ZUFycmF5cykge1xuICAgICAgICB0aGlzLl9zdG9yZS5wdXNoKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnRpbWUucHVzaChlbnRyeS50aW1lKTtcbiAgICAgICAgdGhpcy5fc3RvcmUuZGF0YS5wdXNoKGVudHJ5LmRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhUmVjb3JkZXI7XG5cbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvbW1vbi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgdGltZToge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIG1ldGFkYXRhOiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG4gIHN0cmVhbVBhcmFtczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICBtZXRhczogeyBraW5kOiAnZHluYW1pYycgfVxuICB9LFxuICBmcmFtZUluZGV4OiB7XG4gICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdkeW5hbWljJyB9XG4gIH0sXG59XG5cbi8qKlxuICogTG9nIGBmcmFtZS50aW1lYCwgYGZyYW1lLmRhdGFgLCBgZnJhbWUubWV0YWRhdGFgIGFuZC9vclxuICogYHN0cmVhbUF0dHJpYnV0ZXNgIG9mIGFueSBub2RlIGluIHRoZSBjb25zb2xlLlxuICpcbiAqIFRoaXMgc2luayBjYW4gaGFuZGxlIGFueSB0eXBlIGlmIGlucHV0IChgc2lnbmFsYCwgYHZlY3RvcmAsIGBzY2FsYXJgKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVycyBkZWZhdWx0IHZhbHVlcy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudGltZT1mYWxzZV0gLSBMb2cgaW5jb21taW5nIGBmcmFtZS50aW1lYCBpZiBgdHJ1ZWAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRhdGE9ZmFsc2VdIC0gTG9nIGluY29tbWluZyBgZnJhbWUuZGF0YWAgaWYgYHRydWVgLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhZGF0YT1mYWxzZV0gLSBMb2cgaW5jb21taW5nIGBmcmFtZS5tZXRhZGF0YWBcbiAqICBpZiBgdHJ1ZWAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnN0cmVhbVBhcmFtcz1mYWxzZV0gLSBMb2cgYHN0cmVhbVBhcmFtc2Agb2YgdGhlXG4gKiAgcHJldmlvdXMgbm9kZSB3aGVuIGdyYXBoIGlzIHN0YXJ0ZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZyYW1lSW5kZXg9ZmFsc2VdIC0gTG9nIGluZGV4IG9mIHRoZSBpbmNvbW1pbmdcbiAqICBgZnJhbWVgLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29tbW9uLnNpbmtcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGxvZ2dlciA9IG5ldyBsZm8uc2luay5Mb2dnZXIoeyBkYXRhOiB0cnVlIH0pO1xuICogd2hhdGV2ZXJPcGVyYXRvci5jb25uZWN0KGxvZ2dlcik7XG4gKi9cbmNsYXNzIExvZ2dlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoZGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcykge1xuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ3N0cmVhbVBhcmFtcycpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2cocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICB0aGlzLmZyYW1lSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHByb2Nlc3NGdW5jdGlvbihmcmFtZSkge1xuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lSW5kZXgnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVJbmRleCsrKTtcblxuICAgIGlmICh0aGlzLnBhcmFtcy5nZXQoJ3RpbWUnKSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnNvbGUubG9nKGZyYW1lLnRpbWUpO1xuXG4gICAgaWYgKHRoaXMucGFyYW1zLmdldCgnZGF0YScpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2coZnJhbWUuZGF0YSk7XG5cbiAgICBpZiAodGhpcy5wYXJhbXMuZ2V0KCdtZXRhZGF0YScpID09PSB0cnVlKVxuICAgICAgY29uc29sZS5sb2coZnJhbWUubWV0YWRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2dlcjtcbiIsImltcG9ydCBCYXNlTGZvIGZyb20gJy4uLy4uL2NvbW1vbi9jb3JlL0Jhc2VMZm8nO1xuXG5jb25zdCBkZWZpbml0aW9ucyA9IHtcbiAgZHVyYXRpb246IHtcbiAgICB0eXBlOiAnZmxvYXQnLFxuICAgIGRlZmF1bHQ6IDEwLFxuICAgIG1pbjogMCxcbiAgICBtZXRhczogeyBraW5kOiAnc3RhdGljJyB9LFxuICB9LFxuICBjYWxsYmFjazoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gICAgbWV0YXM6IHsga2luZDogJ2R5bmFtaWMnIH0sXG4gIH0sXG4gIGlnbm9yZUxlYWRpbmdaZXJvczoge1xuICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIHJldHJpZXZlQXVkaW9CdWZmZXI6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGF1ZGlvQ29udGV4dDoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0sXG59O1xuXG4vKipcbiAqIFJlY29yZCBhbiBgc2lnbmFsYCBpbnB1dCBzdHJlYW0gb2YgYXJiaXRyYXJ5IGR1cmF0aW9uIGFuZCByZXRyaWV2ZSBpdFxuICogd2hlbiBkb25lLlxuICpcbiAqIFdoZW4gcmVjb3JkaW5nIGlzIHN0b3BwZWQgKGVpdGhlciB3aGVuIHRoZSBgc3RvcGAgbWV0aG9kIGlzIGNhbGxlZCwgdGhlXG4gKiBkZWZpbmVkIGR1cmF0aW9uIGhhcyBiZWVuIHJlY29yZGVkLCBvciB0aGUgc291cmNlIG9mIHRoZSBncmFwaCBmaW5hbGl6ZWRcbiAqIHRoZSBzdHJlYW0pLCB0aGUgY2FsbGJhY2sgZ2l2ZW4gYXMgcGFyYW1ldGVyIGlzIGV4ZWN1dGVkICB3aXRoIHRoZVxuICogYEF1ZGlvQnVmZmVyYCBvciBgRmxvYXQzMkFycmF5YCBjb250YWluaW5nIHRoZSByZWNvcmRlZCBzaWduYWwgYXMgYXJndW1lbnQuXG4gKlxuICogQHRvZG8gLSBhZGQgb3B0aW9uIHRvIHJldHVybiBvbmx5IHRoZSBGbG9hdDMyQXJyYXkgYW5kIG5vdCBhbiBhdWRpbyBidWZmZXJcbiAqICAobm9kZSBjb21wbGlhbnQpIGByZXRyaWV2ZUF1ZGlvQnVmZmVyOiBmYWxzZWBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5kdXJhdGlvbj0xMF0gLSBNYXhpbXVtIGR1cmF0aW9uIG9mIHRoZSByZWNvcmRpbmcuXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGEgbmV3IHJlY29yZCBpc1xuICogIGVuZGVkLiBUaGlzIGNhbiBoYXBwZW46IGBzdG9wYCBpcyBjYWxsZWQgb24gdGhlIHJlY29yZGVyLCBgc3RvcGAgaXMgY2FsbGVkXG4gKiAgb24gdGhlIHNvdXJjZSBvciB3aGVuIHRoZSBidWZmZXIgaXMgZnVsbCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGBkdXJhdGlvbmAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuaWdub3JlTGVhZGluZ1plcm9zPXRydWVdIC0gU3RhcnQgdGhlIGVmZmVjdGl2ZVxuICogIHJlY29yZGluZyBvbiB0aGUgZmlyc3Qgbm9uLXplcm8gdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJldHJpZXZlQXVkaW9CdWZmZXI9ZmFsc2VdIC0gRGVmaW5lIGlmIGFuIGBBdWRpb0J1ZmZlcmBcbiAqICBzaG91bGQgYmUgcmV0cmlldmVkIG9yIG9ubHkgdGhlIHJhdyBGbG9hdDMyQXJyYXkgb2YgZGF0YS5cbiAqICAod29ya3Mgb25seSBpbiBicm93c2VyKVxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtvcHRpb25zLmF1ZGlvQ29udGV4dD1udWxsXSAtIElmXG4gKiAgYHJldHJpZXZlQXVkaW9CdWZmZXJgIGlzIHNldCB0byBgdHJ1ZWAsIGF1ZGlvIGNvbnRleHQgdG8gYmUgdXNlZFxuICogIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgZmluYWwgYXVkaW8gYnVmZmVyLlxuICogICh3b3JrcyBvbmx5IGluIGJyb3dzZXIpXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc2lua1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgKiBhcyBsZm8gZnJvbSAnd2F2ZXMtbGZvL2NsaWVudCc7XG4gKlxuICogY29uc3QgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICpcbiAqIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAqICAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gKiAgIC50aGVuKGluaXQpXG4gKiAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuICpcbiAqIGZ1bmN0aW9uIGluaXQoc3RyZWFtKSB7XG4gKiAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICpcbiAqICAgY29uc3QgYXVkaW9Jbk5vZGUgPSBuZXcgbGZvLnNvdXJjZS5BdWRpb0luTm9kZSh7XG4gKiAgICAgc291cmNlTm9kZTogc291cmNlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICB9KTtcbiAqXG4gKiAgIGNvbnN0IHNpZ25hbFJlY29yZGVyID0gbmV3IGxmby5zaW5rLlNpZ25hbFJlY29yZGVyKHtcbiAqICAgICBkdXJhdGlvbjogNixcbiAqICAgICByZXRyaWV2ZUF1ZGlvQnVmZmVyOiB0cnVlLFxuICogICAgIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0LFxuICogICAgIGNhbGxiYWNrOiAoYnVmZmVyKSA9PiB7XG4gKiAgICAgICBjb25zdCBidWZmZXJTb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gKiAgICAgICBidWZmZXJTb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICogICAgICAgYnVmZmVyU291cmNlLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAqICAgICAgIGJ1ZmZlclNvdXJjZS5zdGFydCgpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogICBhdWRpb0luTm9kZS5jb25uZWN0KHNpZ25hbFJlY29yZGVyKTtcbiAqICAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbiAqICAgc2lnbmFsUmVjb3JkZXIuc3RhcnQoKTtcbiAqIH0pO1xuICovXG5jbGFzcyBTaWduYWxSZWNvcmRlciBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgaXMgdGhlIG5vZGUgaXMgY3VycmVudGx5IHJlY29yZGluZyBvciBub3QuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAbmFtZSBpc1JlY29yZGluZ1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Y2xpZW50LnNpbmsuU2lnbmFsUmVjb3JkZXJcbiAgICAgKi9cbiAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdCByZXRyaWV2ZUF1ZGlvQnVmZmVyID0gdGhpcy5wYXJhbXMuZ2V0KCdyZXRyaWV2ZUF1ZGlvQnVmZmVyJyk7XG4gICAgbGV0IGF1ZGlvQ29udGV4dCA9IHRoaXMucGFyYW1zLmdldCgnYXVkaW9Db250ZXh0Jyk7XG4gICAgLy8gbmVlZGVkIHRvIHJldHJpZXZlIGFuIEF1ZGlvQnVmZmVyXG4gICAgaWYgKHJldHJpZXZlQXVkaW9CdWZmZXIgJiYgYXVkaW9Db250ZXh0ID09PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhcmFtZXRlciBcImF1ZGlvQ29udGV4dFwiOiBhbiBBdWRpb0NvbnRleHQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGByZXRyaWV2ZUF1ZGlvQnVmZmVyYCBpcyBzZXQgdG8gYHRydWVgJylcblxuICAgIHRoaXMuX2F1ZGlvQ29udGV4dCA9IGF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLl9pZ25vcmVaZXJvcyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzSW5maW5pdGVCdWZmZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9zdGFjayA9IFtdO1xuICAgIHRoaXMuX2J1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5fYnVmZmVyTGVuZ3RoID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBudWxsO1xuICB9XG5cbiAgX2luaXRCdWZmZXIoKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLl9idWZmZXJMZW5ndGgpO1xuICAgIHRoaXMuX3N0YWNrLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzU3RyZWFtUGFyYW1zKHByZXZTdHJlYW1QYXJhbXMpIHtcbiAgICB0aGlzLnByZXBhcmVTdHJlYW1QYXJhbXMocHJldlN0cmVhbVBhcmFtcyk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMucGFyYW1zLmdldCgnZHVyYXRpb24nKTtcbiAgICBjb25zdCBzYW1wbGVSYXRlID0gdGhpcy5zdHJlYW1QYXJhbXMuc291cmNlU2FtcGxlUmF0ZTtcblxuICAgIGlmIChpc0Zpbml0ZShkdXJhdGlvbikpIHtcbiAgICAgIHRoaXMuX2lzSW5maW5pdGVCdWZmZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2J1ZmZlckxlbmd0aCA9IHNhbXBsZVJhdGUgKiBkdXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciA9IHRydWU7XG4gICAgICB0aGlzLl9idWZmZXJMZW5ndGggPSBzYW1wbGVSYXRlICogMTA7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdEJ1ZmZlcigpO1xuICAgIHRoaXMucHJvcGFnYXRlU3RyZWFtUGFyYW1zKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgdGhpcy5faWdub3JlWmVyb3MgPSB0aGlzLnBhcmFtcy5nZXQoJ2lnbm9yZUxlYWRpbmdaZXJvcycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgcmVjb3JkaW5nIGFuZCBleGVjdXRlIHRoZSBjYWxsYmFjayBkZWZpbmVkIGluIHBhcmFtZXRlcnMuXG4gICAqL1xuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmlzUmVjb3JkaW5nKSB7XG4gICAgICAvLyBpZ25vcmUgbmV4dCBpbmNvbW1pbmcgZnJhbWVcbiAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcmV0cmlldmVBdWRpb0J1ZmZlciA9IHRoaXMucGFyYW1zLmdldCgncmV0cmlldmVBdWRpb0J1ZmZlcicpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnBhcmFtcy5nZXQoJ2NhbGxiYWNrJyk7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLl9jdXJyZW50SW5kZXg7XG4gICAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXI7XG4gICAgICBsZXQgb3V0cHV0O1xuXG4gICAgICBpZiAoIXRoaXMuX2lzSW5maW5pdGVCdWZmZXIpIHtcbiAgICAgICAgb3V0cHV0ID0gbmV3IEZsb2F0MzJBcnJheShjdXJyZW50SW5kZXgpO1xuICAgICAgICBvdXRwdXQuc2V0KGJ1ZmZlci5zdWJhcnJheSgwLCBjdXJyZW50SW5kZXgpLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IHRoaXMuX2J1ZmZlckxlbmd0aDtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSB0aGlzLl9zdGFjaztcblxuICAgICAgICBvdXRwdXQgPSBuZXcgRmxvYXQzMkFycmF5KHN0YWNrLmxlbmd0aCAqIGJ1ZmZlckxlbmd0aCArIGN1cnJlbnRJbmRleCk7XG5cbiAgICAgICAgLy8gY29weSBhbGwgc3RhY2tlZCBidWZmZXJzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzdGFja2VkQnVmZmVyID0gc3RhY2tbaV07XG4gICAgICAgICAgb3V0cHV0LnNldChzdGFja2VkQnVmZmVyLCBidWZmZXJMZW5ndGggKiBpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY29weSBkYXRhIGNvbnRhaW5lZCBpbiBjdXJyZW50IGJ1ZmZlclxuICAgICAgICBvdXRwdXQuc2V0KGJ1ZmZlci5zdWJhcnJheSgwLCBjdXJyZW50SW5kZXgpLCBzdGFjay5sZW5ndGggKiBidWZmZXJMZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmV0cmlldmVBdWRpb0J1ZmZlciAmJiB0aGlzLl9hdWRpb0NvbnRleHQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcbiAgICAgICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGU7XG4gICAgICAgIGNvbnN0IGF1ZGlvQnVmZmVyID0gdGhpcy5fYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigxLCBsZW5ndGgsIHNhbXBsZVJhdGUpO1xuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF1ZGlvQnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgICAgICBjaGFubmVsRGF0YS5zZXQob3V0cHV0LCAwKTtcblxuICAgICAgICBjYWxsYmFjayhhdWRpb0J1ZmZlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhvdXRwdXQpO1xuICAgICAgfVxuXG4gICAgICAvLyByZWluaXQgYnVmZmVyLCBzdGFjaywgYW5kIGN1cnJlbnRJbmRleFxuICAgICAgdGhpcy5faW5pdEJ1ZmZlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBmaW5hbGl6ZVN0cmVhbShlbmRUaW1lKSB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1NpZ25hbChmcmFtZSkge1xuICAgIGlmICghdGhpcy5pc1JlY29yZGluZylcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBibG9jayA9IG51bGw7XG4gICAgY29uc3QgaW5wdXQgPSBmcmFtZS5kYXRhO1xuICAgIGNvbnN0IGJ1ZmZlckxlbmd0aCA9IHRoaXMuX2J1ZmZlckxlbmd0aDtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9idWZmZXI7XG5cbiAgICBpZiAodGhpcy5faWdub3JlWmVyb3MgPT09IGZhbHNlKSB7XG4gICAgICBibG9jayA9IG5ldyBGbG9hdDMyQXJyYXkoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gIT09IDApIHtcbiAgICAgIC8vIGZpbmQgZmlyc3QgaW5kZXggd2hlcmUgdmFsdWUgIT09IDBcbiAgICAgIGxldCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspXG4gICAgICAgIGlmIChpbnB1dFtpXSAhPT0gMCkgYnJlYWs7XG5cbiAgICAgIC8vIGNvcHkgbm9uIHplcm8gc2VnbWVudFxuICAgICAgYmxvY2sgPSBuZXcgRmxvYXQzMkFycmF5KGlucHV0LnN1YmFycmF5KGkpKTtcbiAgICAgIC8vIGRvbid0IHJlcGVhdCB0aGlzIGxvZ2ljIG9uY2UgYSBub24temVybyB2YWx1ZSBoYXMgYmVlbiBmb3VuZFxuICAgICAgdGhpcy5faWdub3JlWmVyb3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYmxvY2sgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVNwYWNlID0gYnVmZmVyTGVuZ3RoIC0gdGhpcy5fY3VycmVudEluZGV4O1xuICAgICAgbGV0IGN1cnJlbnRCbG9jaztcblxuICAgICAgaWYgKGF2YWlsYWJsZVNwYWNlIDwgYmxvY2subGVuZ3RoKVxuICAgICAgICBjdXJyZW50QmxvY2sgPSBibG9jay5zdWJhcnJheSgwLCBhdmFpbGFibGVTcGFjZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGN1cnJlbnRCbG9jayA9IGJsb2NrO1xuXG4gICAgICBidWZmZXIuc2V0KGN1cnJlbnRCbG9jaywgdGhpcy5fY3VycmVudEluZGV4KTtcbiAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCArPSBjdXJyZW50QmxvY2subGVuZ3RoO1xuXG4gICAgICBpZiAodGhpcy5faXNJbmZpbml0ZUJ1ZmZlciAmJiB0aGlzLl9jdXJyZW50SW5kZXggPT09IGJ1ZmZlckxlbmd0aCkge1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKGJ1ZmZlcik7XG5cbiAgICAgICAgY3VycmVudEJsb2NrID0gYmxvY2suc3ViYXJyYXkoYXZhaWxhYmxlU3BhY2UpO1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlckxlbmd0aCk7XG4gICAgICAgIHRoaXMuX2J1ZmZlci5zZXQoY3VycmVudEJsb2NrLCAwKTtcbiAgICAgICAgdGhpcy5fY3VycmVudEluZGV4ID0gY3VycmVudEJsb2NrLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgLy8gIHN0b3AgaWYgdGhlIGJ1ZmZlciBpcyBmaW5pdGUgYW5kIGZ1bGxcbiAgICAgIGlmICghdGhpcy5faXNJbmZpbml0ZUJ1ZmZlciAmJiB0aGlzLl9jdXJyZW50SW5kZXggPT09IGJ1ZmZlckxlbmd0aClcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbFJlY29yZGVyO1xuXG4iLCJpbXBvcnQgQmFzZUxmbyBmcm9tICcuLi8uLi9jb21tb24vY29yZS9CYXNlTGZvJztcblxuY29uc3QgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fMKgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcblxuLyoqXG4gKiBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGltZSBpbiBzZWNvbmRzIGFjY29yZGluZyB0byB0aGUgY3VycmVudFxuICogZW52aXJvbm5lbWVudCAobm9kZSBvciBicm93c2VyKS5cbiAqIElmIHJ1bm5pbmcgaW4gbm9kZSB0aGUgdGltZSByZWx5IG9uIGBwcm9jZXNzLmhydGltZWAsIHdoaWxlIGlmIGluIHRoZSBicm93c2VyXG4gKiBpdCBpcyBwcm92aWRlZCBieSB0aGUgYGN1cnJlbnRUaW1lYCBvZiBhbiBgQXVkaW9Db250ZXh0YCwgdGhpcyBjb250ZXh0IGNhblxuICogb3B0aW9ubmFseSBiZSBwcm92aWRlZCB0byBrZWVwIHRpbWUgY29uc2lzdGVuY3kgYmV0d2VlbiBzZXZlcmFsIGBFdmVudEluYFxuICogbm9kZXMuXG4gKlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFthdWRpb0NvbnRleHQ9bnVsbF0gLSBPcHRpb25uYWwgYXVkaW8gY29udGV4dC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0VGltZUZ1bmN0aW9uKGF1ZGlvQ29udGV4dCA9IG51bGwpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHQgPSBwcm9jZXNzLmhydGltZSgpO1xuICAgICAgcmV0dXJuIHRbMF0gKyB0WzFdICogMWUtOTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGF1ZGlvQ29udGV4dCA9PT0gbnVsbCB8fMKgKCFhdWRpb0NvbnRleHQgaW5zdGFuY2VvZiBBdWRpb0NvbnRleHQpKVxuICAgICAgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG4gICAgcmV0dXJuICgpID0+IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZTtcbiAgfVxufVxuXG5cbmNvbnN0IGRlZmluaXRpb25zID0ge1xuICBhYnNvbHV0ZVRpbWU6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGF1ZGlvQ29udGV4dDoge1xuICAgIHR5cGU6ICdhbnknLFxuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gICAgbnVsbGFibGU6IHRydWUsXG4gIH0sXG4gIGZyYW1lVHlwZToge1xuICAgIHR5cGU6ICdlbnVtJyxcbiAgICBsaXN0OiBbJ3NpZ25hbCcsICd2ZWN0b3InLCAnc2NhbGFyJ10sXG4gICAgZGVmYXVsdDogJ3NpZ25hbCcsXG4gICAgY29uc3RhbnQ6IHRydWUsXG4gIH0sXG4gIGZyYW1lU2l6ZToge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZWZhdWx0OiAxLFxuICAgIG1pbjogMSxcbiAgICBtYXg6ICtJbmZpbml0eSwgLy8gbm90IHJlY29tbWVuZGVkLi4uXG4gICAgbWV0YXM6IHsga2luZDogJ3N0YXRpYycgfSxcbiAgfSxcbiAgc2FtcGxlUmF0ZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiArSW5maW5pdHksIC8vIHNhbWUgaGVyZVxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGZyYW1lUmF0ZToge1xuICAgIHR5cGU6ICdmbG9hdCcsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBtaW46IDAsXG4gICAgbWF4OiArSW5maW5pdHksIC8vIHNhbWUgaGVyZVxuICAgIG51bGxhYmxlOiB0cnVlLFxuICAgIG1ldGFzOiB7IGtpbmQ6ICdzdGF0aWMnIH0sXG4gIH0sXG4gIGRlc2NyaXB0aW9uOiB7XG4gICAgdHlwZTogJ2FueScsXG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjb25zdGFudDogdHJ1ZSxcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYEV2ZW50SW5gIG9wZXJhdG9yIGFsbG93cyB0byBtYW51YWxseSBjcmVhdGUgYSBzdHJlYW0gb2YgZGF0YSBvciB0byBmZWVkXG4gKiBhIHN0cmVhbSBmcm9tIGFub3RoZXIgc291cmNlIChlLmcuIHNlbnNvcnMpIGludG8gYSBwcm9jZXNzaW5nIGdyYXBoLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3ZlcnJpZGUgcGFyYW1ldGVycycgZGVmYXVsdCB2YWx1ZXMuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZnJhbWVUeXBlPSdzaWduYWwnXSAtIFR5cGUgb2YgdGhlIGlucHV0IC0gYWxsb3dlZFxuICogdmFsdWVzOiBgc2lnbmFsYCwgIGB2ZWN0b3JgIG9yIGBzY2FsYXJgLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmZyYW1lU2l6ZT0xXSAtIFNpemUgb2YgdGhlIG91dHB1dCBmcmFtZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5zYW1wbGVSYXRlPW51bGxdIC0gU2FtcGxlIHJhdGUgb2YgdGhlIHNvdXJjZSBzdHJlYW0sXG4gKiAgaWYgb2YgdHlwZSBgc2lnbmFsYC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5mcmFtZVJhdGU9bnVsbF0gLSBSYXRlIG9mIHRoZSBzb3VyY2Ugc3RyZWFtLCBpZiBvZlxuICogIHR5cGUgYHZlY3RvcmAuXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gW29wdGlvbnMuZGVzY3JpcHRpb25dIC0gT3B0aW9ubmFsIGRlc2NyaXB0aW9uXG4gKiAgZGVzY3JpYmluZyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgb3V0cHV0IGZyYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFic29sdXRlVGltZT1mYWxzZV0gLSBEZWZpbmUgaWYgdGltZSBzaG91bGQgYmUgdXNlZFxuICogIGFzIGZvcndhcmRlZCBhcyBnaXZlbiBpbiB0aGUgcHJvY2VzcyBtZXRob2QsIG9yIHJlbGF0aXZlbHkgdG8gdGhlIHRpbWUgb2ZcbiAqICB0aGUgZmlyc3QgYHByb2Nlc3NgIGNhbGwgYWZ0ZXIgc3RhcnQuXG4gKlxuICogQG1lbWJlcm9mIG1vZHVsZTpjb21tb24uc291cmNlXG4gKlxuICogQHRvZG8gLSBBZGQgYSBgbG9naWNhbFRpbWVgIHBhcmFtZXRlciB0byB0YWcgZnJhbWUgYWNjb3JkaW5nIHRvIGZyYW1lIHJhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCAqIGFzIGxmbyBmcm9tICd3YXZlcy1sZm8vY2xpZW50JztcbiAqXG4gKiBjb25zdCBldmVudEluID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3ZlY3RvcicsXG4gKiAgIGZyYW1lU2l6ZTogMyxcbiAqICAgZnJhbWVSYXRlOiAxIC8gNTAsXG4gKiAgIGRlc2NyaXB0aW9uOiBbJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnXSxcbiAqIH0pO1xuICpcbiAqIC8vIGNvbm5lY3Qgc291cmNlIHRvIG9wZXJhdG9ycyBhbmQgc2luayhzKVxuICpcbiAqIC8vIGluaXRpYWxpemUgYW5kIHN0YXJ0IHRoZSBncmFwaFxuICogZXZlbnRJbi5zdGFydCgpO1xuICpcbiAqIC8vIGZlZWQgYGRldmljZW9yaWVudGF0aW9uYCBkYXRhIGludG8gdGhlIGdyYXBoXG4gKiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCAoZSkgPT4ge1xuICogICBjb25zdCBmcmFtZSA9IHtcbiAqICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAqICAgICBkYXRhOiBbZS5hbHBoYSwgZS5iZXRhLCBlLmdhbW1hXSxcbiAqICAgfTtcbiAqXG4gKiAgIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKGZyYW1lKTtcbiAqIH0sIGZhbHNlKTtcbiAqL1xuY2xhc3MgRXZlbnRJbiBleHRlbmRzIEJhc2VMZm8ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihkZWZpbml0aW9ucywgb3B0aW9ucyk7XG5cbiAgICBjb25zdCBhdWRpb0NvbnRleHQgPSB0aGlzLnBhcmFtcy5nZXQoJ2F1ZGlvQ29udGV4dCcpO1xuICAgIHRoaXMuX2dldFRpbWUgPSBnZXRUaW1lRnVuY3Rpb24oYXVkaW9Db250ZXh0KTtcbiAgICB0aGlzLl9pc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuICAgIHRoaXMuX3N5c3RlbVRpbWUgPSBudWxsO1xuICAgIHRoaXMuX2Fic29sdXRlVGltZSA9IHRoaXMucGFyYW1zLmdldCgnYWJzb2x1dGVUaW1lJyk7XG4gIH1cblxuICAvKipcbiAgICogUHJvcGFnYXRlIHRoZSBgc3RyZWFtUGFyYW1zYCBpbiB0aGUgZ3JhcGggYW5kIGFsbG93IHRvIHB1c2ggZnJhbWVzIGludG9cbiAgICogdGhlIGdyYXBoLiBBbnkgY2FsbCB0byBgcHJvY2Vzc2Agb3IgYHByb2Nlc3NGcmFtZWAgYmVmb3JlIGBzdGFydGAgd2lsbCBiZVxuICAgKiBpZ25vcmVkLlxuICAgKlxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNwcm9jZXNzU3RyZWFtUGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLmNvcmUuQmFzZUxmbyNyZXNldFN0cmVhbX1cbiAgICogQHNlZSB7QGxpbmsgbW9kdWxlOmNvbW1vbi5zb3VyY2UuRXZlbnRJbiNzdG9wfVxuICAgKi9cbiAgc3RhcnQoc3RhcnRUaW1lID0gbnVsbCkge1xuICAgIHRoaXMuaW5pdFN0cmVhbSgpO1xuXG4gICAgdGhpcy5fc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgIHRoaXMuX2lzU3RhcnRlZCA9IHRydWU7XG4gICAgLy8gdmFsdWVzIHNldCBpbiB0aGUgZmlyc3QgYHByb2Nlc3NgIGNhbGxcbiAgICB0aGlzLl9zeXN0ZW1UaW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5hbGl6ZSB0aGUgc3RyZWFtIGFuZCBzdG9wIHRoZSB3aG9sZSBncmFwaC4gQW55IGNhbGwgdG8gYHByb2Nlc3NgIG9yXG4gICAqIGBwcm9jZXNzRnJhbWVgIGFmdGVyIGBzdG9wYCB3aWxsIGJlIGlnbm9yZWQuXG4gICAqXG4gICAqIEBzZWUge0BsaW5rIG1vZHVsZTpjb21tb24uY29yZS5CYXNlTGZvI2ZpbmFsaXplU3RyZWFtfVxuICAgKiBAc2VlIHtAbGluayBtb2R1bGU6Y29tbW9uLnNvdXJjZS5FdmVudEluI3N0YXJ0fVxuICAgKi9cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5faXNTdGFydGVkICYmIHRoaXMuX3N0YXJ0VGltZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLl9nZXRUaW1lKCk7XG4gICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5mcmFtZS50aW1lICsgKGN1cnJlbnRUaW1lIC0gdGhpcy5fc3lzdGVtVGltZSk7XG5cbiAgICAgIHRoaXMuZmluYWxpemVTdHJlYW0oZW5kVGltZSk7XG4gICAgICB0aGlzLl9pc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcHJvY2Vzc1N0cmVhbVBhcmFtcygpIHtcbiAgICBjb25zdCBmcmFtZVNpemUgPSB0aGlzLnBhcmFtcy5nZXQoJ2ZyYW1lU2l6ZScpO1xuICAgIGNvbnN0IGZyYW1lVHlwZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVUeXBlJyk7XG4gICAgY29uc3Qgc2FtcGxlUmF0ZSA9IHRoaXMucGFyYW1zLmdldCgnc2FtcGxlUmF0ZScpO1xuICAgIGNvbnN0IGZyYW1lUmF0ZSA9IHRoaXMucGFyYW1zLmdldCgnZnJhbWVSYXRlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLnBhcmFtcy5nZXQoJ2Rlc2NyaXB0aW9uJyk7XG4gICAgLy8gaW5pdCBvcGVyYXRvcidzIHN0cmVhbSBwYXJhbXNcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVNpemUgPSBmcmFtZVR5cGUgPT09ICdzY2FsYXInID8gMSA6IGZyYW1lU2l6ZTtcbiAgICB0aGlzLnN0cmVhbVBhcmFtcy5mcmFtZVR5cGUgPSBmcmFtZVR5cGU7XG4gICAgdGhpcy5zdHJlYW1QYXJhbXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblxuICAgIGlmIChmcmFtZVR5cGUgPT09ICdzaWduYWwnKSB7XG4gICAgICBpZiAoc2FtcGxlUmF0ZSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmRlZmluZWQgXCJzYW1wbGVSYXRlXCIgZm9yIFwic2lnbmFsXCIgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBzYW1wbGVSYXRlO1xuICAgICAgdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVSYXRlID0gc2FtcGxlUmF0ZSAvIGZyYW1lU2l6ZTtcbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZUNvdW50ID0gZnJhbWVTaXplO1xuXG4gICAgfSBlbHNlIGlmIChmcmFtZVR5cGUgPT09ICd2ZWN0b3InIHx8IGZyYW1lVHlwZSA9PT0gJ3NjYWxhcicpIHtcbiAgICAgIGlmIChmcmFtZVJhdGUgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5kZWZpbmVkIFwiZnJhbWVSYXRlXCIgZm9yIFwidmVjdG9yXCIgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICAgIHRoaXMuc3RyZWFtUGFyYW1zLnNvdXJjZVNhbXBsZVJhdGUgPSBmcmFtZVJhdGU7XG4gICAgICB0aGlzLnN0cmVhbVBhcmFtcy5zb3VyY2VTYW1wbGVDb3VudCA9IDE7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wYWdhdGVTdHJlYW1QYXJhbXMoKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBwcm9jZXNzRnVuY3Rpb24oZnJhbWUpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuX2dldFRpbWUoKTtcbiAgICBjb25zdCBpbkRhdGEgPSBmcmFtZS5kYXRhLmxlbmd0aCA/IGZyYW1lLmRhdGEgOiBbZnJhbWUuZGF0YV07XG4gICAgY29uc3Qgb3V0RGF0YSA9IHRoaXMuZnJhbWUuZGF0YTtcbiAgICAvLyBpZiBubyB0aW1lIHByb3ZpZGVkLCB1c2Ugc3lzdGVtIHRpbWVcbiAgICBsZXQgdGltZSA9IE51bWJlci5pc0Zpbml0ZShmcmFtZS50aW1lKSA/IGZyYW1lLnRpbWUgOiBjdXJyZW50VGltZTtcblxuICAgIGlmICh0aGlzLl9zdGFydFRpbWUgPT09IG51bGwpXG4gICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKHRoaXMuX2Fic29sdXRlVGltZSA9PT0gZmFsc2UpXG4gICAgICB0aW1lID0gdGltZSAtIHRoaXMuX3N0YXJ0VGltZTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5zdHJlYW1QYXJhbXMuZnJhbWVTaXplOyBpIDwgbDsgaSsrKVxuICAgICAgb3V0RGF0YVtpXSA9IGluRGF0YVtpXTtcblxuICAgIHRoaXMuZnJhbWUudGltZSA9IHRpbWU7XG4gICAgdGhpcy5mcmFtZS5tZXRhZGF0YSA9IGZyYW1lLm1ldGFkYXRhO1xuICAgIC8vIHN0b3JlIGN1cnJlbnQgdGltZSB0byBjb21wdXRlIGBlbmRUaW1lYCBvbiBzdG9wXG4gICAgdGhpcy5fc3lzdGVtVGltZSA9IGN1cnJlbnRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsdGVybmF0aXZlIGludGVyZmFjZSB0byBwcm9wYWdhdGUgYSBmcmFtZSBpbiB0aGUgZ3JhcGguIFBhY2sgYHRpbWVgLFxuICAgKiBgZGF0YWAgYW5kIGBtZXRhZGF0YWAgaW4gYSBmcmFtZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lIC0gRnJhbWUgdGltZS5cbiAgICogQHBhcmFtIHtGbG9hdDMyQXJyYXl8QXJyYXl9IGRhdGEgLSBGcmFtZSBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gbWV0YWRhdGEgLSBPcHRpb25uYWwgZnJhbWUgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGV2ZW50SW4ucHJvY2VzcygxLCBbMCwgMSwgMl0pO1xuICAgKiAvLyBpcyBlcXVpdmFsZW50IHRvXG4gICAqIGV2ZW50SW4ucHJvY2Vzc0ZyYW1lKHsgdGltZTogMSwgZGF0YTogWzAsIDEsIDJdIH0pO1xuICAgKi9cbiAgcHJvY2Vzcyh0aW1lLCBkYXRhLCBtZXRhZGF0YSA9IG51bGwpIHtcbiAgICB0aGlzLnByb2Nlc3NGcmFtZSh7IHRpbWUsIGRhdGEsIG1ldGFkYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3BhZ2F0ZSBhIGZyYW1lIG9iamVjdCBpbiB0aGUgZ3JhcGguXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFtZSAtIElucHV0IGZyYW1lLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZnJhbWUudGltZSAtIEZyYW1lIHRpbWUuXG4gICAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fEFycmF5fSBmcmFtZS5kYXRhIC0gRnJhbWUgZGF0YS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtmcmFtZS5tZXRhZGF0YT11bmRlZmluZWRdIC0gT3B0aW9ubmFsIGZyYW1lIG1ldGFkYXRhLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBldmVudEluLnByb2Nlc3NGcmFtZSh7IHRpbWU6IDEsIGRhdGE6IFswLCAxLCAyXSB9KTtcbiAgICovXG4gIHByb2Nlc3NGcmFtZShmcmFtZSkge1xuICAgIGlmICghdGhpcy5faXNTdGFydGVkKSByZXR1cm47XG5cbiAgICB0aGlzLnByZXBhcmVGcmFtZSgpO1xuICAgIHRoaXMucHJvY2Vzc0Z1bmN0aW9uKGZyYW1lKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUZyYW1lKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRJbjtcbiIsIi8qKlxuICogU3luY2hyb25pemUgc2V2ZXJhbCBkaXNwbGF5IHNpbmtzIHRvIGEgY29tbW9uIHRpbWUuXG4gKlxuICogQHBhcmFtIHsuLi5CYXNlRGlzcGxheX0gdmlld3MgLSBMaXN0IG9mIHRoZSBkaXNwbGF5IHRvIHN5bmNocm9uaXplLlxuICpcbiAqIEBtZW1iZXJvZiBtb2R1bGU6dXRpbHNcbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuICpcbiAqIGNvbnN0IGV2ZW50SW4xID0gbmV3IGxmby5zb3VyY2UuRXZlbnRJbih7XG4gKiAgIGZyYW1lVHlwZTogJ3NjYWxhcicsXG4gKiAgIGZyYW1lU2l6ZTogMSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGJwZjEgPSBuZXcgbGZvLnNpbmsuQnBmRGlzcGxheSh7XG4gKiAgIGNhbnZhczogJyNicGYtMScsXG4gKiAgIGR1cmF0aW9uOiAyLFxuICogICBzdGFydFRpbWU6IDAsXG4gKiAgIG1pbjogMCxcbiAqICAgY29sb3JzOiBbJ3N0ZWVsYmx1ZSddLFxuICogfSk7XG4gKlxuICogZXZlbnRJbjEuY29ubmVjdChicGYxKTtcbiAqXG4gKiBjb25zdCBldmVudEluMiA9IG5ldyBsZm8uc291cmNlLkV2ZW50SW4oe1xuICogICBmcmFtZVR5cGU6ICdzY2FsYXInLFxuICogICBmcmFtZVNpemU6IDEsXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBicGYyID0gbmV3IGxmby5zaW5rLkJwZkRpc3BsYXkoe1xuICogICBjYW52YXM6ICcjYnBmLTInLFxuICogICBkdXJhdGlvbjogMixcbiAqICAgc3RhcnRUaW1lOiA3LFxuICogICBtaW46IDAsXG4gKiAgIGNvbG9yczogWydvcmFuZ2UnXSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGRpc3BsYXlTeW5jID0gbmV3IGxmby51dGlscy5EaXNwbGF5U3luYyhicGYxLCBicGYyKTtcbiAqXG4gKiBldmVudEluMi5jb25uZWN0KGJwZjIpO1xuICpcbiAqIGV2ZW50SW4xLnN0YXJ0KCk7XG4gKiBldmVudEluMi5zdGFydCgpO1xuICpcbiAqIGxldCB0aW1lID0gMDtcbiAqIGNvbnN0IHBlcmlvZCA9IDAuNDtcbiAqIGNvbnN0IG9mZnNldCA9IDcuMjtcbiAqXG4gKiAoZnVuY3Rpb24gZ2VuZXJhdGVEYXRhKCkge1xuICogICBjb25zdCB2ID0gTWF0aC5yYW5kb20oKTtcbiAqXG4gKiAgIGV2ZW50SW4xLnByb2Nlc3ModGltZSwgdik7XG4gKiAgIGV2ZW50SW4yLnByb2Nlc3ModGltZSArIG9mZnNldCwgdik7XG4gKlxuICogICB0aW1lICs9IHBlcmlvZDtcbiAqXG4gKiAgIHNldFRpbWVvdXQoZ2VuZXJhdGVEYXRhLCBwZXJpb2QgKiAxMDAwKTtcbiAqIH0oKSk7XG4gKi9cbmNsYXNzIERpc3BsYXlTeW5jIHtcbiAgY29uc3RydWN0b3IoLi4udmlld3MpIHtcbiAgICB0aGlzLnZpZXdzID0gW107XG5cbiAgICB0aGlzLmFkZCguLi52aWV3cyk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYWRkKC4uLnZpZXdzKSB7XG4gICAgdmlld3MuZm9yRWFjaCh2aWV3ID0+IHRoaXMuaW5zdGFsbCh2aWV3KSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgaW5zdGFsbCh2aWV3KSB7XG4gICAgdGhpcy52aWV3cy5wdXNoKHZpZXcpO1xuXG4gICAgdmlldy5kaXNwbGF5U3luYyA9IHRoaXM7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgc2hpZnRTaWJsaW5ncyhpU2hpZnQsIHRpbWUsIHZpZXcpIHtcbiAgICB0aGlzLnZpZXdzLmZvckVhY2goZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgaWYgKGRpc3BsYXkgIT09IHZpZXcpXG4gICAgICAgIGRpc3BsYXkuc2hpZnRDYW52YXMoaVNoaWZ0LCB0aW1lKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5U3luYztcbiIsImltcG9ydCBEaXNwbGF5U3luYyBmcm9tICcuL0Rpc3BsYXlTeW5jJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBEaXNwbGF5U3luYyxcbn07XG4iLCJjb25zdCBjb2xvcnMgPSBbJyM0NjgyQjQnLCAnI2ZmYTUwMCcsICcjMDBlNjAwJywgJyNmZjAwMDAnLCAnIzgwMDA4MCcsICcjMjI0MTUzJ107XG5cbmV4cG9ydCBjb25zdCBnZXRDb2xvcnMgPSBmdW5jdGlvbih0eXBlLCBuYnIpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc2lnbmFsJzpcbiAgICAgIHJldHVybiBjb2xvcnNbMF07IC8vIHN0ZWVsYmx1ZVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYnBmJzpcbiAgICAgIGlmIChuYnIgPD0gY29sb3JzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gY29sb3JzLnNsaWNlKDAsIG5icik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBfY29sb3JzID0gY29sb3JzLnNsaWNlKDApO1xuICAgICAgICB3aGlsZSAoX2NvbG9ycy5sZW5ndGggPCBuYnIpXG4gICAgICAgICAgX2NvbG9ycy5wdXNoKGdldFJhbmRvbUNvbG9yKCkpO1xuXG4gICAgICAgIHJldHVybiBfY29sb3JzO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnd2F2ZWZvcm0nOlxuICAgICAgcmV0dXJuIFtjb2xvcnNbMF0sIGNvbG9yc1s1XV07IC8vIHN0ZWVsYmx1ZSAvIGRhcmtibHVlXG4gICAgICBicmVhaztcbiAgICBjYXNlICdtYXJrZXInOlxuICAgICAgcmV0dXJuIGNvbG9yc1szXTsgLy8gcmVkXG4gICAgICBicmVhaztcbiAgICBjYXNlICdzcGVjdHJ1bSc6XG4gICAgICByZXR1cm4gY29sb3JzWzJdOyAvLyBncmVlblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndHJhY2UnOlxuICAgICAgcmV0dXJuIGNvbG9yc1sxXTsgLy8gb3JhbmdlXG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDg0NTA2L3JhbmRvbS1jb2xvci1nZW5lcmF0b3ItaW4tamF2YXNjcmlwdFxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbUNvbG9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnLnNwbGl0KCcnKTtcbiAgdmFyIGNvbG9yID0gJyMnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKyApIHtcbiAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV07XG4gIH1cbiAgcmV0dXJuIGNvbG9yO1xufTtcblxuLy8gc2NhbGUgZnJvbSBkb21haW4gWzAsIDFdIHRvIHJhbmdlIFsyNzAsIDBdIHRvIGNvbnN1bWUgaW5cbi8vIGhzbCh4LCAxMDAlLCA1MCUpIGNvbG9yIHNjaGVtZVxuZXhwb3J0IGNvbnN0IGdldEh1ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgdmFyIGRvbWFpbk1pbiA9IDA7XG4gIHZhciBkb21haW5NYXggPSAxO1xuICB2YXIgcmFuZ2VNaW4gPSAyNzA7XG4gIHZhciByYW5nZU1heCA9IDA7XG5cbiAgcmV0dXJuICgoKHJhbmdlTWF4IC0gcmFuZ2VNaW4pICogKHggLSBkb21haW5NaW4pKSAvIChkb21haW5NYXggLSBkb21haW5NaW4pKSArIHJhbmdlTWluO1xufTtcblxuZXhwb3J0IGNvbnN0IGhleFRvUkdCID0gZnVuY3Rpb24oaGV4KSB7XG4gIGhleCA9IGhleC5zdWJzdHJpbmcoMSwgNyk7XG4gIHZhciByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpO1xuICB2YXIgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgdmFyIGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNik7XG4gIHJldHVybiBbciwgZywgYl07XG59O1xuIiwiXG4vLyBzaG9ydGN1dHMgLyBoZWxwZXJzXG5jb25zdCBQSSAgID0gTWF0aC5QSTtcbmNvbnN0IGNvcyAgPSBNYXRoLmNvcztcbmNvbnN0IHNpbiAgPSBNYXRoLnNpbjtcbmNvbnN0IHNxcnQgPSBNYXRoLnNxcnQ7XG5cbi8vIHdpbmRvdyBjcmVhdGlvbiBmdW5jdGlvbnNcbmZ1bmN0aW9uIGluaXRIYW5uV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKSB7XG4gIGxldCBsaW5TdW0gPSAwO1xuICBsZXQgcG93U3VtID0gMDtcbiAgY29uc3Qgc3RlcCA9IDIgKiBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IDAuNSAtIDAuNSAqIGNvcyhwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdEhhbW1pbmdXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbGV0IGxpblN1bSA9IDA7XG4gIGxldCBwb3dTdW0gPSAwO1xuICBjb25zdCBzdGVwID0gMiAqIFBJIC8gc2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGNvbnN0IHBoaSA9IGkgKiBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gMC41NCAtIDAuNDYgKiBjb3MocGhpKTtcblxuICAgIGJ1ZmZlcltpXSA9IHZhbHVlO1xuXG4gICAgbGluU3VtICs9IHZhbHVlO1xuICAgIHBvd1N1bSArPSB2YWx1ZSAqIHZhbHVlO1xuICB9XG5cbiAgbm9ybUNvZWZzLmxpbmVhciA9IHNpemUgLyBsaW5TdW07XG4gIG5vcm1Db2Vmcy5wb3dlciA9IHNxcnQoc2l6ZSAvIHBvd1N1bSk7XG59XG5cbmZ1bmN0aW9uIGluaXRCbGFja21hbldpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IHN0ZXAgPSAyICogUEkgLyBzaXplO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgY29uc3QgcGhpID0gaSAqIHN0ZXA7XG4gICAgY29uc3QgdmFsdWUgPSAwLjQyIC0gMC41ICogY29zKHBoaSkgKyAwLjA4ICogY29zKDIgKiBwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdEJsYWNrbWFuSGFycmlzV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKSB7XG4gIGxldCBsaW5TdW0gPSAwO1xuICBsZXQgcG93U3VtID0gMDtcbiAgY29uc3QgYTAgPSAwLjM1ODc1O1xuICBjb25zdCBhMSA9IDAuNDg4Mjk7XG4gIGNvbnN0IGEyID0gMC4xNDEyODtcbiAgY29uc3QgYTMgPSAwLjAxMTY4O1xuICBjb25zdCBzdGVwID0gMiAqIFBJIC8gc2l6ZTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgIGNvbnN0IHBoaSA9IGkgKiBzdGVwO1xuICAgIGNvbnN0IHZhbHVlID0gYTAgLSBhMSAqIGNvcyhwaGkpICsgYTIgKiBjb3MoMiAqIHBoaSk7IC0gYTMgKiBjb3MoMyAqIHBoaSk7XG5cbiAgICBidWZmZXJbaV0gPSB2YWx1ZTtcblxuICAgIGxpblN1bSArPSB2YWx1ZTtcbiAgICBwb3dTdW0gKz0gdmFsdWUgKiB2YWx1ZTtcbiAgfVxuXG4gIG5vcm1Db2Vmcy5saW5lYXIgPSBzaXplIC8gbGluU3VtO1xuICBub3JtQ29lZnMucG93ZXIgPSBzcXJ0KHNpemUgLyBwb3dTdW0pO1xufVxuXG5mdW5jdGlvbiBpbml0U2luZVdpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBsZXQgbGluU3VtID0gMDtcbiAgbGV0IHBvd1N1bSA9IDA7XG4gIGNvbnN0IHN0ZXAgPSBQSSAvIHNpemU7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBjb25zdCBwaGkgPSBpICogc3RlcDtcbiAgICBjb25zdCB2YWx1ZSA9IHNpbihwaGkpO1xuXG4gICAgYnVmZmVyW2ldID0gdmFsdWU7XG5cbiAgICBsaW5TdW0gKz0gdmFsdWU7XG4gICAgcG93U3VtICs9IHZhbHVlICogdmFsdWU7XG4gIH1cblxuICBub3JtQ29lZnMubGluZWFyID0gc2l6ZSAvIGxpblN1bTtcbiAgbm9ybUNvZWZzLnBvd2VyID0gc3FydChzaXplIC8gcG93U3VtKTtcbn1cblxuZnVuY3Rpb24gaW5pdFJlY3RhbmdsZVdpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKylcbiAgICBidWZmZXJbaV0gPSAxO1xuXG4gIC8vIEB0b2RvIC0gY2hlY2sgaWYgdGhlc2UgYXJlIHByb3BlciB2YWx1ZXNcbiAgbm9ybUNvZWZzLmxpbmVhciA9IDE7XG4gIG5vcm1Db2Vmcy5wb3dlciA9IDE7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYnVmZmVyIHdpdGggd2luZG93IHNpZ25hbC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIHdpbmRvdy5cbiAqIEBwYXJhbSB7RmxvYXQzMkFycmF5fSBidWZmZXIgLSBCdWZmZXIgdG8gYmUgcG9wdWxhdGVkIHdpdGggdGhlIHdpbmRvdyBzaWduYWwuXG4gKiBAcGFyYW0ge051bWJlcn0gc2l6ZSAtIFNpemUgb2YgdGhlIGJ1ZmZlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBub3JtQ29lZnMgLSBPYmplY3QgdG8gYmUgcG9wdWxhdGVkIHdpdGggdGhlIG5vcm1haWx6YXRpb25cbiAqICBjb2VmZmljaWVudHMuXG4gKi9cbmZ1bmN0aW9uIGluaXRXaW5kb3cobmFtZSwgYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpIHtcbiAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdoYW5uJzpcbiAgICBjYXNlICdoYW5uaW5nJzpcbiAgICAgIGluaXRIYW5uV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2hhbW1pbmcnOlxuICAgICAgaW5pdEhhbW1pbmdXaW5kb3coYnVmZmVyLCBzaXplLCBub3JtQ29lZnMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmxhY2ttYW4nOlxuICAgICAgaW5pdEJsYWNrbWFuV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JsYWNrbWFuaGFycmlzJzpcbiAgICAgIGluaXRCbGFja21hbkhhcnJpc1dpbmRvdyhidWZmZXIsIHNpemUsIG5vcm1Db2Vmcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzaW5lJzpcbiAgICAgIGluaXRTaW5lV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlY3RhbmdsZSc6XG4gICAgICBpbml0UmVjdGFuZ2xlV2luZG93KGJ1ZmZlciwgc2l6ZSwgbm9ybUNvZWZzKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRXaW5kb3c7XG5cblxuIiwiaW1wb3J0ICogYXMgbGZvIGZyb20gJ3dhdmVzLWxmby9jbGllbnQnO1xuXG5jb25zdCBBdWRpb0NvbnRleHQgPSAod2luZG93LkF1ZGlvQ29udGV4dCB8fMKgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCk7XG5jb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbm5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pXG4gIC50aGVuKGluaXQpXG4gIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKGVyci5zdGFjaykpO1xuXG5mdW5jdGlvbiBpbml0KHN0cmVhbSkge1xuICBjb25zdCBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcblxuICBjb25zdCBhdWRpb0luTm9kZSA9IG5ldyBsZm8uc291cmNlLkF1ZGlvSW5Ob2RlKHtcbiAgICBzb3VyY2VOb2RlOiBzb3VyY2UsXG4gICAgYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQsXG4gIH0pO1xuXG4gIGNvbnN0IHNsaWNlciA9IG5ldyBsZm8ub3BlcmF0b3IuU2xpY2VyKHtcbiAgICBmcmFtZVNpemU6IDIwNDgsXG4gICAgaG9wU2l6ZTogMjA0OCxcbiAgfSk7XG5cbiAgY29uc3QgeWluID0gbmV3IGxmby5vcGVyYXRvci5ZaW4oKTtcblxuICBjb25zdCBzZWxlY3QgPSBuZXcgbGZvLm9wZXJhdG9yLlNlbGVjdCh7XG4gICAgaW5kZXg6IDAsXG4gIH0pO1xuXG4gIGNvbnN0IGJwZkRpc3BsYXkgPSBuZXcgbGZvLnNpbmsuQnBmRGlzcGxheSh7XG4gICAgY2FudmFzOiAnI3lpbicsXG4gICAgbWluOiAwLFxuICAgIG1heDogMjAwMCxcbiAgICBkdXJhdGlvbjogMTAsXG4gIH0pO1xuXG4gIGF1ZGlvSW5Ob2RlLmNvbm5lY3Qoc2xpY2VyKTtcbiAgc2xpY2VyLmNvbm5lY3QoeWluKTtcbiAgeWluLmNvbm5lY3Qoc2VsZWN0KTtcbiAgc2VsZWN0LmNvbm5lY3QoYnBmRGlzcGxheSk7XG5cbiAgYXVkaW9Jbk5vZGUuc3RhcnQoKTtcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cxMFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9udW1iZXIvaXMtZmluaXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9nZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX2dldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFByb3RvdHlwZU9mKTtcblxudmFyIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9ICgwLCBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yMi5kZWZhdWx0KShvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMTAnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk1hdGgubG9nMTA7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYubnVtYmVyLmlzLWZpbml0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuTnVtYmVyLmlzRmluaXRlOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7IiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07IiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59OyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpOyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwiLy8gMjAuMi4yLjIxIE1hdGgubG9nMTAoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMTA6IGZ1bmN0aW9uIGxvZzEwKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4xMDtcbiAgfVxufSk7IiwiLy8gMjAuMS4yLjIgTnVtYmVyLmlzRmluaXRlKG51bWJlcilcbnZhciAkZXhwb3J0ICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIF9pc0Zpbml0ZSA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmlzRmluaXRlO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ051bWJlcicsIHtcbiAgaXNGaW5pdGU6IGZ1bmN0aW9uIGlzRmluaXRlKGl0KXtcbiAgICByZXR1cm4gdHlwZW9mIGl0ID09ICdudW1iZXInICYmIF9pc0Zpbml0ZShpdCk7XG4gIH1cbn0pOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCIvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG52YXIgdG9JT2JqZWN0ICAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmY7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0lPYmplY3QoaXQpLCBrZXkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pOyIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufSJdfQ==
