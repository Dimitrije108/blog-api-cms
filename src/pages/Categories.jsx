import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLoaderData, Form, useActionData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

// TODO:
// Add toast for succesfuly added category with a timer:
//  check if action has action.data property
//  in that case action could return both data and error

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const { data, error } = useLoaderData();
  const action = useActionData();

  useEffect(() => {
    if (action?.data) {
      // Timeout is for the form handling to finish before the setShowModal is 
      // triggered so that the warning for a missing form doesn't show
      setTimeout(() => {
        setShowModal(false);
        setCategoryValue("");
        // add toast here later
      }, 50);
    };
  }, [action]);

  return (
    <>
      <h1>Categories</h1>
      <p className="text-sm">List of all article categories available</p>
      <button onClick={() => setShowModal(true)}>
        Add Category
      </button>
      {/* Display modal for category form */}
      {showModal && createPortal(
        <div className="fixed top-0 w-screen h-screen flex items-center justify-center bg-gray-500/50">
          <Form method="post" className="pt-6 pb-6 pl-8 pr-8 bg-amber-50 border-r-gray-300 rounded-lg shadow-xl">
            <label htmlFor="name">Category</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={categoryValue} 
              onChange={(e) => setCategoryValue(e.target.value)} 
            />
            <button onClick={() => setShowModal(false)}>
              Close
            </button>
            {action?.error && 
              <ul>
                {action.error.map((err, index) => (
                  <li key={index} className="flex">
                    <p>{err.field}</p>
                    <span>{err.message}</span>
                  </li>
                ))}
              </ul> 
            }
            <button type="submit">Add</button>
          </Form>
        </div>,
        document.body
      )}
      {/* Display error message */}
      {error && <ErrorMessage error={error} />}
      {/* Display all categories */}
      {data && 
        <ul>
          {data.map((category) => {
            return <li key={category.id}>{category.name}</li>
          })}
        </ul>
      }
    </>
  )
};
