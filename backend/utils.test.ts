import { initialBoard, movePiece } from './src/utils';
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
});