import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        // minlenght: 10,
        // maxlenght: 100,
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Videos",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true })

export const Playlist = new mongoose.model("Playlist", playlistSchema)