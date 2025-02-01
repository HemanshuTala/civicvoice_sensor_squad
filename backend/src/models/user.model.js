import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        required: true,
        minlength: 12,
        maxlength: 12
    },
    otp: {
        type: Number,
        minlength: 6,
        maxlength: 6
    },
    district: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    is_superadmin: {
        type: Boolean,
        default: false
    },
    is_voted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complain"
        }
    ]

})
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        is_admin: this.is_admin,
        is_superadmin: this.is_superadmin,
        is_voted: this.is_voted
    },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_TOKEN_TIME
        }
    )
}

export const User = mongoose.model("User", userSchema) 