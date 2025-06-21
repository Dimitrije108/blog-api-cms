import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import githubIcon from "/src/assets/icons/github-mark.svg";
import logoutIcon from "/src/assets/icons/logout.svg";

export default function Header() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	// Logout user
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<header className='m-4 mt-6 flex items-center'>
			<h1 className='mx-auto font-["Midland-Regular"]'>
				Archaeoblog
			</h1>
			<Link 
				to="https://github.com/Dimitrije108/blog-api-cms"
				className='w-6'
			>
				<img 
					src={githubIcon}
					alt="github icon" 
					title="GitHub"
				/>
			</Link>
			<button 
				className='w-6 p-0 ml-4'
				onClick={handleLogout}
			>
				<img 
					src={logoutIcon}
					alt="logout icon" 
					title="Logout"
				/>
			</button>
		</header>
	)
};
