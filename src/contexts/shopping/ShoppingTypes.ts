export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  DECREMENT_QUANTITY = 'DECREMENT_QUANTITY',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_TO_CART = 'UPDATE_TO_CART',
  CLEAR_CART = 'CLEAR_CART',
  UPDATE_CART_ID = 'UPDATE_CART_ID',
  UPDATE_CART_INFO = 'UPDATE_CART_INFO',
  UPDATE_WISHLIST_ID = 'UPDATE_WISHLIST_ID',
  UPDATE_CHECKOUT_STATUS = 'UPDATE_CHECKOUT_STATUS',
  UPDATE_ADDRESS_ID = 'UPDATE_ADDRESS_ID',
}

// Product
export type ProductType = {
  uid: string;
  sku: string;
  name: string;
  url_key: string;
  image: string;
  price: number;
  quantity: number;
};

export type CheckoutType = {
  status: string;
  addressId: string;
};

export type InitialStateType = {
  products: ProductType[];
  cartId: string;
  wishlistId: string;
  checkout: CheckoutType;
};
