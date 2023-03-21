import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";


const supabase = createClient('https://whwmiwzaitmezgpfrvjf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indod21pd3phaXRtZXpncGZydmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIxNzYwOTAsImV4cCI6MTk4Nzc1MjA5MH0.a6NwW0s9BpK_UHX0yWkxc_Pwv4alHUaBCERCiMlG26g')

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LoginContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 600px;
  display: flex;
  justify-content: center;
`;

const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;

    & > label {
      margin-bottom: 5px;
    }

    & > input {
      border: 1px solid gray;
      border-radius: 3px;
      padding: 5px;
      width: 100%;
    }
  }

  & > button {
    background-color: #0077cc;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    padding: 10px;
    width: 100%;

    &:hover {
      background-color: #005fa3;
    }

    &:disabled {
      background-color: gray;
      cursor: default;
    }
  }
`;

const LoginPage = () => (
<LoginContainer>
  <div>
    <h1 className="loginForm-h1">Login</h1>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { user, error } = await supabase.auth.signIn({
            email: values.email,
            password: values.password,
          });

          if (error) {
            throw error;
          }

          alert(JSON.stringify(user, null, 2));
          setSubmitting(false);
        } catch (error) {
          alert(error.message);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="loginForm">
        <LoginForm>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </LoginForm>
        </Form>
      )}
    </Formik>
  </div>
</LoginContainer> 
);

export default LoginPage;