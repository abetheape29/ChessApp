import mongoose from "mongoose";

const savedGameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true,
        unique: true,
    },
    fen: {
        type: String,
        required: true,
    },
});

const SavedGame = mongoose.model('SavedGame', savedGameSchema);

export default SavedGame;