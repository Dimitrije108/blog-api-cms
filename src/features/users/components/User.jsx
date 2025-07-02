export default function User({ 
	user, 
	handleEditModalOpen, 
	handleDelete,
}) {
	return (
		<li className="border">
			<div>{user.username}</div>
			<div>{user.email}</div>
			<div>{user.author ? "Author": ""}</div>
			{user.author && <div>Articles: {user.articles.length}</div>}
			<div>Comments: {user.comments.length}</div>
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
