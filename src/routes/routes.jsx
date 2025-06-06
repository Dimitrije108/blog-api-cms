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
import { 
	authLoader,
	publishedArticlesLoader, 
	unpublishedArticlesLoader,
	checkUserLoader,
} from "../loaders/loaders";
import userLogin from "../actions/userLogin";

// have a function that checks user auth
// call it as one of the react router loaders?

// loaders cant run 2 loaders so make a higher order func 
// that takes in a loader and depending on auth returns it or 
// returns the login page

// if auth is good access the page
// otherwise reroute the user to the login page

// ProtectedRoute component is for loading UI
// authLoader is for stopping the API request from executing from a loader
// since loader fetches before the component is rendered.

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
						Component: Dashboard
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
								loader: authLoader(publishedArticlesLoader),
							},
							{
								path: "unpublished", 
								Component: Articles,
								loader: authLoader(unpublishedArticlesLoader),
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
		]
	},
	{
		path: '/login',
		Component: Login,
		loader: checkUserLoader,
		action: userLogin,
		ErrorBoundary: ErrorPage,
	},
];

export default routes;
