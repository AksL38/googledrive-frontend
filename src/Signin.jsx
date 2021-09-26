import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useRef } from "react";

export default function Signin() {
  const loggedStatus = useRef(null);
  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          try {
            const response = await axios.post(
              "https://googledrive-backend-aksl38.herokuapp.com/auth/signin",
              { email, password }
            );

            if (response.status === 200) {
              loggedStatus.current.textContent = response.data.message;
            } else {
              loggedStatus.current.textContent =
                "Something went wrong. All fields are required. " +
                response.data.error;
            }
          } catch (error) {
            loggedStatus.current.textContent =
              "Something went wrong. All fields are required. " + error.message;
          }
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
          />
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <p ref={loggedStatus}></p>
    </div>
  );
}
