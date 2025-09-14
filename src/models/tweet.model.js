import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlenght: 10,
        maxlenght: 100,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
   
},{
    timestamps:true
})

export const Tweet = new mongoose.model("Tweet",tweetSchema)