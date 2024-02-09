import confetti from "canvas-confetti";
import { useState } from "react";

import { Square } from "./components/Square";
import WinnerModal from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import { saveGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);

    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return JSON.stringify("turn");

    return TURNS.O;
  });

  const [winner, setWinner] = useState(null); //null no hay ganador, false es que hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.O);
    setWinner(null);
    resetGame();
  };

  const updateBoard = (index) => {
    //VALIDAR QUE LA POSICION NO HAYA SIDO TOMADA
    if (board[index] || winner) {
      alert("THIS POSITION IS TAKEN");
      return;
    }

    //ACTUALIZAR TABLERO
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //CAMBIAR TURNO
    const newTurn = turn === TURNS.x ? TURNS.O : TURNS.x;
    setTurn(newTurn);

    //guardar partida
    saveGameStorage({ board: newBoard, turn: newTurn });

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Resetear la partida</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
