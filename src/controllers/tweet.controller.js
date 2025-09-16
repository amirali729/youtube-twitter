import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body

    if(!content){
        throw new ApiError(401,"content is important for the tweet")
    }
    const wordCount  = content.trim().split(/\s+/).length

    if (wordCount < 3) {
        throw new ApiError(400, "Tweet must have at least 3 words")
    }
    const saveTweet = await Tweet.create({
        content,
        user: req.user?._id
    })
    return res
    .status(200)
    .json(
        new ApiResponse(200,saveTweet,
            "user tweet has been uploaded",

        )
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    // if (!userId) {
    //     throw new ApiError(400, "there are no tweets of you")
    // }

    const userTweet = await Tweet.find({ user: userId })
                                  .sort({ createdAt: -1 });
    if (!userTweet || userTweet.length === 0) {
        throw new ApiError(400,"could not get the tweet")
    }
    return res.status(200)
    .json(
        new ApiResponse(200,userTweet,"this the user tweet")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    const userId = req.user?._id
    const {tweetId} = req.params;
    const {content} = req.body
    
    
    const userTweet = await Tweet.findById(tweetId)
    if (!userTweet) {
        throw new ApiError(400, " tweet not found")
    }
     if (userTweet.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this tweet");
    }

    // 3. Update content
    userTweet.content = content || userTweet.content;
    const updatedUserTweet = await userTweet.save();
    return res.status(200)
    .json(
       new ApiResponse(200, updatedUserTweet,"the tweet has been deleted")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
   const userId = req.user?._id
   const {tweetId} = req.params
   

   const tweet = await Tweet.findOneAndDelete({ _id: tweetId, user: userId });
   if (!tweet) {
    throw new ApiError(400, "could not get your tweet")
   }
   return res.status(200)
    .json(
        new ApiResponse(200,{},"the tweet has been deleted")
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}