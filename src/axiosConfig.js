import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_URL,
});
// If token exists pass it inside header on every request
api.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}
	return config;
}, 
	(error) => Promise.reject(error)
);

export default api;
