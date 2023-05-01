import { Router } from "express";
import { initialBoard, movePiece, ChessBoardBoard } from "./utils";
import {Chess} from "chess.js";

const router = Router();

let chess = new Chess();
let chessboard: ChessBoardBoard = initialBoard;
let turnCounter = 0;

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
    let resultString : string | null = null;
    if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
            if (chess.turn() === "w") resultString = "Black wins!";
            else resultString = "White wins!";
        }
        else resultString = "Draw!";
    }
    res.json({chessboard, resultString});
});

export default router;
