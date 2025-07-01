import api from "../../axiosConfig";

export default async function usersLoader() {
	try {
		const res = await api.get("/users");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
