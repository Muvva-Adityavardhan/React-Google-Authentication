// frontend/src/pages/LoginPage.jsx
import React from "react";

const LoginPage = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	const handleLogin = () => {
		// Redirects the user to the backend's Google authentication route
		window.location.href = `${apiBaseUrl}/api/auth/google`;
	};

	return (
		<div className="container">
			<div className="card">
				<h1>Welcome Back!</h1>
				<p>Sign in to access your dashboard.</p>
				<button onClick={handleLogin} className="login-btn">
					Sign In with Google
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
