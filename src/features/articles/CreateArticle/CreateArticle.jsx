import { useState, useEffect } from "react";
import { useLoaderData, useActionData, Form } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

// TODO: 
// - The form might need to be reusable for editing articles
// - rework validation errors to be objects with input field property values
// so that an error can be displayed under each field
// - reset the publish article checkbox after successful submit

export default function CreateArticle() {
  // Retrieve the saved draft if it exists
  const initContent = 
    localStorage.articleDraft ? 
    localStorage.getItem("articleDraft") : "";
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(initContent);
  const [category, setCategory] = useState("");
  const [publish, setPublish] = useState(false);
  const [actionError, setActionError] = useState(null);
  const { data: categoriesData, error: categoriesError } = useLoaderData();
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

  const handleEditorChange = (value) => {
    setContent(value);
    localStorage.setItem("articleDraft", value);
  };

  return (
    <>
      <h1>Create Article</h1>
      <Form method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={1}
            maxLength={70}
            required 
          />
        </div>
        <label htmlFor="content">
          Content
        </label>
        <Editor
          apiKey={TINYMCE_API_KEY}
          id="content"
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 750,
            branding: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: `undo redo | blocks | bold italic underline strikethrough |
              forecolor backcolor | alignleft aligncenter alignright alignjustify |
              bullist numlist outdent indent | link image media | 
              code preview fullscreen | help`,
            image_class_list: [
              { title: 'Float Left', value: 'img-left' },
              { title: 'Float Right', value: 'img-right' },
              { title: 'Center', value: 'img-center' },
            ],
            content_style: `
              @font-face {
                font-family: 'Montserrat-Medium';
                src: url('/fonts/Montserrat-Medium.ttf');
              }
              @font-face {
                font-family: 'Midland-Regular';
                src: url('/fonts/MidlandluxuryRegular-lgze5.otf');
              }
              body {
                font-family: "Montserrat-Medium", Arial, sans-serif;
                font-size: 16px;
              }
              h1, h2, h3, h4, h5, h6 {
                font-family: "Midland-Regular", "Montserrat-Medium", Arial, sans-serif;
                letter-spacing: 2px;
              }
              .img-left {
                float: left;
                margin: 0 15px 15px 0;
              }
              .img-right {
                float: right;
                margin: 0 0 15px 15px;
              }
              .img-center {
                display: block;
                margin: 0 auto;
              }
            `,
          }}
        />
        {/* Textarea connected to TinyMCE Editor so that content is submitted in action */}
        <textarea name="content" value={content} readOnly hidden></textarea>
        <div>
          {/* Display categories error message */}
          {categoriesError && <ErrorMessage error={categoriesError} />}
          <label htmlFor="category">Choose category</label>
          <select 
            name="category" 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>--Please choose an option--</option>
            {/* display all categories as options */}
            {categoriesData && categoriesData.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="publish">Publish article</label>
          <input 
            type="checkbox" 
            name="published" 
            id="publish" 
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
        </div>
        {actionError && 
          <ul>
            {actionError.map((err, index) => (
              <li key={index} className="flex text-sm text-red-400">
                {err.field && <p>{err.field.charAt(0).toUpperCase() + err.field.slice(1)}:</p>}
                {err.message && <span className="ml-1">{err.message}</span>}
                {!err.field && !err.message && <p>{err}</p>}
              </li>
            ))}
          </ul> 
        }
        <button type="submit">
          Create Article
        </button>
      </Form>
    </>
  );
};
