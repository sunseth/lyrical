var currentAnswer;
var currentScore;
function getNext(){
	$.ajax({
		type: 'GET',
		url: '/question?difficulty=1',
		success: function(data){
		 var question = data.question;
		 $('#qline1').text(question[0]);
		 $('#qline2').text(question[1]);
		 $('#qline3').text(question[2]);
		 var choices = data.choices;
		 $('#answerA').text(choices['1']);
		 $('#answerB').text(choices['2']);
		 $('#answerC').text(choices['3']);
		 $('#answerD').text(choices['4']);
		 currentAnswer = data.answer.number;
		}
	});
}

$('.options').hover(function(){

});

function moveScore(){
	$('.score').removeClass('selected-score');
	$('#s'+currentScore).addClass('selected-score');
	currentScore++;
}

function gameOver(last){	
	var pow = int(currentScore);
	last.text('Thanks for playing! You earned ' + eval(2^pow) + ' bitcoins!');	
}	

function collapse(answer){
	$('.options').addClass('collapsed');
	answer.addClass('highestAnswer');
}

function rollout(answer){
	$('.options').removeClass('collapsed');
	answer.removeClass('highestAnswer');
}

$(document).ready(function(){
	currentAnswer = getNext();
	currentScore = 0;
	moveScore();

	$('.options').click(function(){
		if ($(this).attr('id') == currentAnswer){
			collapse($(this));
			$(this).addClass('green').delay(2100).queue(function(next){
				$(this).removeClass('green');
				next();
			});
			var thisSaved = $(this);
			setTimeout(function(){
				rollout(thisSaved);
				currentAnswer = getNext();
				moveScore();
			}, 2000);
		} else {
			collapse($(this));
			$(this).addClass('red');
			var thisSaved = $(this);
			setTimeout(function(){
				gameOver(thisSaved);
			}, 2000);
		}
	});
});