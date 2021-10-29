var currentquestionIndex = 0;
var time = questions.length * 15;
var timer ;

var questionsElements = document.getElementById('questions')

var timeElements = document.getElementById('time')

var choicesElements = document.getElementById('choices')

var submitBtn = document.getElementById('submit')

var startBtn = document.getElementById('start')

var initialsElement = document.getElementById('initials')


function start (){
var startscreenElement = document.getElementById('start-screen')
startscreenElement.setAttribute('class','hide')

questionsElements.removeAttribute('class')

timer = setInterval(clock,1000)

timeElements.textContent= time

getnextquestion() 

}
function getnextquestion (){
var currentQuestions= questions[currentquestionIndex]
var questionsTitle = document.getElementById('questions-title')
questionsTitle.textContent= currentQuestions.title
choicesElements.innerHTML= ''
currentQuestions.choices.forEach(function(choice,i){
    var choicesData= document.createElement('button')
    choicesData.setAttribute('class','choice')
    choicesData.setAttribute('value',choice)
choicesData.textContent= i+1+' . '+ choice
choicesData.onclick= questionsclick
choicesElements.appendChild(choicesData)
}) 
}

function questionsclick(){


}


