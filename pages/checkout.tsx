import React from 'react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CreateCartDocument,
  GetCartDetailsAfterCheckoutDocument,
  GetCartDetailsAfterCheckoutQuery,
  GetCartDetailsAfterCheckoutQueryVariables,
  GetOrderDetailsDocument,
  GetOrderDetailsQuery,
  GetOrderDetailsQueryVariables,
  PlaceOrderDocument,
} from '@magentopwa/__generated__/apolloComponents';
import { Button } from '@magentopwa/components/UI';
import Layout from '../src/components/Layout';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';
import { AddressInformation } from '@magentopwa/components/Checkout/AddressInformation';
import { ShippingMethodInformation } from '@magentopwa/components/Checkout/ShippingMethodInformation';
import { PricingInformation } from '@magentopwa/components/Checkout/PricingInformation';
import { CheckoutCartInformation } from '@magentopwa/components/Checkout/CartInformation';
import { PaymentInformation } from '@magentopwa/components/Checkout/PaymentInformation';
import { CheckoutSignIn, CheckoutCreateAccount } from '@magentopwa/components/Checkout/CheckoutSignIn';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';

const CheckoutPage = () => {
  const { user } = useAuth();
  const email = user && user.email ? user.email : '';
  const [userEmail, setUserEmail] = useState(email);

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
  const [userAddress, setUserAddress] = useState(defaultAddress);

  const { state: cart, dispatch } = useContext(ShoppingAppContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [getOrderDetailsQuery, { data: orderDetailsData }] = useLazyQuery<
    GetOrderDetailsQuery,
    GetOrderDetailsQueryVariables
  >(GetOrderDetailsDocument, {
    variables: {
      cartId: cart.cartId,
    },
  });

  const { data: checkoutDetails, refetch: refetchCartCheckoutDetails } = useQuery<
    GetCartDetailsAfterCheckoutQuery,
    GetCartDetailsAfterCheckoutQueryVariables
  >(GetCartDetailsAfterCheckoutDocument, {
    variables: {
      cartId: cart.cartId,
    },
  });

  const displayOrderDetails = (data) => {
    console.log('success createAccountAfterCheckoutMutation', data);
  };

  useEffect(() => {
    if (checkoutDetails?.cart) {
      onSuccessOfGettingOrderDetails(checkoutDetails);
    }
  }, [checkoutDetails]);

  useEffect(() => {
    if (orderDetailsData?.cart) {
      refetchCartCheckoutDetails();
    }
  }, [orderDetailsData]);

  const onSuccessOfGettingOrderDetails = (data) => {
    console.log(onSuccessOfGettingOrderDetails);
    console.log(data);
  };

  const onSuccessOfPlaceOrderMutation = (data) => {
    console.log(data);
    setOrderPlaced(true);
    getOrderDetailsQuery();
    console.log('getOrderDetailsQuery');
    if (email !== '') {
      createCartMutation();
      return;
    }
  };

  const [placeOrderMutation] = useMutation(PlaceOrderDocument, {
    onCompleted: (data) => {
      onSuccessOfPlaceOrderMutation(data);
    },
  });

  const placeOrder = (data) => {
    console.log(data);
    placeOrderMutation({
      variables: {
        cartId: cart.cartId,
      },
    });
  };

  const [createCartMutation] = useMutation(CreateCartDocument, {
    onCompleted: (data) => {
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: data.cartId,
      });
      dispatch({
        type: Types.CLEAR_CART,
        payload: data.cartId,
      });
    },
  });

  return (
    <div data-testId="CheckoutPage">
      {orderPlaced ? (
        <div>
          <h1 className="font-semibold text-lg mt-6 mb-6">Order successfully placed.</h1>
          <div>Thank you for the order, we will send the order details and delivery details.</div>
          {orderDetailsData && orderDetailsData.cart && (
            <>
              <div>Order Details: {orderDetailsData && orderDetailsData.cart && orderDetailsData.cart.id}</div>
              <div>
                {orderDetailsData.cart.items.map((item) => {
                  return (
                    <div className="orders" key={item.product?.uid}>
                      <div>{item.product.name}</div>
                      <div>{item.product.uid}</div>
                      <div>{item.product.thumbnail.url}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {user && user.email && user.email !== '' ? (
            ''
          ) : (
            <CheckoutCreateAccount
              email={userEmail}
              firstname={userAddress.firstname}
              lastname={userAddress.lastname}
              displayOrderDetails={displayOrderDetails}
            />
          )}
        </div>
      ) : (
        <div className="content-body m-auto md:w-6/6 lg:w-5/6">
          <h1 className="h1 mb-6">Checkout Page</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-2">
            <div className="checkout-info mx-4">
              {user && user.email && user.email !== '' ? '' : <CheckoutSignIn />}
              <div className="m-auto min-w-fit">
                <AddressInformation
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                  userAddress={userAddress}
                  setUserAddress={setUserAddress}
                />
              </div>
              <ShippingMethodInformation />
              <PaymentInformation />
            </div>
            <div className="mx-4">
              <div className="checkout-price-info">
                <PricingInformation />
              </div>
              <div className="mt-8 mb-8 text-center">
                <Button
                  type="button"
                  variant="filled"
                  onClick={placeOrder}
                  disabled={cart.checkout.status !== 'PAYMENT_METHOD'}
                >
                  Place Order
                </Button>
              </div>
              <div className="checkout-price-info">
                <CheckoutCartInformation />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckoutPage;
