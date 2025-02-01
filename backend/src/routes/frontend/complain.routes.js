import { Router } from "express";

import {
    create,
    acceptComplain,
    getAllComplaints,
    fetchOnNumberOrDistric,
    getCurrentUserComplain,
    getStats,
    updateStatus, getComplainByStatus,
    updateStatustemp,
    fetchComplainWithPastDeadline,addVote,
    fetchComplainByDistrict
} from "../../controllers/complain.controller.js";

import { upload } from "../../middlewares/multer.middleware.js"
import { verifyUser, verifyAdmin } from "../../middlewares/auth.middleware.js"


const router = Router()

//---------------------------------user(frontend) routes---------------------------------------
router.get("/temp", (req, res) => {
    res.send("complain is running");
});
// user complain creation
router.route("/create")
    .post(upload.single("image"), verifyUser, create)

// filter based on complain no, district
router.route("/query-get")
    .get(verifyUser, fetchOnNumberOrDistric)

//for my complain section
router.route("/get-user-complains").get(verifyUser, getCurrentUserComplain)

// for summary
router.route("/get-stats").get(getStats)

router.route("/add-vote").post(verifyUser, addVote)
router.route("/get-by-district").get(verifyUser, fetchComplainByDistrict)

//----------------------------------Admin routes-------------------------------------------------

//admin accept complain
router.route("/accept")
    .post(verifyUser, verifyAdmin, acceptComplain)

router.route("/get-by-status").get(verifyUser, verifyAdmin, getComplainByStatus)
//update status
router.route("/update-status")
    .post(verifyUser, verifyAdmin, updateStatus)

router.route("/get-overdue-complain").get(verifyUser, verifyAdmin, fetchComplainWithPastDeadline)
//----------------------------------SuperAdmin routes--------------------------------------------


//get all the complains
router.route("/get-all")
    .get(getAllComplaints)

// extend deadline
router.route("/updateStatustemp").get(updateStatustemp)

export default router