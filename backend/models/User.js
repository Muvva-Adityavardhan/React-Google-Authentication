// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
); // timestamps adds createdAt and updatedAt fields

module.exports = mongoose.model("User", UserSchema);
