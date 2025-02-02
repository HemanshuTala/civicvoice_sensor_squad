import { Router } from "express";

import {
    verifyOtp,
    generateOtp,
    createAdmin,
    fetchAdmin
} from "../../controllers/user.controller.js";

import { upload } from "../../middlewares/multer.middleware.js"
import { verifyUser,verifySuperAdmin } from "../../middlewares/auth.middleware.js"


const router = Router()

// router.get("/temp", (req, res) => {
//     res.send("user is runnig")
// })
router.route("/generate-otp")
    .post(generateOtp)
router.route("/verify-otp").post(verifyOtp)

router.route("/add/admin").post(verifyUser,verifySuperAdmin,createAdmin)
router.route("/get/admin").get(verifyUser,verifySuperAdmin,fetchAdmin)

export default router