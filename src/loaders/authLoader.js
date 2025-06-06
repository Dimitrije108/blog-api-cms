import { redirect } from "react-router-dom";
// Check if user is authenticated before initiating route's loader
export default function authLoader(loader) {
	// Return a function that will execute when the route loader is accessed
	return async (...args) => {
		console.log("authLoader is running");
		const isAuthenticated = !!localStorage.getItem('accessToken');

		if (!isAuthenticated) {
			return redirect('/login');
		};
		// Pass the default arguments on to loader
		return loader(...args);
	}
};
