import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    complain_no: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {// deadline updated by complain receiver
        type: Date,
        default: null
    },
    address: { // complain category
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    category: { // complain category
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    user: { // who made complain
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {// status updated by complain receiver
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status"
    },



}, { timestamps: true });

export const Complain = mongoose.model("Complain", complainSchema)