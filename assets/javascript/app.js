$(document).ready(function() {

//questions
var quiz = [{
	'questionNumber' : 1,
	'question' : 'Which character is famous for dying in almost every episode?',
	'choices' : ['Kyle', 'Cartman', 'Kenny', 'Stan'],
	'correct' : 'Kenny',
	'placeHolder' : 'assets/images/q1.png',
	}, {
	'questionNumber' : 2,
	'question' : 'Who/s mom is a big, fat, stupid b*%#h according to Cartman?'
	'choices' : ['Stan/s', 'Kyle/s', 'his own', 'Kenny/s'],
	'correct' : 'Kyle/s',
	'placeHolder' : 'assets/images/q2.png',
	}, {
	'questionNumber' : 3,
	'question' : 'What cartoon is the gang/s favorite?',
	'choices' : ['Tom and Jerry', 'Itchy and Scratchy', 'Terrance and Phillip', 'The Simpsons'],
	'correct' : 'Terrance and Phillip',
	'placeHolder' : 'assets/images/q3.png',	
	}, {
	'questionNumber' : 4,
	'question' : 'Who is the school/s counselor, mmkay?',
	'choices' : ['Mr. Garrison', 'Mr.Mackey', 'Mrs.Crabtree', 'Mrs.Choksondik'],
	'correct' : 'Mr.Mackey',
	'placeHolder' : 'assets/images/q4.png',	
	}, {
	'questionNumber' : 5,
	'question' : 'Who is the boy/s teacher?',
	'choices' : ['Mr.Garrison', 'Mr.Mackey', 'Chef', 'Mr.Marsh'],
	'correct' : 'Mr.Garrison',
	'placeHolder' : 'assets/images/g5.png',
	}, {
	'questionNumber' : 6,
	'question' : 'What is Cartman/s first name?',
	'choices' : ['Eric', 'Ben', 'Sean', 'Collin'],
	'correct' : 'Eric',
	'placeHolder' : 'assets/images/q6.png',	
	}, {
	'questionNumber' : 7,
	'question' : 'Butter/s real name is?'
	'choices' : ['Leopold Stock', 'Leopold Scotch', 'Leonardo Da Vinci', 'Leopard Stink'],
	'correct' : 'Leopold Scotch',
	'placeHolder' : 'assets/images/q7.png',
	}, {
	'questionNumber' : 8,
	'question' : 'Who is always nervous?',
	'choices' : ['Tweek', 'Timmy', 'Jimmy', 'Clyde'],
	'correct' : 'Tweek',
	'placeHolder' : 'assets/images/q8.png',
	}, {
	'questionNumber' : 9,
	'question' : 'Who is Stan/s girlfriend?',
	'choices' : ['Wendy Testaburger', 'Wile E Coyote', 'Windy Testicles', 'Wilma Testmyburger'],
	'correct' : 'Wendy Testaburger',
	'placeHolder' : 'assets/images/q9.png',
	}, {
	'questionNumber' : 10,
	'question' : 'Who do the boy/s go to when they need answers?'
	'choices' : ['Obama', 'Chef', 'Satan', 'Kyle/s dad'],
	'correct' : 'Chef',
	'placeHolder' : 'assets/images/q10.png',
	}
]

//global variables

var right = 0;
var wrong = 0;
var total = right + wrong;
var unanswered = 0;
var percent = 0;
var quesNum = 0;
var audio1 = $("#clickSound") [0];

var timer = {
	time : 11,
	reset: function(){
		timer.time = 11;
	},
	start: function() {
		counter = setInterval(timer.count, 1000);
	},
	stop: function() {
		clearInterval(counter);
	},
	count: function() {
		timer.time --;
		var converted = timer.timeConverter(time.time);
		$('#timeShow').html(converted);
		timer.check();
	},
	timeConverter: function(t) {
		var minutes = Math.floor(t/60);
		var seconds = t - (minutes * 60);
		if (seconds < 10){
			seconds = "0" + seconds;
	}
	if (minutes === 0){
		minutes = "00";
	} else if (minutes < 10){
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
	},
	check: function(){
		if (timer.time = 0) {
			setTimeout(timesup, 500);
			setTimeout(startQuiz, 4000);
		}
	}
}

//functions
//draw board
function createBoard() {
	$('.container').empty();
	$('#opening').removeClass().addClass('container game text-center');
	$('.container').append('<div class="row"><div class="timerContainer"><div id="timeLeft">Time Left:</div><div id="timeShow">00:10</div></div>'); 
	$('.container').append('<div class="row"><div class="col-md-10 col-md-offset-1 quizContainer"><div id="question"></div><ul id="answers"></ul></div></div>'); 
	$('.container').append('<div class="row"><div class="questionsLeftContainer"><div id="questionsLeft">Questions:</div><div class="numberLeft" id="numQuestionsLeft">1 of 10</div></div></div></div>');
	startQuiz();
};


function resetGame() {
	right = 0;
	wrong = 0;
	percent = 0;
	quesNum = 0;
	createBoard();
}


function timesup() {
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="incorrect">OUT OF TIME!</span><br>' + quiz[quesNum].answerInfo + '</div>');
  	unanswered++;
  	quesNum++;
}

function youAreCorrect(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="correct">You are correct!!!</span><br>' + quiz[quesNum].answerInfo + '</div>');
	right++;
	quesNum++;
}

function youAreIncorrect(){
	timer.stop();
	$('.quizContainer').html('<div class="text-center"><img id="answerImg" src""></div>');
	$('#answerImg').attr('src', quiz[quesNum].placeHolder);
	$('.quizContainer').append('<div id="answerText"><span id="incorrect">Sorry. You are incorrect.</span><br>' + quiz[quesNum].answerInfo + '</div>');
	wrong++;
	quesNum++;
	}



function quizEnd() {
	$('#timeShow').text('COMPLETE');
	percent = (right/quiz.length) * 100;
	$('.quizContainer').html('<div class="text-center" id="endOfGame">You have reached the end of the quiz</div><hr class="styleOne">');
	$('.quizContainer').append('<div class="text-center" id="score">Correct answers: <span id="correct">' + right + '</span></div>');
	$('.quizContainer').append('<div class="text-center" id="score">Inorrect answers: <span id="incorrect">' + wrong + '</span></div>');
	$('.quizContainer').append('<div class="text-center" id="score">Unanswered: ' + unanswered + '</div>');
	$('.quizContainer').append('<hr class="styleTwo"><div class="text-center" id="percent">You scored: <span id="incorrect">' + percent + '%</span></div>');
	$('.quizContainer').append('<div><button class="start">Restart Game</button></div>');
	$("#clickSound").get(0).play();
	$('.start').click(function(){
		resetGame();
	});
}

function startQuiz(){

//pause audio
	$("#clickSound").get(0).pause();

	if (quesNum == quiz.length) {
		quizEnd();
	} else {

//timer restart
		timer.reset();
		timer.start();

//number of questions left
	var slideNum = quesNum + 1;
	$('.numberLeft').html('<div id="numQuestionsLeft">' + slideNum + " of " + quiz.length + '</div>');

//empty div
	$('quizContainer').empty();
	
//create divs
	$('.quizContainer').html('<div id="question"></div>' + '<ul id="answers"></ul>');
	
//write question to html
	$('#question').html(quiz[quesNum].question);
	
//collect answers 		
	for (var i = 0; i < quiz[quesNum].choices.length; i++) {
		$('#answers').append('<li>' + quiz[quesNum].choices[i] + '</li>');
		}

//record user choice
	$("#answers li").click(function() {
		var userGuess = $(this).text();

//compare userchoice to correct answer
		if (userGuess == quiz[quesNum].correct){

			setTimeout(youAreCorrect, 500);
			setTimeout(startQuiz, 4000);

			} else {

			setTimeout(youAreIncorrect, 500);
			setTimeout(startQuiz, 4000);
			}
	});
}

}
			
$('.start').click(function(){
	createBoard();
});

//audio stat playing
$("#clickSound").get(0).play();

});

});