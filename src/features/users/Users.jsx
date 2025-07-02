import { useState, useEffect } from "react";
import { useLoaderData, useActionData, useRevalidator } from "react-router-dom";
import api from "../../axiosConfig";
import ErrorMessage from "../../components/ErrorMessage";
import CreateUserModal from "./components/CreateUserModal";
import EditUserModal from "./components/EditUserModal";
import User from "./components/User";

// TODO:
// - Clicking on user shows all their articles
// - Clicking on user shows all their comments
// - Display UX status before and after confirm passwords matches
// - Add user search functionality: by username or email

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

	const handlePassword = (e) => {
		setPassword(e.target.value)
	};

	const handleConfirmPassword = (e) => {
		setConfirmPassword(e.target.value)
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
      {showModal && 
				<CreateUserModal
					username={username}
					handleUsername={handleUsername}
					email={email}
					handleEmail={handleEmail}
					password={password}
					handlePassword={handlePassword}
					confirmPassword={confirmPassword}
					handleConfirmPassword={handleConfirmPassword}
					author={author}
					handleAuthor={handleAuthor}
					actionError={actionError}
					handleModalClose={handleModalClose}
				/>
			}
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
			{/* Display loader fetch error message */}
			{error && <ErrorMessage error={error} />}
			{/* Display all categories */}
			{data && 
				<ul>
					{data.map((user) => {
						return (
							<User 
								key={user.id}
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
