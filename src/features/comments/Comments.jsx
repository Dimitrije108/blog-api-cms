import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import api from "../../axiosConfig";
import ErrorMessage from "../../components/ErrorMessage";
import formatDate from "../../utils/formatDate";

// TODO:
// - Search by user
// - Show updatedAt if comment was updated - if I can get it to work since Prisma's 
// implementation is not very smart to say the least

export default function Comments() {
  const { data, error } = useLoaderData();
  const [deleteError, setDeleteError] = useState(null);
  const revalidator = useRevalidator();

  // Delete comment and refresh users loader
  const handleDelete = async (commentId) => {
    // Confirm popup to delete a user
    const confirm = window.confirm("Are you sure you want to delete this user?");

    if (confirm) {
      try {
        await api.delete(`/comments/${commentId}`);
        revalidator.revalidate();
        setDeleteError(null);
      } catch(error) {
        setDeleteError(error);
      };
    };
  };

  return (
    <>
      {deleteError && <ErrorMessage error={deleteError} />}
      {error && <ErrorMessage error={error} />}
      {data && 
        <div className="max-w-3xl m-auto">
          <ul>
            {data.map((comment) => {
              return (
                <li key={comment.id}>
                  <div>{comment.user.username}</div>
                  {comment.user.author && <div>Author</div>}
                  <div>{comment.comment}</div>
                  <div>{formatDate(comment.createdAt)}</div>
                  <div>Article: {comment.article.title}</div>
                  <button onClick={() => handleDelete(comment.id)}>
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      }
    </>
  )
};
