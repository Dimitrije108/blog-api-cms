import axios from "axios";
import { redirect } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default async function userLogin({ request }) {
  // Get login form values
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // Request user login
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;
    // Store access and refresh tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // Redirect user to main page
    return redirect("/");
  } catch (error) {
    console.log(error);
    // Return form validation error/s
    if (error.status === 400) {
      return error.response.data.details;
    };
    // Return unauthorized error message
    if (error.status === 401) {
      return [error.response.data.message];
    };
    // Otherwise let the error boundary catch it
    throw error;
  }
};
