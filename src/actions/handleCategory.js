import api from "../axiosConfig";

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

export default async function handleCategory({ request }) {
  // Get form data
  const formData = await request.formData();
  const name = formData.get("name");
  const action = formData.get("action");
  const id = formData.get("id");

  // Action input field tells what the HTTP request should be
  if (action === "edit") {
    try {
      const response = await api.put(
        `/categories/${id}`, 
        { name }
      );
      // Return success message
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    };
  };
  
  if (action === "delete") {
    try {
      const response = await api.delete(
        `/categories/${id}`
      );
      // Return success message
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    };
  };
  
  // Create new category instance
  if (action === "create") {
    try {
      const response = await api.post(
        '/categories', 
        { name }
      );
      // Return success message
      return { data: response.data };
    } catch (error) {
      return handleError(error);
    };
  };
};
