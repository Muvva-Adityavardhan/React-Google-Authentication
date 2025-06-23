// backend/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to protect routes
const protect = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.id; // Add user id to the request
		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized, token failed" });
	}
};

// @desc    Initiate Google authentication
// @route   GET /api/auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc    Google authentication callback
// @route   GET /api/auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL, session: false }),
	(req, res) => {
		// ---- JWT CREATION EXPLAINED ----
		// 1. Payload: Data we want to store in the token. Keep it minimal. The user's MongoDB ID is perfect.
		const payload = { id: req.user.id };

		// 2. Secret Key: The secret from our .env file used to sign the token.
		const secret = process.env.JWT_SECRET;

		// 3. Options: Expiration time for the token.
		const options = { expiresIn: "1h" };

		// 4. Sign the token
		const token = jwt.sign(payload, secret, options);

		// ---- COOKIE SETUP EXPLAINED ----
		// We send the token to the browser via a secure cookie.
		res.cookie("token", token, {
			httpOnly: true, // The cookie cannot be accessed by client-side JavaScript. Prevents XSS attacks.
			secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production.
			maxAge: 3600000, // 1 hour expiration time in milliseconds
			sameSite: "lax", // Helps prevent CSRF attacks.
		});

		// Redirect the user back to the React application's dashboard
		res.redirect(`${process.env.CLIENT_URL}/dashboard`);
	}
);

// @desc    Get current logged-in user's data
// @route   GET /api/auth/user
const User = require("../models/User"); // Import User model
router.get("/user", protect, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-__v"); // Find user by ID from token
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

// @desc    Logout user
// @route   GET /api/auth/logout
router.get("/logout", (req, res) => {
	// To log out, we simply clear the cookie.
	res.cookie("token", "", {
		httpOnly: true,
		expires: new Date(0), // Set expiration to a past date
	});
	res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
