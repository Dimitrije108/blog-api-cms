import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLoaderData, Form, useActionData, useRevalidator } from "react-router-dom";
import api from "../../axiosConfig";
import ErrorMessage from "../../components/ErrorMessage";
import User from "./components/User";
import EditUserModal from "./components/EditUserModal";

// TODO:
// - Display only non-admin users, grey out admins maybe?
// - Clicking on user shows all their articles?
// - Clicking on user shows all their comments?
// - Add user search functionality: by username or email?
// - Make separate create and edit modal components
// - Give input before and when confirm password matches the password

export default function Users() {
	const { data, error } = useLoaderData();

	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingUser, setEditingUser] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [author, setAuthor] = useState(false);
	const [actionError, setActionError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);
	const revalidator = useRevalidator();
	const action = useActionData();

	useEffect(() => {
		// Clear state and input on successful action
		if (action?.data) {
			// Timeout is so that form handling finishes before the setShowModal is 
			// triggered so that the warning for a missing form doesn't show
			setTimeout(() => {
				setShowModal(false);
				setShowEditModal(false);
				setEditingUser(null);
				setUsername("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setAuthor(false);
				setActionError(null);
				// add toast here later - for either create or edit
			}, 100);
		};
		// Handle action error with state so it could be cleared when modal closes
		if (action?.error) {
			setActionError(action.error);
		};
	}, [action]);

	const handleUsername = (e) => {
		setUsername(e.target.value)
	};

	const handleEmail = (e) => {
		setEmail(e.target.value)
	};

	const handleAuthor = (e) => {
		setAuthor(e.target.checked)
	};

	const handleModalOpen = () => {
		setShowModal(true);
		setActionError(null);
		setAuthor(false);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setEditingUser(null);
		setActionError(null);
	};
	
	const handleEditModalOpen = (user) => {
		setEditingUser(user);
		setShowEditModal(true);
		setUsername(user.username);
		setEmail(user.email);
		setAuthor(user.author);
		setActionError(null);
	};

	const handleEditModalClose = () => {
		setEditingUser(null);
		setShowEditModal(false);
		setUsername("");
		setEmail("");
		setActionError(null);
	};

	// Delete user and refresh users loader
  const handleDelete = async (userId) => {
    // Confirm popup to delete a user
    const confirm = window.confirm("Are you sure you want to delete this user?");

    if (confirm) {
      try {
        await api.delete(`/users/${userId}`);
        revalidator.revalidate();
      } catch(error) {
        setDeleteError(error);
      };
    };
  };

	return (
		<>
			<h1>Users</h1>
			<p className="text-sm">List of all users</p>
			<button onClick={handleModalOpen}>
				Add User
			</button>
			{/* Display a validation or conflict error on the main page */}
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
			{deleteError && <ErrorMessage error={deleteError} />}
			{/* Display modal for create user form */}
      {showModal && createPortal(
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
								onChange={(e) => setUsername(e.target.value)}
                required
              />
							<label htmlFor="email">Email*</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required
              />
							<label htmlFor="password">Password*</label>
              <input 
                type="password" 
                name="password" 
                id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
                required
              />
							<label htmlFor="confirmPass">Confirm password*</label>
              <input 
                type="password" 
                name="confirmPass" 
                id="confirmPass"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
							<label htmlFor="author" className="text-center">Author privilege</label>
							<input 
								type="checkbox"
								name="author"
								id="author"
								checked={author}
								onChange={(e) => setAuthor(e.target.checked)}
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
      )}
			{/* Display modal for edit user form */}
			{showEditModal && 
				<EditUserModal
					editingUser={editingUser}
					username={username}
					handleUsername={handleUsername}
					email={email}
					handleEmail={handleEmail}
					author={author}
					handleAuthor={handleAuthor}
					actionError={actionError}
					handleEditModalClose={handleEditModalClose}
				/>
			}
			{/* Display error message */}
			{error && <ErrorMessage error={error} />}
			{/* Display all categories */}
			{data && 
				<ul>
					{data.map((user) => {
						return (
							<User 
								user={user}
								handleEditModalOpen={handleEditModalOpen}
								handleDelete={handleDelete}
							/>
						)
					})}
				</ul>
			}
		</>
	)
};
