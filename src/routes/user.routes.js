import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken }  from "../controllers/user.controller.js";
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

export default router