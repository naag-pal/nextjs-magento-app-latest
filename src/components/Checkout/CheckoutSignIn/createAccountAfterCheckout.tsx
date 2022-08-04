import React, { useContext, useState } from 'react';
import { Field, Formik } from 'formik';
import InputField from '@magentopwa/components/Fields/InputField';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';
import {
  CreateAccountAfterCheckoutDocument,
  //CreateCartAfterCheckoutDocument,
  SignInAfterCheckoutDocument,
} from '@magentopwa/__generated__/apolloComponents';
import { useMutation } from '@apollo/client';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';

export const CreateAccountAfterCheckout = (props) => {
  const { state: cart } = useContext(ShoppingAppContext);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firstname, email, lastname } = props;
  console.log(cart);
  /*
  const [getAccountChipQuery, { loading, error, data: accountChipData }] = useLazyQuery(AccountChipQueryDocument);

  const [
    getCustomerForCheckout,
    { loading: customerForCheckoutLoading, error: customerForCheckoutError, data: accountCcustomerForCheckoutData },
  ] = useLazyQuery(GetCustomerForCheckoutDocument);
  */

  const [createAccountAfterCheckoutMutation] = useMutation(CreateAccountAfterCheckoutDocument, {
    onCompleted: (data) => {
      console.log(data);
      signInAfterCheckoutMutation({
        variables: {
          email: userEmail, // value for 'email'
          password: password, // value for 'password'
        },
      });
    },
  });
  /*
  const [createCartAfterCheckoutMutation] = useMutation(CreateCartAfterCheckoutDocument, {
    onCompleted: (data) => {
      console.log(data.cartId);
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: data.mergeCarts.id,
      });
    },
  });
  */

  const [signInAfterCheckoutMutation] = useMutation(SignInAfterCheckoutDocument, {
    onCompleted: (data) => {
      //displayOrderDetails(data);
      console.log(data);
      console.log('successfully signedin');
      console.log('getAccountChipQuery signedin');
      // getAccountChipQuery();
      // getCustomerForCheckout();
    },
  });

  const registerAfterCheckout = (registerData) => {
    setPassword(registerData.data.password);
    setUserEmail(registerData.data.email);
    createAccountAfterCheckoutMutation({
      variables: {
        email: registerData.data.email, // value for 'email'
        firstname: registerData.data.firstname, // value for 'firstname'
        lastname: registerData.data.lastname, // value for 'lastname'
        password: registerData.data.password, // value for 'password'
        is_subscribed: false, // value for 'is_subscribed'
      },
    });
  };

  return (
    <div className="container">
      <div className="register-form">
        <div className="signin-from">
          <div className="text-lg text-center">Create an Account</div>
          <Formik
            onSubmit={async (data) => {
              await registerAfterCheckout({
                data,
              });
            }}
            initialValues={{
              email: email || '',
              firstname: firstname || '',
              lastname: lastname || '',
              password: '',
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="firstname" placeholder="First name" component={InputField} className="fields" />
                <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />
                <Field name="mobile" placeholder="Mobile" component={InputField} className="fields" />
                <Field name="email" placeholder="Email" component={InputField} className="fields" />
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={InputField}
                  className="fields"
                />
                <Field
                  name="confirmpassword"
                  placeholder="Confirm password"
                  type="password"
                  component={InputField}
                  className="fields"
                />
                <div className="text-center mt-6 mb-6">
                  <Button type="submit" className="buttons">
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
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
