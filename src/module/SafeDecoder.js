export default class SafeDecoder {
  constructor(opts = {}) {
    this.delimiter = opts.delimiter || '-';
  }

  decode(str) {
    let ret = this.decodeChild(str);

    return ret;
  }

  // from markright.js#branch
  decodeChild(str) {
    let isSafe = false;
    let ret;

    if(str.indexOf(this.delimiter) !== -1) {
      let mode;

      this.splitStr(str).forEach((elm, i) => {
        if(i === 0 && elm.indexOf(this.delimiter) === -1) {
          if(elm == null) {
          } else if(elm === 'safe') {
            isSafe = true;

            mode = elm;
          } else if(elm === 'null') {
            mode = elm;

            ret = null;
          } else if(elm === 'undefined') {
            mode = elm;

            ret = undefined;
          } else if(elm === 'boolean') {
            mode = elm;
          } else if(elm === 'number') {
            mode = elm;
          } else if(elm === 'string') {
            mode = elm;

            ret = '';
          } else if(elm === 'array') {
            mode = elm;

            ret = [];
          } else if(elm === 'object') {
            mode = elm;

            ret = {};
          }
        } else {
          if(mode === 'safe') {
            ret = this.decodeChild(elm, mode);
          }

          if(mode === 'boolean') {
            ret = elm;
          }

          if(mode === 'number') {
            ret = {
              'zero':  0,
              'one':   1,
              'two':   2,
              'three': 3,
              'four':  4,
              'five':  5,
              'six':   6,
              'seven': 7,
              'eight': 8,
              'nine':  9,
            }[elm];
          }

          if(mode === 'string') {
            ret += elm;
          }

          if(mode === 'array') {
            if(elm.indexOf(this.delimiter) !== -1) {
              ret = this.decodeArr(elm);
            } else {
            }
          }

          if(mode === 'object') {
            if(elm.indexOf(this.delimiter) !== -1) {
              ret = this.decodeObj(elm);
            } else {
            }
          }
        }
      });
    } else {
      ret = str;
    }

    return ret;
  }

  decodeArr(str) {
    let ret = [];

    this.splitStr(str).forEach((elm) => {
      ret.push(this.decodeChild(elm));
    });

    return ret;
  }

  decodeObj(str) {
    let ret = {};

    this.splitStr(str).forEach((elm) => {
      let keyVal = this.splitStr(elm);

      let key = keyVal[0];
      let val = keyVal[1];

      ret[key] = this.decodeChild(val);
    });

    return ret;
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

  constantSpace(len) {
    var ret = '';
    let i;

    for(i = 0; i < len; i++) {
      ret += this.delimiter;
    }

    return ret;
  }
}