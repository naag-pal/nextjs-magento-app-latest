import React, { useContext, useState } from 'react';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import CartItem from '@magentopwa/components/Cart/cartItem';

export const CheckoutCartInformation = () => {
  const { state } = useContext(ShoppingAppContext);
  const [showCart, setShowCart] = useState(false);

  if (state.products.length === 0) {
    return (
      <div className="gap-4 mt-4  max-w-sm md:max-w-lg">
        <div className="border-2 rounded-lg p-4">
          <h1>Cart Information </h1>
          <div className="content-body text-red-500">Your Cart is empty!</div>
        </div>
      </div>
    );
  }
  return (
    <div className="gap-4 mt-4 max-w-sm md:max-w-lg">
      <div className="border-2 rounded-lg p-4">
        <h1 onClick={() => setShowCart(!showCart)} className="cursor-pointer mt-6 mb-6">
          Cart Information{' '}
          {showCart ? <span className="float-right text-lg">-</span> : <span className="float-right text-lg">+</span>}
        </h1>
        <div className={showCart ? 'show' : 'hidden'}>
          {state.products.map((product: any) => {
            return <CartItem product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
