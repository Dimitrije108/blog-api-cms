import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import CreateArticle from "../pages/CreateArticle";
import Categories from "../pages/Categories";
import Users from "../pages/Users";
import Comments from "../pages/Comments";
import { Navigate } from "react-router-dom";
import { 
	getPublishedArticles, 
	getUnpublishedArticles 
} from "../loaders/loaders";

const routes = [
	{
		path: "/",
		Component: Layout,
		ErrorBoundary: ErrorPage,
		children: [
			{
				index: true,
				Component: Home
			},
			{
				path: "articles", 
				children: [
					{
						index: true, element: <Navigate to='published' replace />
					},
					{
						path: "published", 
						Component: Articles,
						loader: getPublishedArticles,
					},
					{
						path: "unpublished", 
						Component: Articles,
						loader: getUnpublishedArticles,
					},
					{
						path: "create",
						Component: CreateArticle
					},
				],
			},
			{
				path: "categories",
				Component: Categories
			},
			{
				path: "users",
				Component: Users
			},
			{
				path: "comments",
				Component: Comments
			},
		]
	},
];

export default routes;
