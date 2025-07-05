import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Spinner from '../components/Spinner';

// Checks user auth so that page isn't displayed to non authenticated users
export default function ProtectedRoute() {
	const [isAuth, setIsAuth] = useState(null);
	const { authUser } = useAuth();

	// Check user auth
	useEffect(() => {
		async function checkAuth() {
			const userAuth = await authUser();
			setIsAuth(userAuth);
		};
		checkAuth();
	}, []);
	
	// Authentication in progress
	if (isAuth === null) {
		return <Spinner />
	};
	// Load children if authenticated
	if (isAuth) {
		return <Outlet />;
	};
	// Redirect to login if not authenticated
	if (!isAuth) {
		return <Navigate to='/login' replace />;
	};
};
