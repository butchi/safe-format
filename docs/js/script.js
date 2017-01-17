(function() {
  encodeSafe(null);
  encodeSafe(undefined);
  encodeSafe(true);
  encodeSafe(5);
  encodeSafe('hoge');
  encodeSafe([]);
  encodeSafe([5]);
  encodeSafe([5, 3, 8]);
  encodeSafe({});
  encodeSafe({a: 5, b: 3, c: 8});
  encodeSafe({a: 5, b: [1, 2, 3], c: 8});
  encodeSafe([1, [2, 3, 4], 5, 6]);

  function encodeSafe(obj) {
    var safe = new Safe();

    var $wrapper = $('.wrapper');

    var markright = new Markright({
      delimiter: '-',
      opener: '(',
      closer: ')',
    });

    function mark(str) {
      var $elm = $(`<div><span>${markright.html(str)}</span></div>`);
      $wrapper.append($elm);
    }

    console.log(`${JSON.stringify(obj)}:`);
    var str = safe.encode({
      obj: obj,
      delimiter: '-',
    });

    mark(str);

    var decoded = safe.decode({
      str: str,
      delimiter: '-',
    });

    console.log('decoded:', decoded);

    console.log('');
  }
})();
