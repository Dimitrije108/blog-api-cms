import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
// Login controlled component utilizing global auth context
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = await login(email, password);
    setEmail("");
    setPassword("");

    if (!userLogin.success) {
      setError(userLogin.error);
    } else {
      setError(null);
      navigate("/");
    };
  };

  const handleGuestLogin = async (e) => {
    const userLogin = await login("guest@example.com", "Guest123");
    setEmail("");
    setPassword("");

    if (!userLogin.success) {
      setError(userLogin.error);
    } else {
      setError(null);
      navigate("/");
    };
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && 
          <ul>
            {error.map((error, index) => {
              return <li key={index} className="text-red-400">{error}</li>;
            })}
          </ul>
        }
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGuestLogin}>Guest login</button>
    </div>
  )
};
