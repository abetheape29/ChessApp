# Sprint 2

Issue 1: Solve whitespace between rows. SOLVED
Issue 2: Center board. SOLVED
Issue 3: Add title. SOLVED
Issue 4: Add new game button. SOLVED
Issue 5: move piece. SOLVED

Implemented cypress test for the Start position button. Also unit test for the movePiece function in the backend.

The backend API for this sprint has the ```GET /api/new-game``` endpoint which will start a new game from the starting position, returning a chessboard 2D array.
Also the ```POST /api/move``` endpoint which will make a move on the chessboard, returning an updated chessboard 2D array.
