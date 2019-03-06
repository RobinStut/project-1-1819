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
  async (data) => {
    // localStorage.clear();
    console.log('er wordt gezocht naar "'+ data + '"');
    console.log('Geen local storage');
    let testData ;
    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });
    const stream = await api.createStream("search/"+data+"{5}");
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
    // console.log(parsedLocalData);
    render.overview(parsedLocalData);
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
    var wrapper = document.getElementById('wrapper');

    var covers = data.map(function(data) {
      return `
      <ul>
          <img src="${data.coverimages.coverimage[data.coverimages.coverimage.length -1]._text} " alt="${data.titles["short-title"]._text}">
          <li>${data.titles["short-title"]._text}</li>
          <li>${data.authors["main-author"]._text}</li>
          <li>${undef(data)}</li>
      </ul>
      <button class="addButton" id="${data.id._attributes.nativeid}">+</button>`;
    }).join("");

    remove('wrapper');
    wrapper.insertAdjacentHTML('afterbegin', covers);
    var addButton = document.querySelector(".addButton")
    addButton.onclick = idCheck;
    var idCheck = function(){
      var id = this.className;
       console.log('addButton geklikt');
       console.log("ID is " + this.className);


       console.log(data);
     };
    // console.log(covers);

  }
}

function undef(data) {
  // console.log(data);
  var summary = data.summaries ? data.summaries.summary._text : "Geen beschrijving beschikbaar";
  return summary;
}

function remove(id) {
  console.log('removed '+id);
  document.getElementById(id).innerHTML=''
}

var searchBtn = document.getElementById("searchBtn");
// searchBtn.onclick = action.search()

searchBtn.onclick = (function(){
   console.log('searchBtn geklikt');
   var searchValue = document.getElementById("searchValue").value;
   remove('wrapper');
   api(searchValue);
 });


init();
