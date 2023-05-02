# Sprint 3

Issues tackled: 

1. Correct Movement of pieces. SOLVED

2. Castling rights. SOLVED

3. Database connection. SOLVED

4. Save Game Button. SOLVED

5. Save a game to DB and alert user. SOLVED

Unit Tests:

Implemented a Cypress test for the Save game button, as well as a backend test in jest for incorrect moves and castling rights. 

Backend Documentation:

The backend API for this sprint has the ```GET /api/new-game``` endpoint which will start a new game from the starting position, returning a chessboard 2D array. 
Also the ```POST /api/move``` endpoint which will make a move on the chessboard, returning an updated chessboard 2D array.
Finally the ```POST /api/save-game``` endpoint which will save the game current position to a MongoDB database hosted on MongoDB Atlas.
