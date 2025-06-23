// frontend/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				// The browser automatically sends the 'token' cookie with this request.
				const { data } = await axios.get(`${apiBaseUrl}/api/auth/user`, {
					withCredentials: true, // IMPORTANT: This tells axios to send cookies.
				});
				setUser(data);
			} catch (err) {
				console.error("Failed to fetch user. Redirecting to login.");
				navigate("/"); // Redirect to login page on error
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [navigate, apiBaseUrl]);

	const handleLogout = async () => {
		try {
			await axios.get(`${apiBaseUrl}/api/auth/logout`, {
				withCredentials: true,
			});
			navigate("/");
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	if (loading) {
		return (
			<div className="container">
				<h1>Loading Dashboard...</h1>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="container">
				<h1>Could not load user data.</h1>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="card dashboard-card">
				<h1>Dashboard</h1>
				<img src={user.image} alt={user.displayName} className="profile-img" />
				<h2>Welcome, {user.displayName}!</h2>
				<p>Email: {user.email}</p>
				<button onClick={handleLogout} className="logout-btn">
					Logout
				</button>
			</div>
		</div>
	);
};

export default DashboardPage;
