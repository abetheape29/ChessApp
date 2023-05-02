import { Router } from "express";
import { initialBoard, movePiece, ChessBoardBoard, fenToBoard, getStatus } from "./utils";
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
    const resultString = getStatus(chess);
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

router.post("/api/display-loaded-game", async (req, res) => {
    const { gameId } = req.body;
    try {
        const savedGame = await SavedGame.findOne({ gameId });
        if (savedGame) {
            const fen = savedGame.fen;
            chess.load(fen);
            chessboard = fenToBoard(fen);
            const status = getStatus(chess);
            res.json({ chessboard, status });
        } else {
            console.log("Game not found.");
            res.status(404).json({ message: 'Game not found.' });
        }
    } catch (error) {
        console.log("Error displaying loaded game: ", error);
        res.status(500).json({ message: 'Error displaying loaded game.' });
    }
})

export default router;
