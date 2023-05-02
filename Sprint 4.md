# Sprint 4

Issues tackled:

1. Pawn promotions

2. Load game dropdown options and selection

Unit test:

Implemented a Cypress test for the load game dropdown.

The backend API for this sprint has the ```GET /api/new-game endpoint``` which will start a new game from the starting position, returning a chessboard 2D array. 
Also the ```POST /api/move``` endpoint which will make a move on the chessboard, returning an updated chessboard 2D array. Arguments for the request are fromRow, fromCol, toRow, toCol, and promotionChoice(optional).
The ```POST /api/save-game``` endpoint which will save the game current position to a MongoDB database hosted on MongoDB Atlas and return a success message. No arguments are needed.
The ```GET /api/load-games``` endpoint will query all the games in the DB played in the current session.
Finally, the ```POST /api/display-loaded-game``` endpoint will find the game that was selected from the DB and return its chessboard object and its status. Only argument needed is gameId.
