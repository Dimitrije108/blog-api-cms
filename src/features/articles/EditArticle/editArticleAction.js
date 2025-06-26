import api from "../../../axiosConfig";

const handleError = (error) => {
  const status = error.response?.status;
  // Return form validation error/s
  if (status === 400) {
    return { error: error.response.data.details };
  };
  // Otherwise let the error boundary catch it
  throw error;
};

export default async function editArticleAction({ request, params }) {
	const { articleId } = params;
  // Get form data
  const formData = await request.formData();
  const title = formData.get("title");
	const content = formData.get("content");
	const categoryId = formData.get("category");
	// Check if published was checked
	const published = formData.get("published") === "on";
	// Check if content length is good
	if (content.length < 1000) {
		return { error: ["Content must be between 1000 and 10000 characters long"] };
	};

  // Edit article
	try {
		const response = await api.put(
			`/articles/${articleId}`, 
			{ title, content, categoryId, published }
		);
		// Return success message
		return { data: response.data };
	} catch (error) {
		return handleError(error);
	};
};
