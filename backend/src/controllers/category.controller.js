import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const create = asyncHandler((req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        throw new ApiError(400, "All fields are required.")
    }

    const categoryObject = Category.create({
        name: name,
        description: description
    })

    if (!categoryObject) {
        throw new ApiError(500, "Somthing went wrong while creating category")
    }

    res.status(201).json(new ApiResponse(200, categoryObject, "Category created successfully"))
})
const view = asyncHandler(async(req,res)=>{
    const categories = await Category.find(); // Fetch all categories

    if (!categories) {
        throw new ApiError(404, "No category found.")
    }
    res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully."))
})
export { create ,view}