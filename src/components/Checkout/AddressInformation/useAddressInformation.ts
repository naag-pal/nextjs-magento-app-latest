import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';
import {
  GetCustomerAddressesDocument,
  SetBillingAddressDocument,
  CreateCustomerAddressDocument,
  UpdateCustomerAddressDocument,
  SetCustomerAddressOnCartDocument,
  SetGuestShippingDocument,
} from '@magentopwa/__generated__/apolloComponents';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';

export const useAddressInformation = () => {
  const { user } = useAuth();
  const [showAddress, setShowAddressInfo] = useState(true);
  const [error, setOnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addAddressInfo, setAddAddressInfo] = useState(true);
  const { state: cart, dispatch } = useContext(ShoppingAppContext);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const defaultAddress = {
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
  };
  const [currentAddress, setCurrentAddress] = useState(defaultAddress);
  const [emailUpdated, setEmailUpdated] = useState(user && user.email);

  const { data: addressData, refetch: refetchAdresses } = useQuery(GetCustomerAddressesDocument);

  useEffect(() => {
    if (
      addressData &&
      addressData.customer &&
      addressData.customer.addresses &&
      addressData.customer.addresses.length > 0
    ) {
      setShowAddressInfo(true);
      // setting latest address
      setAddresses(addressData?.customer.addresses);
      setAddAddressInfo(false);
    }
  }, [addressData]);

  const setCustomerAddressId = (addressData) => {
    setBillingAddress(addressData);
    setCustomerAddressOnCartMutation({
      variables: {
        cartId: cart.cartId,
        addressId: addressData.id,
      },
    });
    dispatch({
      type: Types.UPDATE_ADDRESS_ID,
      payload: addressData.id,
    });
  };

  const onSuccessOfCreateCustomerAddressMutation = (data) => {
    setCustomerAddressOnCartMutation({
      variables: {
        cartId: cart.cartId,
        addressId: data.createCustomerAddress.id,
      },
    });
    dispatch({
      type: Types.UPDATE_ADDRESS_ID,
      payload: data.createCustomerAddress.id,
    });
    refetchAdresses();
    setShowAddressModal(!showAddressModal);
  };

  const onSuccessOfGuestShippingAddressMutation = (data) => {
    console.log(data);
    const addressData = data.setShippingAddressesOnCart.cart.shipping_addresses[0];
    setBillingAddress(addressData);
    dispatch({
      type: Types.UPDATE_CHECKOUT_STATUS,
      payload: 'ADDRESS_INFO',
    });
  };

  const [setBillingAddressMutation] = useMutation(SetBillingAddressDocument);

  const [setGuestShippingMutation] = useMutation(SetGuestShippingDocument, {
    onCompleted: (data) => {
      onSuccessOfGuestShippingAddressMutation(data);
    },
    onError: (error) => {
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const [createCustomerAddressMutation] = useMutation(CreateCustomerAddressDocument, {
    onCompleted: (data) => {
      onSuccessOfCreateCustomerAddressMutation(data);
    },
    onError: (error) => {
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const [updateCustomerAddressMutation] = useMutation(UpdateCustomerAddressDocument, {
    onCompleted: (data) => {
      //onSuccessOfSetAddress(data);
      setShowAddressModal(false);
      refetchAdresses();
      setShowAddressModal(!showAddressModal);
    },
    onError: (error) => {
      //setShowAddressModal(false);
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const [setCustomerAddressOnCartMutation] = useMutation(SetCustomerAddressOnCartDocument, {
    onCompleted: (data) => {
      console.log(data);
      //onSuccessOfSetAddress(data);
      setAddAddressInfo(false);
      setShowAddressInfo(true);
      dispatch({
        type: Types.UPDATE_CHECKOUT_STATUS,
        payload: 'ADDRESS_INFO',
      });
    },
    onError: (error) => {
      setOnError(true);
      setErrorMessage(error.message);
    },
  });

  const setBillingAddress = (addressData) => {
    const adressFields = addressData;

    setBillingAddressMutation({
      variables: {
        cartId: cart.cartId,
        firstname: adressFields.firstname,
        lastname: adressFields.lastname,
        street: adressFields.street,
        city: adressFields.city,
        regionCode: 'KA',
        postcode: adressFields.postcode,
        countryCode: 'IN',
        telephone: adressFields.telephone,
      },
    });
  };

  const onSubmitAddressInformation = (addressData) => {
    setOnError(false);
    setErrorMessage('');
    const addressFields = addressData.data;
    if (addressFields.addressId !== '') {
      updateCustomerAddressMutation({
        variables: {
          addressId: addressFields.addressId,
          address: {
            firstname: addressFields.firstname,
            lastname: addressFields.lastname,
            default_shipping: true,
            street: [addressFields.street, 'Street 102'],
            city: addressFields.city,
            region: {
              region_id: 45,
            },
            postcode: addressFields.postcode,
            telephone: addressFields.telephone,
            country_code: 'US',
          },
        },
      });
    } else {
      createCustomerAddressMutation({
        variables: {
          address: {
            firstname: addressFields.firstname,
            lastname: addressFields.lastname,
            default_shipping: true,
            street: [addressFields.street, 'Street 102'],
            city: addressFields.city,
            region: {
              region_id: 45,
            },
            postcode: addressFields.postcode,
            telephone: addressFields.telephone,
            country_code: 'US',
          },
        },
      });
      setBillingAddress(addressFields);
    }
  };

  const onGuestSubmitAddressInformation = (addressData) => {
    setOnError(false);
    setErrorMessage('');
    const addressFields = addressData.data;
    if (addressFields.email !== '') {
      setEmailUpdated(addressFields.email);
      setGuestShippingMutation({
        variables: {
          cartId: cart.cartId,
          email: addressFields.email,
          address: {
            firstname: addressFields.firstname,
            lastname: addressFields.lastname,
            street: [addressFields.street, 'Street 102'],
            city: addressFields.city,
            region: '45',
            postcode: addressFields.postcode,
            telephone: addressFields.telephone,
            country_code: 'US',
          },
        },
      });
      setCurrentAddress({
        __typename: 'CustomerAddress',
        id: '',
        city: addressFields.city,
        country_code: 'US',
        default_shipping: false,
        firstname: addressFields.firstname,
        lastname: addressFields.lastname,
        region: {
          __typename: 'CustomerAddressRegion',
          region: '',
          region_code: '45',
          region_id: 0,
        },
        street: [addressFields.street, 'Street 102'],
        postcode: addressFields.postcode,
        telephone: addressFields.telephone,
      });
    }
  };

  return {
    showAddress,
    setShowAddressInfo,
    addresses,
    setCustomerAddressId,
    onSubmitAddressInformation,
    addAddressInfo,
    setAddAddressInfo,
    showAddressModal,
    setShowAddressModal,
    currentAddress,
    setCurrentAddress,
    defaultAddress,
    emailUpdated,
    error,
    errorMessage,
    onGuestSubmitAddressInformation,
    setErrorMessage,
    setOnError,
  };
};
