import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import getErrorMessage from "../utils/getErrorMessage";

export default function ErrorPage() {
	const error = useRouteError();
	console.log('ErrorPage:', error);

	const status = error?.status || error?.response?.status || null;
	const statusText = error?.statusText || error?.response?.statusText || null;
	const message = getErrorMessage(error);

	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center">
			<div>
				<img 
					src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTlqOHNlNThnZmU0ZXNqNDI3YnA0NjkwdDNqYXJ6c2t5bnlmMHZneSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kkztByfxn8dVK/giphy.gif" 
					alt="Roman salute from TV Series Rome gif"
					className="max-w-xs sm:max-w-lg"
				/>
			</div>
			<h1 className="p-[1rem 0 0.5rem 0]">Oops! Something went wrong.</h1>
			<div className="flex">
				{status && <p className="pr-1">{status}</p>}
				{statusText && <p>{statusText}</p>}
			</div>
			{message && <p>{message}</p>}
			{/* Render login link if user is unauthorized */}
			{status === 401 && 
				<Link to="/login" className="font-semibold text-blue-500 hover:text-blue-600">
					Login
				</Link>
			}
			{/* Render homepage for other errors */}
			{status !== 401 && 
				<Link to="/" className="font-semibold text-blue-500 hover:text-blue-600">
					Go to homepage
				</Link>
			}
		</div>
	)
};
