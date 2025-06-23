// backend/config/passport-setup.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "/api/auth/google/callback", // Must match the one in Google Cloud Console
			},
			async (accessToken, refreshToken, profile, done) => {
				// This function is called after the user successfully authenticates with Google.
				// `profile` contains the user's Google profile information.
				const newUser = {
					googleId: profile.id,
					displayName: profile.displayName,
					email: profile.emails[0].value,
					image: profile.photos[0].value,
				};

				try {
					// Check if this user already exists in our database
					let user = await User.findOne({ googleId: profile.id });

					if (user) {
						// If user exists, proceed with this user
						console.log("User already exists:", user);
						done(null, user);
					} else {
						// If not, create a new user in our database
						user = await User.create(newUser);
						console.log("New user created:", user);
						done(null, user);
					}
				} catch (err) {
					console.error("Error in Passport callback:", err);
					done(err, null);
				}
			}
		)
	);
};
