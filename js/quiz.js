const button = document.getElementById('start-button'); 
const nextButton = document.getElementById('next');
// const backButton = document.getElementById('back');
const submitButton = document.getElementById('submit');
const quizContainer = document.getElementById('quiz-container');

let score = 0;
let counter = 0;

button.addEventListener('click', function() {
  startQuiz();
});

nextButton.addEventListener('click', function() {
  onNext(questions);
});

// backButton.addEventListener('click', function() {
//   onBack(questions);
// })

submitButton.addEventListener('click', function() {
  getResults();
})

function startQuiz() {
  button.classList.add('hide');
  nextButton.classList.remove('hide');
  renderQuestion(questions, counter);
}

function renderQuestion(questions, counter) {
console.log(score, 'Player Score');
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

function onNext(questions) {
  checkAnswer(questions, counter);
  counter++; 
  // if (counter >= 1) backButton.classList.remove('hide');
  console.log(counter === questions.length, 'counter', counter, questions.length);
  if (counter === questions.length - 1) { 
    nextButton.classList.add('hide'); 
    submitButton.classList.remove('hide'); 
    console.log('is running');
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

function getResults() {
  const output = []; 

  output.push('<div class="score">' + score + '</div>');
  quizContainer.innerHTML = output.join('');
}

