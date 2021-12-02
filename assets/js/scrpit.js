var currentquestionIndex = 0;
var time = questions.length * 20;
var timerID;

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

  timerID = setInterval(clock, 1000);

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
    feedbackElement.style.color = "red";
    feedbackElement.style.fontSize = "200%";
  } else {
    feedbackElement.textContent = "Correct";
    feedbackElement.style.color = "green";
    feedbackElement.style.fontSize = "200%";
  }

  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  currentquestionIndex++;

  if (currentquestionIndex === questions.length) {
    quizEnd();
  } else {
    getnextquestion();
  }
}
function quizEnd() {
  clearInterval(timerID);
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

function saveHighscore() {
  //Get value of input box
  var initials = initialsElement.value.trim();

  if (initials !== "") {
    //Getting saved scores from localStorage, or if not set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };
    //Save to localStorage and redirect to next page "score.html"
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscore.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

//Onclick event calling Start quiz and Submit initials
submitBtn.onclick = saveHighscore;
startBtn.onclick = start;
initialsElement.onkeyup = checkForEnter;
