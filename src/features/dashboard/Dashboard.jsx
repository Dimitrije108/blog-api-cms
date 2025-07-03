import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ErrorMessage from "../../components/ErrorMessage";

// TODO:
// - Display info in a dashboard view
// - Create some statistics:
//   - Most used categories?
//   - Recent comments?
//   - Create a graph with number of articles, users, comments?

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
      {error && <ErrorMessage error={error} />}
      {data && 
        <>
          {/* article section */}
          <section>
            <h2>Articles</h2>
            <div>Article count</div>
            <div>{data.articles.length}</div>
            {published && 
              <div>
                <div>Published</div>
                <div>{published.length}</div>
              </div>
            }
            {unpublished && 
              <div>
                <div>Unpublished</div>
                <div>{unpublished.length}</div>
              </div>
            }
            <div>
              <h3>Latest</h3>
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
              <button onClick={() => navigate("articles/create")}>
                Create Article
              </button>
              <button onClick={() => navigate("/articles")}>
                View All Articles
              </button>
            </div>
          </section>
          {/* categories section */}
          <section>
            {/* category count */}
            {/* most used category */}
            {/* create new category button */}
            {/* visit categories page button */}
          </section>
          {/* users section */}
          <section>
            {/* user count */}
            {/* author user count */}
            {/* visit users page button */}
          </section>
          {/* comments section */}
          <section>
            {/* comment count */}
            {/* latest comment */}
            {/* show createdAt time */}
            {/* visit comments page button */}
          </section>
        </>}
    </>
  )
};
