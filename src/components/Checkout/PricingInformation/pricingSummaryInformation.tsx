import React, { useContext } from 'react';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import {
  GetPriceSummaryDocument,
  GetPriceSummaryQuery,
  GetPriceSummaryQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { useQuery } from '@apollo/client';

export const PricingInformation = () => {
  const { state: cart } = useContext(ShoppingAppContext);

  const { data: pricingInfo } = useQuery<GetPriceSummaryQuery, GetPriceSummaryQueryVariables>(GetPriceSummaryDocument, {
    variables: {
      cartId: cart.cartId,
    },
  });

  return (
    <div className="gap-4 max-w-sm md:max-w-lg">
      <div className="border-2 rounded-lg p-4">
        <h1>Pricing Information</h1>
        <ul className="max-w-full">
          <li className="priceSummary-lineItems-2Sy gap-3 grid grid-cols-2">
            <span className="my-2">Subtotal </span>
            <span className="my-2 font-semibold">Rs. {pricingInfo?.cart?.prices?.subtotal_including_tax.value}</span>
          </li>
          <li className="discountSummary-discountLineItems priceSummary-lineItems-2Sy gap-3 grid grid-cols-2">
            <span className="my-2">Applied discounts </span>
            <span className="my-2 font-semibold">Rs. 0</span>
          </li>
          <li className="priceSummary-lineItems-2Sy gap-3 grid grid-cols-2">
            <span className="my-2"> Estimated Shipping </span>
            <span className="my-2 font-semibold"> Free </span>
          </li>
          <li className="priceSummary-lineItems-2Sy gap-3 grid grid-cols-2">
            <span className="my-2"> Estimated Total </span>
            <span className="my-2 font-semibold">Rs. {pricingInfo?.cart?.prices?.grand_total.value}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
