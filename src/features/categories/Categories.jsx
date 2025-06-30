import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLoaderData, Form, useActionData } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";

// TODO:
// - Add styling
// - Refactor to be more modular - less coupled
// - Add toast for succesfuly added category with a timer:
//  check if action has action.data property
//  in that case action could return both data and error
// - rework validation errors to be objects with input field property values
// so that an error can be displayed under each field

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [actionError, setActionError] = useState(null);
  const { data, error } = useLoaderData();
  const action = useActionData();

  useEffect(() => {
    // Clear state and input on successful action
    if (action?.data) {
      // Timeout is so that form handling finishes before the setShowModal is 
      // triggered so that the warning for a missing form doesn't show
      setTimeout(() => {
        setShowModal(false);
        setCategoryValue("");
        setEditingCategory(null);
        // add toast here later
      }, 100);
    };
    // Handle action error with state so it could be cleared when modal closes
    if (action?.error) {
      setActionError(action.error);
    };
  }, [action]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
    setCategoryValue(category.name);
    setActionError(null);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    setActionError(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCategoryValue("");
    setEditingCategory(null);
    setActionError(null);
  };

  return (
    <>
      <h1>Categories</h1>
      <p className="text-sm">List of all article categories available</p>
      <button onClick={handleModalOpen}>
        Add Category
      </button>
      {/* Display a validation or conflict error on the main page */}
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
      {/* Display modal for category form */}
      {showModal && createPortal(
        <div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-gray-500/50">
          <div className="pt-6 pb-6 pl-8 pr-8 bg-amber-50 border-r-gray-300 rounded-lg shadow-xl">
            <Form method="post">
              {/* Submit an id via hidden field for edit actions */}
              {editingCategory && 
                <>
                  <input type="hidden" name="action" value="edit" />
                  <input type="hidden" name="id" value={editingCategory.id} />
                </>
              }
              {!editingCategory && 
                <input type="hidden" name="action" value="create" />
              }
              <label htmlFor="name">Category</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                minLength={1}
                maxLength={50}
                value={categoryValue} 
                onChange={(e) => setCategoryValue(e.target.value)}
                required
              />
              {/* Display a validation or conflict error inside modal */}
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
                {editingCategory ? "Edit" : "Add"}
              </button>
            </Form>
            <button onClick={() => handleModalClose()}>
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
      {/* Display error message */}
      {error && <ErrorMessage error={error} />}
      {/* Display all categories */}
      {data && 
        <ul>
          {data.map((category) => {
            return (
              <li key={category.id}>
                <span>{category.name}</span>
                <button onClick={() => handleEdit(category)}>
                  Edit
                </button>
                {/* Handle category deletion via Form action */}
                <Form method="delete">
                  <input type="hidden" name="action" value="delete" />
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    Delete
                  </button>
                </Form>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
};
