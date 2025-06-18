import api from "../axiosConfig";

export default async function addCategory({ request }) {
  // Get form data
  const formData = await request.formData();
  const name = formData.get("name");

  // Call server to create category instance
  try {
    const response = await api.post(
      '/categories', 
      { name }
    );
    // Return success message
    return { data: response.data };
  } catch (error) {
    // Return form validation error/s
    if (error.status === 400) {
      return { error: error.response.data.details };
    };
    // Otherwise let the error boundary catch it
    throw error;
  };
};
