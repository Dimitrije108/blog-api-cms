import { Form } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <Form method="post">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </Form>
    </>
  )
};
