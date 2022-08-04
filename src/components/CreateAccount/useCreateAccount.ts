import { useEffect, useState } from 'react';
import { CreateAccountDocument, SignInDocument } from '@magentopwa/__generated__/apolloComponents';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';
import { useMutation } from '@apollo/client';
import { useCreateCartAfterSignIn } from './useCreateCartAfterSignIn';

export const useCreateAccount = () => {
  const { user, login } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState('');
  const { createCartAfterSignInMutationCall } = useCreateCartAfterSignIn();

  const onSuccessOfSignIn = (data) => {
    if (data.generateCustomerToken) {
      const userData = {
        email: email,
        authToken: data.generateCustomerToken.token,
      };
      login(userData);
      setUserLoggedIn(true);
      setAuthToken(data.generateCustomerToken.token);
    }
  };

  useEffect(() => {
    if (authToken !== '') {
      createCartAfterSignInMutationCall();
    }
  }, [authToken]);

  const [signInMutation] = useMutation(SignInDocument, {
    onCompleted: (data) => {
      onSuccessOfSignIn(data);
    },
    onError: (error) => {
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const onSuccessOfAccountCreation = (data) => {
    if (data.createCustomer) {
      signInMutation({
        variables: {
          email: data.createCustomer.customer.email, // value for 'email'
          password: password, // value for 'password'
        },
      });
    } else {
      setOnError(true);
      setErrorMessage('Something went wrong, please try again after sometime.');
    }
  };

  const [createAccountMutation] = useMutation(CreateAccountDocument, {
    onCompleted: (data) => {
      onSuccessOfAccountCreation(data);
    },
    onError: (error) => {
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const register = (registerData) => {
    setOnError(false);
    setErrorMessage('');
    if (registerData.data.password !== registerData.data.confirmpassword) {
      setOnError(true);
      setErrorMessage('Password and confirm password should match.');
      return;
    }
    setPassword(registerData.data.password);
    setEmail(registerData.data.email);
    createAccountMutation({
      variables: {
        email: registerData.data.email, // value for 'email'
        firstname: registerData.data.firstname, // value for 'firstname'
        lastname: registerData.data.lastname, // value for 'lastname'
        password: registerData.data.password, // value for 'password'
        is_subscribed: false, // value for 'is_subscribed'
      },
    });
  };

  return {
    user,
    userLoggedIn,
    error,
    errorMessage,
    register,
  };
};
