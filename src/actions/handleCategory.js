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
  const id = formData.get("id");

  // Id being passed means the category is being updated
  if (id) {
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
  } else {
    // Create new category instance
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
