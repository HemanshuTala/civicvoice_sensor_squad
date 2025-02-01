import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"


const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedinfo = jwt.verify(token, process.env.SECRET_KEY)

        
        const user = await User.findById(decodedinfo?.id)

        if (!user) {
            throw new ApiError(404, "Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Token Expired');
        }

        throw new ApiError(404, error?.message)
    }
})
const verifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        const user_id = req.user?._id;

        if (!user_id) {
            throw new ApiError(401, "User ID not provided. Unauthorized access.");
        }

        const loggedInUser = await User.findById(user_id);

        if (loggedInUser?.is_admin) {
            return next();
        }

        throw new ApiError(403, "Access denied. Admin privileges required.");
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized access.");
    }
});


export { verifyUser, verifyAdmin }

