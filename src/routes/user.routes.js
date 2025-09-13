import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, updateUserDetails,changeUserPassword, getUserProfile,updateUserAvatar,updateUserCoverImage,getUserChannelProfile, getUserWatchHistory }  from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/auth/register").post( 
    upload.fields([
        {
            name : "avatar",
            maxCount: 1
        },
        { 
            name : "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/auth/login").post(loginUser)

router.route("/auth/logout").post(verifyJwt,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/auth/change-password").post(verifyJwt,changeUserPassword)
router.route("/get-user").get(verifyJwt,getUserProfile)
router.route("/update-user-details").patch(verifyJwt,updateUserDetails)
router.route("/update-user-avatar").patch(verifyJwt,upload.single("avatar"),updateUserAvatar)
router.route("/update-user-coverImage").patch(verifyJwt,upload.single("coverImage"),updateUserCoverImage)

router.route("/channel/:userName").get(verifyJwt,getUserChannelProfile)
router.route("/history").get(verifyJwt,getUserWatchHistory)

export default router