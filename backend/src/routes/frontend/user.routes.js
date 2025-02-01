import { Router } from "express";

import {
    verifyOtp,
    generateOtp
} from "../../controllers/user.controller.js";

import { upload } from "../../middlewares/multer.middleware.js"
import { verifyUser } from "../../middlewares/auth.middleware.js"


const router = Router()

// router.get("/temp", (req, res) => {
//     res.send("user is runnig")
// })
router.route("/generate-otp")
    .post(generateOtp)
router.route("/verify-otp").post(verifyOtp)


export default router