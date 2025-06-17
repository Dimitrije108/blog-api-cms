import api from "../axiosConfig";

export default async function refreshAccessToken(oldRefreshToken) {
	try {
		const response = await api.post("/auth/refresh", { oldRefreshToken });
		const { accessToken, refreshToken } = response.data;
		return { accessToken, refreshToken };
	} catch (error) {
		console.log(error);
		return null;
	};
};
