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
}
