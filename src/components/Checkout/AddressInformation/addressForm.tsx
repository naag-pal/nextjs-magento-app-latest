import React, { useEffect } from 'react';
import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
/*
import {
  UpdateCustomerAddressMutation,
  UpdateCustomerAddressMutationVariables,
  UpdateCustomerAddressDocument,
} from '@magentopwa/__generated__/apolloComponents';
import { useMutation } from '@apollo/client';
*/
import InputField from '@magentopwa/components/Fields/InputField';
import ReactModal from '@magentopwa/components/ReactModal';
import { Button } from '@magentopwa/components/UI';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const AddressInfoSchema = Yup.object().shape({
  firstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  telephone: Yup.string().min(2).max(10).matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  city: Yup.string().required().required('Required'),
});
export const AddressForm = (props) => {
  const { showAddressModal, setShowAddressModal, currentAddress, error, errorMessage, onSubmitAddressInformation } =
    props;

  /*
  const [updateCustomerAddressMutation] = useMutation<
    UpdateCustomerAddressMutation,
    UpdateCustomerAddressMutationVariables
  >(UpdateCustomerAddressDocument, {
    onCompleted: (data) => {
      //onSuccessOfSetAddress(data);
      setShowAddressModal(!showAddressModal);
    },
  });
  */
  const closeModal = () => {
    setShowAddressModal(!showAddressModal);
  };

  const editAddressFields = (
    <div>
      <div>
        <Formik
          onSubmit={async (data) => {
            await onSubmitAddressInformation({
              data,
            });
          }}
          validationSchema={AddressInfoSchema}
          initialValues={{
            firstname: currentAddress.firstname,
            lastname: currentAddress.lastname,
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
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="text-lg font-semibold text-center">Add or Update Address </div>
              {error && <p className="text-red-500 mt-3 mb-3">{errorMessage}</p>}
              <Field name="firstname" placeholder="First name test" component={InputField} className="fields" />
              {errors.firstname && touched.firstname ? (
                <div className="m-0 field-error">{errors.firstname as string}</div>
              ) : null}
              <Field name="lastname" placeholder="Last name" component={InputField} className="fields" />
              {errors.lastname && touched.lastname ? (
                <div className="m-0 field-error">{errors.lastname as string}</div>
              ) : null}
              <Field name="telephone" placeholder="Mobile" maxlength="10" component={InputField} className="fields" />
              {errors.telephone && touched.telephone ? (
                <div className="m-0 field-error">{errors.telephone as string}</div>
              ) : null}
              <Field name="street" placeholder="Address" component={InputField} className="fields" />
              <Field name="city" placeholder="City" component={InputField} className="fields" />
              {errors.city && touched.city ? <div className="m-0 field-error">{errors.city as string}</div> : null}
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
    </div>
  );

  return (
    <div className="address-form">
      <ReactModal open={showAddressModal} onClose={closeModal}>
        {editAddressFields}
      </ReactModal>
    </div>
  );
};
