import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export default async function loadPublishedArticles() {
	try {
		const res = await axios.get(`${API_URL}/articles`);
		return { data: res.data, error: null }
	} catch(error) {
		return { data: null, error };
	};
};
