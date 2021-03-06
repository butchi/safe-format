(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SafeDecoder = function () {
  function SafeDecoder() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SafeDecoder);

    this.delimiter = opts.delimiter || '-';
  }

  _createClass(SafeDecoder, [{
    key: 'decode',
    value: function decode(str) {
      var ret = this.decodeChild(str);

      return ret;
    }

    // from markright.js#branch

  }, {
    key: 'decodeChild',
    value: function decodeChild(str) {
      var _this = this;

      var isSafe = false;
      var ret = void 0;

      if (str.indexOf(this.delimiter) !== -1) {
        (function () {
          var mode = void 0;

          _this.splitStr(str).forEach(function (elm, i) {
            if (i === 0 && elm.indexOf(_this.delimiter) === -1) {
              if (elm == null) {} else if (elm === 'safe') {
                isSafe = true;

                mode = elm;
              } else if (elm === 'null') {
                mode = elm;

                ret = null;
              } else if (elm === 'undefined') {
                mode = elm;

                ret = undefined;
              } else if (elm === 'boolean') {
                mode = elm;
              } else if (elm === 'number') {
                mode = elm;
              } else if (elm === 'string') {
                mode = elm;

                ret = '';
              } else if (elm === 'array') {
                mode = elm;

                ret = [];
              } else if (elm === 'object') {
                mode = elm;

                ret = {};
              }
            } else {
              if (mode === 'safe') {
                ret = _this.decodeChild(elm, mode);
              }

              if (mode === 'boolean') {
                ret = elm;
              }

              if (mode === 'number') {
                ret = {
                  'zero': 0,
                  'one': 1,
                  'two': 2,
                  'three': 3,
                  'four': 4,
                  'five': 5,
                  'six': 6,
                  'seven': 7,
                  'eight': 8,
                  'nine': 9
                }[elm];
              }

              if (mode === 'string') {
                ret += elm;
              }

              if (mode === 'array') {
                if (elm.indexOf(_this.delimiter) !== -1) {
                  ret = _this.decodeArr(elm);
                } else {}
              }

              if (mode === 'object') {
                if (elm.indexOf(_this.delimiter) !== -1) {
                  ret = _this.decodeObj(elm);
                } else {}
              }
            }
          });
        })();
      } else {
        ret = str;
      }

      return ret;
    }
  }, {
    key: 'decodeArr',
    value: function decodeArr(str) {
      var _this2 = this;

      var ret = [];

      this.splitStr(str).forEach(function (elm) {
        ret.push(_this2.decodeChild(elm));
      });

      return ret;
    }
  }, {
    key: 'decodeObj',
    value: function decodeObj(str) {
      var _this3 = this;

      var ret = {};

      this.splitStr(str).forEach(function (elm) {
        var keyVal = _this3.splitStr(elm);

        var key = keyVal[0];
        var val = keyVal[1];

        ret[key] = _this3.decodeChild(val);
      });

      return ret;
    }

    // from markright.js

  }, {
    key: 'splitStr',
    value: function splitStr(str) {
      var res = void 0;
      var longest = this.getLongest(str);

      res = str.split(this.constantSpace(longest));

      return res;
    }

    // from markright.js

  }, {
    key: 'getLongest',
    value: function getLongest(str) {
      var longest = 0;

      var len = str.length;
      var i = void 0;
      var longTmp = 0;

      for (i = 0; i < len; i++) {
        if (str[i] === this.delimiter) {
          longTmp++;
        } else {
          longTmp = 0;
        }

        longest = Math.max(longest, longTmp);
      }

      return longest;
    }
  }, {
    key: 'constantSpace',
    value: function constantSpace(len) {
      var ret = '';
      var i = void 0;

      for (i = 0; i < len; i++) {
        ret += this.delimiter;
      }

      return ret;
    }
  }]);

  return SafeDecoder;
}();

exports.default = SafeDecoder;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SafeEncoder = function () {
  function SafeEncoder() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SafeEncoder);

    this.delimiter = opts.delimiter || '-';
  }

  _createClass(SafeEncoder, [{
    key: 'encode',
    value: function encode(obj) {
      var HEAD_SAFE = 'safe';
      var rightStr = '';
      var ret = '';

      rightStr = this.encodeChild(obj);

      ret = this.join(HEAD_SAFE, rightStr);

      return ret;
    }
  }, {
    key: 'encodeChild',
    value: function encodeChild(obj) {
      var rightStr = '';
      var ret = '';

      if (obj === null) {
        rightStr = this.encodePrimitive(obj);
      } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        if (obj instanceof Array) {
          var HEAD_ARRAY = 'array';

          var arr = obj;

          rightStr = this.join(HEAD_ARRAY, this.encodeArray(arr));
        } else {
          var HEAD_OBJECT = 'object';

          rightStr = this.join(HEAD_OBJECT, this.encodeObject(obj));
        }
      } else {
        var variable = obj;
        rightStr = this.encodePrimitive(variable);
      }

      ret = rightStr;

      return ret;
    }
  }, {
    key: 'encodeArray',
    value: function encodeArray(arr) {
      var _this = this;

      var ret = '';

      if (arr === null) {
        return this.encodePrimitive(null);
      }
      if (arr.length === 0) {
        return this.encodePrimitive(undefined);
      }

      var strArr = [];

      arr.forEach(function (item, i) {
        strArr[i] = _this.encodeChild(item);
      });

      ret = this.join.apply(this, strArr);

      return ret;
    }
  }, {
    key: 'encodeObject',
    value: function encodeObject(obj) {
      var _this2 = this;

      var ret = '';

      var keys = Object.keys(obj);

      if (obj == null) {
        return this.encodePrimitive(null);
      }
      if (keys.length === 0) {
        return this.encodePrimitive(undefined);
      }

      var strArr = [];

      keys.forEach(function (key, i) {
        strArr[i] = _this2.encodeKeyValue(key, _this2.encodeChild(obj[key]));
      });

      ret = this.join.apply(this, strArr);

      return ret;
    }
  }, {
    key: 'encodeKeyValue',
    value: function encodeKeyValue(key, value) {
      return this.join(key, value);
    }
  }, {
    key: 'join',
    value: function join() {
      var _this3 = this;

      var longestArr = [];

      for (var _len = arguments.length, strArr = Array(_len), _key = 0; _key < _len; _key++) {
        strArr[_key] = arguments[_key];
      }

      strArr.forEach(function (str) {
        longestArr.push(_this3.getLongest(str));
      });

      var len = Math.max.apply(Math, longestArr);

      return strArr.join(this.constantSpace(len + 1));
    }

    // from markright.js

  }, {
    key: 'getLongest',
    value: function getLongest(str) {
      var longest = 0;

      var len = str.length;
      var i = void 0;
      var longTmp = 0;

      for (i = 0; i < len; i++) {
        if (str[i] === this.delimiter) {
          longTmp++;
        } else {
          longTmp = 0;
        }

        longest = Math.max(longest, longTmp);
      }

      return longest;
    }

    // from markright.js

  }, {
    key: 'constantSpace',
    value: function constantSpace(len) {
      var ret = '';
      var i = void 0;

      for (i = 0; i < len; i++) {
        ret += this.delimiter;
      }

      return ret;
    }
  }, {
    key: 'encodePrimitive',
    value: function encodePrimitive(variable) {
      if (variable === null) {
        return 'null';
      } else if (typeof variable === 'undefined') {
        return 'undefined';
      } else if (typeof variable === 'boolean') {
        var boole = variable;

        if (boole === true) {
          return 'boolean' + this.delimiter + 'true';
        }
        if (boole === false) {
          return 'boolean' + this.delimiter + 'false';
        }
      } else if (typeof variable === 'number') {
        return 'number' + this.delimiter + {
          0: 'zero',
          1: 'one',
          2: 'two',
          3: 'three',
          4: 'four',
          5: 'five',
          6: 'six',
          7: 'seven',
          8: 'eight',
          9: 'nine'
        }[variable];
      } else if (typeof variable === 'string') {
        return 'string' + this.delimiter + variable;
      } else {
        return true;
      }
    }
  }]);

  return SafeEncoder;
}();

exports.default = SafeEncoder;

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SafeEncoder = require('./module/SafeEncoder');

var _SafeEncoder2 = _interopRequireDefault(_SafeEncoder);

var _SafeDecoder = require('./module/SafeDecoder');

var _SafeDecoder2 = _interopRequireDefault(_SafeDecoder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Safe = function () {
    function Safe(option) {
      _classCallCheck(this, Safe);
    }

    _createClass(Safe, [{
      key: 'encode',
      value: function encode() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var type = opts.type || 'safe-format';
        var obj = opts.obj;
        var delimiter = opts.delimiter || '-';

        var safeEncoder = new _SafeEncoder2.default({
          delimiter: delimiter
        });

        if (type === 'safe-format') {
          return safeEncoder.encode(obj);
        }
      }
    }, {
      key: 'decode',
      value: function decode() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var type = opts.type || 'safe-format';
        var str = opts.str;
        var delimiter = opts.delimiter || '-';

        var safeDecoder = new _SafeDecoder2.default({
          delimiter: delimiter
        });

        if (type === 'safe-format') {
          return safeDecoder.decode(str);
        }
      }
    }]);

    return Safe;
  }();

  // export


  global.Safe = Safe;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./module/SafeDecoder":1,"./module/SafeEncoder":2}]},{},[3]);
