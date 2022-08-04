import React, { ReactElement, useContext } from 'react';
import { useQuery } from '@apollo/client';
import Image from '@magentopwa/components/UI/Image';
import {
  GetProductDetailsByUrlKeyDocument,
  GetProductDetailsByUrlKeyQuery,
  GetProductDetailsByUrlKeyQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { Button } from '@magentopwa/components/UI';
import { useRouter } from 'next/router';
import Layout from '@magentopwa/components/Layout';
import ProductSlider from '@magentopwa/components/ProductSlider';
import Link from 'next/link';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import { Breadcrumbs } from '@magentopwa/components/Breadcrumbs';
import { useProductCart } from '@magentopwa/components/ProductCard/useProductCart';
import { useProductWishlist } from '@magentopwa/components/ProductCard/useProductWishlist';

const ProductDetailPage = () => {
  const { state } = useContext(ShoppingAppContext);
  const router = useRouter();
  const { url_key } = router.query;

  const url_key_local: string = url_key[0];
  console.log(url_key_local);

  const {
    data: productData,
    error,
    loading,
  } = useQuery<GetProductDetailsByUrlKeyQuery, GetProductDetailsByUrlKeyQueryVariables>(
    GetProductDetailsByUrlKeyDocument,
    {
      variables: { urlKey: url_key_local },
    }
  );
  console.log('productData', productData);
  console.log('error', error);
  console.log('loading', loading);

  const product = productData?.products.items[0];

  const useProductCartProps = useProductCart();
  const useProductWishlistProps = useProductWishlist();

  const { addProductToCart, removeProductFromCart } = useProductCartProps;
  const { addProductToWishlist } = useProductWishlistProps;

  const links = product ? [{ name: product.name, link: product.url_key }] : [{ name: '', link: '' }];

  if (error) return <></>;
  if (loading) return <></>;
  return (
    <div data-testId="ProductDetailSection">
      {productData && productData.products?.items.length > 0 && product ? (
        <>
          <div className="content-body">
            <Breadcrumbs links={links} category_id={product.categories[0].uid} />
            <h1 className="h1 text-center lg:text-left mt-6 mb-6 font-semibold">Product Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <div className="mx-2">
                <div className="bg-th-primary-dark font-semibold md:hidden">{product.name}</div>
                <div className="mt-2 md:hidden mb-6 ">
                  Price: Rs. {product && product.price_range.maximum_price?.final_price?.value}
                </div>
                <div className="text-center" style={{ border: '1px solid gray', margin: '20px 0' }}>
                  <ProductSlider>
                    {product &&
                      product.media_gallery.map((image) => (
                        <div key={image.url} className="keen-slider__slide">
                          <Image className="" src={image.url} alt="" width={'1050'} height={'1050'} />
                        </div>
                      ))}
                  </ProductSlider>
                </div>
              </div>
              <div className="mx-6 mt-6">
                <div className="text-th-primary-dark font-semibold md:block hidden">{product.name}</div>
                <div className="mt-12 md:block hidden">
                  Price: Rs. {product && product.price_range.maximum_price?.final_price?.value}
                </div>
                <div className="mt-6">
                  <div className="text-center inline">
                    {state.products.filter((item) => item['uid'] === product.uid).length > 0 ? (
                      <>
                        <div className="flex flex-row w-20 rounded-sm px-2 relative outline">
                          <button
                            onClick={() => removeProductFromCart(state, product)}
                            data-action="decrement"
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full wrounded-l cursor-pointer outline-none"
                          >
                            <span className="m-auto text-2xl font-semibold">−</span>
                          </button>
                          <button className="text-center px-2 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">
                            {state.products.filter((item) => item['uid'] === product.uid)[0].quantity}
                          </button>
                          <button
                            onClick={() => addProductToCart(state, product)}
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          >
                            <span className="m-auto text-2xl font-semibold">+</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          data-testid="AddToCartButton"
                          variant="filled"
                          onClick={() => addProductToCart(state, product)}
                        >
                          Add To Cart
                        </Button>
                      </>
                    )}

                    <div className="mt-8 mb-8">
                      <div className="underline cursor-pointer" onClick={() => addProductToWishlist(state, product)}>
                        Add To Wishlist
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.short_description.html,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <div className="mb-4 text-red-500">Sorry, the requested page not found.</div>
            <Link href="/" className="mt-4 text-blue-500">
              Go back to products
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
