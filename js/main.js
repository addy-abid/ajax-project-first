var $searchForm = document.querySelector('#home');
$searchForm.addEventListener('submit', handleSubmit);

function getCharacterData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/?name=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (name) {

    console.log(xhr.status);
    console.log(xhr.response);
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
