import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useRef } from "react";

export default function Signup() {
  const mailSent = useRef(null);
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={async ({ firstName, lastName, email, password }) => {
          try {
            const response = await axios.post(
              "https://googledrive-backend-aksl38.herokuapp.com/auth/signup",
              { firstName, lastName, email, password }
            );

            if (response.status === 200) {
              mailSent.current.textContent = response.data.message;
            } else {
              mailSent.current.textContent =
                "Something went wrong. All fields are required. " +
                response.data.error;
            }
          } catch (error) {
            mailSent.current.textContent =
              "Something went wrong. All fields are required. " + error.message;
          }
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

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
      <p ref={mailSent}></p>
    </div>
  );
}
