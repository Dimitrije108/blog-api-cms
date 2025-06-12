import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default async function refreshAccessToken() {
	try {
		const response = await axios.post(`${API_URL}/refresh`);
		const { accessToken, refreshToken } = response.data;
		return { accessToken, refreshToken };
	} catch (error) {
		return null;
	};
};
