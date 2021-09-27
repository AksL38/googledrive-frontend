import { useRef, useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { serverURI } from "./config";

export default function ForgotPassword() {
  const status = useRef(null);
  const [allowSubmit, setSubmit] = useState(false);

  const verifyEmail = async ({ target: { value } }) => {
    status.current.textContent = "Checking email ...";
    setSubmit(false);
    axios
      .post(serverURI + "/auth/verifyEmail", { email: value })
      .then((response) => {
        if (response.data.error) {
          status.current.textContent = response.data.error;
        } else {
          status.current.textContent = response.data.message;
          setSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async ({ email }, { resetForm }) => {
          setSubmit(false);
          resetForm({ email: "" });
          status.current.textContent = "Please wait. Sending reset email.";
          try {
            const response = await axios.post(
              serverURI + "/auth/forgetPassword",
              { email }
            );

            if (response.status === 200) {
              status.current.textContent = response.data;
            } else {
              status.current.textContent =
                "Something went wrong. " + response.data;
            }
          } catch (error) {
            status.current.textContent =
              "Something went wrong. " + error.message;
          }
        }}
      >
        {(formik) => {
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
                  verifyEmail(e);
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
