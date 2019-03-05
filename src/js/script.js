// localStorage.setItem('test1', JSON.stringify('welkom'));
console.log(localStorage.length);

// var clear = (function() {
//   var myItem = localStorage.getItem('search');
//   localStorage.clear();
//   localStorage.setItem('search',myItem);
// })()

var init = (function () {
    if (localStorage.getItem("search") === null) {
      console.log('init if');
      console.log(localStorage.getItem("search"));
      api();
    }
    if (localStorage.getItem("search") !== null) {
      console.log('init else');
      local.parse()
      console.log(local.parse());
    }
});

var api = (
  async () => {
    // localStorage.clear();
    console.log('Geen local storage');
    let testData ;
    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });
    const stream = await api.createStream("search/banaan{5}");
    stream
      // .pipe(stringify)
      .pipe(dataHandle.get)
      .catch(console.error);
}
);

var dataHandle = {
  get: function (incoming) {
    console.log('dataHandle.get');
    localStorage.setItem('search', JSON.stringify(incoming));
    var parsedLocalData = JSON.parse(localStorage.getItem('search'));
    console.log(parsedLocalData);
  }
}

var local = {
  parse: function () {
    var parsing = JSON.parse(localStorage.getItem('search'));
    return parsing
  },
}

var render = {
}

init();
