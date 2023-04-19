import React from 'react';
import { Board } from './Chessboard.styles';

const Chessboard: React.FC = () => {
  return (
    <Board>
      {[...Array(8)].map((_, row) => (
        <div key={row}>
          {[...Array(8)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`square ${(row + col) % 2 === 0 ? 'white' : 'black'}`}
            />
          ))}
        </div>
      ))}
    </Board>
  );
};

export default Chessboard;
