import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default async function loadUnpublishedArticles() {
	try {
		const res = await axios.get(`${API_URL}/articles?published=false`);
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
