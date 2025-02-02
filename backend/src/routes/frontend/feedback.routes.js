import { Router } from "express";
import { verifyAdmin, verifyUser } from "../../middlewares/auth.middleware.js"
import { addFeedback, view } from "../../controllers/feedback.controller.js";

const router = Router()

// router.get("/temp", (req, res) => {
//     res.send("user is runnig")
// })
router.route("/create")
    .post(verifyUser,addFeedback)

router.route("/view").get(verifyUser,verifyAdmin,view)

export default router