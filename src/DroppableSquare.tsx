import React from 'react';
import { useDrop } from 'react-dnd';

interface DroppableSquareProps {
    row: number;
    col: number;
    color: string;
    children: React.ReactNode;
    onMovePiece: (fromRow: number, fromCol: number, toRow: number, toCol: number) => void;
}

const DroppableSquare: React.FC<DroppableSquareProps> = ({
    row,
    col,
    color,
    children,
    onMovePiece,
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'piece',
        drop: (item: { piece: string; row: number; col: number }) => {
            console.log(`dropped piece from (${item.row}, ${item.col}) to (${row}, ${col})`);
            onMovePiece(item.row, item.col, row, col);
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
