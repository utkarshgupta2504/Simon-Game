const btnColors = ['green', 'red', 'yellow', 'blue'];

var gamePattern = [];
var userPattern = [];

var level = 0;

var started = false;

function startOver() {

	level = 0;
	gamePattern = [];
	userPattern = [];
	started = false;
}

function checkAns(currentLevel) {

	if(userPattern[currentLevel] === gamePattern[currentLevel]) {

		if(userPattern.length === gamePattern.length) {

			setTimeout(function(){nextSequence();}, 600);
		}
	}

	else {

		$('body').addClass('game-over');
		
		playSound('wrong');

		$('h1').text("Game Over! Press Any Key to Restart");
		$('p').text(`Your score was: ${level}`);

		setTimeout(function() {

			$('body').removeClass('game-over');

		}, 200);

		// while PeekMessage(Msg, 0, WM_MOUSEFIRST, WM_MOUSELAST, PM_REMOVE or PM_NOYIELD) do;

		startOver();

		setTimeout(function(){}, 1000);
	}
}

function playSound(color) {

	var audio = new Audio(`sounds/${color}.mp3`);
	audio.play();
}

function animateClick(color) {

	$(`.${color}`).addClass('pressed');

	setTimeout(function() {

		$(`.${color}`).removeClass('pressed');
	}, 100);
}

function nextSequence() {

	level++;

	$('h1').text(`Level ${level}`);

	userPattern = [];

	var rand = Math.floor(Math.random()*4);
	var randColor = btnColors[rand];

	gamePattern.push(randColor);

	animateClick(randColor);

	playSound(randColor);

	console.log(gamePattern);
}

$('.btn').on('click', function(event) {

	if(!started) {

		nextSequence();
		started = true;
		$('p').css('display', 'none');
	}

	else {

		var userColor = event.target.id;

		userPattern.push(userColor);

		animateClick(userColor);

		playSound(userColor);

		checkAns(userPattern.length - 1);

	}
});

$(document).on('keydown', function() {

	if(!started) {
		nextSequence();
		started = true;
		$('p').css('display', 'none');
	}
});

	