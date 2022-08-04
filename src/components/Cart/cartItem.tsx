import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';
import { useProductCart } from '@magentopwa/components/ProductCard/useProductCart';
import { useProductWishlist } from '@magentopwa/components/ProductCard/useProductWishlist';

const CartItem = (props) => {
  const { state } = useContext(ShoppingAppContext);

  const product = props.product;

  const useProductCartProps = useProductCart();
  const useProductWishlistProps = useProductWishlist();

  const { addProductToCart, removeProductFromCart } = useProductCartProps;
  const { addProductToWishlist } = useProductWishlistProps;

  return (
    <div className="cart-item grid grid-cols-3 mb-4" key={product.id}>
      <div className="text-center mx-1 px-2 pb-4 pt-2">
        <img src={product.image} width="60" height="60" alt="" />
      </div>
      <div className="mx-1 px-2 pb-4 col-span-2">
        <div className="text-base font-semibold">
          <Link href={`/${product.url_key}`}>{product.name}</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="text-center pt-2 md:pt-4">
            <div className="grid grid-cols-3 border-2 rounded">
              <button
                onClick={() => removeProductFromCart(state, product)}
                data-action="decrement"
                className=" text-gray-600 hover:text-gray-700 h-full wrounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-xl font-semibold">−</span>
              </button>
              <div className="text-center pt-1 font-semibold text-base hover:text-black focus:text-black  md:text-basecursor-default items-center text-gray-700  outline-none">
                {product.quantity}
              </div>
              <button
                onClick={() => addProductToCart(state, product)}
                data-action="increment"
                className=" text-gray-600 hover:text-gray-700 h-full rounded-r cursor-pointer"
              >
                <span className="m-auto text-xl font-semibold">+</span>
              </button>
            </div>
          </div>
          <div className="mt-4 col-span-3">
            <div className="text-center p-1 mx-2 text-base">
              <span className="font-semibold m-3">X</span> Rs. {product.price} = Rs. {product.quantity * product.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
