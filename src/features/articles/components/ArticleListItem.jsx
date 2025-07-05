import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

export default function ArticleListItem({
	article,
	handlePublish,
	handleDelete,
}) {
	const [isPublished, setIsPublished] = useState(article.published);
  const navigate = useNavigate();

  return (
		<article>
			<h2>{article.title}</h2>
			<p>Category: {article.category.name}</p>
			<p>Written by: {article.user.username}</p>
			<p>{article.published ? "Published" : "Unpublished"}</p>
			<p>Created: {formatDate(article.createdAt)}</p>
			<button onClick={() => navigate(`/articles/${article.id}`)}>
				View
			</button>
			<button onClick={() => navigate(`/articles/${article.id}/edit`)}>
				Edit
			</button>
			{/* Toggle button */}
			<label 
				className="relative inline-block w-14 h-8"
				onClick={() => handlePublish(article.id, article.published)}
			>
				<input
					type="checkbox"
					className="peer opacity-0 w-0 h-0"
					checked={isPublished}
					onChange={(e) => setIsPublished(e.target.checked)}
				/>
				<span
					className="
						absolute cursor-pointer top-0 left-0 right-0 bottom-0 
						bg-gray-100 border border-gray-300 rounded-full transition
						peer-checked:bg-green-400 peer-checked:border-transparent
					"
				></span>
				<span
					className="
						absolute h-6 w-6 left-1 top-1 bg-white rounded-full 
						shadow transition-transform duration-300 
						peer-checked:translate-x-6
					"
				></span>
			</label>
			<button onClick={() => handleDelete(article.id)}>
				Delete
			</button>
		</article>
  )
};
