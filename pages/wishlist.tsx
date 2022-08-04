import React, { ReactElement } from 'react';
import Layout from '@magentopwa/components/Layout';
import { NestedMetaData } from '../src/components/Layout/nestedMetaData';
import { useQuery } from '@apollo/client';
import {
  GetWishlistItemsForLocalFieldDocument,
  GetWishlistItemsForLocalFieldQuery,
  GetWishlistItemsForLocalFieldQueryVariables,
} from '../src/__generated__/apolloComponents';
import Link from 'next/link';

import Image from '@magentopwa/components/UI/Image';
const MyWishlist = () => {
  const { data, error, loading } = useQuery<
    GetWishlistItemsForLocalFieldQuery,
    GetWishlistItemsForLocalFieldQueryVariables
  >(GetWishlistItemsForLocalFieldDocument, {
    variables: {
      currentPage: 1,
    },
  });

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <div className="container" data-testid="MyWishList">
      <h1 className="text-lg  mt-4 mb-4">My Wishlist</h1>
      {data &&
        data.customer?.wishlists.map((wishlist) => {
          return (
            <div className="mb-2" key={wishlist.id}>
              <div className="mx-3">
                {wishlist &&
                  wishlist?.items_v2 &&
                  wishlist?.items_v2?.items.length > 0 &&
                  wishlist?.items_v2?.items.map((item) => {
                    return (
                      <div className=" w-4/6 grid grid-cols-6 border-b-2 border-dashed pb-6 mt-6" key={item.id}>
                        <div className="">
                          <Link href={`/${item?.product?.url_key}`} className="cursor-pointer">
                            {item.product && (
                              <Image src={item.product.small_image.url} alt="" width="100" height="100" />
                            )}
                          </Link>
                        </div>
                        <div className="">Rs. {item && item?.product?.price_range.minimum_price.final_price.value}</div>
                        <div className="col-span-4">
                          <Link href={`/${item?.product?.url_key}`} className="cursor-pointer">
                            {item && item?.product?.sku}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

MyWishlist.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: 'MyWishlist',
    description: 'MyWishlist',
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};
export default MyWishlist;
