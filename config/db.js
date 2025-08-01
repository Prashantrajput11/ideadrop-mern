import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	console.log("uri", process.env.MONGO_URI);

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDb Connected : ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error : ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
