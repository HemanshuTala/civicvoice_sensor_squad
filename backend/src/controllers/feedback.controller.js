import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import mongoose from "mongoose";
import { Feedback } from "../models/feedback.model.js";

const addFeedback = asyncHandler(async (req, res) => {
    const { feedback } = req.body
    if (!feedback) {
        throw new ApiError(404, "Feedback is required")
    }
    const user = await User.findOne({ _id: req.user._id })
    if (!user) {
        throw new ApiError(404, "User not found.")
    }
    const feedbackObject = await Feedback.create({
        user: user._id,
        feedback: feedback
    })
    return res.status(200).json(new ApiResponse(200, feedbackObject, "Feedback added successfully."))
})

const view = asyncHandler(async (req, res) => {

    const feedbackObjects = await Feedback.find().populate("user").select("feedback")

    if (!feedbackObjects) {
        throw new ApiError(401, "Feedback not found")
    }

    res.status(200).json(
        new ApiResponse(200, feedbackObjects, "feedback fetched successfully")
    )
})
export { addFeedback, view }