import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from "jwt-decode";
import refreshAccessToken from "../utils/refreshAccessToken";

const AuthContext = createContext({
	user: null,
	token: null, 
  login: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		authUser();
	}, []);

	// Request user login
  const login = async (email, password) => {
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});

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
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refreshToken');
		// If access or refresh tokens don't exist return false
		if (!accessToken || !refreshToken) {
			logout();
			return false;
		};
		// Decode tokens
		let decodedAccessToken;
		let decodedRefreshToken;
		try {
			decodedAccessToken = jwtDecode(accessToken);
			decodedRefreshToken = jwtDecode(refreshToken);
		} catch (error) {
			// Remove malformed tokens if decoding fails
			logout();
			return false;
		};
	
		const timeNow = Date.now();
		// Check if access and refresh tokens are valid
		const isValidAccessToken = decodedAccessToken.exp * 1000 > timeNow;
		const isValidRefreshToken = decodedRefreshToken.exp * 1000 > timeNow;
		// If access token is valid set state and return
		if (isValidAccessToken) {
			setToken(accessToken);
			setUser(decodedAccessToken);
			return true;
		};
		// If refresh token isn't valid remove expired tokens and return false
		if (!isValidRefreshToken) {
			logout();
			return false;
		};
		// Get a new access token
		const refresh = await refreshAccessToken();
		// Check if refresh token was successful or not
		if (!refresh) {
			logout();
			return false;
		};
		// Decode and set user and token state
		try {
			localStorage.setItem("accessToken", refresh.accessToken);
    	localStorage.setItem("refreshToken", refresh.refreshToken);
			setToken(refresh.accessToken);
			const user = jwtDecode(refresh.accessToken);
			setUser(user);
			return true;
		} catch (error) {
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
		</AuthContext.Provider>);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
