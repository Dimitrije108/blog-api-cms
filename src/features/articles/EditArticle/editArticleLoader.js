import articleLoader from "../ArticleDetails/articleLoader";
import categoriesLoader from "../../categories/categoriesLoader";
// Call article and categories loader to fetch all info needed to edit article
export default async function editArticleLoader({ params }) {
	const article = await articleLoader({ params });
	const categories = await categoriesLoader();
	
	return { article, categories };
};
