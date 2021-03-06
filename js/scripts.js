//business-logic
function Names(name1, name2) {
  this.name1 = name1;
  this.name2 = name2;
}

function Player() {
  var turnScore = 0;
  var gameScore = 0;
  var isActive = false;
  this.turnScore = turnScore;
  this.gameScore = gameScore;
  this.isActive = isActive;
}

var randomDie = randomNumber();

function randomNumber() {
    randomDie = Math.floor(6*Math.random())+1;

    return randomDie;
};

var initializeGame = function() {
  player1 = new Player();
  player2 = new Player();
  player1.isActive = true;
}

var switchPlayer = function() {
  if (player1.isActive === true) {
    player1.isActive = false;
    player2.isActive = true;
    turnScoreReset();
  } else {
    player2.isActive = false;
    player1.isActive = true;
    turnScoreReset();
  }
}

var turnScoreReset = function() {
  player1.turnScore = 0;
  player2.turnScore = 0;
}

var whichPlayerRoll = function() {
  if (player1.isActive === true) {
    playerRoll(player1);
  } else {
    playerRoll(player2);
  }
}

var playerRoll = function(player) {
  var roll = randomDie;
  if(roll === 1){
    player.turnScore = 0;
    switchPlayer();
  } else {
    player.turnScore += roll;
  }
  checkForEndOfGame();
  return roll;
}

var whichPlayerHold = function() {
  if (player1.isActive === true) {
    playerHold(player1);
  } else {
    playerHold(player2);
  }
}

var playerHold = function(player) {
  player.gameScore += player.turnScore;
  switchPlayer();
}

var checkForEndOfGame = function() {
  if (player1.gameScore >= 100 || player2.gameScore >= 100) {
    if (player1.gameScore > player2. gameScore) {
      alert("End of game! Player 1 won!");
    } else if (player1.gameScore < player2. gameScore) {
      alert("End of game! Player 2 won!");
    } else {
      alert("End of game! Tie!");
    }
  }
}

var stylePanels = function() {
  if (player1.isActive === true) {
    $("#player2panel").removeClass("activeUser");
    $("#player1panel").addClass("activeUser");
  } else {
    $("#player1panel").removeClass("activeUser");
    $("#player2panel").addClass("activeUser");
  }
}


//user-interface
$(document).ready(function() {


  initializeGame();
  stylePanels();

  $("button#roll").click(function(event) {
    $(".dice").html('<img src=img/die'+ randomDie +'.png>');
    whichPlayerRoll();
    stylePanels();
    var roundScore = roundScore + randomNumber();
    $("#player1Tscore").text(player1.turnScore);
    $("#player1Gscore").text(player1.gameScore);
    $("#player2Tscore").text(player2.turnScore);
    $("#player2Gscore").text(player2.gameScore);
    event.preventDefault();
  })

  $("button#hold").click(function(event) {
    event.preventDefault();
    whichPlayerHold();
    stylePanels();
  })
})
