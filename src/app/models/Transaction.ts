
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    SenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require,
    },
    RecieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require,
    },
    SenderCard:{
        type: String,
        require,
    },
    RecieverCard:{
        type: String,
        require,
    },
    Amount: {
        type: Number,
        require
    }
});

export const Transaction = mongoose.models.transactions || mongoose.model("transactions", TransactionSchema);