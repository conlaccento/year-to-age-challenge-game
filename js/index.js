const startBtn = document.querySelector('.start-btn');
const yearSpan = document.querySelector('.year');
const ageInput = document.querySelector('[name="age-input"]');
const input = document.querySelector('input[name="age-input"]');
const timer = document.querySelector('.timer');
const form = document.querySelector('.age-form');
const guessedNum = document.querySelector('.guessedNum');
const guessedGoal = document.querySelector('.guessedGoal');

const currentYear = (new Date()).getFullYear();
const goal = 6;

let guessed = 0;
let years = [];
let i = 0;
let stopwatch;

input.disabled = true;
input.value = null;

guessedGoal.textContent = goal;

function startHandle() {
  // create years array
  createYrsArray();
  // start
  timerFunction();
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

function timerFunction() {
  // clear any existing timers?
  clearInterval(stopwatch);

  const start = Date.now();

  stopwatch = setInterval(() => {
    const now = Date.now();

    stopwatchSec = Math.floor( (now - start) / 1000 );
    stopWatchMillisec = (now - start) % 1000;
    timer.textContent = stopwatchSec + '.' + stopWatchMillisec;
  }, 50);
}

// get the reply and check it
function gameHandle(e) {
  e.preventDefault();
  const reply = input.value;
  if ( reply == currentYear - years[i] ) {
    console.log('yeah');
    guessed++;
    guessedNum.textContent = guessed;
    if ( guessed == goal ) return stopHandle();
    i++;
    input.value = null;
    yearSpan.textContent = years[i];
    input.focus();
  } else {
    console.log('nope');
    input.value = null;
  }
}

function stopHandle() {
  console.log('stop');
  // stop timer
  clearInterval(stopwatch);
  input.disabled = true;
  input.value = null;
}

startBtn.addEventListener( 'click', startHandle );
form.addEventListener('submit', gameHandle);
