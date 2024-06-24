import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        require,
    },
    Email: {
        type: String,
        require,
    },
    Password: {
        type: String,
        require,
    },
    Cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    }],
    isAdmin: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

export const User = mongoose.models.users || mongoose.model("users", UserSchema);