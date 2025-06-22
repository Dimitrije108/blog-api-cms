import api from "../../axiosConfig";

export default async function publishedArticlesLoader() {
	try {
		const res = await api.get("/articles");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
