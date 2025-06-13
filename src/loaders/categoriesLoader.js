import api from "../axiosConfig";

export default async function categoriesLoader() {
	try {
		const res = await api.get("/categories");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
