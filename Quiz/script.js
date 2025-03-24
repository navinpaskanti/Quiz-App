const questions = [
  {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
  },
  {
      question: "What is 5 + 3?",
      options: ["5", "8", "12", "15"],
      answer: "8"
  },
  {
      question: "Who wrote 'Hamlet'?",
      options: ["Shakespeare", "Hemingway", "Dickens", "Austen"],
      answer: "Shakespeare"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const submitButton = document.getElementById("submit-btn");

  questionElement.innerText = questions[currentQuestionIndex].question;
  optionsElement.innerHTML = "";

  questions[currentQuestionIndex].options.forEach(option => {
      optionsElement.innerHTML += `<button class='btn btn-outline-primary d-block w-100 mt-2' onclick='selectAnswer(this, "${option}")'>${option}</button>`;
  });

  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
  nextButton.disabled = !userAnswers[currentQuestionIndex];

  if (currentQuestionIndex === questions.length - 1) {
      nextButton.classList.add("d-none");
      submitButton.classList.remove("d-none");
  } else {
      nextButton.classList.remove("d-none");
      submitButton.classList.add("d-none");
  }
}

function selectAnswer(button, selectedAnswer) {
  userAnswers[currentQuestionIndex] = selectedAnswer;
  document.getElementById("next-btn").disabled = false;
  document.getElementById("submit-btn").disabled = false;
}

function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer) {
      score++;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
  }
}

function submitQuiz() {
  if (userAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answer) {
      score++;
  }
  document.getElementById("quiz-container").innerHTML = `<h2 class='text-center'>Quiz Completed!</h2><p class='text-center'>Your final score is: ${score}</p><button class='btn btn-primary d-block mx-auto' onclick='restartQuiz()'>Restart Quiz</button>`;
}

function restartQuiz() {
  location.reload();
}

loadQuestion();