import { SignJWT } from "jose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Generates a JSON Web Token for a given payload using the 'jose' library.
 * @param {object} payload - The data to include in the token (e.g., { userId: '...' }).
 * @param {string} expiresIn - The token's expiration time (e.g., "15m", "30d").
 * @returns {Promise<string>} A promise that resolves to the generated JWT string.
 */
export const generateToken = async (payload, expiresIn = "15m") => {
	try {
		// 1. Validate and get the secret from environment variables
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error("JWT_SECRET is not defined in the .env file.");
		}

		// 2. Convert the secret into the Uint8Array format required by jose
		const secretKey = new TextEncoder().encode(secret);

		// 3. Create and sign the token
		const token = await new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime(expiresIn)
			.sign(secretKey); // Use the correctly formatted key

		return token;
	} catch (error) {
		// Log the original, more descriptive error for debugging
		console.error("Error generating token:", error);
		// Throw a clear error to the calling function
		throw new Error("Could not generate authentication token.");
	}
};
