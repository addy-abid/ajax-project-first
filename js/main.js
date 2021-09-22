var $input = document.querySelector('input');
var xhr = new XMLHttpRequest();
xhr.open('GET', ' https://rickandmortyapi.com/api/character');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {

  console.log(xhr.status);
  var response = xhr.response;
  for (var i = 0; i < response.length; i++) {
    if ($input.textContent === response.results[i].name) {
      console.log(response.results[i].name);
    }
  }
});
xhr.send();
