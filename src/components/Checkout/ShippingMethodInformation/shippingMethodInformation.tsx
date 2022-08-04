import { useMutation } from '@apollo/client';
import { SetShippingMethodDocument } from '@magentopwa/__generated__/apolloComponents';
import React, { useContext, useEffect, useState } from 'react';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';

export const ShippingMethodInformation = () => {
  const [showShippingMethodLoader, setShowShippingMethodLoader] = useState(false);
  const { state: cart, dispatch } = useContext(ShoppingAppContext);

  const [setShippingMethodInformationMutation] = useMutation(SetShippingMethodDocument, {
    onCompleted: (data) => {
      onSuccessOfSetShippingMethod(data);
    },
  });

  const onSuccessOfSetShippingMethod = (data) => {
    console.log(data);
    dispatch({
      type: Types.UPDATE_CHECKOUT_STATUS,
      payload: 'SHIPPING_METHOD',
    });
    setShowShippingMethodLoader(false);
  };

  const onSubmitAddressInformation = (shippingMethodData) => {
    const shippingFields = shippingMethodData.data;
    const shippingInfo =
      shippingFields.method === 'FREE'
        ? {
            carrier_code: 'freeshipping',
            method_code: 'freeshipping',
          }
        : {
            carrier_code: 'flatrate',
            method_code: 'flatrate',
          };
    setShippingMethodInformationMutation({
      variables: {
        cartId: cart.cartId,
        shippingMethod: shippingInfo,
      },
    });
  };

  useEffect(() => {
    if (cart.checkout.status === 'ADDRESS_INFO') {
      setShowShippingMethodLoader(true);
      onSubmitAddressInformation({
        data: {
          method: 'FREE',
        },
      });
    }
  }, [cart]);

  return (
    <div className="gap-4 mt-4  max-w-sm md:max-w-lg">
      <div className="border-2 rounded-lg p-4">
        <h1>Shipping Method Information</h1>
        <div className="free-shipping font-semibold">Shipping Free</div>

        <div>
          <form>
            <input type="radio" name="method" value="free" defaultChecked={true} /> FREE
            <div className="text-center mt-6 mb-6">{showShippingMethodLoader ? 'loading' : ''}</div>
          </form>
        </div>
      </div>
    </div>
  );
};
