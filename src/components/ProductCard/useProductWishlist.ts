import { useContext, useState } from 'react';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';
import { AddProductToWishlistFromGalleryDocument } from '@magentopwa/__generated__/apolloComponents';
import { useMutation } from '@apollo/client';

export const useProductWishlist = () => {
  const { dispatch } = useContext(ShoppingAppContext);

  const onSuccessOfAddProductToWishlist = (data) => {
    console.log(data);
  };

  const [addProductToWishlistFromGalleryMutation] = useMutation(AddProductToWishlistFromGalleryDocument, {
    onCompleted: (data) => {
      onSuccessOfAddProductToWishlist(data);
    },
  });

  const addProductToWishlist = (state, product) => {
    if (state.wishlistId !== '') {
      addProductToWishlistFromGalleryMutation({
        variables: {
          wishlistId: state.wishlistId,
          itemOptions: {
            sku: product.sku,
            quantity: 1,
          },
        },
      });
    }
  };

  return {
    addProductToWishlist,
  };
};
