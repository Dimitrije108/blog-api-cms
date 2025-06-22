import { useLoaderData, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import api from "../../axiosConfig";

// TODO:
// - Button functionality: 
//   - eye icon button to view the article
//   - pen icon button to edit the article
//   - toggle type button to toggle publish/unpublish
// - Make the publish error UX friendly - shows up under the card

export default function Articles() {
  const { data, error } = useLoaderData();
  const [publishError, setPublishError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const isPublished = location.pathname.includes('/published');

  // Change article publish status and refresh articles loader
  const handlePublishToggle = async (articleId, published) => {
    try {
      await api.patch(`/articles/${articleId}`, { publish: !published });
      revalidator.revalidate();
    } catch(error) {
      setPublishError(error);
    };
  };

  return (
    <>
      <h1>{isPublished ? "Published" : "Unpublished"} articles</h1>
      {/* Switch between published and unpublished articles */}
      <button onClick={() => navigate(`/articles/${!isPublished ? "published" : "unpublished"}`)}>{!isPublished ? "Published" : "Unpublished"}</button>
      {error && <ErrorMessage error={error} />}
      {publishError && <ErrorMessage error={publishError} />}
      {data && data.map((article) => (
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
          <button onClick={() => handlePublishToggle(article.id, article.published)}>
            Publish/Unpublish
          </button>
        </article>
      ))}
    </>
  )
};
