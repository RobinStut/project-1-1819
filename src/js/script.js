console.log('localStorage lengte is ' + (localStorage.length));
// localStorage.clear();

// var clear = (function() {
//   var myItem = localStorage.getItem('search');
//   localStorage.clear();
//   localStorage.setItem('search',myItem);
// })()

var init = (function () {
    if (localStorage.getItem("search") === null) {
      console.log('init if');
      // console.log(localStorage.getItem("search"));
      console.log();
      api();
    }
    if (localStorage.getItem("search") !== null) {
      console.log('init.if search bestaat');
      console.log('data gebruiken uit local storage');
      local.parse();
      render.overview(local.parse());
      // console.log(local.parse());
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
    // console.log(incoming);
    localStorage.setItem('search', JSON.stringify(incoming));
    var parsedLocalData = JSON.parse(localStorage.getItem('search'));
    console.log(parsedLocalData);
  },
}

var local = {
  parse: function () {
    var parsing = JSON.parse(localStorage.getItem('search'));
    return parsing
  },
}

var render = {
  overview: function (data) {
    console.log(data);
    var id = document.getElementById('wrapper');
    var covers = data.map(function(data) {

      function undef(data) {
        // console.log(data);
        var summary = data.summaries ? data.summaries.summary._text : "Geen beschrijving beschikbaar";
        return summary;
      }

      return `
      <ul>
          <img src="${data.coverimages.coverimage[data.coverimages.coverimage.length -1]._text} " alt="${data.titles["short-title"]._text}">
          <li>${data.titles["short-title"]._text}</li>
          <li>${data.authors["main-author"]._text}</li>
          <li>${undef(data)}</li>
      </ul>`;
      })
      .join("");

    id.insertAdjacentHTML('afterbegin', covers);
    // console.log(covers);

  }
}




init();
