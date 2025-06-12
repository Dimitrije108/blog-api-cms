import refreshAccessToken from "./refreshAccessToken";
// Check if user is authenticated
// Returns False - when token is missing, malformed, expired or refresh failed
// Returns True - when token is valid, or has been refreshed succesfully
export default async function checkAuth() {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	// If access or refresh tokens don't exist return false
	if (!accessToken || !refreshToken) {
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
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return false;
	};

	const timeNow = Date.now();
	// Check if access and refresh tokens are valid
	const isValidAccessToken = decodedAccessToken.exp * 1000 > timeNow;
	const isValidRefreshToken = decodedRefreshToken.exp * 1000 > timeNow;
	// If access is valid continue
	if (isValidAccessToken) {
		return true;
	};
	// If refresh token isn't valid remove expired tokens and return false
	if (!isValidRefreshToken) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return false;
	};
	// Get a new access token
	const refresh = await refreshAccessToken();
	// Check if refresh was successful or not
	if (!refresh) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return false;
	} else {
		localStorage.setItem("accessToken", refresh.accessToken);
		localStorage.setItem("refreshToken", refresh.refreshToken);
		return true;
	};
};
