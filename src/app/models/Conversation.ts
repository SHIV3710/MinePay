    import mongoose from "mongoose";

    const ConversationSchema = new mongoose.Schema({
        Participants:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
        }],
        Messages:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"messages"
        }]
    });

    export const Conversation = mongoose.models.conversations || mongoose.model("conversations", ConversationSchema);