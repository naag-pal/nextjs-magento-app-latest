import { useMutation } from '@apollo/client';
import { CreateCartDocument } from '@magentopwa/__generated__/apolloComponents';
import React, { createContext, useReducer, Dispatch, ReactNode, useEffect, useState } from 'react';
import {
  productReducer,
  shoppingCartReducer,
  wishlistReducer,
  checkoutReducer,
  ProductActions,
  WishlistActions,
  ShoppingCartActions,
  CheckoutActions,
} from './ShoppingReducers';

import { ProductType, CheckoutType, InitialStateType, Types } from './ShoppingTypes';

const initialState = {
  products: [],
  cartId: '',
  wishlistId: '',
  checkout: {
    status: '',
    addressId: '',
  },
};

const ShoppingAppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions | ShoppingCartActions | WishlistActions | CheckoutActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { products, cartId, wishlistId, checkout }: InitialStateType,
  action: ProductActions | ShoppingCartActions | WishlistActions | CheckoutActions
) => ({
  products: productReducer(products, action),
  cartId: shoppingCartReducer(cartId, action),
  wishlistId: wishlistReducer(wishlistId, action),
  checkout: checkoutReducer(checkout, action),
});

type Props = {
  children: ReactNode;
};

const ShoppingAppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [initialized, setInitialized] = useState(false);

  const [createCartMutation] = useMutation(CreateCartDocument, {
    onCompleted: (data) => {
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: data.cartId,
      });
    },
  });

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    //const cart = JSON.parse(localStorage.getItem('cart') as string);

    const nextjsShop = JSON.parse(localStorage.getItem('nextjs-shop') as string) || {};
    const cart = nextjsShop && nextjsShop.cart;

    if (cart && cart.cartId !== '') {
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: cart.cartId,
      });
    } else {
      createCartMutation();
    }

    if (cart && cart.checkut && cart.checkout.status !== '') {
      dispatch({
        type: Types.UPDATE_CHECKOUT_STATUS,
        payload: cart.checkout.satus,
      });
    } else {
      dispatch({
        type: Types.UPDATE_CHECKOUT_STATUS,
        payload: 'DEFAULT',
      });
    }
    if (cart && cart.products && cart.products.length > 0) {
      cart.products.map((product: ProductType) =>
        dispatch({
          type: Types.UPDATE_TO_CART,
          payload: {
            uid: product.uid,
            sku: product.sku,
            name: product.name,
            url_key: product.url_key,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
          },
        })
      );
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    const nextjsShop = JSON.parse(localStorage.getItem('nextjs-shop') as string) || {};
    nextjsShop.cart = state;
    localStorage.setItem('nextjs-shop', JSON.stringify(nextjsShop));
  }, [state]);

  return <ShoppingAppContext.Provider value={{ state, dispatch }}>{children}</ShoppingAppContext.Provider>;
};
export { ShoppingAppProvider, ShoppingAppContext };
