import { useState, useEffect, createContext, useContext } from "react";
import api from "../axiosConfig";
import { jwtDecode } from "jwt-decode";
import checkAuth from "../utils/checkAuth";

const AuthContext = createContext({
	user: null,
	token: null, 
  login: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	console.log(`Token: ${token}`);
	console.log(`localStorage: ${localStorage.getItem("accessToken")}`);

	useEffect(() => {
		authUser();
	}, []);

	// Request user login
  const login = async (email, password) => {
		try {
			const response = await api.post(
				"/auth/login", 
				{ email, password }
			);

			const { accessToken, refreshToken } = response.data;
			// Store access and refresh tokens in localStorage
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
			// Set access token state
			setToken(accessToken);
			// Decode and set user state
			try {
				const user = jwtDecode(accessToken);
				setUser(user);
				return { success: true };
			} catch (error) {
				logout();
				return { success: false, error: ["Invalid token format"]};
			};
		} catch (error) {
			// Return form validation error/s
			if (error.response?.status === 400) {
				return { success: false, error: error.response.data.details };
			};
			// Return unauthorized error message
			if (error.response?.status === 401) {
				return { success: false, error: [error.response.data.message] };
			};
			// Otherwise let the error boundary catch it
			throw error;
		};
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setToken(null);
		setUser(null);
	};
	// Check if user is authenticated
	const authUser = async () => {
		const userAuth = await checkAuth();
		if (userAuth) {
			const accessToken = localStorage.getItem("accessToken");
			setToken(accessToken);
			// Decoding was already checked inside checkAuth() so it's not needed here
			const user = jwtDecode(accessToken);
			setUser(user);
			return true;
		} else {
			logout();
			return false;
		};
	};

	const value = {
		user,
		token,
		login,
		logout,
		authUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
