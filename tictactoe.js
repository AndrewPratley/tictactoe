console.log('TicTacToe');

var container = document.querySelector('#container');
var playerNum = document.querySelector('#player-number');
var board = [4,5,6,7,8,9,10,11,12];
var gameType = 'P1vsComp';
var turn = true;
var p1Tally = 0;
var p2Tally = 0;
var CompTally = 0;

//Player 1 vs Player 2

function checkPosition (event) {
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
  checkWin();
}

function checkWin() {
  var total = board.reduce(function(a, b) { // This variable is to check if there is a draw, see below.
  return a + b;
  }, 0);

  if ((board[0] === board[1] && board[1] === board[2]) || // Check Row 1
  (board[3] === board[4] && board[4] === board[5]) || // Check Row 2
  (board[6] === board[7] && board[7] === board[8]) || // Check Row 3
  (board[0] === board[3] && board[3] === board[6]) || // Check Column 1
  (board[1] === board[4] && board[4] === board[7]) || // Check Column 2
  (board[2] === board[5] && board[5] === board[8]) || // Check Column 3
  (board[0] === board[4] && board[4] === board[8]) || // Check Diagonal 1
  (board[2] === board[4] && board[4] === board[6])) { // Check Diagonal 2
    addTally();
    turn = null; // I think this might create problems for me later on.
    setTimeout(resetBoard, 1000);
  }  else if (total === 13) {
    console.log("Its a draw");
    setTimeout(resetBoard, 1000);
  }
  if ((gameType === 'P1vsComp') && (turn === false)) {
    setTimeout(compMove, 1000);
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

container.addEventListener('click', checkPosition);

// Player 1 vs Computer

// xxxx.addEventListener('click', compStart);

function CompStart () {
  gameType = 'P1vsComp';
  checkPosition();
}

function compMove () {
  for (var i=0; i < board.length; i++) {
    if ((board[i] !== 1) && (board[i] !== 2)) {
      board[i] = 2;
      break;
    }
  }
  turn = true;
  displayBoard();
  checkWin();
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

// Need to add trigger for this.
function resetBoard () {
  board = [4,5,6,7,8,9,10,11,12];
  turn = true;
  displayBoard();
}

displayBoard(); // At the beginning of the game, this will show who's turn it is. Otherwise, neither score is bold.

playerNum.addEventListener('click', changeGameType);

function changeGameType () {
  resetScores();
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


// Initially inserted the image by changing the class based on someone's click rather than based on the board array. But with a computer opponent, I couldn't rely on a click in a div to change the image, so I decided to just use the refresh page method.

// function insertImage (event) {
//   console.log(event.target.className);
//   if (turn) {
//     event.target.className="p2-image";
//   } else {
//     event.target.className="p1-image";
//   }
// }


// functions:
// player's score is bold when it is their turn
// 0 and X pop out
// sounds
// icons
// flashes winning line when someone has won.
// improve computer player logic
// remember tally and positions when page is refreshed
// When explaining - say really refactored code so is KISS, DRY, Separation of Concerns.
