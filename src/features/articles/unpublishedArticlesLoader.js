import api from "../../axiosConfig";

export default async function unpublishedArticlesLoader() {
	try {
		const res = await api.get("/articles?published=false");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
