// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Passport configuration
require("./config/passport-setup")(passport);

// Initialize Express app
const app = express();

// --- Database Connection ---
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ MongoDB Connected...");
	} catch (err) {
		console.error("❌ MongoDB Connection Error:", err.message);
		process.exit(1);
	}
};
connectDB();

// --- Middlewares ---
app.use(
	cors({
		origin: process.env.CLIENT_URL, // Allow requests from our React app
		credentials: true, // Allow cookies to be sent and received
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// --- Routes ---
app.use("/api/auth", require("./routes/authRoutes"));

// --- Server Listening ---
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
