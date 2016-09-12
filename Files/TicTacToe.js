$(document).ready(function(){

var counter = 0;
var playersSymbol = " ";
var computersSymbol;
var gamePosArr = [];
$(function() {

	var div = $('#gameboard');
	var width = div.width();
	div.css('height', width);

	$(window).resize(function() {
		var div = $('#gameboard');
		var width = div.width();
		div.css('height', width);
	});

	init();

	$("#X").on("click", function() {
		playersSymbol = "X";
		computersSymbol = "O";
		playGame();

	});

	$("#O").on("click", function() {
		playersSymbol = "O";
		computersSymbol = "X";
		playGame();

		gamePosArr[4] = "X";
		$("#4").addClass("X");
	});
	
	
	$(".square").on("click", function(eventData) {
		console.log("square clicked");

		if (eventData.currentTarget.className.indexOf("X") !== -1 || eventData.currentTarget.className.indexOf("O") !== -1) {
			console.log("This Square Is Occupied");
		} else {
			if (checkForWinner(gamePosArr) !== true) {

								selectSquare(eventData.currentTarget.id, playersSymbol);

				if (checkForWinner(gamePosArr) === true) {
					endGame(playersSymbol + " Wins!");
				} else if (gamePosArr.filter(function(value) {
						return value !== undefined;
					}).length >= 9) {
					endGame("Draw!");
				} else {
					computerMoves();
					
					if (gamePosArr.filter(function(value) {
							return value !== undefined;
						}).length >= 9) {
						endGame("Draw!");
					}
				}
			}
		}
	});

	$("#reset").on("click", function() {
		$("#resetContainer").removeClass('slideDown');
		$("#resetContainer").addClass('slideUp');

		init();

		$(".square").removeClass("X O");
		gamePosArr = [];
	});

});

function selectSquare(id, player) {
	$("#" + id).toggleClass(player);
	gamePosArr[id] = player;
	
}

function init() {
	$('#startContainer').removeClass('slideUp');
	$('#startContainer').addClass('slideDown');

	$('#veil').removeClass('fadeOut');
	$('#veil').addClass('fadeIn');

}

function playGame() {
	$('#startContainer').removeClass('slideDown');
	$('#startContainer').addClass('slideUp');

	$('#veil').removeClass('fadeIn');
	$('#veil').addClass('fadeOut');
}


function checkForWinner(array) {
	if ((array[0] == array[1] && array[1] == array[2] && array[0] !== undefined) ||
		(array[3] == array[4] && array[4] == array[5] && array[3] !== undefined) ||
		(array[6] == array[7] && array[7] == array[8] && array[6] !== undefined)) {
		return true;
	}
	if ((array[0] == array[3] && array[3] == array[6] && array[0] !== undefined) ||
		(array[1] == array[4] && array[4] == array[7] && array[1] !== undefined) ||
		(array[2] == array[5] && array[5] == array[8] && array[2] !== undefined)) {
		return true;
	}
	if ((array[0] == array[4] && array[4] == array[8] && array[0] !== undefined) ||
		(array[2] == array[4] && array[4] == array[6] && array[2] !== undefined)) {
		return true;
	} else {
		return false;
	}
}

function endGame(message) {

	$("#resetContainer").removeClass('slideUp');
	$("#endOfGameStatement").text(message);
	$("#resetContainer").addClass('slideDown');
}
//
function computerMoves() {
	for (var i = 0; i < 9; i++) {
		if ($("#" + i).hasClass("X") !== true && $("#" + i).hasClass("O") !== true) {

			var tempArr = gamePosArr.slice(0);
			tempArr[i] = computersSymbol;
			if (checkForWinner(tempArr) === true) {
				selectSquare(i, computersSymbol);
				endGame(computersSymbol + " Wins!");
				return;
			}

		}
	}
	for (var i = 0; i < 9; i++) {
		if ($("#" + i).hasClass("X") !== true && $("#" + i).hasClass("O") !== true) {
			var tmpArr = gamePosArr.slice(0);
			tmpArr[i] = playersSymbol;
			if (checkForWinner(tempArr) === true) {
				selectSquare(i, computersSymbol);
				return;
			}
		}
	}
	if (gamePosArr[4] === undefined) {
		gamePosArr[4] = computersSymbol;
		$("#4").addClass(computersSymbol);
		return;
	}

	if (playersSymbol === "X" && gamePosArr[0] === undefined) {
		gamePosArr[0] = "O";
		$("#0").addClass("O");
		return;
	}
	var randomSquareSelected;
	do {
		randomSquareSelected = Math.floor((Math.random() * 8) + 0);
	}
	while ($("#" + randomSquareSelected).hasClass("X") || $("#" + randomSquareSelected).hasClass("O"));
	selectSquare(randomSquareSelected, computersSymbol);

}
})