import api from "../../axiosConfig";

export default async function dashboardLoader() {
	try {
		const res = await api.get("/dashboard");
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
