var currentquestionIndex = 0;
var time = questions.length * 15;
var timer;

var questionsElements = document.getElementById("questions");

var timeElements = document.getElementById("time");

var choicesElements = document.getElementById("choices");

var submitBtn = document.getElementById("submit");

var startBtn = document.getElementById("start");

var initialsElement = document.getElementById("initials");

var feedbackElement = document.getElementById("feedback");

function start() {
  var startscreenElement = document.getElementById("start-screen");
  startscreenElement.setAttribute("class", "hide");

  questionsElements.removeAttribute("class");

  timer = setInterval(clock, 1000);

  timeElements.textContent = time;

  getnextquestion();
}
function getnextquestion() {
  var currentQuestions = questions[currentquestionIndex];
  var questionsTitle = document.getElementById("questions-title");
  questionsTitle.textContent = currentQuestions.title;
  choicesElements.innerHTML = "";
  currentQuestions.choices.forEach(function (choice, i) {
    var choicesData = document.createElement("button");
    choicesData.setAttribute("class", "choice");
    choicesData.setAttribute("value", choice);
    choicesData.textContent = i + 1 + " . " + choice;
    choicesData.onclick = questionsclick;
    choicesElements.appendChild(choicesData);
  });
}

function questionsclick() {
  if (this.value !== questions[currentquestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timeElements.textContent = time;
    feedbackElement.textContent = "wrong";
  } else {
    feedbackElement.textContent = "Correct";
  }
  currentquestionIndex++;

  if (currentquestionIndex === questions.length) {
    quizEnd();
  } else {
    getnextquestion();
  }
}
function quizEnd() {
  clearInterval(timer);
  var endscreenElement = document.getElementById("end-screen");

  endscreenElement.removeAttribute("class");

  var finalscoreElement = document.getElementById("final-score");
  finalscoreElement.textContent = time;

  questionsElements.setAttribute("class", "hide");
}

function clock() {
  time--;
  timeElements.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}
startBtn.onclick = start;
