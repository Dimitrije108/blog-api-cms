export default function ErrorMessage({ error }) {
	const status = error.status;
	const { error: name, message, details } = error.response.data;

	return (
		<div className="flex flex-col justify-center items-center text-red-500">
			<div className="flex">
				<div className="pr-1">{status}</div>
				<p>{name}</p>
			</div>
			<p>{message}</p>
			{details && details?.length > 0 &&
				<ul>
					{details.map((err, index) => (
						<li key={index} className="flex">
							<p>{err.field}</p>
							<span>{err.message}</span>
						</li>
					))}
				</ul>
			}
		</div>
	);
};
