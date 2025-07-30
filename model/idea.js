import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		description: {
			type: String,
			required: true,
			maxlength: 1000,
		},
		tags: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Idea = mongoose.model("Idea", ideaSchema); // force "ideas" collection

export default Idea;
