import { initialBoard, movePiece, fenToBoard } from './src/utils';
import { Chess } from 'chess.js';


describe('Chess Utility Functions', () => {
    describe('movePiece', () => {
        let chess: Chess;
        beforeEach(() => {
            chess = new Chess();
        });

        test('should return a new board with the moved piece', () => {
            const newBoard = movePiece(6, 3, 4, 3, initialBoard, chess, 0, null);
            expect(newBoard)
            if (newBoard) {
                expect(newBoard[6][3] == null);
                expect(newBoard[4][3] == 'P');
            }
        });
    });
    describe('wrongMove', () => {
        let chess: Chess;
        beforeEach(() => {
            chess = new Chess();
        });

        test('should return invalid move error', () => {
            try {
                const newBoard = movePiece(6, 3, 3, 3, initialBoard, chess, 0, null); // pawn move 3 squares forward
            } catch (error) {
                expect((error as Error).message.startsWith('Invalid move'));
            }
            
        });
    });
    describe('castlingRights', () => {
        let chess: Chess;
        beforeEach(() => {
            chess = new Chess();
        });

        test('should return king and rook in correct position', () => {
            chess.load('rnbqkbnr/pp3ppp/2p5/3pp3/4P3/3B1N2/PPPP1PPP/RNBQK2R w KQkq - 0 1'); // chess position one move away from castling
            const board = fenToBoard(chess.fen());
            const newBoard = movePiece(7, 4, 7, 6, board, chess, 0, null); // white king-side castle
            expect(newBoard[7][6] == 'K');
            expect(newBoard[7][5] == 'R');
        });
    });
});
