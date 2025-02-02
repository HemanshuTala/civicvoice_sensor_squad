import cron from "node-cron";
import fs from "fs";
import path from "path";
import { Complain } from "../models/complain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileURLToPath } from "url";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer"
// Get absolute directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log file path
const logDir = path.join(__dirname, "logs");
const logFilePath = path.join(logDir, "cron-log.txt");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Function to log messages
const logMessage = (message) => {
    const logEntry = `[${new Date().toLocaleString()}] ${message}\n`;

    fs.appendFile(logFilePath, logEntry, "utf8", (err) => {
        if (err) console.error("Error writing log:", err);
        else console.log(logEntry.trim());
    });
};

const sendEmail = async (complain) => {
    const superAdmin = await User.findOne({ is_superadmin: true })
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
        <title>Complaint Deadline Passed - Urgent Attention Required</title>
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
            .complaint-details {
            margin: 20px 0;
            font-size: 16px;
            }
            .complaint-id {
            font-weight: bold;
            color: #e74c3c;
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
            <h1>Overdue Complaint Notification - Immediate Attention Required</h1>
            </div>
            <p>Hello, ${superAdmin.name},</p>
            <p>We would like to inform you that the deadline for the following complaint has passed, and it requires immediate attention:</p>

            <div class="complaint-details">
            <p><span class="complaint-id">Complaint ID:</span> ${complain.complain_no}</p>
            <p><strong>Category:</strong> ${complain.category.name}</p>
            <p><strong>Address:</strong> ${complain.address.area} ,district: ${complain.address.district} , pincode: ${complain.address.pincode} </p>
            <p><strong>Deadline:</strong> ${complain.deadline}</p>
            </div>

            <p>This complaint is now beyond the allowed resolution period. Please take the necessary action to resolve this matter promptly.</p>

            <p>We request that you review the complaint and make any appropriate decisions or escalate further if necessary.</p>

            <div class="email-footer">
            <p>If you did not request this notification, please contact us immediately to clarify.</p>
            <p>Thank you for your prompt attention to this matter, <br> The CivicVoice Team</p>
            </div>
        </div>
        </body>
        </html> `;
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: superAdmin.email,           // Recipient email address
        subject: "Urgent: Complaint Deadline Passed - Immediate Action Required", // Subject of the email
        html: htmlCode,       // Plain text or HTML content
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        else {

            return res.status(201).json({ success: true, message: 'OTP sent to your email' });
        }
    });

}
// Function to fetch complains with past deadlines
const fetchComplainWithPastDeadline = async () => {
    try {
        const currentDate = new Date();

        const pastDeadlineComplains = await Complain.find({
            deadline: { $lt: currentDate }
        })
            .populate("address")
            .populate("category")
            .populate("status")
            .populate("user"); // Removed .lean() to allow updates

        const complainCount = pastDeadlineComplains.length;
        logMessage(`Fetched ${complainCount} complaints with past deadlines.`);

        if (complainCount > 0) {
            for (const complain of pastDeadlineComplains) {
                // console.log(complain);

                // console.log(`Category:${complain.category?.name} \n
                //     Address: ${complain.address.area} ,  ${complain.address.district} , pincode: ${complain.address.pincode} \n 
                //     Deadline: ${complain.deadline}`)
                // await complain.updateOne({ $set: { "status.name": "Overdue" } });

                // console.log("upadated -->", complain.status.name)// Save changes
                if (!complain.is_emailed) {
                    sendEmail(complain); // Uncomment if needed
                    logMessage(`Email sent to the super admin regarding the overdue complaint: ${complain.complain_no}`);
                    complain.status.name = "Overdue"
                    complain.is_emailed = true;
                    await complain.status.save(); // Save the status object
                    await complain.save(); // Save the complaint itself
                } else {
                    logMessage(`Overdue complaint ${complain.complain_no} has already been emailed to the super admin.`);
                }
            }
        }

        return pastDeadlineComplains;
    } catch (error) {
        // console.error("Error fetching past deadline complaints:", error);
        logMessage("Error fetching past deadline complaints.");
        return null;
    }
};


// Schedule the cron job (runs every minute)
cron.schedule("* * * * *", () => {
    // console.log("Running cron job: ", new Date().toLocaleString());
    fetchComplainWithPastDeadline();
});

export default cron;
