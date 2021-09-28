import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useContext, useRef, useState } from "react";
import { serverURI } from "./config";
import { UserContext } from "./context";

export default function Signin() {
  const loggedStatus = useRef(null);
  const userInfo = useContext(UserContext);
  const [allowSubmit, setSubmit] = useState(false);

  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }, { resetForm }) => {
          setSubmit(false);
          resetForm({ email: "", password: "" });
          try {
            const response = await axios.post(serverURI + "/auth/signin", {
              email,
              password,
            });

            if (response.status === 200) {
              loggedStatus.current.textContent = response.data.message;
              userInfo.setAuthorization("Bearer " + response.data.access_token);
              userInfo.setLogged(true);
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
        {(formik) => {
          formik.validateSubmit = ({ target: { value } }, other) => {
            if (value !== "" && other !== "") {
              setSubmit(true);
            } else setSubmit(false);
          };
          return (
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@example.com"
                type="email"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.validateSubmit(e, formik.values.password);
                }}
              />
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.validateSubmit(e, formik.values.email);
                }}
              />
              <button type="submit" disabled={!allowSubmit}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      <p ref={loggedStatus}></p>
    </div>
  );
}
