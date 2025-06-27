import { useState, useEffect } from "react";
import { useLoaderData, useActionData, useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

export default function EditArticle() {
	const { article, categories } = useLoaderData();
	// Controlled inputs
  const [title, setTitle] = useState(article.data.title || "");
  const [content, setContent] = useState(article.data.content || "");
  const [category, setCategory] = useState(article.data.categoryId || "");
  const [publish, setPublish] = useState(article.data.published);

  const [actionError, setActionError] = useState(null);
  const action = useActionData();
	const navigate = useNavigate();
  // Clear draft in local storage and reset state when article is successfuly submitted
  useEffect(() => {
    if (action?.data) {
      navigate(`/articles/${article.data.id}`);
    };
    if (action?.error) {
      setActionError(action.error);
    };
  }, [action]);

	const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (value) => {
    setContent(value);
  };

	const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlePublish = (e) => {
    setPublish(e.target.checked);
  };

  return (
		<>
			<h1>Edit Article</h1>
			<ArticleForm
				title={title}
				handleTitle={handleTitle}
				content={content}
				handleContent={handleContent}
				category={category}
				handleCategory={handleCategory}
				publish={publish}
				handlePublish={handlePublish}
				actionError={actionError}
				articleError={article.error}
				categories={categories}
				buttonName={"Edit"}
			/>
		</>
  );
};
