import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{
		timestamps: true,
	}
);

// Run this function before saving a user document.
userSchema.pre("save", async function (next) {
	// If the password wasn't changed, skip the rest of this function.
	if (!this.isModified("password")) return next();

	// Generate a random salt for hashing.
	const salt = await bcrypt.genSalt(10);

	// Replace the plain-text password with its secure hash.
	this.password = await bcrypt.hash(this.password, salt);

	// Continue with the save operation.
	next();
});

const User = mongoose.model("User", userSchema); // force "ideas" collection

export default User;
