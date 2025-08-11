import express from "express";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";
import mongoose from "mongoose";

const router = express.Router();
// Routes

// @route       POST/api/auth/register
// @description  Register new user
// @access       Private
// Handle user registration.
router.post("/register", async (req, res, next) => {
	try {
		// Get user details from the request body.
		const { name, email, password } = req.body;

		// Validate that all required fields are present.
		if (!name?.trim() || !email?.trim() || !password?.trim()) {
			res.status(400);
			throw new Error("Name, email and password are required");
		}

		// Check if a user with this email already exists in the database.
		const userExists = await User.findOne({ email });

		// If the user already exists, throw an error.
		if (userExists) {
			res.status(409); // 409 Conflict
			throw new Error("A user with this email already exists");
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		if (user) {
			// Create payloads for the tokens
			const payload = { userId: user._id.toString() };

			// Generate a short-lived access token and a long-lived refresh token
			const accessToken = await generateToken(payload, "15m"); // e.g., 15 minutes
			const refreshToken = await generateToken(payload, "30d"); // e.g., 30 days

			// Set the refresh token in a secure, HttpOnly cookie
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true, // Prevents client-side JS from accessing the cookie
				secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
				sameSite: "strict", // Helps prevent CSRF attacks
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, matching the token's expiration
			});

			// Send the access token and user data in the JSON response
			res.status(201).json({
				accessToken,
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
				},
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	} catch (error) {
		next(error);
	}
});

// @route       POST/api/auth/logout
// @description  Logout new user
// @access       Private

router.post("/logout", (req, res) => {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "none",
	});

	res.status(200).json({ message: "logged out succesfully" });
});

export default router;
