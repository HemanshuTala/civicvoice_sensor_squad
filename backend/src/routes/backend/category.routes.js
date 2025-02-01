import { Router } from "express";

import {
    create,
    view
} from "../../controllers/category.controller.js";

import { upload } from "../../middlewares/multer.middleware.js"
import { verifyAdmin, verifyUser } from "../../middlewares/auth.middleware.js"
// add middelware for checking admin

const router = Router()

// router.get("/temp", (req, res) => {
//     res.send("category is runnig")
// })
router.route("/create")
    .post(verifyUser, verifyAdmin, create)
router.route("/get-all")
    .get(view)


export default router