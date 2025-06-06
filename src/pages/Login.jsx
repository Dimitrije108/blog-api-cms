import { Form, useActionData } from "react-router-dom";

export default function Login() {
  const errors = useActionData();

  return (
    <>
      <h1>Login</h1>
      {errors?.length > 0 && errors.map((error, index) => {
        return <li key={index} className="text-red-400">{error}</li>;
      })}
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
