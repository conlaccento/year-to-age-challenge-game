const startBtn = document.querySelector('.start-btn');
const yearSpan = document.querySelector('.year');
const ageInput = document.querySelector('[name="age-input"]');
const input = document.querySelector('input[name="age-input"]');
const form = document.querySelector('.age-form');
const currentYear = (new Date()).getFullYear();
const goal = 6;

let guessed = 0;
let years = [];
let i = 0;

input.disabled = true;

function startHandle() {
  // create years array
  createYrsArray();
  // start

  // start the game
  input.disabled = false;
  input.focus();
  yearSpan.textContent = years[i];
}

function createYrsArray() {
  // create an array of years from 99 years ago to 16 years ago
  const startYear = currentYear - 99;
  const endYear = currentYear - 16;
  for ( var i = startYear; i <= endYear; i++ ) {
    years.push(i);
  }
  // randomize years order
  years = shuffle(years);
}

// Randomize array order function
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// get the reply and check it
function gameHandle(e) {
  e.preventDefault();
  const reply = input.value;
  if ( reply == currentYear - years[i] ) {
    console.log('yeah');
    guessed++;
    console.log('guessed:'+guessed);
    if ( guessed == 2 ) return stopHandle();
    i++;
    input.value = null;
    yearSpan.textContent = years[i];
  } else {
    console.log('nope');
  }
}

function stopHandle() {
  console.log('stop');
  // stop timer
}

startBtn.addEventListener( 'click', startHandle );
form.addEventListener('submit', gameHandle);
