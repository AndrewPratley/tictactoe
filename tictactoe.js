console.log('TicTacToe');

var container = document.querySelector('#container');
var playerNum = document.querySelector('#player-number');
var click = document.getElementById("click");
var click2 = document.getElementById("click2");
var win = document.getElementById("win");
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

//Check whether can play in position and whether actions are allowed.

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
      compMove();
    }
  }
}

function checkWin (item, i) {
  if ((board[item[0]] === board[item[1]]) && (board[item[1]] === board[item[2]])) {
    winningArray = i;
    return item;
  }
  return false;
}

function draw() {
  var total = board.reduce(function(a, b) {return a + b;}, 0);
  if (total === 13) {
      return true;
    } else {
      return false;
    }
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

// Adds Win to Tally
function addTally () {
  if (turn) {
    p2Tally += 1;
  } else {
    p1Tally +=1;
  }
  document.querySelector('#player-score').innerHTML = p1Tally;
  document.querySelector('#other-score').innerHTML = p2Tally;
}

// Player 1 vs Computer

function CompStart () {
  gameType = 'P1vsComp';
  checkPosition();
}

// Manipulating DOM - Separation of concerns

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

function resetBoard () {
  board = [4,5,6,7,8,9,10,11,12];
  turn = true;
  for (i=0; i<board.length;i++) {
    document.querySelector('#box-' + i).className = 'inner-boxes';
  }
  displayBoard();
  actionAllowed = true;
}


function winPop() {
  for (i = 0; i < winCombs[winningArray].length; i++) {
    document.querySelector('#box-' + winCombs[winningArray][i]).className = 'inner-boxes animated.rubberBand';
  }
}

function drawPop() {
  for (i=0; i<board.length;i++) {
    document.querySelector('#box-' + i).className = 'inner-boxes pop';
  }
}

playerNum.addEventListener('click', changeGameType);

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

function resetScores() {
  document.querySelector('#player-score').innerHTML = '0';
  document.querySelector('#other-score').innerHTML = '0';
}

displayBoard(); // At the beginning of the game, this will show who's turn it is. Otherwise, neither score is bold.

// Trigger - Player 1 always starts.
container.addEventListener('click', checkPosition);

// functions:
// computer not winning.
// smaller screen - winning combo does not grow.
// can put a O after your move for comp.
// reorganise code into sections.
// sound not playing when computer places O
// flashes winning line when someone has won.
// improve computer player logic
// When explaining - say really refactored code so is KISS, DRY, Separation of Concerns.
