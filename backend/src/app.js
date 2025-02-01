import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',  // Specify the exact origin of your front-end
    credentials: true,               // Allow credentials (cookies, authorization headers)
  }));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser());

// routes
import userRouter from "./routes/frontend/user.routes.js"
import complainRouter from "./routes/frontend/complain.routes.js"
import categoryRouter from "./routes/backend/category.routes.js"


app.use("/api/user", userRouter)
app.use("/api/complain", complainRouter)
app.use("/api/admin/category", categoryRouter)

// app.get("/", (req, res) => {
//     res.send("server is runnig")
// })
export { app }