import React from 'react';
import { act, fireEvent, render, screen } from '../../src/utils/testUtils';
import CheckoutPage from '../../pages/checkout';
import { GetCartDetailsAfterCheckoutDocument } from '../../src/__generated__/apolloComponents';

const mocks = [
  {
    request: {
      query: GetCartDetailsAfterCheckoutDocument,
      variables: { cartId: 'YqBxX9X6HaEoDz4QjmxQFDlQVpJBg4Q9' },
    },
    result: {
      data: {
        cart: {
          id: 'YqBxX9X6HaEoDz4QjmxQFDlQVpJBg4Q9',
          items: [
            {
              uid: 'Mzg0',
              prices: {
                price: {
                  value: 500,
                  __typename: 'Money',
                },
                __typename: 'CartItemPrices',
              },
              product: {
                uid: 'MjA=',
                name: 'Nimeasy Natural Disinfectant & Power Cleaner Spray 850 ml',
                sku: 'Nimeasy Natural Disinfectant & Power Cleaner Spray 850 ml-1-1',
                small_image: {
                  url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/n/i/nimeasy-1_1_1.jpg',
                  label: 'Nimeasy Natural Disinfectant & Power Cleaner Spray 850 ml',
                  __typename: 'ProductImage',
                },
                price: {
                  regularPrice: {
                    amount: {
                      value: 500,
                      __typename: 'Money',
                    },
                    __typename: 'Price',
                  },
                  __typename: 'ProductPrices',
                },
                __typename: 'SimpleProduct',
              },
              quantity: 1,
              __typename: 'SimpleCartItem',
            },
          ],
          prices: {
            grand_total: {
              value: 500,
              currency: 'INR',
              __typename: 'Money',
            },
            __typename: 'CartPrices',
          },
          __typename: 'Cart',
        },
      },
    },
  },
];

describe('CheckoutPage information ', () => {
  it('should render without errors', async () => {
    await act(() => {
      render(<CheckoutPage />, { mocks });
    });
    // about-us
    expect(screen.getByTestId('CheckoutPage')).toBeInTheDocument();
  });
});

/*
describe('Home page layout', () => {
  it('should render without errors', async () => {
    render(
      <MockedProvider>
        <About />
      </MockedProvider>
    );
    // header
    expect(screen.getByTestId('heading')).toBeInTheDocument();
  });
});
*/
