export default function ErrorMessage({ status, error, message, details }) {
	return (
		<>
			<div>{status}</div>
			<div className="flex">
				<p>{error}</p>
				<p>{message}</p>
			</div>
			{details && details.map((err) => (
				<div className="flex">
					<p>{err.field}</p>
					<li>{err.message}</li>
				</div>
			))}
		</>
	);
};
