import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '@magentopwa/components/Layout';
import {
  GetCustomerAddressesDocument,
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
  UpdateCustomerAddressDocument,
  CustomerAddress,
} from '@magentopwa/__generated__/apolloComponents';
import { NestedMetaData } from '../src/components/Layout/nestedMetaData';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@magentopwa/components/UI';
import ReactModal from '../src/components/ReactModal';
import { Formik, Field } from 'formik';
import InputField from '@magentopwa/components/Fields/InputField';
import { EditIcon } from '../src/components/Icons';

const MyAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    __typename: 'CustomerAddress',
    id: '',
    city: '',
    country_code: '',
    default_shipping: false,
    firstname: '',
    lastname: '',
    postcode: '',
    region: {
      __typename: 'CustomerAddressRegion',
      region: '',
      region_code: '',
      region_id: 0,
    },
    street: ['', ''],
    telephone: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const { data: addressData, error, loading, refetch: refetchAdresses } = useQuery(GetCustomerAddressesDocument);

  const [updateCustomerAddressMutation] = useMutation<
    UpdateCustomerAddressMutation,
    UpdateCustomerAddressMutationVariables
  >(UpdateCustomerAddressDocument, {
    onCompleted: (data) => {
      //onSuccessOfSetAddress(data);
      console.log(data);
      setOpenModal(!openModal);
      refetchAdresses();
    },
  });

  const onSubmitUpdateAddressInformation = (addressData) => {
    const addressFields = addressData.data;
    updateCustomerAddressMutation({
      variables: {
        addressId: addressFields.addressId,
        address: {
          firstname: addressFields.firstname,
          lastname: addressFields.lastname,
          default_shipping: true,
          street: [addressFields.street[0], ''],
          city: addressFields.city,
          region: {
            region_id: 45,
          },
          postcode: addressFields.postcode,
          telephone: addressFields.telephone,
          //  country_code: 'US',
        },
      },
    });
  };

  const editAddress = (address) => {
    setCurrentAddress(address);
    setOpenModal(!openModal);
  };

  const editAddressFields = currentAddress.firstname && (
    <div>
      <div>
        <Formik
          onSubmit={async (data) => {
            await onSubmitUpdateAddressInformation({
              data,
            });
          }}
          initialValues={{
            firstname: currentAddress.firstname,
            lastname: currentAddress.lastname,
            email: '',
            telephone: currentAddress.telephone,
            street: currentAddress.street[0],
            city: currentAddress.city,
            regionCode: currentAddress.region.region_code,
            postcode: currentAddress.postcode,
            countryCode: currentAddress.country_code,
            addressId: currentAddress.id,
            defaultShipping: currentAddress.default_shipping,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="firstname" placeholder="First name" component={InputField} className="fields" />
              <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />
              <Field name="telephone" placeholder="Mobile" component={InputField} className="fields" />
              <Field name="email" placeholder="Email" component={InputField} className="fields" />
              <Field name="street" placeholder="Address" component={InputField} className="fields" />
              <Field name="city" placeholder="City" component={InputField} className="fields" />
              <Field name="regionCode" placeholder="State" component={InputField} className="fields" />
              <Field name="countryCode" placeholder="Country" component={InputField} className="fields" />
              <Field name="postcode" placeholder="Zipcode" component={InputField} className="fields" />
              <div className="hidden">
                <Field name="addressId" placeholder="addressId" component={InputField} className="fields" />
              </div>
              <div className="text-center mt-6 mb-6">
                <Button type="submit" className="buttons">
                  Continue
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );

  useEffect(() => {
    if (
      addressData &&
      addressData.customer &&
      addressData.customer.addresses &&
      addressData.customer.addresses.length > 0
    ) {
      setAddresses(addressData?.customer.addresses);
    }
  }, [addressData]);

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  const displayAddress = (addresses) => {
    return (
      <>
        {addresses.map((address) => {
          return (
            <div className={`address-fields m-4 p-4 bg-blue-100`} key={address.id}>
              {address.firstname && (
                <>
                  <h1>
                    <span className="font-semibold">Address</span>
                    <span
                      className="cursor-pointer float-right"
                      data-testid="editLink"
                      onClick={() => editAddress(address)}
                    >
                      <EditIcon />
                    </span>
                  </h1>
                  <div>
                    {address.firstname} {address.lastname}{' '}
                  </div>
                  <div>{address.street && address.street[0]}</div>
                  <div>
                    {address.city} - {address.postcode}
                  </div>
                  <div>
                    {address.region && address.region.code} {address.country && address.country.code}{' '}
                  </div>
                  <div>Ph: {address.telephone} </div>
                </>
              )}
            </div>
          );
        })}
      </>
    );
  };

  if (loading) return <></>;
  if (error) return <></>;
  return (
    <div className="container" data-testid="addressInfo">
      <h1 className="text-lg  mt-4 mb-4">My Addresses</h1>
      <div className="flex flex-wrap">{addresses.length > 0 && displayAddress(addresses)}</div>
      <ReactModal open={openModal} onClose={closeModal}>
        {editAddressFields}
      </ReactModal>
    </div>
  );
};

MyAddresses.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: 'Update Address Information',
    description: 'Update Address Information',
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};
export default MyAddresses;
