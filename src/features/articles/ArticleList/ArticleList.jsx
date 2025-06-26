import { useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import api from "../../../axiosConfig";

// TODO:
// - Button functionality: 
//   - eye icon button to view the article
//   - pen icon button to edit the article
// - Make the publish error UX friendly - shows up under the card
// - Create a custom delete confirmation modal

export default function ArticleList() {
  const { data, error } = useLoaderData();
  const [filter, setFilter] = useState("all");
  const [publishError, setPublishError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const isPublished = location.pathname.includes('/published');
  // Filter articles based on current filter state - all, published, unpublished
  const filteredArticles = data.filter((article) => {
    if (filter === "all") {
      return true;
    };
    return filter === "published" ? article.published : !article.published;
  });

  // Change article publish status and refresh articles loader
  const handlePublish = async (articleId, published) => {
    try {
      await api.patch(`/articles/${articleId}`, { publish: !published });
      revalidator.revalidate();
    } catch(error) {
      setPublishError(error);
    };
  };

  // Delete article and refresh articles loader
  const handleDelete = async (articleId) => {
    // Confirm popup for article deletion
    const confirm = window.confirm("Are you sure you want to delete this article?");

    if (confirm) {
      try {
        await api.delete(`/articles/${articleId}`);
        revalidator.revalidate();
      } catch(error) {
        setDeleteError(error);
      };
    };
  };

  return (
    <>
      <h1>{isPublished ? "Published" : "Unpublished"} articles</h1>
      {/* Switch between all, published and unpublished articles */}
      <button onClick={() => setFilter("all")}>
        All
      </button>
      <button onClick={() => setFilter("published")}>
        Published
      </button>
      <button onClick={() => setFilter("unpublished")}>
        Unpublished
      </button>
      {error && <ErrorMessage error={error} />}
      {publishError && <ErrorMessage error={publishError} />}
      {deleteError && <ErrorMessage error={deleteError} />}
      {filteredArticles && filteredArticles.map((article) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>Category: {article.category.name}</p>
          <p>Written by: {article.user.username}</p>
          <p>{article.published ? "Published" : "Unpublished"}</p>
          <p>Created: {article.createdAt}</p>
          <button onClick={() => navigate(`/articles/${article.id}`)}>
            View
          </button>
          <button onClick={() => navigate(`/articles/${article.id}/edit`)}>
            Edit
          </button>
          <button onClick={() => handlePublish(article.id, article.published)}>
            Publish/Unpublish
          </button>
          <button onClick={() => handleDelete(article.id)}>
            Delete
          </button>
        </article>
      ))}
    </>
  )
};
