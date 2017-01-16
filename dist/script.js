(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SafeForamt = function () {
  function SafeForamt() {
    var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SafeForamt);
  }

  _createClass(SafeForamt, [{
    key: 'encode',
    value: function encode(obj) {
      var HEAD_SAFE = 'safe';
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

      ret = this.join(HEAD_SAFE, rightStr);

      return ret;
    }
  }, {
    key: 'encodeArray',
    value: function encodeArray(arr) {
      var ret = '';

      if (arr == null) {
        ret = this.encodePrimitive(null);
        return ret;
      } else if (arr.length === 0) {
        ret = arr[0];
        return this.encodePrimitive(ret);
      }if (arr.length === 1) {
        ret = this.encodePrimitive(arr[0]);
        return ret;
      }

      var head = 'array';

      var first = arr[0];
      var rest = arr.slice(1);

      var left = this.encodePrimitive(first);
      var right = this.encodeArray(rest);

      if (right) {
        ret = this.join(left, right);
      } else {
        ret = left;
      }

      return ret;
    }
  }, {
    key: 'encodeObject',
    value: function encodeObject(obj) {
      var ret = '';

      var keys = Object.keys(obj);

      if (obj == null) {
        return this.encodePrimitive(null);
      } else if (keys.length === 0) {
        return this.encodePrimitive(undefined);
      } else if (keys.length === 1) {
        return this.encodeKeyValue(keys[0], this.encodePrimitive(obj[keys[0]]));
      }

      var head = 'object';

      var left = this.encodeKeyValue(keys[0], this.encodePrimitive(obj[keys[0]]));

      var objRest = {};

      var rest = keys.slice(1).forEach(function (key) {
        objRest[key] = obj[key];
      });

      var right = this.encodeObject(objRest);

      if (right) {
        ret = this.join(left, right);
      } else {
        ret = left;
      }

      return ret;
    }
  }, {
    key: 'encodeKeyValue',
    value: function encodeKeyValue(key, value) {
      return this.join(key, value);
    }
  }, {
    key: 'join',
    value: function join(leftStr, rightStr) {
      var delimiter = '-';

      var len = Math.max(this.getLongest(leftStr), this.getLongest(rightStr)) + 1;

      return leftStr + this.constantSpace(len) + rightStr;
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
      var delimiter = '-';

      var longest = 0;

      var len = str.length;
      var i = void 0;
      var longTmp = 0;

      for (i = 0; i < len; i++) {
        if (str[i] === delimiter) {
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
      var delimiter = '-';

      var ret = '';
      var i = void 0;

      for (i = 0; i < len; i++) {
        ret += delimiter;
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
          return 'boolean-true';
        }
        if (boole === false) {
          return 'boolean-false';
        }
      } else if (typeof variable === 'number') {
        return 'number-' + {
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
        return 'string-' + variable;
      } else {
        return true;
      }
    }
  }]);

  return SafeForamt;
}();

exports.default = SafeForamt;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SafeFormat = require('./module/SafeFormat');

var _SafeFormat2 = _interopRequireDefault(_SafeFormat);

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

        var safeFormat = new _SafeFormat2.default();

        if (type === 'safe-format') {
          return safeFormat.encode(obj);
        }
      }
    }]);

    return Safe;
  }();

  // export


  global.Safe = Safe;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./module/SafeFormat":1}]},{},[2]);
