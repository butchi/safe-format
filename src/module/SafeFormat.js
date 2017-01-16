export default class SafeForamt {
  constructor(_opts = {}) {
  }

  encode(obj) {
    const HEAD_SAFE = 'safe';
    let rightStr = '';
    let ret = '';

    rightStr = this.encodeChild(obj);

    ret = this.join(HEAD_SAFE, rightStr);

    return ret;
  }

  encodeChild(obj) {
    let rightStr = '';
    let ret = '';

    if(obj === null) {
      rightStr = this.encodePrimitive(obj);
    } else if(typeof obj === 'object') {
      if(obj instanceof Array) {
        const HEAD_ARRAY = 'array';

        let arr = obj;

        rightStr = this.join(HEAD_ARRAY, this.encodeArray(arr));
      } else {
        const HEAD_OBJECT = 'object';

        rightStr = this.join(HEAD_OBJECT, this.encodeObject(obj));
      }
    } else {
      let variable = obj;
      rightStr = this.encodePrimitive(variable);
    }

    ret = rightStr;

    return ret;
  }

  encodeArray(arr) {
    let ret = '';

    if(arr == null) {
      ret = this.encodePrimitive(null);
      return ret;
    } else if(arr.length === 0) {
      ret = arr[0];
      return this.encodePrimitive(ret);
    } if(arr.length === 1) {
      ret = this.encodePrimitive(arr[0]);
      return ret;
    }

    const head = 'array';

    const first = arr[0];
    const rest = arr.slice(1);

    const left = this.encodeChild(first);
    const right = this.encodeArray(rest);

    if(right) {
      ret = this.join(left, right);
    } else {
      ret = left;
    }

    return ret;
  }

  encodeObject(obj) {
    let ret = '';

    let keys = Object.keys(obj);

    if(obj == null) {
      return this.encodePrimitive(null);
    } else if(keys.length === 0) {
      return this.encodePrimitive(undefined);
    } else if(keys.length === 1) {
      return this.encodeKeyValue(keys[0], this.encodeChild(obj[keys[0]]));
    }

    const head = 'object';

    const left = this.encodeKeyValue(keys[0], this.encodeChild(obj[keys[0]]));

    let objRest = {};

    let rest = keys.slice(1).forEach((key) => {
      objRest[key] = obj[key];
    });

    const right = this.encodeObject(objRest);

    if(right) {
      ret = this.join(left, right);
    } else {
      ret = left;
    }

    return ret;
  }

  encodeKeyValue(key, value) {
    return this.join(key, value);
  }

  join(leftStr, rightStr) {
    const delimiter = '-';

    let len = Math.max(this.getLongest(leftStr), this.getLongest(rightStr)) + 1;

    return leftStr + this.constantSpace(len) + rightStr;
  }

  // from markright.js
  splitStr(str) {
    let res;
    let longest = this.getLongest(str);

    res = str.split(this.constantSpace(longest));

    return res;
  }

  // from markright.js
  getLongest(str) {
    const delimiter = '-';

    let longest = 0;

    let len = str.length;
    let i;
    let longTmp = 0;

    for(i = 0; i < len; i++) {
      if(str[i] === delimiter) {
        longTmp++;
      } else {
        longTmp = 0;
      }

      longest = Math.max(longest, longTmp);
    }

    return longest;
  }

  // from markright.js
  constantSpace(len) {
    const delimiter = '-';

    var ret = '';
    let i;

    for(i = 0; i < len; i++) {
      ret += delimiter;
    }

    return ret;
  }

  encodePrimitive(variable) {
    if(variable === null) {
      return 'null';
    } else if(typeof variable === 'undefined') {
      return 'undefined';
    } else if(typeof variable === 'boolean') {
      let boole = variable;

      if(boole === true) {
        return 'boolean-true';
      }
      if(boole === false) {
        return 'boolean-false';
      }
    } else if(typeof variable === 'number') {
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
        9: 'nine',
      }[variable];
    } else if(typeof variable === 'string') {
      return 'string-' + variable;
    } else {
      return true;
    }
  }
}