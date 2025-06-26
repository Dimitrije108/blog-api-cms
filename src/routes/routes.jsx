import ProtectedRoute from "../layouts/ProtectedRoute";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Comments from "../pages/Comments";
import Login from "../pages/Login";
import preFetchAuth from "../utils/preFetchAuth";
import { checkUserLoader } from "../loaders/loaders";
// Article list feature
import ArticleList from "../features/articles/ArticleList/ArticleList";
import articleListLoader from "../features/articles/ArticleList/loader";
// Article detail view feature
import ArticleDetail from "../features/articles/ArticleDetails/ArticleDetail";
import articleDetailLoader from "../features/articles/ArticleDetails/loader";
// Create article feature
import CreateArticle from "../features/articles/CreateArticle/CreateArticle";
import createArticleAction from "../features/articles/CreateArticle/action";
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
						Component: ArticleList,
						loader: preFetchAuth(articleListLoader),
					},
					{
						path: "articles/:articleId", 
						Component: ArticleDetail,
						loader: preFetchAuth(articleDetailLoader),
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
