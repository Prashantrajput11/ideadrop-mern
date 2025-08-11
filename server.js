// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ideaRouter from "./routes/ideaRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to mongoDb
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for raw json

app.use(express.urlencoded({ extended: true })); // for form url encoded

app.use("/api/ideas", ideaRouter);
app.use("/api/auth", authRouter);
app.use((req, res, next) => {
	const error = new Error(`not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});
app.use(errorHandler);

// Start server - tad@123
app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
