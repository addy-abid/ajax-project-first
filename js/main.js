/* global data */
/* exported data */

var $searchForm = document.querySelector('#home');
$searchForm.addEventListener('submit', handleSubmit);
var mainPage = document.querySelector('.home');
var $body = document.getElementById('body-container');
var homePage = document.querySelector('.home-page');
homePage.addEventListener('click', retunHomePage);
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
      var viewList = document.querySelector('.col-75');
      console.log('value of viewList: ', viewList);
      viewList.addEventListener('click', resultsClick);
      console.log(matchingCharacters[i]);
      position.appendChild(renderCharacterCard(matchingCharacters[i]));

    }
  });
  xhr.send();
}

function handleSubmit(event) {
  $searchForm.classList.add('hidden');
  $body.classList.replace('body-container-vh', 'body-container');
  event.preventDefault();
  var name = document.querySelector('.search-box').value;
  getCharacterData(name);
  getEpisodeData(name);
  $searchForm.reset();
}
function resultsClick(event) {
  // var container = document.querySelector('.container');
  // container.classList.add('hidden');
  console.log(event.target);
  console.log('clicked');
}
var id = document.querySelector('.random-button');
id.addEventListener('click', submitRandom);

function submitRandom(event) {
  id = Math.floor(Math.random() * 672);
  getRandomChar(id);
}

function getRandomChar(id) {
  $body.classList.replace('body-container', 'body-container-vh');
  $searchForm.classList.add('hidden');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (id) {

    console.log(xhr.status);
    console.log(xhr.response);
    var matchingCharacters = xhr.response;

    var position = document.querySelector('.container');
    position.appendChild(renderResults(matchingCharacters));

    var viewList = document.querySelector('.col-75');
    console.log('value of viewList: ', viewList);
    viewList.addEventListener('click', resultsClick);

    position.appendChild(renderCharacterCard(matchingCharacters));

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

function retunHomePage(event) {
  $searchForm.classList.remove('hidden');
  $body.classList.replace('body-container-vh', 'body-container');
  var chars = document.querySelector('.border');
  var card = document.querySelector('#card');
  card.classList.add('hidden');
  chars.classList.add('hidden');

}
/* <div class="row margin-top background-gray width-80 border">
    <div class="col-50">
      <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" class="result-img-card ">
    </div>
    <div class="col-50">
      <h1 class="char-info-text">Rick Sanchez</h1>
      <h2 class="char-info-text">Location: <span>C-137</span></h2>
      <h2 class="char-info-text">Status: <span>Alive</span></h2>
      <h2 class="char-info-text">Episodes: </h2>
      <p class="char-info-text">S - 01 E - 01</p>
      <p class="char-info-text">S - 01 E - 02</p>
      <p class="char-info-text">S - 01 E - 03</p>
      <p class="char-info-text">S - 01 E - 04</p>
      <p class="char-info-text">..</p>
    </div>
  </div> */

function renderCharacterCard(card) {
  var cardView = document.createElement('div');
  cardView.setAttribute('data-view', 'card');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row margin-top background-gray width-80 border');
  divRow.setAttribute('id', 'card');
  cardView.appendChild(divRow);

  var colHalfFirst = document.createElement('div');
  colHalfFirst.setAttribute('class', 'col-50');
  divRow.appendChild(colHalfFirst);

  var cardImg = document.createElement('img');
  cardImg.setAttribute('src', card.image);
  cardImg.setAttribute('class', 'result-img-card');
  colHalfFirst.appendChild(cardImg);

  var colHalfSec = document.createElement('div');
  colHalfSec.setAttribute('class', 'col-50');
  divRow.appendChild(colHalfSec);

  var charName = document.createElement('h1');
  charName.setAttribute('class', 'char-info-text');
  charName.textContent = card.name;
  colHalfSec.appendChild(charName);

  var charLocation = document.createElement('h2');
  charLocation.setAttribute('class', 'char-info-text');
  charLocation.textContent = 'location: ' + card.location.name;
  colHalfSec.appendChild(charLocation);

  var charStatus = document.createElement('h2');
  charStatus.setAttribute('class', 'char-info-text');
  charStatus.textContent = 'Status: ' + card.status;
  colHalfSec.appendChild(charStatus);

  var charEpisode = document.createElement('h2');
  charEpisode.setAttribute('class', 'char-info-text');
  charEpisode.textContent = 'Episode: ' + card.episode[0];
  colHalfSec.append(charEpisode);
  return cardView;
}

/*
clicking the result list to show card info
if a result is click,
hide the container
and show the card view
*/
