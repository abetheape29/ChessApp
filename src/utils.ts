import whiteKing from './assets/pieces/wK.svg';
import whiteQueen from './assets/pieces/wQ.svg';
import whiteRook from './assets/pieces/wR.svg';
import whiteBishop from './assets/pieces/wB.svg';
import whiteKnight from './assets/pieces/wN.svg';
import whitePawn from './assets/pieces/wP.svg';
import blackKing from './assets/pieces/bK.svg';
import blackQueen from './assets/pieces/bQ.svg';
import blackRook from './assets/pieces/bR.svg';
import blackBishop from './assets/pieces/bB.svg';
import blackKnight from './assets/pieces/bN.svg';
import blackPawn from './assets/pieces/bP.svg';

export type ChessBoardSquare = string | null;
export type ChessBoardRow = ChessBoardSquare[];
export type ChessBoardBoard = ChessBoardRow[];

export const initialBoard: ChessBoardBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

export const pieceToSvg = (piece: string): string => {
  const pieces: Record<string, string> = {
    K: whiteKing,
    Q: whiteQueen,
    R: whiteRook,
    B: whiteBishop,
    N: whiteKnight,
    P: whitePawn,
    k: blackKing,
    q: blackQueen,
    r: blackRook,
    b: blackBishop,
    n: blackKnight,
    p: blackPawn,
  };

  return pieces[piece] || '';
};

export const getPiece = (row: number, col: number, chessboard: ChessBoardBoard): string | null => {
  const piece = chessboard[row][col];
  return piece ? pieceToSvg(piece) : null;
};
