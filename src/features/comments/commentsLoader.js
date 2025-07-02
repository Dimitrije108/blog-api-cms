import api from "../../axiosConfig";

export default async function commentsLoader() {
	try {
		const res = await api.get("/comments");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
