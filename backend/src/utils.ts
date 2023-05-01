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

export const movePiece = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    chessboard: ChessBoardBoard,
    chess: any,
    turnCounter: number
): ChessBoardBoard => {
    console.log("Initial chessboard:", chessboard); 
    const piece = chessboard[fromRow][fromCol];
    if (!piece) return chessboard;
    if (fromRow === toRow && fromCol === toCol) return chessboard;

    const isWhitePiece = chessboard[fromRow][fromCol]?.toUpperCase() === chessboard[fromRow][fromCol];
    const isWhitesTurn = turnCounter % 2 === 0;
    console.log("isWhitesTurn:", isWhitesTurn);
    console.log("turnCounter:", turnCounter);
    if ((isWhitesTurn && !isWhitePiece) || (!isWhitesTurn && isWhitePiece)) {
        return chessboard;
    }

    chess.move(getMove(fromRow, fromCol, toRow, toCol, piece));
    const newBoard = fenToBoard(chess.fen());

    console.log("Updated chessboard:", newBoard); 

    return newBoard;
};

const getMove = (fromRow: number, fromCol: number, toRow: number, toCol: number, piece: string): string => {
    const from = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}`;
    const to = `${String.fromCharCode(97 + toCol)}${8 - toRow}`;
    let pieceString = "";
    if (piece === "P" || piece == "p") pieceString = "";
    else pieceString = piece.toUpperCase();
    return `${pieceString}${from}${to}`;
}

const fenToBoard = (fen: string): ChessBoardBoard => {
    const boardPosition = fen.split(" ")[0];
    const rankStrings = boardPosition.split("/");
  
    const board: ChessBoardBoard = rankStrings.map((rankString) => {
      const row: ChessBoardRow = [];
      for (const char of rankString) {
        if (/\d/.test(char)) {
          const emptySpaces = parseInt(char, 10);
          for (let i = 0; i < emptySpaces; i++) {
            row.push(null);
          }
        } else {
          row.push(char);
        }
      }
      return row;
    });
  
    return board;
  };
  