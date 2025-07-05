import { useLoaderData, useLocation, useRevalidator } from "react-router-dom";
import { useState } from "react";
import api from "../../../axiosConfig";
import ErrorMessage from "../../../components/ErrorMessage";
import ArticleListItem from "../components/ArticleListItem";

// TODO:
// - Clicking on author displays user page with all of their articles listed
// - Add svg icons for view, edit
// - Make the publish error UX friendly - shows up under the card
// - Make the all/publish/unpublish be a backend filter
// - For preserving filter status when going back URL query string would be needed
// and a custom backend query implementation would be needed

export default function ArticleList() {
  const { data, error } = useLoaderData();
  const [filter, setFilter] = useState("all");
  const [publishError, setPublishError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const location = useLocation();
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
        <ArticleListItem
          key={article.id}
          article={article}
          handlePublish={handlePublish}
          handleDelete={handleDelete}
        />
      ))}
    </>
  )
};
