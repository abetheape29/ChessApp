import React from 'react';
import { useDrop } from 'react-dnd';
import { ChessBoardBoard } from './utils';

interface DroppableSquareProps {
  row: number;
  col: number;
  color: string;
  children: React.ReactNode;
  onMovePiece: (fromRow: number, fromCol: number, toRow: number, toCol: number) => ChessBoardBoard;
  onDrop: (fromRow: number, fromCol: number, toRow: number, toCol: number) => void;
}

const DroppableSquare: React.FC<DroppableSquareProps> = ({
  row,
  col,
  color,
  children,
  onMovePiece,
  onDrop,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { piece: string; row: number; col: number }) => {
      const newState = onMovePiece(item.row, item.col, row, col);
      onDrop(item.row, item.col, row, col);
      return newState;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`square ${color}`}
      style={{ backgroundColor: isOver ? '#aaa' : undefined }}
    >
      {children}
    </div>
  );
};

export default DroppableSquare;
