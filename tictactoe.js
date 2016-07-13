console.log('TicTacToe');

var container = document.querySelector('#container');
var board = [4,5,6,7,8,9,10,11,12];
var turn = true;

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
  refreshPage();
  checkWin();
}
  // changeGraphics
function checkWin() {
  if ((board[0] === board[1] && board[1] === board[2]) || (board[3] === board[4] && board[4] === board[5]) || (board[6] === board[7] && board[7] === board[8]) || (board[0] === board[3] && board[3] === board[4]) || (board[1] === board[4] && board[4] === board[7]) || (board[2] === board[5] && board[5] === board[8]) || (board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6])) {

    var winner = turn ? 'Player 2 Wins' : 'Player 1 Wins';
    console.log(winner);
    turn = null;
  }
}

container.addEventListener('click', checkPosition);

// Player 1 vs Computer




// Manipulating DOM - Separation of concerns

function refreshPage () {
  for (var i=0; i<board.length; i++) {
    if (board[i] === 1) {
      document.querySelector('#box-' + i).className = "p1-image";
    } else if (board[i] === 2) {
      document.querySelector('#box-' + i).className = "p2-image";
    }
  }
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
