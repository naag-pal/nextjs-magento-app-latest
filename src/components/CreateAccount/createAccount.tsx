import React, { useEffect, useState } from 'react';
import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '@magentopwa/components/Fields/InputField';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';
import { useCreateAccount } from './useCreateAccount';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobile: Yup.string().min(2).max(10).matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  password: Yup.string().required().min(8),
  confirmpassword: Yup.string().required().min(8),
});

export const CreateAccount = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const createAccountProps = useCreateAccount();
  const { firstname, email, lastname } = props;

  const { user, userLoggedIn, error, errorMessage, register } = createAccountProps;

  if (userLoggedIn) {
    return <div>Thank you for creating your account. Browse the products.</div>;
  }

  if (user && user.email && user.email !== '') {
    return <div>User is alerady logged in. Browse the products.</div>;
  }

  return (
    <div className="container">
      <div className="register-form">
        <div className="signin-from">
          <div className="text-lg text-center"> Create an Account</div>
          {error && <p className="text-red-500 mt-3 mb-3">{errorMessage}</p>}

          <Formik
            onSubmit={async (data) => {
              setFormSubmitted(true);
              await register({
                data,
              });
            }}
            validationSchema={SignupSchema}
            initialValues={{
              email: email || '',
              firstname: firstname || '',
              mobile: '',
              lastname: lastname || '',
              password: '',
            }}
          >
            {({ errors, touched }) => (
              <Form onFocus={() => setFormSubmitted(false)}>
                <Field name="firstname" placeholder="First name" component={InputField} className="fields" />
                {errors.firstname && touched.firstname ? (
                  <div className="m-0 field-error">{errors.firstname as string}</div>
                ) : null}
                <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />

                {errors.lastname && touched.lastname ? (
                  <div className="m-0 field-error">{errors.lastname as string}</div>
                ) : null}
                <Field name="email" placeholder="Email" component={InputField} className="fields" />
                {errors.email && touched.email ? <div className="m-0 field-error">{errors.email as string}</div> : null}
                <Field name="mobile" placeholder="Mobile" maxLength="10" component={InputField} className="fields" />
                {errors.mobile && touched.mobile ? (
                  <div className="m-0 field-error">{errors.mobile as string}</div>
                ) : null}
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
                <Field
                  name="confirmpassword"
                  placeholder="Confirm password"
                  type="password"
                  component={InputField}
                  className="fields"
                />
                <div className="text-center mt-6 mb-6">
                  <Button type="submit" className="buttons" disabled={formSubmitted}>
                    Create Account
                  </Button>
                </div>
                <div className="text-center mb-6">
                  <Link href="/sign-in">
                    <Button type="button" variant="outlined" className="buttons">
                      Cancel
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
