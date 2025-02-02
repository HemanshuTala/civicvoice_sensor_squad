import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendOtptoEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await User.updateOne({ email }, { otp });
    console.log('OTP sent:', otp);
};


const generateToken = async (id) => {
    try {

        const user = await User.findById(id)
        const accessToken = user.generateAccessToken()
        return accessToken
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access tokens err:" + error)
    }

}

const generateOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({success: false, message: 'Email is required' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) { // User already exists
            const otp = Math.floor(100000 + Math.random() * 900000);
            user.otp = otp;
            await user.save();
            // Your SMTP configuration
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Or any SMTP service like 'yahoo', 'outlook', etc.
                auth: {
                    user: process.env.SMTP_USER,  // Your email address
                    pass: process.env.SMTP_PASSWORD,  // Your email password (or use an app password if 2FA is enabled)
                },
            });

            // Email options
            const htmlCode = `
          <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .email-header h1 {
        color: #2c3e50;
        font-size: 24px;
      }
      .otp-section {
        text-align: center;
        margin: 20px 0;
      }
      .otp {
        font-size: 32px;
        font-weight: bold;
        color: #e74c3c;
        letter-spacing: 5px;
      }
      .email-footer {
        text-align: center;
        margin-top: 30px;
        color: #7f8c8d;
        font-size: 14px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #3498db;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        text-decoration: none;
      }
      .button:hover {
        background-color: #2980b9;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Email Verification</h1>
      </div>
      <p>Hello, ${user.name}</p>
      <p>Thank you for registering with us. To verify your email address, please use the following One-Time Password (OTP):</p>
  
      <div class="otp-section">
        <div class="otp">${otp}</div>
      </div>
  
      <p>This OTP will expire in 10 minutes. Please do not share this OTP with anyone.</p>
  
      <div class="email-footer">
        <p>If you did not request this verification, please ignore this email.</p>
        <p>Thank you, <br> The CivicVoice Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,           // Recipient email address
                subject: "Email OTP Verification from CivicVoice", // Subject of the email
                html: htmlCode,       // Plain text or HTML content
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Error sending email' });
                }
                else {

                    return res.status(201).json({success: true, message: 'OTP sent to your email' });
                }
            });
            console.log(otp,"<---OTP");
            
        } else {
            return res.status(201).json({success: false, message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message });
    }

};

const verifyOtp = asyncHandler(async (req, res) => {
    // get data
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({success: false, message: "Email and OTP are required" });
    }

    // Check if user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({success: false, message: "User not found" });
    }
    // User exists, verify OTP
    if (user.otp !== Number(otp)) {
        return res.status(400).json({success: false, message: "Invalid OTP" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY);

    return res.status(200).json({success: true, message: "OTP verified successfully", token });
   
})

const createAdmin = asyncHandler(async (req, res) => {
  const { name, email,  district } = req.body
  if ([name, email, district].some((field) => !field)) {
    throw new ApiError(400, "All fields is required")
  }
  //check for existed user
  const existedUser = await User.findOne({ email })

  if (existedUser) {
    throw new ApiError(409, "User with email is exist");
  }

  const user = await User.create({
    name: name,
    email: email,
    district: district,
    role: "admin",
    is_admin: true
  })

  if (!user) {
    throw new ApiError(500, "Someting went wrong while creating Admin")
  }

  res.status(200).json(new ApiResponse(200, user, "Admin created successfully"))
})
const fetchAdmin = asyncHandler(async (req, res) => {
  const admins = await User.find({ is_admin: true })
  if (!admins) {
    throw new ApiError(404, "No admin found.")
  }
  return res.status(200).json(new ApiResponse(200, admins, "Admin fetched successfully"))

})
export { fetchAdmin,createAdmin,verifyOtp, generateOtp }