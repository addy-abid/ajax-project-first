/* global data */
/* exported data */

var $searchForm = document.querySelector('#home');
$searchForm.addEventListener('submit', handleSubmit);
var mainPage = document.querySelector('.home');
mainPage.addEventListener('click', handleViewNavigation);
var $body = document.getElementById('body-container');
var homePage = document.querySelector('.home-page');
homePage.addEventListener('click', retunHomePage);
function getCharacterData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/?name=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function (name) {

    var matchingCharacters = xhr.response.results;

    var position = document.querySelector('.container');
    for (var i = 0; i < matchingCharacters.length; i++) {
      position.appendChild(renderResults(matchingCharacters[i]));
      var viewList = document.querySelector('.container');
      viewList.addEventListener('click', resultsClick);
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

  $searchForm.reset();
}
function resultsClick(event) {
  if (event.target.className === 'col-75' || event.target.closest('.col-75')) {
    var id = event.target.closest('.result-page').id;

    var row = document.getElementById(id);
    row.classList.add('hidden');
    var cardNumber = document.querySelector(`.card-${id}`);
    cardNumber.classList.remove('hidden');
    closeResults(id, data.openCard);
    data.openCard = id;
  }

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
  xhr.addEventListener('load', function (event) {
    var matchingCharacters = xhr.response;
    var position = document.querySelector('.container');
    position.appendChild(renderCharacterCard(matchingCharacters));
    var cardClass = '.card-' + id;
    var card = document.querySelector(cardClass);
    card.classList.remove('hidden');
  });
  xhr.send();
}

function renderResults(search) {

  var resultsDiv = document.createElement('div');
  resultsDiv.setAttribute('data-view', 'results');

  var row = document.createElement('div');
  row.setAttribute('class', 'row margin-top background-gray width-80 border result-page');
  row.id = search.id;
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
  var card = document.querySelector('.card');
  card.classList.add('hidden');
  chars.classList.add('hidden');

}

function renderCharacterCard(card) {
  var cardView = document.createElement('div');
  cardView.setAttribute('data-view', 'card');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'card hidden row margin-top background-gray width-80 border ');
  divRow.classList.add(`card-${card.id}`);

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

  var charSpecies = document.createElement('h2');
  charSpecies.setAttribute('class', 'char-info-text');
  charSpecies.textContent = 'Species: ' + card.species;
  colHalfSec.append(charSpecies);

  var charType = document.createElement('h2');
  charType.setAttribute('class', 'char-info-text');
  charType.textContent = 'Type: ' + card.type;
  colHalfSec.appendChild(charType);

  var charGender = document.createElement('h2');
  charGender.setAttribute('class', 'char-info-text');
  charGender.textContent = 'Gender: ' + card.gender;
  colHalfSec.appendChild(charGender);

  return cardView;
}

var $view = document.querySelectorAll('.view');
function switchView(viewName) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewName) {
      $view[i].className = 'active';
    } else {
      $view[i].className = 'hidden';
    }
  }
  data.view = viewName;
}
function handleViewNavigation(event) {
  if (event.target === mainPage) {
    switchView('results');
  } else {
    switchView('home');
  }
}

function closeResults(cardId, oldId) {
  var cards = document.querySelectorAll('.card');
  var cardClass = 'card-' + cardId;

  for (var i = 0; i < cards.length; i++) {

    if (!cards[i].classList.contains(cardClass)) {

      cards[i].classList.add('hidden');

    }
  }
  if (data.openCard !== null) {
    var row = document.getElementById(oldId);
    row.classList.remove('hidden');
  }
}
