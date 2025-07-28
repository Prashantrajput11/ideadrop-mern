import express from "express";

const router = express.Router();
// Routes

// @route       GET/api/ideas
// @description  Get all ideas
// @access       Public

router.get("/", (req, res) => {
	// res.json([
	// 	{ id: 1, title: "Build a mood logger app" },
	// 	{ id: 2, title: "Web app for farmers" },
	// ]);

	res.status(400);
	throw new Error("this is an errorr");
});

// @route       POST/api/ideas
// @description  Create new idea
// @access       Private
router.post("/", (req, res) => {
	console.log("body", req.body);

	res.send("processed");
});

export default router;
