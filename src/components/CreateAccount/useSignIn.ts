import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SignInDocument } from '@magentopwa/__generated__/apolloComponents';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';
import { useCreateCartAfterSignIn } from './useCreateCartAfterSignIn';

export const useSignIn = () => {
  const { user, login } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [error, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { createCartAfterSignInMutationCall } = useCreateCartAfterSignIn();

  useEffect(() => {
    if (authToken !== '') {
      createCartAfterSignInMutationCall();
    }
  }, [authToken]);

  const onSuccessOfSignIn = (data) => {
    if (data.generateCustomerToken) {
      const userData = {
        email: email,
        authToken: data.generateCustomerToken.token,
      };
      login(userData);
      setUserLoggedIn(true);
      //createCartMutation();
      setAuthToken(data.generateCustomerToken.token);
    }
  };

  const [signInMutation] = useMutation(SignInDocument, {
    onCompleted: (data) => {
      console.log('data');
      onSuccessOfSignIn(data);
    },
    onError: (error) => {
      console.log('Error');
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const onSubmitSignIn = (loginData) => {
    setOnError(false);
    setErrorMessage('');
    setEmail(loginData.data.email);
    signInMutation({
      variables: {
        email: loginData.data.email, // value for 'email'
        password: loginData.data.password, // value for 'password'
      },
    });
  };
  return {
    user,
    userLoggedIn,
    error,
    errorMessage,
    onSubmitSignIn,
  };
};
