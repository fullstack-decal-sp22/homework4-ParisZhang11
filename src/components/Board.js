import React, {useState} from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {

    var status = 'Next player: X';
    const [board, setBoard] = useState(Array.apply(null, Array(9)));
    const [nextPlayer, setNextPlayer] = useState("X");

    function winGame(board) {
      const winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        const aPlayer = board[a];
        if (aPlayer != null) {
          if (board[b] === aPlayer && (board[c] === aPlayer)) {
            console.log("winGame returns " + aPlayer);
            return aPlayer;
          }
        }
      }
      return null;
    }

    function squareClick(i) {
      const currBoard = board.slice();
      // console.log("winGame(currBoard) = " + winGame(currBoard));
      // console.log("winGame(currBoard) = " + winGame(currBoard));
      if (!winGame(currBoard) && (currBoard[i] == null)) {
        currBoard[i] = nextPlayer;
        setBoard(currBoard);
        if (nextPlayer === "X") {
          setNextPlayer("O");
        } else {
          setNextPlayer("X");
        }
        
      }
    }

    function renderSquare(i) {
        return <Square value={board[i]} onClick={() => squareClick(i)}/>;
    }

    const winner = winGame(board)
    if (winner != null) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + nextPlayer;
    }

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;