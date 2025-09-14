import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,

    },
    whichVideo : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    commentOwner: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = new mongoose.model("Comment",commentSchema)