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

  function encodeSafe(obj) {
    var safe = new Safe();

    console.log(`${JSON.stringify(obj)}:`);
    console.log(safe.encode({
      obj: obj,
    }));
    console.log('');
  }
})();
