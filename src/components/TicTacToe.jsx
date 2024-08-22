import { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const nextPlayer = isXNext ? 'X' : 'O';

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="w-24 h-24 text-4xl font-bold text-black bg-white border-2 border-black cursor-pointer focus:outline-none"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className="mt-5 text-center">
        {winner ? (
          <div className="mb-3 text-2xl">Winner: {winner}</div>
        ) : (
          <div className="mb-3 text-2xl">Next Player: {nextPlayer}</div>
        )}
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export default TicTacToe;
