import React, { useContext, useEffect } from 'react';
import { usePaymentInformation } from './usePaymentInformation';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';

export const PaymentInformation = () => {
  const { state: cart } = useContext(ShoppingAppContext);
  const paymentInformationProps = usePaymentInformation();
  const { paymentInfo, onClickOfSetPaymentMethod, showPaymentMethodLoader, setShowPaymentMethodLoader } =
    paymentInformationProps;

  useEffect(() => {
    if (cart.checkout.status === 'SHIPPING_METHOD') {
      setShowPaymentMethodLoader(true);
      onClickOfSetPaymentMethod();
      setShowPaymentMethodLoader(false);
    }
  }, [cart]);

  return (
    <div className="gap-4 mt-4  max-w-sm md:max-w-lg">
      <div className="border-2 rounded-lg p-4">
        <h1>Payment Information</h1>
        <div className="payment-details font-semibold">{paymentInfo?.cart?.available_payment_methods[0]?.title}</div>
        <div className="">{showPaymentMethodLoader ? 'Loading...' : ''}</div>
      </div>
    </div>
  );
};
