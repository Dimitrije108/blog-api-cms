import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ErrorMessage from "../../components/ErrorMessage";
import formatDate from "../../utils/formatDate";

// TODO:
// - Create a graph with number of articles, users, comments?

export default function Dashboard() {
  const { data, error } = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(data);

  return (
    <>
      <h1>Greetings {user.username}!</h1>
      <h2>Summary</h2>
      {error && <ErrorMessage error={error} />}
      {data && 
        <>
          {/* Articles section */}
          <section>
            <h3>Articles</h3>
            <p>Article count</p>
            <div>{data.articleCount}</div>
            <div>
              <p>Published</p>
              <div>{data.publishedCount}</div>
            </div>
            <div>
              <p>Unpublished</p>
              <div>{data.unpublishedCount}</div>
            </div>
            <div>
              <h4>Latest</h4>
              <h4>{data.latestArticle.title}</h4>
              <div>{formatDate(data.latestArticle.createdAt)}</div>
              <button onClick={() => navigate(`articles/${data.latestArticle.id}`)}>
                View
              </button>
            </div>
            <div>
              <button onClick={() => navigate("/articles")}>
                View articles
              </button>
              <button onClick={() => navigate("articles/create")}>
                Create article
              </button>
            </div>
          </section>
          {/* Categories section */}
          <section>
            <h3>Categories</h3>
            <p>Category count</p>
            <div>{data.categories.length}</div>
            <p>Most used</p>
            <div>{data.topCategory.name}</div>
            <div>
              <button onClick={() => navigate("/categories")}>
                View categories
              </button>
              <button onClick={() => navigate("/categories")}>
                Create category
              </button>
            </div>
          </section>
          {/* Users section */}
          <section>
            <h3>Users</h3>
            <div>{data.users.length}</div>
            <p>Authors</p>
            <div>{data.authors.length}</div>
            <div>
              <button onClick={() => navigate("/users")}>
                View users
              </button>
              <button onClick={() => navigate("/users")}>
                Create user
              </button>
            </div>
          </section>
          {/* Comments section */}
          <section>
            <h3>Comments</h3>
            <div>{data.commentCount}</div>
            <div>
              <h4>Latest</h4>
              <div>{data.latestComment.user.username}:</div>
              <p>{data.latestComment.comment}</p>
              <div>{formatDate(data.latestComment.createdAt)}</div>
            </div>
            <button onClick={() => navigate("/comments")}>
              View comments
            </button>
          </section>
        </>}
    </>
  )
};
