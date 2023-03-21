import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://whwmiwzaitmezgpfrvjf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indod21pd3phaXRtZXpncGZydmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIxNzYwOTAsImV4cCI6MTk4Nzc1MjA5MH0.a6NwW0s9BpK_UHX0yWkxc_Pwv4alHUaBCERCiMlG26g')

const SignUpContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 600px;
  display: flex;
  justify-content: center;
`;

const SignUpForm = styled(Form)`
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

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUpPage = () => {
    const handleSignUp = async (values) => {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
  
      if (error) {
        console.log(error);
      } else {
        alert('Sign up successful!');
        window.location.href = '/';
        // Redirect the user to the dashboard or another page
      }
    };
  
    return (
    <SignUpContainer>
      <div>
        <h1 className="form-h1">Create a New Account</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="form">
            <SignUpForm>
              <div>
                <label htmlFor="name" placeholder="Name">Name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
  
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
  
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
  
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <div>
                <text className="login-redirect">Already have an account?<a href="../login">Login</a></text>
              </div>
              </SignUpForm>
            </Form>
          )}
        </Formik>
      </div>
    </SignUpContainer>
    );
  };
  
  export default SignUpPage;