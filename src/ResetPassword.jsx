import { useRef, useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { serverURI } from "./config";
import { useParams } from "react-router";

export default function ResetPassword() {
  const status = useRef(null);
  const [allowSubmit, setSubmit] = useState(false);
  const { jwt } = useParams();

  return (
    <div>
      <h1>Forgot Password</h1>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async ({ password }, { resetForm }) => {
          setSubmit(false);
          resetForm({ password: "", confirmPassword: "" });
          status.current.textContent = "Please wait...";
          try {
            const response = await axios.post(
              serverURI + "/auth/resetPassword",
              { token: jwt, password }
            );

            if (response.status === 200) {
              status.current.textContent = response.data.message;
            } else {
              status.current.textContent =
                "Something went wrong. " + response.data.error;
            }
          } catch (error) {
            status.current.textContent =
              "Something went wrong. " + error.message;
          }
        }}
      >
        {(formik) => {
          formik.confirmPassword = async ({ target: { value } }, password) => {
            if (password === value) {
              status.current.textContent =
                "Passwords match! Click submit to change password.";
              setSubmit(true);
            } else {
              status.current.textContent = "Passwords do not match!!";
              setSubmit(false);
            }
          };
          return (
            <Form>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.confirmPassword(e, formik.values.confirmPassword);
                }}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                id="confirmPasswordl"
                name="confirmPassword"
                type="password"
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.confirmPassword(e, formik.values.password);
                }}
              />

              <button type="submit" disabled={!allowSubmit}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      <p ref={status}></p>
    </div>
  );
}
