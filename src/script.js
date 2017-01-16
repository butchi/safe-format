import SafeFormat from './module/SafeFormat';

(function() {
  'use strict';
  class Safe {
    constructor(option) {
    }

    encode(opts = {}) {
      let type = opts.type || 'safe-format';
      let obj = opts.obj;
      let delimiter = opts.delimiter || '-';

      let safeFormat = new SafeFormat({
        delimiter: delimiter,
      });

      if(type === 'safe-format') {
        return safeFormat.encode(obj);
      }
    }
  }

  // export
  global.Safe = Safe;
})();
