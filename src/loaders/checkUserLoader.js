import { redirect } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
// Login page should not display to logged in users
// Check if user is logged in
export default async function checkUserLoader() {
  const isAuth = await checkAuth();
  
  if (isAuth) {
    return redirect("/");
  };
  
  return;
};
