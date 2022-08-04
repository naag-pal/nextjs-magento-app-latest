import { useMutation, useQuery } from '@apollo/client';
import { useContext, useState } from 'react';
import {
  GetPaymentInformationDocument,
  GetPaymentInformationQuery,
  GetPaymentInformationQueryVariables,
  SetPaymentMethodOnCartDocument,
} from '@magentopwa/__generated__/apolloComponents';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';

export const usePaymentInformation = () => {
  const [showPaymentMethodLoader, setShowPaymentMethodLoader] = useState(false);
  const { state: cart, dispatch } = useContext(ShoppingAppContext);

  const { data: paymentInfo } = useQuery<GetPaymentInformationQuery, GetPaymentInformationQueryVariables>(
    GetPaymentInformationDocument,
    {
      variables: {
        cartId: cart.cartId,
      },
    }
  );

  const onSuccessOfSetShippingMethod = (data) => {
    console.log('set payment method');
    console.log(data);
    dispatch({
      type: Types.UPDATE_CHECKOUT_STATUS,
      payload: 'PAYMENT_METHOD',
    });
  };

  const [setPaymentMethodOnCartMutation] = useMutation(SetPaymentMethodOnCartDocument, {
    onCompleted: (data) => {
      onSuccessOfSetShippingMethod(data);
    },
  });

  const onClickOfSetPaymentMethod = () => {
    setPaymentMethodOnCartMutation({
      variables: {
        cartId: cart.cartId,
        paymentMethod: 'checkmo',
      },
    });
  };

  return {
    paymentInfo,
    onClickOfSetPaymentMethod,
    showPaymentMethodLoader,
    setShowPaymentMethodLoader,
  };
};
