import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

// TODO: 

export default function CreateArticle() {
  // Retrieve the saved draft if it exists
  const initValue = 
    localStorage.articleDraft ? 
    localStorage.getItem('articleDraft') : '';
  
  const [value, setValue] = useState(initValue);
  const editorRef = useRef(null);

  const handleEditorChange = (value) => {
    setValue(value);
    localStorage.setItem('articleDraft', value);
  };

  return (
    <form method="post">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={value}
        onInit={(evt, editor) => editorRef.current = editor}
        onEditorChange={handleEditorChange}
        init={{
          height: 800,
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
          content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 16px }',
        }}
      />
    </form>
  )
};
