import { Form } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;
import ErrorMessage from "../../../components/ErrorMessage";

export default function ArticleForm({ 
	title,
	handleTitle,
	content, 
	handleContent,
	category, 
	handleCategory,
	publish,
	handlePublish,
	actionError,
	articleError,
	categories,
	buttonName,
}) {
	return (
		<Form method="post">
			<div>
				<label htmlFor="title">Title</label>
				<input 
					type="text" 
					name="title" 
					id="title" 
					value={title}
					onChange={handleTitle}
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
				onEditorChange={handleContent}
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
			{/* Textarea connected to TinyMCE Editor so that content is submitted via action */}
			<textarea name="content" value={content} readOnly hidden></textarea>
			<div>
				{/* Display data fetching error message */}
				{articleError && <ErrorMessage error={articleError} />}
				{categories.error && <ErrorMessage error={categories.error} />}
				<label htmlFor="category">Choose category</label>
				<select 
					name="category" 
					id="category" 
					value={category} 
					onChange={handleCategory}
					required
				>
					<option value="" disabled>--Please choose an option--</option>
					{/* display all categories as options */}
					{categories.data && categories.data.map((category) => (
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
					onChange={handlePublish}
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
				{`${buttonName} Article`}
			</button>
		</Form>
	);
};
