import React from 'react';
import { Button } from '@magentopwa/components/UI';
import Layout from '../src/components/Layout';
import { ReactElement, useContext } from 'react';
import Link from 'next/link';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import CartItem from '../src/components/Cart/cartItem';

const CartPage = () => {
  const { state } = useContext(ShoppingAppContext);

  if (state.products.length === 0) {
    return (
      <div className="content-body" data-testid="cart-error-page">
        <h1 className="h1">Cart</h1>
        <div className="content-body text-red-500">Your Cart is empty!</div>
      </div>
    );
  }

  const totalQuantityPrice = (product) => {
    let totalPrice = 0;
    for (const obj of product) {
      totalPrice += ((obj.quantity as number) * obj.price) as number;
    }
    return totalPrice;
  };

  return (
    <div className="content-body" data-testid="cart-page">
      <h1 className="h1 mb-6">Cart</h1>
      <div className="grid md:grid-cols-2 gap-4 border-indigo-600">
        <div>
          {state.products.map((product) => {
            return <CartItem product={product} key={product.uid} />;
          })}
        </div>
        <div className="mx-12 gap-4 pt-4">
          <ul className="max-w-full">
            <li className="priceSummary-lineItems-2Sy gap-3 grid grid-cols-2">
              <span className="my-2">Subtotal </span>
              <span className="my-2 font-semibold">Rs.{totalQuantityPrice(state.products)}</span>
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
              <span className="my-2 font-semibold">Rs.{totalQuantityPrice(state.products)}</span>
            </li>
          </ul>
          <div className="m-8">
            <Link href="/checkout">
              <Button variant="filled">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
