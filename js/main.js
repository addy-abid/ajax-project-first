var $searchForm = document.querySelector('#home');
$searchForm.addEventListener('submit', handleSubmit);

function getCharacterData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/?name=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (name) {

    console.log(xhr.status);
    console.log(xhr.response);
    var matchingCharacters = xhr.response.results;
    var position = document.querySelector('.container');
    for (var i = 0; i < matchingCharacters.length; i++) {
      position.appendChild(renderResults(matchingCharacters[i]));
    }
  });
  xhr.send();
}

function handleSubmit(event) {
  event.preventDefault();
  var name = document.querySelector('.search-box').value;
  getCharacterData(name);
  $searchForm.reset();
}

var id = document.querySelector('.random-button');
id.addEventListener('click', submitRandom);

function submitRandom(event) {
  id = Math.floor(Math.random() * 672);
  getRandomChar(id);
}

function getRandomChar(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (id) {

    console.log(xhr.status);
    console.log(xhr.response);

  });
  xhr.send();
}

function renderResults(search) {
  var resultsDiv = document.createElement('div');
  resultsDiv.setAttribute('data-view', 'results');

  var row = document.createElement('div');
  row.setAttribute('class', 'row margin-top background-gray width-80 border');
  resultsDiv.appendChild(row);

  var col25 = document.createElement('div');
  col25.setAttribute('class', 'col-25');
  row.appendChild(col25);

  var resultsImg = document.createElement('img');
  resultsImg.setAttribute('src', search.image);
  resultsImg.setAttribute('class', 'result-img');
  col25.appendChild(resultsImg);

  var col75 = document.createElement('div');
  col75.setAttribute('class', 'col-75');
  row.appendChild(col75);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'char-info-text');
  $h2.textContent = search.name;
  col75.appendChild($h2);

  return resultsDiv;

}
