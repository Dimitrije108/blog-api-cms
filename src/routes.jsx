import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Comments from "./pages/Comments";
import { Navigate } from "react-router-dom";

const routes = [
	{
		path: "/",
		Component: App,
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
					},
					{
						path: "unpublished", 
						Component: Articles,
					},
				],
			},
			{
				path: "create",
				Component: CreateArticle
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
