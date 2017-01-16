(function() {
  'use strict';
  class Safe {
    constructor(option) {
      if(global.console) {
        console.log('Thanks, world!');
      }
    }
  }

  // export
  global.Safe = Safe;
})();
