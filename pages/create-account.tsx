import React, { ReactElement } from 'react';
import Layout from '../src/components/Layout';
import { CreateAccount } from '@magentopwa/components/CreateAccount';

const CreateAccountPage = () => {
  return (
    <div className="content-body" data-testid="CreateAccountPage">
      <CreateAccount />
    </div>
  );
};

CreateAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateAccountPage;
