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
    fetchComplainByDistrict,
    setComplete,
    rejectComplain,
    fetchAcceptApprovalComplains,
    AcceptApprovalComplains,rejectApprovalComplains,
    fetchcompleteApproval,
    acceptCompleteApproval,
    rejectCompleteApproval,extendDeadline
} from "../../controllers/complain.controller.js";

import { upload } from "../../middlewares/multer.middleware.js"
import { verifyUser, verifyAdmin, verifySuperAdmin } from "../../middlewares/auth.middleware.js"


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
router.route("/setCompleted").post(upload.single("image"),verifyUser, verifyAdmin, setComplete)

router.route("/reject").post(verifyUser, verifyAdmin, rejectComplain)
router.route("/get-overdue-complain").get(verifyUser, verifyAdmin, fetchComplainWithPastDeadline)
//----------------------------------SuperAdmin routes--------------------------------------------


//get all the complains
router.route("/get-all")
    .get(getAllComplaints)

// extend deadline
router.route("/updateStatustemp").get(updateStatustemp)
router.route("/extend-deadline").post(verifyUser,verifySuperAdmin,extendDeadline)
router.route("/accepted/approval").get(verifyUser, verifySuperAdmin, fetchAcceptApprovalComplains)
router.route("/accepted/approval/accept").post(verifyUser, verifySuperAdmin, AcceptApprovalComplains)
router.route("/accepted/approval/reject").post(verifyUser, verifySuperAdmin, rejectApprovalComplains)
router.route("/complete/approval").get(verifyUser, verifySuperAdmin, fetchcompleteApproval)
router.route("/complete/approval/accept").post(verifyUser, verifySuperAdmin, acceptCompleteApproval)
router.route("/complete/approval/reject").post(verifyUser, verifySuperAdmin, rejectCompleteApproval)
export default router