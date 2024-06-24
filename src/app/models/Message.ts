import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
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
    Message:{
        type:String,
    },
    Transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transactions"
    }
});

export const Message = mongoose.models.messages || mongoose.model("messages", MessageSchema);