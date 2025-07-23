// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to the API 🚀");
});

app.get("/api/notes", (req, res) => {
	res.json([
		{ id: 1, title: "Learn Express", priority: "High" },
		{ id: 2, title: "Build a REST API", priority: "Medium" },
	]);
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
