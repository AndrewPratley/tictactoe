console.log('TicTacToe');


// General variables

var container = document.querySelector('#container');
var playerNum = document.querySelector('#player-number');
var board = [4,5,6,7,8,9,10,11,12];
var winCombs = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
var gameType = 'P1vsComp';
var turn = true;
var p1Tally = 0;
var p2Tally = 0;
var CompTally = 0;
var actionAllowed = true;
var winningArray = 0;

// Sound variables

var click = document.getElementById("click");
var click2 = document.getElementById("click2");
var drawSound = document.getElementById("draw");
var win = document.getElementById("win");

// Main function that runs through the game and runs a number of sub functions where required.

function checkPosition (event) {
  if (actionAllowed) {
    click.play();
    if (gameType === 'P1vsComp') {
      actionAllowed = false;
    }
    var position = event.target.id.slice(4,5);
    if (board[position] > 3) {
      if (turn) {
        board[position] = 1;
        turn = false;
      } else if (turn === false) {
        board[position] = 2;
        turn = true;
      }
    }
    displayBoard();
    var item = winCombs.some(checkWin);
    if (item) { // this does not apply for computer?
      win.play();
      actionAllowed = false;
      winPop();
      addTally();
      turn = null; // I think this might create problems for me later on.
      setTimeout(resetBoard, 2000);
    } else if (!item && draw()) {
      drawSound.play();
      drawPop();
      actionAllowed = false;
      setTimeout(resetBoard, 2000);
    } else {
      setTimeout(function() {
        compMove();
      }, 500);
    }
  }
}

// Check whether there is a win

function checkWin (item, i) {
  if ((board[item[0]] === board[item[1]]) && (board[item[1]] === board[item[2]])) {
    winningArray = i;
    return item;
  }
  return false;
}

// Check whether there is a draw

function draw() {
  var total = board.reduce(function(a, b) {return a + b;}, 0);
  if (total === 13) {
      return true;
    } else {
      return false;
    }
}

// Computer Bad-Ass Genius Happening Here.

function CompStart () {
  gameType = 'P1vsComp';
  checkPosition();
}

function compMove() {
  if ((gameType === 'P1vsComp') && (turn === false)) {
    // setTimeout(function(){
      for (var i=0; i < board.length; i++) {
        if ((board[i] !== 1) && (board[i] !== 2)) {
          board[i] = 2;
          break;
        }
      }
      click2.play();
      turn = true;
      displayBoard();
      var item = winCombs.some(checkWin);
    // }, 500);
      actionAllowed = true;

      if (item) {
      win.play();
      winPop();
      addTally();
      turn = null;
      setTimeout(resetBoard, 2000);
    }
  }
}

// Adds win to Tally

function addTally () {
  if (turn) {
    p2Tally += 1;
  } else {
    p1Tally +=1;
  }
  document.querySelector('#player-score').innerHTML = p1Tally;
  document.querySelector('#other-score').innerHTML = p2Tally;
}

// Manipulating DOM - Separation of concerns

// Refreshing the board based on the what is in the board array

function displayBoard () {
  for (var i=0; i<board.length; i++) {
    if (board[i] === 1) {
      document.querySelector('#box-' + i).innerHTML = 'X';
    } else if (board[i] === 2) {
      document.querySelector('#box-' + i).innerHTML = 'O';
    } else {
      document.querySelector('#box-' + i).innerHTML = ''; // Need this line for the resetBoard.
    }
  }
  if (turn) {
    document.querySelector('#player-score').className = 'turn';
    document.querySelector('#other-score').className = '';
  } else {
    document.querySelector('#player-score').className = '';
    document.querySelector('#other-score').className = 'turn';
  }
}

// Resets the board when the game is over or if gameType is changed

function resetBoard () {
  board = [4,5,6,7,8,9,10,11,12];
  turn = true;
  for (i=0; i<board.length;i++) {
    document.querySelector('#box-' + i).className = 'inner-boxes';
  }
  displayBoard();
  actionAllowed = true;
}

// Resets the scores when gameType is changed

function resetScores() {
  document.querySelector('#player-score').innerHTML = '0';
  document.querySelector('#other-score').innerHTML = '0';
}

// Animation for winning line

function winPop() {
  for (i = 0; i < winCombs[winningArray].length; i++) {
    document.querySelector('#box-' + winCombs[winningArray][i]).className = 'inner-boxes animated rubberBand';
  }
}

// Animation for a draw/tie

function drawPop() {
  for (i=0; i<board.length;i++) {
    document.querySelector('#box-' + i).className = 'inner-boxes animated shake';
  }
}

// Change the type of the game i.e. P1vsComp or P1vsP2

function changeGameType () {
  resetScores();
  resetBoard();
  if (gameType === 'P1vsComp') {
    document.querySelector('#player-number').src = 'twoplayer.png';
    gameType = 'P1vsP2';
  } else {
    document.querySelector('#player-number').src = 'oneplayer.png';
    gameType = 'P1vsComp';
  }
}

// At beginning of game - refresh the board - this will show's who's turn it is.

displayBoard();

// Trigger - Player 1 always starts

container.addEventListener('click', checkPosition);

// Trigger for changing game type (P1vsP2 or P1vsComp)

playerNum.addEventListener('click', changeGameType);

// functions:
// win bouncing borders as well.
// improve computer player logic
// Refactored code so is KISS, DRY, Separation of Concerns.
