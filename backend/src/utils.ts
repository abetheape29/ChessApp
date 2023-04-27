export type ChessBoardSquare = string | null;
export type ChessBoardRow = ChessBoardSquare[];
export type ChessBoardBoard = ChessBoardRow[];

export const initialBoard: ChessBoardBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

let turnCounter = 0;

export const movePiece = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    chessboard: ChessBoardBoard,
): ChessBoardBoard => {
    console.log("Initial chessboard:", chessboard); 
    const piece = chessboard[fromRow][fromCol];
    if (!piece) return chessboard;

    const isWhitePiece = chessboard[fromRow][fromCol]?.toUpperCase() === chessboard[fromRow][fromCol];
    const isWhitesTurn = turnCounter % 2 === 0;
    console.log("isWhitesTurn:", isWhitesTurn);
    console.log("turnCounter:", turnCounter);
    if ((isWhitesTurn && !isWhitePiece) || (!isWhitesTurn && isWhitePiece)) {
        return chessboard;
    }

    const newBoard = chessboard.map((row) => row.slice());
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;

    console.log("Updated chessboard:", newBoard); 
    turnCounter++;

    return newBoard;
};
