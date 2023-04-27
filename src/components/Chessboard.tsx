import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board, BoardContainer, Title } from './Chessboard.styles';
import DraggablePiece from '../DraggablePiece';
import DroppableSquare from '../DroppableSquare';
import { initialBoard, pieceToSvg, ChessBoardBoard, ChessBoardRow } from '../utils';

const Chessboard: React.FC = () => {
  const [chessboard, setChessboard] = useState<ChessBoardBoard>(initialBoard);

  useEffect(() => {
    const fetchInitialBoard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/new-game');
        const data = await response.json();
        setChessboard(data);
      } catch (error) {
        console.error('Error fetching initial board:', error);
      }
    };

    fetchInitialBoard();
  }, []);


  const movePiece = async (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): Promise<void> => {
    console.log(
      `movePiece called: fromRow=${fromRow}, fromCol=${fromCol}, toRow=${toRow}, toCol=${toCol}`
    );

    try {
      const response = await fetch('http://localhost:3001/api/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fromRow, fromCol, toRow, toCol }),
      });

      const newBoard = await response.json();
      console.log("New chessboard:", newBoard);
      setChessboard(newBoard.map((row: ChessBoardRow) => row.slice()));
    } catch (error) {
      console.error('Error moving piece:', error);
    }
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
                        piece={piece}
                        row={row}
                        col={col}
                        image={pieceToSvg(piece)}
                      />
                    ) : null}
                  </DroppableSquare>
                );
              })}
            </div>
          ))}
        </Board>
      </BoardContainer>
    </DndProvider>
  );
};

export default Chessboard;
