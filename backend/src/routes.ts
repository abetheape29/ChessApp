import { Router } from "express";
import { initialBoard, movePiece, ChessBoardBoard } from "./utils";
import { Chess } from "chess.js";
import SavedGame from "./models/savedGame";

const router = Router();

let chess = new Chess();
let chessboard: ChessBoardBoard = initialBoard;
let turnCounter = 0;
let id = 1;

const resetState = async () => {
    try {
        await SavedGame.deleteMany({});
        id = 1;
    } catch (error) {
        console.error('Error resetting state:', error);
    }
};

// Reset the state when the application starts
(async () => {
    await resetState();
})();


router.get("/api/new-game", (req, res) => {
    chessboard = initialBoard;
    chess = new Chess();
    turnCounter = 0;
    res.json(chessboard);
});

router.post("/api/move", (req, res) => {
    const { fromRow, fromCol, toRow, toCol, promotionChoice } = req.body;
    const tmp = chessboard;
    chessboard = movePiece(fromRow, fromCol, toRow, toCol, chessboard, chess, turnCounter, promotionChoice);
    if (tmp !== chessboard) turnCounter++;
    let resultString: string | null = null;
    if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
            if (chess.turn() === "w") resultString = "Black wins!";
            else resultString = "White wins!";
        }
        else resultString = "Draw!";
    }
    res.json({ chessboard, resultString });
});

router.post("/api/save-game", async (req, res) => {
    const fen = chess.fen();
    const gameId = `Game ${id}`;
    try {
        await SavedGame.findOneAndUpdate(
            { gameId },
            { fen },
            { upsert: true }
        );
        id++;
        res.json({ message: "Game saved successfully!" });
    } catch (error) {
        console.log("Error saving gamme: ", error);
        res.status(500).json({ message: 'Error saving game.' });
    }
});

router.get("/api/load-games", async (req, res) => {
    try {
        const games = await SavedGame.find();
        res.json(games);
    } catch (error) {
        console.log("Error loading games: ", error);
        res.status(500).json({ message: 'Error loading games.' });
    }
});

export default router;
