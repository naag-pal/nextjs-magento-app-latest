import React, { ReactElement, useState } from 'react';
import Layout from '@magentopwa/components/Layout';
import { NestedMetaData } from '@magentopwa/components/Layout/nestedMetaData';
import { GetCustomerInformationDocument, SetCustomerInformationDocument } from '../src/__generated__/apolloComponents';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@magentopwa/components/UI';
import ReactModal from '@magentopwa/components/ReactModal';
import { Field, Formik } from 'formik';
import InputField from '@magentopwa/components/Fields/InputField';

const MyAccount = () => {
  // const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { data, error, loading, refetch } = useQuery(GetCustomerInformationDocument);
  const accountInfo = data && data.customer;

  const onSuccessOfSetCustomerInformation = (data) => {
    refetch();
    setModalOpen(!modalOpen);
  };

  const [setCustomerInformationMutation] = useMutation(SetCustomerInformationDocument, {
    onCompleted: (data) => {
      onSuccessOfSetCustomerInformation(data);
    },
  });

  const updateCustomerInformation = (customerData) => {
    // console.log('hello)
    setCustomerInformationMutation({
      variables: {
        customerInput: {
          email: customerData.data.email, // value for 'email'
          firstname: customerData.data.firstname, // value for 'firstname'
          lastname: customerData.data.lastname, // value for 'lastname'
          password: customerData.data.password, // value for 'password'
        },
      },
    });
  };

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <div className="container" data-testid="accountInfo">
      <h1 className="text-lg  mt-4 mb-4">My Account Information</h1>
      <div>
        {accountInfo && (
          <div className="account-info mb-6 mt-6">
            <div className="mb-6">
              Name: {accountInfo.fristname} {accountInfo.lastname}
            </div>
            <div className="mb-6">Email: {accountInfo.email}</div>
            <div className="mb-6">Password: *******</div>
          </div>
        )}
        <div className="mt-6">
          <Button variant="outlined" onClick={() => setModalOpen(!modalOpen)}>
            Edit
          </Button>
        </div>
      </div>
      <div>
        <ReactModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="account-info mb-6 mt-6">
            {accountInfo && (
              <div>
                <Formik
                  onSubmit={async (data) => {
                    await updateCustomerInformation({
                      data,
                    });
                  }}
                  initialValues={{
                    email: accountInfo.email,
                    firstname: accountInfo.firstname,
                    lastname: accountInfo.lastname,
                    password: accountInfo.password,
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field name="firstname" placeholder="First name" component={InputField} className="fields" />
                      <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />
                      <Field name="email" placeholder="Email" component={InputField} className="fields" />
                      <div className="text-center mt-6 mb-6">
                        <Button type="submit" className="buttons">
                          Update
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </ReactModal>
      </div>
    </div>
  );
};

MyAccount.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: `Account Information`,
    description: `Update Account Information`,
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};

export default MyAccount;
