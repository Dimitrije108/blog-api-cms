import { Navigate } from "react-router-dom";
import ProtectedRoute from "../layouts/ProtectedRoute";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import Articles from "../pages/Articles";
import CreateArticle from "../pages/CreateArticle";
import Categories from "../pages/Categories";
import Users from "../pages/Users";
import Comments from "../pages/Comments";
import Login from "../pages/Login";
import preFetchAuth from "../utils/preFetchAuth";
import { 
	checkUserLoader,
	publishedArticlesLoader, 
	unpublishedArticlesLoader,
	categoriesLoader,
} from "../loaders/loaders";
import {
	handleCategory,
} from "../actions/actions";

// ProtectedRoute component is for loading UI
// authLoader stops loaders from executing if auth fails
// because loader fetches before the component is rendered

const routes = [
	{
		Component: ProtectedRoute,
		ErrorBoundary: ErrorPage,
		children: [
			{
				path: "/",
				Component: Layout,
				ErrorBoundary: ErrorPage,
				children: [
					{
						index: true,
						Component: Dashboard,
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
								loader: preFetchAuth(publishedArticlesLoader),
							},
							{
								path: "unpublished", 
								Component: Articles,
								loader: preFetchAuth(unpublishedArticlesLoader),
							},
							{
								path: "create",
								Component: CreateArticle
							},
						],
					},
					{
						path: "categories",
						Component: Categories,
						loader: preFetchAuth(categoriesLoader),
						action: preFetchAuth(handleCategory),
					},
					{
						path: "users",
						Component: Users,
					},
					{
						path: "comments",
						Component: Comments,
					},
				]
			},
		]
	},
	{
		path: '/login',
		Component: Login,
		loader: checkUserLoader,
		ErrorBoundary: ErrorPage,
	},
];

export default routes;
