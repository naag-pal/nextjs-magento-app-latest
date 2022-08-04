import { useContext, useState } from 'react';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';
import { AddProductToCartDocument } from '@magentopwa/__generated__/apolloComponents';
import { useMutation } from '@apollo/client';

export const useProductCart = () => {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const { dispatch } = useContext(ShoppingAppContext);

  const onSuccessOfAddProductToCart = (data) => {
    console.log(data);
  };

  const [addProductToCartMutation] = useMutation(AddProductToCartDocument, {
    onCompleted: (data) => {
      onSuccessOfAddProductToCart(data);
    },
  });

  const addProductToCart = (state, product) => {
    const productQuantity =
      state.products.filter((item) => item['uid'] === product.uid).length > 0
        ? state.products.filter((item) => item['uid'] === product.uid)[0].quantity + 1
        : 1;
    dispatch({
      type: Types.ADD_TO_CART,
      payload: {
        uid: product.uid,
        sku: product.sku,
        name: product.name,
        url_key: product.url_key,
        image: product.small_image.url,
        price: product.price_range.maximum_price.final_price.value,
        quantity: productQuantity,
      },
    });

    addProductToCartMutation({
      variables: {
        cartId: state.cartId,
        product: {
          quantity: 1,
          sku: product.sku,
        },
      },
    });
  };

  const removeProductFromCart = (state, product) => {
    const productQuantity =
      state.products.filter((item) => item['uid'] === product.uid).length > 0
        ? state.products.filter((item) => item['uid'] === product.uid)[0].quantity - 1
        : 0;
    dispatch({
      type: Types.DECREMENT_QUANTITY,
      payload: {
        uid: product.uid,
      },
    });
    addProductToCartMutation({
      variables: {
        cartId: state.cartId,
        product: {
          quantity: productQuantity,
          sku: product.sku,
        },
      },
    });
  };

  return {
    showAddToCart,
    setShowAddToCart,
    addProductToCart,
    removeProductFromCart,
  };
};
