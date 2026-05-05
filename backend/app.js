import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import router from "./router/messageRouter.js"; 
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import appointmentrouter from "./router/appointmentRouter.js";
import aiRouter from "./router/aiRouter.js";


dotenv.config();

const app = express();

// ---------------- MIDDLEWARES ---------------- //

// CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// URL encoded data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp/'
}));

app.use("/api/v1/message", router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentrouter);
app.use("/api/v1/ai", aiRouter);

app.use(errorMiddleware)



export default app;