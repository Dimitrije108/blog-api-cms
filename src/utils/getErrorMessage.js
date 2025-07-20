export default function getErrorMessage(error) {
	if (error?.response?.data?.message) {
		return error.response.data.message;
	};

	const status = error?.status || error?.response?.status;
	switch (status) {
		case 401: return "You are not authorized. Please log in.";
		case 403: return "Access forbidden. You don't have permission.";
		case 404: return "Page not found.";
    case 500: return "Server error. Refresh page or try again later.";
    default: return "An unexpected error occurred.";
	}
};
