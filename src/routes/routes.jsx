import { Navigate } from "react-router-dom";
import ProtectedRoute from "../layouts/ProtectedRoute";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Comments from "../pages/Comments";
import Login from "../pages/Login";
import preFetchAuth from "../utils/preFetchAuth";
import { checkUserLoader } from "../loaders/loaders";
// Articles feature
import Articles from "../features/articles/Articles";
import articlesLoader from "../features/articles/loader";
// Create article feature
import CreateArticle from "../features/createArticle/CreateArticle";
import createArticleAction from "../features/createArticle/action";
// Categories feature
import Categories from "../features/categories/Categories";
import categoriesLoader from "../features/categories/loader";
import categororiesAction from "../features/categories/action";

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
						Component: Articles,
						loader: preFetchAuth(articlesLoader),
					},
					{
						path: "articles/create",
						Component: CreateArticle, 
						loader: preFetchAuth(categoriesLoader),
						action: preFetchAuth(createArticleAction),
					},
					{
						path: "categories",
						Component: Categories,
						loader: preFetchAuth(categoriesLoader),
						action: preFetchAuth(categororiesAction),
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
