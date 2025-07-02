import { createPortal } from "react-dom";
import { Form } from "react-router-dom";

// TODO:
// - Make a reusable action error component

// Modal component used to edit user info
export default function EditUserModal({ 
	editingUser,
	username,
	handleUsername,
	email,
	handleEmail,
	author,
	handleAuthor,
	actionError,
	handleEditModalClose,
 }) {
	return createPortal(
		<div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-gray-500/50">
			<div className="pt-6 pb-6 pl-8 pr-8 bg-amber-50 border-r-gray-300 rounded-lg shadow-xl">
				<Form method="post" className="flex flex-col">
					{/* To differentiate create and edit forms inside action */}
					<input type="hidden" name="action" value="edit" />
					<input type="hidden" name="id" value={editingUser.id} />
					<label htmlFor="username">Username*</label>
					<input 
						type="text" 
						name="username" 
						id="username" 
						minLength={1}
						maxLength={30}
						value={username}
						onChange={handleUsername}
						required
					/>
					<label htmlFor="email">Email*</label>
					<input 
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={handleEmail}
						required
					/>
					<label htmlFor="author" className="text-center">Author privilege</label>
					<input 
						type="checkbox"
						name="author"
						id="author"
						checked={author}
						onChange={handleAuthor}
					/>
					{/* Display a validation or conflict error inside modal */}
					{actionError && 
						<ul>
							{actionError.map((err, index) => (
								<li key={index} className="flex text-sm text-red-400">
									{err.field && <p>{err.field.charAt(0).toUpperCase() + err.field.slice(1)}:</p>}
									{err.message && <span className="ml-1">{err.message}</span>}
									{!err.field && !err.message && <p>{err}</p>}
								</li>
							))}
						</ul> 
					}
					<button type="submit">
						Edit
					</button>
				</Form>
				<button onClick={handleEditModalClose}>
					Close
				</button>
			</div>
		</div>,
		document.body
	)
};
