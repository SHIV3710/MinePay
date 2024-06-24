import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({

    CardNumber: {
        type: String,
        length: 12,
        require,
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ExpireDate: {
        type: String,
        require,
    },
    Amount: {
        type: Number,
        default:0,
    },
    Pin: {
        type: String,
        require,
        
    }
});

export const Card = mongoose.models.cards || mongoose.model("cards", CardSchema);