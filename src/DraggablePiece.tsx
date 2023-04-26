import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggablePieceProps {
  piece: string;
  row: number;
  col: number;
  image: string | null;
}

const DraggablePiece: React.FC<DraggablePieceProps> = ({ piece, row, col, image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { piece, row, col },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const pieceImage = image;

  return pieceImage ? (
    <img
      ref={drag}
      src={pieceImage}
      alt={piece}
      width="100%"
      height="100%"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      key={`${row}-${col}-${piece}`} // add key prop
    />
  ) : null;
};

export default DraggablePiece;
