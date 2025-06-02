import { redirect } from "react-router-dom";
// Login page should not display to logged in users
// Check if user is logged in
export default function checkUser() {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  
  if (isAuthenticated) {
    return redirect("/");
  };
};
