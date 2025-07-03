// Auth checks
import preFetchAuth from "../utils/preFetchAuth";
import { checkUserLoader } from "../loaders/loaders";

import ProtectedRoute from "../layouts/ProtectedRoute";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

// Dashboard feature
import Dashboard from "../features/dashboard/Dashboard";
import dashboardLoader from "../features/dashboard/dashboardLoader";
// Article list feature
import ArticleList from "../features/articles/ArticleList/ArticleList";
import articleListLoader from "../features/articles/ArticleList/articleListLoader";
// Article detail view feature
import ArticleDetail from "../features/articles/ArticleDetails/ArticleDetail";
import articleLoader from "../features/articles/ArticleDetails/articleLoader";
// Create article feature
import CreateArticle from "../features/articles/CreateArticle/CreateArticle";
import createArticleAction from "../features/articles/CreateArticle/createArticleAction";
// Edit article feature
import EditArticle from "../features/articles/EditArticle/EditArticle";
import editArticleLoader from "../features/articles/EditArticle/editArticleLoader";
import editArticleAction from "../features/articles/EditArticle/editArticleAction";
// Categories feature
import Categories from "../features/categories/Categories";
import categoriesLoader from "../features/categories/categoriesLoader";
import categororiesAction from "../features/categories/categoriesAction";
// Users feature
import Users from "../features/users/Users";
import usersLoader from "../features/users/usersLoader";
import usersAction from "../features/users/usersAction";
// Comments feature
import Comments from "../features/comments/Comments";
import commentsLoader from "../features/comments/commentsLoader";

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
						loader: preFetchAuth(dashboardLoader),
					},
					{
						path: "articles", 
						Component: ArticleList,
						loader: preFetchAuth(articleListLoader),
					},
					{
						path: "articles/:articleId", 
						Component: ArticleDetail,
						loader: preFetchAuth(articleLoader),
					},
					{
						path: "articles/:articleId/edit", 
						Component: EditArticle,
						loader: preFetchAuth(editArticleLoader),
						action: preFetchAuth(editArticleAction),
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
						loader: preFetchAuth(usersLoader),
						action: preFetchAuth(usersAction),
					},
					{
						path: "comments",
						Component: Comments,
						loader: preFetchAuth(commentsLoader),
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
