

import { ReactElement, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
    AddProductToCartDocument,
    AddProductToWishlistFromGalleryDocument,
    GetProductDetailsByUrlKeyDocument,
    GetProductDetailsByUrlKeyQuery,
    GetProductDetailsByUrlKeyQueryVariables,
  } from '@magentopwa/__generated__/apolloComponents';

export default function useAddPRoductToWishList (props) {

  const { state, product, onSuccessOfAddProductToWishlist } = props;
  
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

  return addProductToWishlist(state, product);
}

