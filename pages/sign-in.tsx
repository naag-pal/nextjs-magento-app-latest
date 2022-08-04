import React, { ReactElement } from 'react';
import Layout from '@magentopwa/components/Layout';
import { SignInForm } from '@magentopwa/components/CreateAccount';

const LoginPage = () => {
  return (
    <div className="content-body" data-testid="LoginPage">
      <SignInForm />
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
