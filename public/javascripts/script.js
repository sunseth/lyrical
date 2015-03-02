var currentAnswer;
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

function moveScore(){

}

function gameOver(){
	
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
	$('.options').click(function(){
		if ($(this).attr('id') == currentAnswer){
			collapse($(this));
			setTimeout(function(){
				$(this).addClass('green');
				setTimeout(function(){
					$(this).removeClass('green');
					rollout($(this));
					currentAnswer = getNext();
					moveScore();
				}, 2000);
			}, 2000);
		} else {
			collapse($(this));
			
			setTimeout(function(){
				$(this).addClass('red');
				setTimeout(function(){

				});
				gameOver();
			}, 2000);
		}
	});
});