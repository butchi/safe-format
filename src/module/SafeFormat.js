export default class SafeForamt {
  constructor(opts = {}) {
    this.delimiter = opts.delimiter || '-';
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

    if(arr === null) {
      return this.encodePrimitive(null);
    }
    if(arr.length === 0) {
      return this.encodePrimitive(undefined);
    }

    let strArr = [];

    arr.forEach((item, i) => {
      strArr[i] = this.encodeChild(item);
    });

    ret = this.join(...strArr);

    return ret;
  }

  encodeObject(obj) {
    let ret = '';

    let keys = Object.keys(obj);

    if(obj == null) {
      return this.encodePrimitive(null);
    }
    if(keys.length === 0) {
      return this.encodePrimitive(undefined);
    }

    let strArr = [];

    keys.forEach((key, i) => {
      strArr[i] = this.encodeKeyValue(key, this.encodeChild(obj[key]))
    });

    ret = this.join(...strArr);

    return ret;
  }

  encodeKeyValue(key, value) {
    return this.join(key, value);
  }

  join(...strArr) {
    let longestArr = [];
    strArr.forEach((str) => {
      longestArr.push(this.getLongest(str));
    });

    let len = Math.max(...longestArr);

    return strArr.join(this.constantSpace(len + 1));
  }

  // from markright.js
  getLongest(str) {
    let longest = 0;

    let len = str.length;
    let i;
    let longTmp = 0;

    for(i = 0; i < len; i++) {
      if(str[i] === this.delimiter) {
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
    var ret = '';
    let i;

    for(i = 0; i < len; i++) {
      ret += this.delimiter;
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
        return `boolean${this.delimiter}true`;
      }
      if(boole === false) {
        return `boolean${this.delimiter}false`;
      }
    } else if(typeof variable === 'number') {
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
        9: 'nine',
      }[variable];
    } else if(typeof variable === 'string') {
      return 'string' + this.delimiter + variable;
    } else {
      return true;
    }
  }
}