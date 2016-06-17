var GUESS_LIMIT = 5;
var winningNumber = generateWinningNumber();
var guesses = [];


function generateWinningNumber(){
	var makeRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	return makeRandomInt(1, 100);
}

function hotOrCold(guess, winner) {
	var diff = Math.abs(winner - guess);
	if (diff <= 5 && diff > 0)
		return " You're hot!";
	if (diff <= 20 && diff > 0)
			return " You're warm...";
	if (diff > 20)
		return " You're cold.";
	else
		return "";
}

function lowerOrHigher(guess, winner){
	if (guess === winner) {
		return "win";
	}
	else
		if (guess > winner)
			return "Too high.";
	else
		return "Too low.";
}

function checkDuplicate(guess, list) {
	for (var i = 0; i < list.length; i++) {
		if (guesses[i] == guess)
			return true;
	}
	return false;
}

function checkGuess(guess, winner, list){
	var message;
	isDuplicate = checkDuplicate(guess, list);
	isValid = validateGuess(guess);
	if (isDuplicate)
		message = "Duplicate Guess!"
	else {
		if (isValid) {
			list.push(guess);
			var result = lowerOrHigher(guess, winner)
			if (result == "win") {
				$('#result').text("You won!");
				$('#result').addClass("win-text");
				$('body').addClass("win-background");
				hideAll();
				return false;
			}
			var temp = hotOrCold(guess, winner);
			message = result + temp;
			}
	}
	$('#result').text(message);
}

function validateGuess(guess) {
	if (typeof guess !== 'number') {
		console.log("Must be a number!");
		console.log(typeof guess);
		return false;
	}
	if (guess < 1 || guess > 100) {
		console.log("Must be between 1 and 100!");
		return false;
	}
	return true;
}

function guessesLeft(list) {
	var message = "";
	var remaining = GUESS_LIMIT - list.length;
	if (remaining === 0) {
		$('#result').text("You lost!");
		$('#result').addClass("lose-text");
		$('body').addClass("lose-background");
		hideAll();
		return false;
	}
	else {
		message += "You have " + remaining + " guesses left."
		$('#guesses').text(message);
	}
}

function getHint() {
	var isEven = (function() {return winningNumber % 2 === 0})();
	if (isEven)
		$('#hint').text("The number is even.");
	else
		$('#hint').text("The number is odd.");
}

function hideAll() {
	$('#guesses').hide();
	$('#hint').hide();
	$('#button').hide();
	$('#hint-button').hide();
}

function resetGame() {
	location.reload();
}

function startGame(event) {
	event.preventDefault();
	var playersGuess = +$('#input').val();
	checkGuess(playersGuess, winningNumber, guesses);
	guessesLeft(guesses);
	$('#input').val("");
};