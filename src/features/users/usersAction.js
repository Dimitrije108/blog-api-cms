import api from "../../axiosConfig";

const handleError = (error) => {
  const status = error.response?.status;
  // Return form validation error/s
  if (status === 400) {
    return { error: error.response.data.details };
  };
  // Return conflict error
  if (status === 409) {
    return { error: [error.response.data.message] };
  };
  // Otherwise let the error boundary catch it
  throw error;
};

export default async function usersAction({ request }) {
  // Get form data
  const formData = await request.formData();
  const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPass = formData.get("confirmPass");
	// Turn checkbox value into boolean 
	const author = formData.get("author") === "on";
  const action = formData.get("action");
  const id = formData.get("id");

  // Action input field tells what the HTTP request should be
  if (action === "edit") {
    try {
      const response = await api.put(
        `/users/${id}`, 
        { username, email, author }
      );
      // Return success message
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    };
  };
  
  // Create new user
  if (action === "create") {
    try {
      const response = await api.post(
        "/users", 
        { username, email, author, password, confirmPass }
      );
      // Return success message
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    };
  };
};
