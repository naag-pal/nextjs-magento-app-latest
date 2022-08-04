import { ActionMap, ProductType, CheckoutType, Types } from './ShoppingTypes';

// ProductPaylaod
type ProductPayload = {
  [Types.ADD_TO_CART]: {
    uid: string;
    sku: string;
    name: string;
    url_key: string;
    image: string;
    price: number;
    quantity: number;
  };
  [Types.REMOVE_FROM_CART]: {
    uid: string;
  };
  [Types.DECREMENT_QUANTITY]: {
    uid: string;
  };
  [Types.UPDATE_TO_CART]: {
    uid: string;
    sku: string;
    name: string;
    url_key: string;
    image: string;
    price: number;
    quantity: number;
  };
  [Types.CLEAR_CART]: string;
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];
const initialState = {
  products: [],
  cartId: '',
  wishlistId: '',
};

export const productReducer = (
  state: ProductType[],
  action: CheckoutActions | ProductActions | ShoppingCartActions | WishlistActions
) => {
  switch (action.type) {
    case Types.UPDATE_TO_CART:
      return [...state, { ...action.payload }];
    case Types.ADD_TO_CART:
      return state.find((product) => product.uid === action.payload.uid)
        ? state.map((product) =>
            product.uid === action.payload.uid
              ? {
                  ...product,
                  quantity: action.payload.quantity,
                }
              : product
          )
        : [...state, { ...action.payload, quantity: 1 }];
    case Types.DECREMENT_QUANTITY:
      return state.find((product) => product.uid === action.payload.uid)?.quantity === 1
        ? [...state.filter((product) => product.uid !== action.payload.uid)]
        : state.map((product) =>
            product.uid === action.payload.uid
              ? {
                  ...product,
                  quantity: product.quantity - 1,
                }
              : product
          );
    case Types.REMOVE_FROM_CART:
      return [...state.filter((product) => product.uid !== action.payload.uid)];
    case Types.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

// ShoppingCart
type ShoppingCartPayload = {
  [Types.UPDATE_CART_ID]: string;
};

export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: string,
  action: CheckoutActions | ProductActions | ShoppingCartActions | WishlistActions
) => {
  switch (action.type) {
    case Types.UPDATE_CART_ID:
      console.log(state);
      return action.payload;
    default:
      return state;
  }
};

// WishlistPayload
type WishlistPayload = {
  [Types.UPDATE_WISHLIST_ID]: string;
};

export type WishlistActions = ActionMap<WishlistPayload>[keyof ActionMap<WishlistPayload>];

export const wishlistReducer = (
  state: string,
  action: CheckoutActions | ProductActions | ShoppingCartActions | WishlistActions
) => {
  switch (action.type) {
    case Types.UPDATE_WISHLIST_ID:
      return action.payload;
    default:
      return state;
  }
};

// CheckoutPayload
type CheckoutPayload = {
  [Types.UPDATE_CHECKOUT_STATUS]: string;
  [Types.UPDATE_ADDRESS_ID]: string;
};

export type CheckoutActions = ActionMap<CheckoutPayload>[keyof ActionMap<CheckoutPayload>];

export const checkoutReducer = (
  state: CheckoutType,
  action: CheckoutActions | ProductActions | ShoppingCartActions | WishlistActions
) => {
  switch (action.type) {
    case Types.UPDATE_CHECKOUT_STATUS:
      return { ...state, status: action.payload };
    case Types.UPDATE_ADDRESS_ID:
      return { ...state, addressId: action.payload };
    default:
      return state;
  }
};
