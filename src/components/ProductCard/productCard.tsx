import React from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import { BundleProduct } from '@magentopwa/__generated__/apolloComponents';
import { FavoriteIcon } from '../Icons';
import Image from '@magentopwa/components/UI/Image';
import { Button } from '@magentopwa/components/UI';
import { useProductCart } from './useProductCart';
import { useProductWishlist } from './useProductWishlist';

export type ProductProps = {
  product: BundleProduct;
};

const ProductCard = (props) => {
  const { state } = useContext(ShoppingAppContext);
  const product = props.product;
  const useProductCartProps = useProductCart();
  const useProductWishlistProps = useProductWishlist();

  const { showAddToCart, setShowAddToCart, addProductToCart, removeProductFromCart } = useProductCartProps;

  const { addProductToWishlist } = useProductWishlistProps;

  return (
    <div
      className={`mx-2 border-dotted border-2 bg-th-card-color-1 border-th-primary-dark p-6 ${
        showAddToCart && ' bg-th-card-color-2'
      }`}
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      <Link href={`/${product.url_key}`}>
        <div className="product-link cursor-pointer">
          <div key={product.uid} className="text-th-primary-dark font-semibold product-title">
            {product.name}
          </div>
          <div className="text-center m-3">
            <Image
              src={(product.image && product.image.url) || (product.small_image && product.small_image.url)}
              width="200px"
              height="200px"
              alt={product.name}
            />
          </div>
        </div>
      </Link>
      <div className="mt-4 h-12 w-full">
        <div className="text-center float-left font-semibold inline">
          <span
            onClick={() => addProductToWishlist(state, product)}
            className="mx-2 mr-4 inline-block w-[20] h-[20] pt-1 cursor-pointer favIcon"
          >
            <FavoriteIcon />
          </span>
          <span className="mx-2 mt-2 text-lg text-th-accent-dark mr-4 inline-block">
            Rs. {product.price_range.maximum_price?.regular_price?.value}
          </span>
        </div>
        <div className="text-center float-right inline">
          {state.products.filter((item) => item['uid'] === product.uid).length > 0 ? (
            <>
              <div className="flex flex-row w-20 rounded-sm px-2 relative outline">
                <button
                  onClick={() => removeProductFromCart(state, product)}
                  data-action="decrement"
                  className=" text-gray-600 h-full wrounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-semibold">−</span>
                </button>
                <button className="text-center px-2font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700  outline-none">
                  {state.products.filter((item) => item['uid'] === product.uid)[0].quantity}
                </button>
                <button
                  onClick={() => addProductToCart(state, product)}
                  data-action="increment"
                  className=" text-gray-600  h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-semibold">+</span>
                </button>
              </div>
              <div className="mt-1 mb-1">
                <Link href="/checkout">
                  <Button variant="secondary" size="sm">
                    Buy now
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {showAddToCart && (
                <Button variant="primary" onClick={() => addProductToCart(state, product)}>
                  Add To Cart
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
