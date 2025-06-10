import { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
	user: null,
	token: null, 
  login: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("accessToken" || null));

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
			const user = jwtDecode(accessToken);
			setUser(user);
			return { success: true };
		} catch (error) {
			// Return form validation error/s
			if (error.status === 400) {
				return { success: false, error: error.response.data.details };
			};
			// Return unauthorized error message
			if (error.status === 401) {
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

	const value = {
		user,
		token,
		login,
		logout
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
