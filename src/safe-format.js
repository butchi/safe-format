import SafeEncoder from './module/SafeEncoder';
import SafeDecoder from './module/SafeDecoder';

(function() {
  'use strict';
  class Safe {
    constructor(option) {
    }

    encode(opts = {}) {
      let type = opts.type || 'safe-format';
      let obj = opts.obj;
      let delimiter = opts.delimiter || '-';

      let safeEncoder = new SafeEncoder({
        delimiter: delimiter,
      });

      if(type === 'safe-format') {
        return safeEncoder.encode(obj);
      }
    }

    decode(opts = {}) {
      let type = opts.type || 'safe-format';
      let str = opts.str;
      let delimiter = opts.delimiter || '-';

      let safeDecoder = new SafeDecoder({
        delimiter: delimiter,
      });

      if(type === 'safe-format') {
        return safeDecoder.decode(str);
      }
    }
  }

  // export
  global.Safe = Safe;
})();
