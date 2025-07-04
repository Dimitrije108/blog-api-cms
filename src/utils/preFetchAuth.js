import { redirect } from "react-router-dom";
import checkAuth from "./checkAuth";

// Check if user is authenticated before initiating route's loader
export default function preFetchAuth(func) {
	// Return a function that will execute when route loader is accessed
	return async (...args) => {
		const isAuth = await checkAuth();

		if (!isAuth) {
			return redirect('/login');
		};
		// Pass the default arguments on to loader
		return func(...args);
	};
};
