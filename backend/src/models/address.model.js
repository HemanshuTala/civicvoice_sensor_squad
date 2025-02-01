import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
})

export const Address = mongoose.model("Address", addressSchema)