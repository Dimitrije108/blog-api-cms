import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ErrorMessage from "../../components/ErrorMessage";

// TODO:
// - Create a graph with number of articles, users, comments?

export default function Dashboard() {
  const { data, error } = useLoaderData();
  const [published, setPublished] = useState(null);
  const [unpublished, setUnpublished] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(data);

  // Filter published/unpublished articles upon data availability
  useEffect(() => {
    if (data) {
      const published = data.articles.filter((article) => article.published);
      setPublished(published);
      const unpublished = data.articles.filter((article) => !article.published);
      setUnpublished(unpublished);
    }
  }, [data]);

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
            <div>{data.articles.length}</div>
            {published && 
              <div>
                <p>Published</p>
                <div>{published.length}</div>
              </div>
            }
            {unpublished && 
              <div>
                <p>Unpublished</p>
                <div>{unpublished.length}</div>
              </div>
            }
            <div>
              <h4>Latest</h4>
              {published &&
                <>
                  <h4>{published && published[0].title}</h4>
                  <div>{published && published[0].createdAt}</div>
                  <button onClick={() => navigate(`articles/${published[0].id}`)}>
                    View
                  </button>
                </>
              }
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
            <div>{data.comments.length}</div>
            <div>
              <h4>Latest</h4>
              <div>{data.comments[0].user.username}:</div>
              <p>{data.comments[0].comment}</p>
              <div>{data.comments[0].createdAt}</div>
            </div>
            <button onClick={() => navigate("/comments")}>
              View comments
            </button>
          </section>
        </>}
    </>
  )
};
