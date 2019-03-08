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
    else {
      console.log('init.if search bestaat');
      console.log('data gebruiken uit local storage');
      render.loader();
      render.overview(local.parse(localStorage.search));
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
    render.loader();
    render.overview(parsedLocalData);
  },
}

var local = {
  parse: function (json) {
    var parsing = JSON.parse(json);
    return parsing
  },

  selection:function(selection){
    if (localStorage.getItem("selection") !== null) {
      console.log('selection if bestaat wel');
      var newArr = [selection];
      // console.log(local.parse(localStorage.getItem("selection")));
      // console.log(newArr);
      var oldArr = local.parse(localStorage.getItem("selection"));
      console.log(oldArr);
      console.log([oldArr].length);
      // console.log(oldArr[0]);
      console.log(local.parse(localStorage.getItem('selection')));
      if ((local.parse(localStorage.getItem('selection')).length) > 1) {
        console.log(('parse lengte is ') + local.parse(localStorage.getItem('selection')).length);
        var mapOldArr = oldArr.map(function(data) {
          var selectionId = selection.id._attributes.nativeid;
          var oldArrId = data.id._attributes.nativeid;
          console.log('selection id is '+(selection.id._attributes.nativeid));
          console.log('oldArr id is '+(data.id._attributes.nativeid));
          var compareId = selectionId === oldArrId;
          console.log('vergelijking is '+compareId);
          return compareId;
        })
        console.log(mapOldArr);
        if (mapOldArr.includes(true)) {
          console.log('array bevat dit id al, hoeft niet toegevoegd te worden');
          localStorage.setItem('selection', JSON.stringify(oldArr));
        }
        else {
          console.log('array heeft id nog niet, toevoegen...');
          console.log(selection);
          var currentData = local.parse(localStorage.getItem('selection'))
          // console.log(currentData);
          Array.prototype.push.apply(currentData, [selection]);
          localStorage.setItem('selection', JSON.stringify(currentData));
          console.log(local.parse(localStorage.getItem('selection')));

          // console.log(local.parse(localStorage.getItem('selection')));
        }
      }
      if ((local.parse(localStorage.getItem('selection')).length) === 1) {
        console.log((local.parse(localStorage.getItem('selection'))).length);
        console.log(('localparse selection lengte is ') + ((local.parse(localStorage.getItem('selection'))).length));

        var mapOldArr = [oldArr].map(function(data) {
          var selectionId = selection.id._attributes.nativeid;
          // console.log(data);
          var oldArrId = data[0].id._attributes.nativeid;
          console.log('selection id is '+(selection.id._attributes.nativeid));
          console.log('oldArr id is '+(data[0].id._attributes.nativeid));
          var compareId = selectionId === oldArrId;
          console.log('vergelijking is '+compareId);
          return compareId;
        })
        console.log(mapOldArr);
        if (mapOldArr.includes(true)) {
          console.log('id zit er al in');
          localStorage.setItem('selection', JSON.stringify(oldArr));
          console.log(local.parse(localStorage.getItem('selection')));
        }
        else {
          console.log('id zit er nog niet in');
          console.log(mapOldArr);
          console.log(selection);
          var currentData = local.parse(localStorage.getItem('selection'))
          console.log(currentData);
          console.log(selection);
          Array.prototype.push.apply(currentData, [selection]);
          localStorage.setItem('selection', JSON.stringify(currentData));
          console.log(local.parse(localStorage.getItem('selection')));
        }

        // Array.prototype.push.apply(newArr, (local.parse(localStorage.getItem('selection'))));
        // console.log(newArr);
        // localStorage.setItem('selection', JSON.stringify(newArr));
      }
    }
    if (localStorage.getItem("selection") === null) {
      console.log('selection if bestaat niet');
      localStorage.setItem('selection', JSON.stringify([selection]));
      console.log(local.parse(localStorage.getItem("selection")));
    }
  },
}


var render = {
  contain: {
    data:'',
    clickedId:''
  },
  loader: function(){
    var wrapper = document.getElementById('loader');
    var loader = `
    <img src="img/loader.gif" alt="loader">
    <h2>Aan het laden...</h2>`;
    wrapper.insertAdjacentHTML('afterbegin', loader);
  },
  overview: function (data) {
    remove('loader');
    console.log('');
    console.log('alle geladen data');
    console.log(data);
    console.log('');
    this.contain.data = data;
    // storedData = data;
    var wrapper = document.getElementById('wrapper');

    var covers = data.map(function(data) {
      return `
          <article>
          <div>
          <img src="${data.coverimages.coverimage[data.coverimages.coverimage.length -1]._text} " alt="${data.titles["short-title"]._text}">
          <button class="addButton" id="${data.id._attributes.nativeid}">+</button>
          </div>
          <div>
          <span>${data.titles["short-title"]._text}</span>
          <span>${data.authors["main-author"]._text}</span>
          <p class="bio">${undef(data)}</p>
          </div>
          </article>
          `;


    }).join("");

    remove('wrapper');
    wrapper.insertAdjacentHTML('afterbegin', covers);


    // bron van check id: https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/
    document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'addButton' ) ) {
        // Do something...
        console.log('geklikt op add');
        console.log(event.target.id);
        render.contain.clickedId = event.target.id;
        // console.log(render.contain.clickedId);
        var findId = (data.find(render.findEqualId));
        // console.log(findId);
        local.selection(findId)
    }
    }, false);
  },
  findEqualId:function(detail) {
    console.log('findEqualId aangeroepen');
    var equalCheck = detail.id._attributes.nativeid === render.contain.clickedId;
    console.log(equalCheck);
      return detail.id._attributes.nativeid === render.contain.clickedId;
    },
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
   render.loader();
   remove('wrapper');

   api(searchValue);
 });


init();
