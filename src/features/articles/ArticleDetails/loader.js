import api from "../../../axiosConfig";

export default async function articleDetailLoader({ params }) {
	const { articleId } = params;

	try {
		const res = await api.get(`/articles/${articleId}`);
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
