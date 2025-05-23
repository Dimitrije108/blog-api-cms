// The errorElement receives an error object via the useRouteError() hook so you can display error details.
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();

	console.log(error);

	return (
		<div className="w-full h-dvh flex flex-col justify-center items-center">
			<div>
				<img 
					src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTlqOHNlNThnZmU0ZXNqNDI3YnA0NjkwdDNqYXJ6c2t5bnlmMHZneSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kkztByfxn8dVK/giphy.gif" 
					alt="Roman salute from TV Series Rome gif"
					className="max-w-lg sm:max-w-xs"
				/>
			</div>
			<h1 className="p-[1rem 0 0.5rem 0]">Oops! Something went wrong.</h1>
			<div className="flex">
				{error?.status && <p className="pr-1">{error.status}</p>}
				{error?.statusText && <p>{error.statusText}</p>}
			</div>
			{error?.error.message && <p>{error.error.message}</p>}
			<Link to="/" className="text-blue-500 hover:text-blue-600">
				Go to homepage
			</Link>
		</div>
	)
};
