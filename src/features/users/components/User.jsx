export default function User({ 
	user, 
	handleEditModalOpen, 
	handleDelete,
}) {
	return (
		<li key={user.id} className="border">
			<div>{user.username}</div>
			<div>{user.email}</div>
			<div>{user.author ? "Author": ""}</div>
			{!user.author && 
				<>
					<button onClick={() => handleEditModalOpen(user)}>
						Edit
					</button>
					<button onClick={() => handleDelete(user.id)}>
						Delete
					</button>
				</>
			}
		</li>
	)
};
