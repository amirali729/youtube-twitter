import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
})

export const Tweet = mongoose.model("Tweet", tweetSchema)