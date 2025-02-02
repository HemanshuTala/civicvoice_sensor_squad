import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    feedback: {
        type: String,
        required:true
    }
})

export const Feedback = mongoose.model("Feedback", feedbackSchema)