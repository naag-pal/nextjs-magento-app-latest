import React, { useState } from 'react';
import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '@magentopwa/components/Fields/InputField';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';
import { useSignIn } from './useSignIn';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required().min(8),
});

export const SignInForm = () => {
  const useSignInProps = useSignIn();

  const { user, userLoggedIn, error, errorMessage, onSubmitSignIn } = useSignInProps;
  if (userLoggedIn) {
    // location.href = '/';
  }

  if (user && user.email && user.email !== '') {
    return <div>User is alerady logged in. Browse the products.</div>;
  }
  return (
    <div className="container">
      <div className="register-form">
        <div className="signin-from">
          <div className="text-lg text-center">Sign-In To Your Account</div>
          {error && <p className="text-red-500 mt-3 mb-3">{errorMessage}</p>}
          <Formik
            onSubmit={async (data) => {
              await onSubmitSignIn({
                data,
              });
            }}
            validationSchema={LoginSchema}
            initialValues={{
              email: '',
              password: '',
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="email" placeholder="Email" component={InputField} className="fields" />
                {errors.email && touched.email ? <div className="m-0 field-error">{errors.email as string}</div> : null}
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={InputField}
                  className="fields"
                />
                {errors.password && touched.password ? (
                  <div className="m-0 field-error">{errors.password as string}</div>
                ) : null}
                <div className="text-center mt-6 mb-6">
                  <Button type="submit" className="buttons" disabled={error}>
                    Sign in
                  </Button>
                </div>
                <div className="text-center mb-6">
                  <Link href="/create-account">
                    <Button type="button" variant="outlined" className="buttons">
                      Create account
                    </Button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
