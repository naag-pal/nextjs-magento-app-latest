import React, { useContext, useEffect } from 'react';
import { Button } from '@magentopwa/components/UI';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '@magentopwa/components/Fields/InputField';
import { useAddressInformation } from './useAddressInformation';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import { AddressForm } from './addressForm';
import { EditIcon } from '@magentopwa/components/Icons';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddressInfoSchema = Yup.object().shape({
  firstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  telephone: Yup.string().min(2).max(10).matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  city: Yup.string().required().required('Required'),
});
export const AddressInformation = (props) => {
  const { userEmail, setUserEmail, setUserAddress } = props;
  const { user } = useAuth();
  const addressInformationProps = useAddressInformation();
  const {
    showAddress,
    addresses,
    addAddressInfo,
    setShowAddressInfo,
    onSubmitAddressInformation,
    setCustomerAddressId,
    showAddressModal,
    setShowAddressModal,
    currentAddress,
    setCurrentAddress,
    defaultAddress,
    emailUpdated,
    onGuestSubmitAddressInformation,
    error,
    errorMessage,
    setErrorMessage,
    setOnError,
  } = addressInformationProps;

  const { state: cart } = useContext(ShoppingAppContext);

  const showAddAddressModal = () => {
    setCurrentAddress(defaultAddress);
    setShowAddressModal(!showAddressModal);
    setErrorMessage('');
    setOnError(false);
  };

  useEffect(() => {
    setUserAddress(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    setUserEmail(emailUpdated);
  }, [emailUpdated]);

  const displayAddress = (addresses) => {
    return (
      <>
        {addresses.map((address) => {
          return (
            <div
              key={address.id}
              className={`address-fields mt-2 mb-2 p-2 ${address.id} ${
                address.id === cart.checkout.addressId ? `bg-th-bg-color-1` : 'bg-th-bg-color-2'
              } `}
            >
              {address.firstname && (
                <>
                  <h1>
                    <input
                      type="radio"
                      name="shippingAddressId"
                      value={address.id}
                      defaultChecked={address.id === cart.checkout.addressId}
                      onClick={() => setCustomerAddressId(address)}
                    />
                    <span className="mx-2">Shipping Address</span>
                    <span
                      className="float-right cursor-pointer"
                      onClick={() => {
                        setCurrentAddress(address);
                        setShowAddressModal(true);
                      }}
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

  useEffect(() => {
    if (cart.checkout.status === 'ADDRESS_INFO') {
      //setShowAddressInfo(false);
    }
  }, [cart]);

  return (
    <div
      className="border-2 border-spacing-2 w-50 p-4 rounded-lg  max-w-sm md:max-w-lg"
      data-testid="AddressInformation"
    >
      <h1 className="font-semibold text-lg cursor-pointer mt-6 mb-6" onClick={() => setShowAddressInfo(!showAddress)}>
        Shipping Address Information
        {showAddress ? <span className="float-right text-lg">-</span> : <span className="float-right text-lg">+</span>}
      </h1>
      {showAddress && (
        <>
          {addresses.length > 0 && <div>{displayAddress(addresses)}</div>}{' '}
          {addAddressInfo && (
            <div>
              <Formik
                onSubmit={async (data) => {
                  user && user.email && user.email !== ''
                    ? await onSubmitAddressInformation({
                        data,
                      })
                    : await onGuestSubmitAddressInformation({
                        data,
                      });
                }}
                validationSchema={AddressInfoSchema}
                initialValues={{
                  firstname: '',
                  lastname: '',
                  email: userEmail,
                  telephone: '',
                  street: '',
                  city: '',
                  regionCode: '',
                  postcode: '',
                  countryCode: '',
                  addressId: '',
                  defaultShipping: '',
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    {error && <p className="text-red-500 mt-3 mb-3">{errorMessage}</p>}
                    <Field name="firstname" placeholder="First name test" component={InputField} className="fields" />
                    {errors.firstname && touched.firstname ? (
                      <div className="m-0 field-error">{errors.firstname as string}</div>
                    ) : null}
                    <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />
                    {errors.lastname && touched.lastname ? (
                      <div className="m-0 field-error">{errors.lastname as string}</div>
                    ) : null}
                    <Field
                      name="telephone"
                      placeholder="Mobile"
                      maxlength="10"
                      component={InputField}
                      className="fields"
                    />
                    {errors.telephone && touched.telephone ? (
                      <div className="m-0 field-error">{errors.telephone as string}</div>
                    ) : null}
                    {user && user.email && user.email !== '' ? (
                      ''
                    ) : (
                      <>
                        <Field name="email" placeholder="Email" component={InputField} className="fields" />
                        {errors.email && touched.email ? (
                          <div className="m-0 field-error">{errors.email as string}</div>
                        ) : null}
                      </>
                    )}
                    <Field name="street" placeholder="Address" component={InputField} className="fields" />
                    <Field name="city" placeholder="City" component={InputField} className="fields" />
                    {errors.city && touched.city ? (
                      <div className="m-0 field-error">{errors.city as string}</div>
                    ) : null}
                    <Field name="regionCode" placeholder="State" component={InputField} className="fields" />
                    <Field name="countryCode" placeholder="Country" component={InputField} className="fields" />
                    <Field name="postcode" placeholder="Zipcode" component={InputField} className="fields" />
                    {currentAddress.id !== '' && (
                      <div className="hidden">
                        <Field name="addressId" placeholder="addressId" component={InputField} className="fields" />
                      </div>
                    )}
                    <div className="text-center mt-6 mb-6">
                      <Button type="submit" className="buttons">
                        Continue
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          {showAddressModal && (
            <AddressForm
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
              showAddressModal={showAddressModal}
              setShowAddressModal={setShowAddressModal}
              onSubmitAddressInformation={onSubmitAddressInformation}
              error={error}
              errorMessage={errorMessage}
            ></AddressForm>
          )}
          <div className="font-semibold text-lg cursor-pointer mt-6 mb-6 text-right">
            {!addAddressInfo && (
              <Button variant="outlined" onClick={showAddAddressModal}>
                Add Address
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
