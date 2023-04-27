import { Router } from "express";
import { initialBoard, movePiece, ChessBoardBoard } from "./utils";

const router = Router();

let chessboard: ChessBoardBoard = initialBoard;


router.get("/api/new-game", (req, res) => {
    chessboard = initialBoard;
    res.json(chessboard);
});

router.post("/api/move", (req, res) => {
    const { fromRow, fromCol, toRow, toCol } = req.body;
    chessboard = movePiece(fromRow, fromCol, toRow, toCol, chessboard);
    res.json(chessboard);
});

export default router;
