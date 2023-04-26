import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board, BoardContainer, Title } from './Chessboard.styles';
import DraggablePiece from '../DraggablePiece';
import DroppableSquare from '../DroppableSquare';
import { initialBoard, pieceToSvg, ChessBoardBoard } from '../utils';

const Chessboard: React.FC = () => {
  const [chessboard, setChessboard] = useState<ChessBoardBoard>(initialBoard);

  const movePiece = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): void => {
    console.log(
      `movePiece called: fromRow=${fromRow}, fromCol=${fromCol}, toRow=${toRow}, toCol=${toCol}`
    );

    setChessboard((prevChessboard) => {
      const newBoard = prevChessboard.map((row) => row.slice());
      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      console.log("setChessboard called with", newBoard);
      return newBoard;
    });
  };



  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        <Title>My Chess Game</Title>
        <Board>
          {chessboard.map((rowContent, row) => (
            <div key={row}>
              {rowContent.map((piece, col) => {
                const color = (row + col) % 2 === 0 ? 'white' : 'black';
                // ...
                return (
                  <DroppableSquare
                    key={`${row}-${col}`}
                    row={row}
                    col={col}
                    color={color}
                    onMovePiece={movePiece}
                  >
                    {piece ? (
                      <DraggablePiece
                        key={`${piece}-${row}-${col}`}
                        piece={piece}
                        row={row}
                        col={col}
                        image={pieceToSvg(piece)}
                      />
                    ) : null}
                  </DroppableSquare>
                );
                // ...

              })}
            </div>
          ))}
        </Board>
      </BoardContainer>
    </DndProvider>
  );
};

export default Chessboard;
