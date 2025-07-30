import express from "express";
import Idea from "../model/idea.js";
import mongoose from "mongoose";

const router = express.Router();
// Routes

// @route       GET/api/ideas
// @description  Get all ideas
// @access       Public

router.get("/", async (req, res, next) => {
	try {
		const ideas = await Idea.find();

		res.json(ideas);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// @route       GET/api/ideas/:id
// @description  Get single idea
// @access       Public
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;

		// Check if id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			res.status(404);
			throw new Error("idea not found");
		}

		const idea = await Idea.findById(id);

		if (!idea) {
			res.status(404);
			throw new Error("Idea not found");
		}

		res.json(idea);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// @route       POST/api/ideas
// @description  Create new idea
// @access       Private
router.post("/", async (req, res, next) => {
	try {
		const { title, summary, description, tags } = req.body;

		if (!title?.trim() || !summary?.trim() || !description?.trim()) {
			res.status(400);
			throw new Error("Title, summary and description are required");
		}

		const newIdea = new Idea({
			title,
			summary,
			description,
			tags:
				typeof tags === "string"
					? tags
							.split(",")
							.map((tag) => tag.trim())
							.filter(Boolean)
					: Array.isArray(tags)
					? tags
					: [],
		});

		const savedIdea = await newIdea.save();
		res.status(201).json(savedIdea);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

export default router;
