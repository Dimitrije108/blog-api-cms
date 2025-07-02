import { createPortal } from "react-dom";
import { Form } from "react-router-dom";

// TODO:
// - Make a reusable action error component

export default function CreateUserModal({ 
	username,
	handleUsername,
	email,
	handleEmail,
	password,
	handlePassword,
	confirmPassword,
	handleConfirmPassword,
	author,
	handleAuthor,
	actionError,
	handleModalClose,
}) {
	return createPortal(
		<div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-gray-500/50">
			<div className="pt-6 pb-6 pl-8 pr-8 bg-amber-50 border-r-gray-300 rounded-lg shadow-xl">
				<Form method="post" className="flex flex-col">
					{/* Differentiate create and edit forms in action */}
					<input type="hidden" name="action" value="create" />
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
					<label htmlFor="password">Password*</label>
					<input 
						type="password" 
						name="password" 
						id="password"
						value={password}
						onChange={handlePassword}
						required
					/>
					<label htmlFor="confirmPass">Confirm password*</label>
					<input 
						type="password" 
						name="confirmPass" 
						id="confirmPass"
						value={confirmPassword}
						onChange={handleConfirmPassword}
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
						Create
					</button>
				</Form>
				<button onClick={handleModalClose}>
					Close
				</button>
			</div>
		</div>,
		document.body
	)
};
