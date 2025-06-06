import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
	const isAuthenticated = !!localStorage.getItem('accessToken');

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	};

	return <Outlet />;
};
