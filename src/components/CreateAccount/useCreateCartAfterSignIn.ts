import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateCartAfterSignInDocument,
  MiniCartQueryDocument,
  MiniCartQueryQuery,
  MiniCartQueryQueryVariables,
  MergeCartsAfterSignInDocument,
  GetWishlistItemsForLocalFieldDocument,
  GetWishlistItemsForLocalFieldQuery,
  GetWishlistItemsForLocalFieldQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';

export const useCreateCartAfterSignIn = () => {
  const { state: cart, dispatch } = useContext(ShoppingAppContext);
  const [cartId, setCartId] = useState(cart.cartId);

  const { data: wishlistData, refetch: refetchhWishList } = useQuery<
    GetWishlistItemsForLocalFieldQuery,
    GetWishlistItemsForLocalFieldQueryVariables
  >(GetWishlistItemsForLocalFieldDocument, {
    variables: { currentPage: 1 },
  });

  const [createCartAfterSignInMutation] = useMutation(CreateCartAfterSignInDocument, {
    onCompleted: (data) => {
      const currentCartId = data.cartId;
      if (cart.cartId !== currentCartId) {
        mergeCartsAfterSignInMutation({
          variables: {
            sourceCartId: cart.cartId,
            destinationCartId: currentCartId,
          },
        });
      }
    },
  });

  const [mergeCartsAfterSignInMutation] = useMutation(MergeCartsAfterSignInDocument, {
    onCompleted: (data) => {
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: data.mergeCarts.id,
      });
      setCartId(data.mergeCarts.id);
      refetchhWishList();
    },
  });

  const createCartAfterSignInMutationCall = () => {
    createCartAfterSignInMutation();
  };

  const { data: cartItems } = useQuery<MiniCartQueryQuery, MiniCartQueryQueryVariables>(MiniCartQueryDocument, {
    variables: { cartId: cartId },
  });

  useEffect(() => {
    if (wishlistData && wishlistData.customer) {
      dispatch({
        type: Types.UPDATE_WISHLIST_ID,
        payload: wishlistData.customer.wishlists[0].id,
      });
    }
  }, [wishlistData]);

  useEffect(() => {
    if (cartItems && cartItems.cart && cartItems.cart.items.length > 0) {
      dispatch({
        type: Types.CLEAR_CART,
        payload: cartId,
      });
      cartItems.cart.items.map((item) => {
        dispatch({
          type: Types.UPDATE_TO_CART,
          payload: {
            uid: item.product.uid,
            sku: item.product.name,
            name: item.product.sku,
            url_key: item.product.url_key,
            image: item.product.thumbnail.url,
            price: item.prices.price.value,
            quantity: item.quantity,
          },
        });
      });
    }
  }, [cartItems]);

  return {
    createCartAfterSignInMutationCall,
  };
};
