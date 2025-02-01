import { Complain } from "../models/complain.model.js";
import { User } from "../models/user.model.js"
import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { createStatus } from "./status.controller.js";
import { createAddress } from "./Address.controller.js";
import mongoose from "mongoose";
import { Status } from "../models/status.model.js";
const formatComplaintDataWithVoteCount = async (complaints, currentUser) => {
    // Fetch all users with their `is_voted` arrays and roles
    const users = await User.find({}, 'is_voted is_admin is_superadmin');

    // Create a map to store vote counts for each complaint
    const voteCounts = {};

    // Count votes for each complaint
    users.forEach(user => {
        user.is_voted.forEach(complaintId => {
            voteCounts[complaintId] = (voteCounts[complaintId] || 0) + 1;
        });
    });

    // Format the complaints and add vote counts
    const formattedComplaints = complaints.map(complaint => {
        const formattedComplaint = {

            complaintDate:complaint.date.split("T")[0],
            complainNo: complaint.complain_no,
            name: complaint.name,
            description: complaint.description,
            image: complaint.image,
            createdAt: complaint.createdAt,
            updatedAt: complaint.updatedAt,
            category: complaint.category?.name, // Just the category name
            district: complaint.address.district,
            area: complaint.address.area,
            pincode: complaint.address.pincode,
            status: complaint.status?.name, // Status name
            deadline: complaint.deadline ? complaint.deadline : "Not set", // Check if deadline is set
            voteCount: voteCounts[complaint._id.toString()] || 0, // Add vote count or default to 0
        };

        // // Check if the user has voted for this complaint
        if (currentUser) {
            const isVoted = currentUser.is_voted && Array.isArray(currentUser.is_voted) && currentUser.is_voted.includes(complaint._id.toString());
            formattedComplaint.hasUserVoted = isVoted;
            // Customize based on user role (admin, superadmin, or regular user)
            if (currentUser.is_admin || currentUser.is_superadmin) {
                // Admin or Superadmin can see more sensitive data
                formattedComplaint.userEmail = complaint.user.email;
                formattedComplaint.userAadhar = complaint.user.aadhar;
                formattedComplaint.userRole = currentUser.is_admin ? 'Admin' : 'Superadmin';
            } else {
                // Normal users might see less sensitive data (hide email/Aadhar)
                formattedComplaint.userEmail = 'Hidden'; // Example of hiding user data for normal users
            }
        }
        return formattedComplaint;
    });

    return formattedComplaints;
};



const getSummary = async () => {
    const complains = await Complain.find()
        .populate('status') // Populate status to access status.name
        .lean();

    // Count based on status.name
    const solvedComplains = complains.filter(complain => complain.status?.name === "Completed").length;
    const totalComplains = complains.length;
    const pendingComplains = totalComplains - solvedComplains;

    return {
        total: totalComplains,
        completed: solvedComplains,
        pending: pendingComplains
    };
};

//complain creation 
const create = asyncHandler(async (req, res) => {
    //get data

    const {date, complaintName, description, category, area, district, pincode } = req.body
    // console.log(req.body);

    //validate
    if ([date,complaintName, description, category, area, district, pincode].some((field) => !field)) {
        throw new ApiError(400, "All fields is required")
    }
    // get the user
    const user_id = req.user?._id
    if (!user_id) {
        throw new ApiError(401, "Unauthorized Access")
    }
    const user = await User.findById(user_id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    //get the category
    const categoryObject = await Category.findOne({ name: category })
    if (!categoryObject) {
        throw new ApiError(404, "Category not found")
    }
    // console.log("categoryObject->", categoryObject)

    //create address
    const address = await createAddress(area, district, pincode)
    if (!address) {
        throw new ApiError(500, "Some internal error occured")
    }

    const statusObject = await createStatus("Not Accepted", "You Complain not approved yet.")
    //generate unique complain num
    const timestamp = Date.now();
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    const complaintId = `CMP-${timestamp}-${randomPart}`;

    //get image
    const image = req.file?.path
    if (!image) {
        throw new ApiError(400, "Image is required.")
    }

    //create complain object
    const createdcomplain = await Complain.create({
        date: date,
        name: complaintName,
        complain_no: complaintId,
        description: description,
        image: image,
        address: address,
        status: statusObject,
        category: categoryObject._id,
        user: user,
    })

    if (!createdcomplain) {
        throw new ApiError(500, "Somthing went wrong while submitting complain")
    }
 
    // sending response
    return res.status(201).json(new ApiResponse(200, createdcomplain, "Complain submitted successfully"))
})

// user complain showing
const getAllComplaints = asyncHandler(async (req, res) => {
    try {
        const complaints = await Complain.find()
            .populate('address')     // Populate address
            .populate('category')    // Populate category
            .populate('status')      // Populate status
            .populate('user')        // Populate user
            .select('date complain_no name description image deadline createdAt updatedAt')
            .lean();

        if (complaints.length === 0) {
            throw new ApiError(404, "No complaints found.");
        }


        const currentUser = req.user
        const formattedComplaint = await formatComplaintDataWithVoteCount(complaints, currentUser)

        return res.status(200).json(new ApiResponse(200, formattedComplaint, "Complaints fetched successfully"));

    } catch (error) {
        throw new ApiError(404, error?.message);
    }
});


//showing complain based on complain no or distric
const fetchOnNumberOrDistric = asyncHandler(async (req, res) => {

    const { complain_no, district } = req.query

    if (!complain_no && !district) {
        throw new ApiError(401, "One field must be selected.")
    }
    if (complain_no) {
        const complainObject = await Complain.find({ complain_no: complain_no })
            .populate('address')     // Populate address
            .populate('category')    // Populate category
            .populate('status')      // Populate status
            .populate('user')        // Populate user
            .select('date complain_no name description image deadline createdAt updatedAt')
            .lean();



        if (complainObject.length == 0) {
            throw new ApiError(401, "No complaints found.");
        }
        const currentUser = req.user
        const formattedComplaint = await formatComplaintDataWithVoteCount(complainObject, currentUser)
        // console.log(formattedComplaint, "<---")

        return res.status(200).json(new ApiResponse(200, formattedComplaint, "Complain fetched successfully"))
    } else if (district) {

        const complains = await Complain.find().populate('address')     // Populate address
        .populate('category')    // Populate category
        .populate('status')      // Populate status
        .populate('user')        // Populate user    
        .select('date complain_no name description image deadline createdAt updatedAt')
        .lean();
        
        if (!complains) {
            throw new ApiError(401,"No complains found.")
        }
        
    const filteredComplains = complains.filter((complain) => {
        if (complain.address.district == user.district) {
            return complain
        }
    });
    
    if(!filteredComplains){
        throw new ApiError(401,"No complains found.")
    }
    const formattedComplains = await formatComplaintDataWithVoteCount(filteredComplains,user)
    
        return res.status(200).json(new ApiResponse(200,formattedComplains,"Complains fetched successfully."))
    }
})

const getCurrentUserComplain = asyncHandler(async (req, res) => {
    const currentUserId = req.user?._id
    const currentUser = await User.findById(currentUserId)
    const currentUserComplain = await Complain.find({ user: currentUser })
        .populate('address')     // Populate address
        .populate('category')    // Populate category
        .populate('status')      // Populate status
        .populate('user')        // Populate user    
        .select('date complain_no name description image deadline createdAt updatedAt')
        .lean();

    if (!currentUserComplain) {
        throw new ApiError(404, "No complain found.")
    }
    const complains = await formatComplaintDataWithVoteCount(currentUserComplain, currentUser)

    return res.status(200).json(new ApiResponse(200, complains, "complain fetched successfully."))
})

const getStats = asyncHandler(async (req, res) => {
    const stats = await getSummary()

    if (!stats) {
        throw new ApiError(404, "No data found.")

    }

    return res.status(200).json(new ApiResponse(200, stats, "Data fetched successfully."))
})
const fetchComplainByDistrict = asyncHandler(async(req,res)=>{
    const user =  await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(401,"User not found.")   
    }
    
    const complains = await Complain.find().populate('address')     // Populate address
    .populate('category')    // Populate category
    .populate('status')      // Populate status
    .populate('user')        // Populate user    
    .select('date complain_no name description image deadline createdAt updatedAt')
    .lean();
    
    if (!complains) {
        throw new ApiError(401,"No complains found.")
    }
    
const filteredComplains = complains.filter((complain) => {
    if (complain.address.district == user.district) {
        return complain
    }
});

if(!filteredComplains){
    throw new ApiError(401,"No complains found.")
}
const formattedComplains = await formatComplaintDataWithVoteCount(filteredComplains,user)

    return res.status(200).json(new ApiResponse(200,formattedComplains,"Complains fetched successfully."))
})
const addVote = asyncHandler(async(req,res)=>{
    const {complainNo} = req.body
    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(404,"User not found.")
    }

    const complain = await Complain.find({complain_no:complainNo})
    if(!complain){
        throw new ApiError(404,"Complain not found.")
    }
    
    user.is_voted.push(complain)
    console.log(user.is_voted ,"<-- is voted");
    
    await user.save()
    return res.status(200).json(200,null,"Vote added successfully.")
})
// ---------------------------------------- Admin controller -------------------------------


// based on page send status and fetch complains and in superUser get all complains 
const getComplainByStatus = asyncHandler(async (req, res) => {
    const { status } = req.query;

    if (!status) {
        throw new ApiError(404, "Status not found");
    }

    // console.log("Requested Status -->", status);

    // Fetch all complaints with populated fields
    const complains = await Complain.find()
        .populate('address')     // Populate address
        .populate('category')    // Populate category
        .populate('status')      // Populate status
        .populate('user')        // Populate user    
        .select('complain_no name description image deadline createdAt updatedAt')
        .lean();

    // console.log("All Complaints -->", complains);

    if (!complains || complains.length === 0) {
        throw new ApiError(404, "No complaints found.");
    }

    // Filter complaints based on status and user access
    const filteredComplains = complains.filter((complain) => {
        if (req.user?.is_admin) {
            return (
                complain.status?.name === status &&
                complain.address?.district === req.user?.district
            );
        } else {
            return complain.status?.name === status;
        }
    });

    // console.log("Filtered Complaints -->", filteredComplains);

    if (filteredComplains.length === 0) {
        throw new ApiError(404, "No complaints found with the specified status.");
    }

    // Format the filtered complaints
    const formattedComplains = await formatComplaintDataWithVoteCount(filteredComplains, req.user);

    res.status(200).json(new ApiResponse(200, formattedComplains, "Complaints fetched successfully"));
});

// accepte complain by admin
const acceptComplain = asyncHandler(async (req, res) => {
    //get data
    const { complainId, status, deadline, description } = req.body

    //validate
    if ([status, deadline, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "For accepting complain status, description & deadline are required")
    }

    //get complain
    const complainObject = await Complain.findById(complainId)
    if (!complainObject) {
        throw new ApiError(500, "Some internal error occured while fetching complain")
    }

    //create status
    const statusObject = await createStatus(status, description)

    if (!statusObject) {
        throw new ApiError(500, "Somthing went wrong while updating status")
    }
    complainObject.deadline = deadline
    complainObject.status = statusObject
    await complainObject.save()

    const updatedComplainObject = await Complain.findById(complainId)
    return res.status(201).json(new ApiResponse(201, updatedComplainObject, "Complain updated successfully"))

})

const rejectComplain = asyncHandler(async (req, res) => {

})
//status update
const updateStatus = asyncHandler(async (req, res) => {
    const { complainId, status, description } = req.body;

    const complainObject = await Complain.findById(complainId);

    if (!complainObject) {
        throw new ApiError(404, "No complain was found.");
    }
    complainObject.status.name = status;
    complainObject.status.description = description;

    await complainObject.save();

    res.status(200).json(new ApiResponse(200, complainObject, "Status updated successfully"));
})


// ----------------------------------------- Super Admin Controller -------------------------

// if deadline is gone and complain not fullfilled then superadmin can extend the deadline
const extendDeadline = asyncHandler(async (req, res) => {
    const { date, complainId } = req.body;

    if (!complainId || !date) {
        throw new ApiError(400, "Complain ID and new deadline date are required");
    }

    const extendedDate = new Date(date);

    if (isNaN(extendedDate)) {
        throw new ApiError(400, "Invalid date format");
    }

    if (extendedDate < new Date()) {
        throw new ApiError(400, "Extended date must be in the future");
    }

    const complainObject = await Complain.findById(complainId);

    if (!complainObject) {
        throw new ApiError(404, "Complain not found");
    }

    if (complainObject.deadline && extendedDate <= complainObject.deadline) {
        throw new ApiError(400, "Extended date must be greater than the existing deadline");
    }

    complainObject.deadline = extendedDate;
    complainObject.is_emailed = false
    complainObject.status = "Overdue"
    await complainObject.save();

    return res
        .status(200)
        .json(new ApiResponse(200, complainObject, "Deadline extended successfully"));
});


const updateStatustemp = asyncHandler(async (req, res) => {
    const complains = await Complain.find().populate("status");

    // for (const complain of complains) {
    //     complain.is_emailed = false
    //     await complain.save(); // Save the updated document
    // }

    res.send(complains);
});

const fetchComplainWithPastDeadline = asyncHandler(async (req, res) => {
    try {
        const currentDate = new Date();

        const pastDeadlineComplains = await Complain.find({
            deadline: { $lt: currentDate }
        })
            .populate('address')     // Populate address
            .populate('category')    // Populate category
            .populate('status')      // Populate status
            .populate('user')        // Populate user
            .lean();

        if (!pastDeadlineComplains || pastDeadlineComplains.length === 0) {
            throw new ApiError(404, "No complaints with past deadlines found.");
        }

        const formattedComplains = await formatComplaintDataWithVoteCount(pastDeadlineComplains, req.user);
        formattedComplains.forEach(complain => {
            if (complain.status != "Overdue") {
                complain.status = "Overdue"

            }
        });
        res.status(200).json(new ApiResponse(200, formattedComplains, "Complaints with past deadlines fetched successfully"));
    } catch (error) {
        // Handle errors
        res.status(error.statusCode || 500).json({
            message: error.message || "An error occurred while fetching complaints with past deadlines."
        });
    }
});


export {fetchComplainByDistrict, addVote,fetchComplainWithPastDeadline, updateStatustemp, getComplainByStatus, create, acceptComplain, getAllComplaints, fetchOnNumberOrDistric, getCurrentUserComplain, getStats, updateStatus }