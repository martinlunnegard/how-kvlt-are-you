const intro = document.getElementById('intro');
const button = document.getElementById('start-button'); 
const nextButton = document.getElementById('next');
// const backButton = document.getElementById('back');
const submitButton = document.getElementById('submit');
const againButton = document.getElementById('again');
const player = document.getElementById('player');
const quizContainer = document.getElementById('quiz-container');

// Globals 
let playerName; 
let score = 0;
let counter = 0;

button.addEventListener('click', function() {
  playerName = player.value;
  startQuiz();
});

nextButton.addEventListener('click', function() {
  onNext(questions);
});

// backButton.addEventListener('click', function() {
//   onBack(questions);
// })

submitButton.addEventListener('click', function() {
  getResults(questions, counter);
})

againButton.addEventListener('click', function() {
  resetQuiz();
})

const startQuiz = () => {
  intro.classList.add('hide');
  button.classList.add('hide');
  player.classList.add('hide');
  nextButton.classList.remove('hide');
  renderQuestion(questions, counter);
}

const renderQuestion = (questions, counter) => {
let output = []
let answers; 

for(let i=0; i < questions.length; i++) {
  if(i === counter) {
      answers = []; 

      for(letter in questions[i].answers) {
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+ i +'" value="' + letter + '" />'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }
  }

  quizContainer.innerHTML = output.join('');
}

const onNext = (questions) => {
  checkAnswer(questions, counter);
  counter++; 
  // if (counter >= 1) backButton.classList.remove('hide');
  console.log(counter === questions.length, 'counter', counter, questions.length);
  if (counter === questions.length - 1) { 
    nextButton.classList.add('hide'); 
    submitButton.classList.remove('hide'); 
  }
  renderQuestion(questions, counter);
}

function onBack(questions) {
  // counter--;
  // if (counter > 1) backButton.classList.add('hide');
  // renderQuestion(questions, counter);
}

function checkAnswer(questions, counter) {
  let selected = document.querySelector('input[name="question'+ counter +'"]:checked').value;

  for(let i=0; i < questions.length; i++) {
    if(i === counter) { 
      let correct = questions[i].correct; 
      if(selected === correct) score++
    }
  }
}

const getResults = (question, counter) => {
  submitButton.classList.add('hide');
  checkAnswer(question, counter);
  renderPlayerResults(score);
}

const renderPlayerResults = (playerScore) => {
  const { tier, message } = calculateResults(playerScore)
  againButton.classList.remove('hide');
  const output = [];
  const playerResult = `
    <div class="score">
      <div>${playerName} you scored ${playerScore}</div>
      <div>Verdict: ${tier}</div> 
      <div>${message}</div>
    </div>`
  output.push(playerResult);
  quizContainer.innerHTML = output.join('');  
}

const calculateResults = (score) => {
  let playerTier; 
  
  if(score <= 2) {
    playerTier = "Poser"
  } else if (score >= 3 && score <= 6) {
    playerTier = "Joke metal"
  } else if (score >= 6 && score <= 9) {
    playerTier = "Prospect"
  } else if (score === 10) {
    playerTier = "Trve kvlt"
  } 

  const result = tiers.find(item => item.tier === playerTier)
  return result
}

const resetQuiz = () => {
  location.reload();
}

// TODOS

// Back function
// Count up points 
// Gifs for each tier
// Timer
// Scoreboard Tab (Backend)
