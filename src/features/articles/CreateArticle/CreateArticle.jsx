import { useState, useEffect } from "react";
import { useLoaderData, useActionData } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";

// TODO: 
// - rework validation errors to be objects with input field property values
// so that an error can be displayed under each field

export default function CreateArticle() {
  // Retrieve the saved content draft if it exists
  const initContent = 
    localStorage.articleDraft ? 
    localStorage.getItem("articleDraft") : "";
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(initContent);
  const [category, setCategory] = useState("");
  const [publish, setPublish] = useState(false);
  const [actionError, setActionError] = useState(null);
  const categories = useLoaderData();
  const action = useActionData();
  // Clear draft in local storage and reset state when article is successfuly submitted
  useEffect(() => {
    if (action?.data) {
      localStorage.removeItem("articleDraft");
      setTitle("");
      setContent("");
      setCategory("");
      setPublish(false);
      setActionError(null);
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
    localStorage.setItem("articleDraft", value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlePublish = (e) => {
    setPublish(e.target.checked);
  };

  return (
    <>
      <h1>Create Article</h1>
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
        categories={categories}
        buttonName={"Create"}
      />
    </>
  );
};
