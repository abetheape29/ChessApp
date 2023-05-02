import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board, BoardContainer, Title, GameContainer, ContentContainer } from './Chessboard.styles';
import DraggablePiece from '../DraggablePiece';
import DroppableSquare from '../DroppableSquare';
import { initialBoard, pieceToSvg, ChessBoardBoard, ChessBoardRow } from '../utils';

const Chessboard: React.FC = () => {
  const [chessboard, setChessboard] = useState<ChessBoardBoard>(initialBoard);
  const [gameStatus, setGameStatus] = useState<string | null>(null);

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
    toCol: number,
    promotionChoice: string | null = null
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
        body: JSON.stringify({ fromRow, fromCol, toRow, toCol, promotionChoice }),
      });

      const { chessboard: newBoard, resultString: newGameStatus } = await response.json();
      console.log("New chessboard:", newBoard);
      setChessboard(newBoard.map((row: ChessBoardRow) => row.slice()));
      setGameStatus(newGameStatus);
    } catch (error) {
      console.error('Error moving piece:', error);
    }
  };

  const handlePromotion = async (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ) => {
    const promotionChoice = window.prompt("Choose a promotion piece (q, r, n, or b):");
    if (promotionChoice && ["q", "r", "n", "b"].includes(promotionChoice.toLowerCase())) {
      await movePiece(fromRow, fromCol, toRow, toCol, promotionChoice.toLowerCase());
    } else {
      window.alert("Invalid promotion piece. Please try again.");
      await handlePromotion(fromRow, fromCol, toRow, toCol);
    }
  };

  const startNewGame = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/new-game');
      const data = await response.json();
      setChessboard(data);
      setGameStatus(null);
    } catch (error) {
      console.error('Error fetching initial board:', error);
    }
  };

  const saveGame = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/save-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>
        <ContentContainer>
          <Title>My Chess Game</Title>
          {gameStatus && <h2>{gameStatus}</h2>}
          <GameContainer>
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
                        onMovePiece={async (fromRow, fromCol, toRow, toCol) => {
                          const piece = chessboard[fromRow][fromCol];
                          if (piece && piece.toLowerCase() === "p" && (toRow === 0 || toRow === 7)) {
                            await handlePromotion(fromRow, fromCol, toRow, toCol);
                          } else {
                            await movePiece(fromRow, fromCol, toRow, toCol);
                          }
                        }}
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
            <button id="start-position-button" onClick={startNewGame} style={{ marginLeft: '20px' }}>Start Position</button>
            <button id="save-game" onClick={saveGame} style={{ marginLeft: '20px' }}>Save Game</button>
          </GameContainer>
        </ContentContainer>
      </BoardContainer>
    </DndProvider>
  );
};

export default Chessboard;
