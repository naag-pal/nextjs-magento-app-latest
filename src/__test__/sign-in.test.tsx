import React from 'react';
import { act, fireEvent, render, screen } from '../../src/utils/testUtils';
import LoginPage from '../../pages/sign-in';
import { GetWishlistItemsForLocalFieldDocument } from '../../src/__generated__/apolloComponents';

const mocks = [
  {
    request: {
      query: GetWishlistItemsForLocalFieldDocument,
      variables: { currentPage: 1 },
    },
    result: {
      data: {
        customer: {
          wishlists: [
            {
              id: '24',
              items_v2: {
                items: [
                  {
                    id: '11',
                    product: {
                      uid: 'MTU=',
                      sku: 'Aashirvaad Superior MP Atta 25 Kg-1',
                      small_image: {
                        url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
                        __typename: 'ProductImage',
                      },
                      name: 'Aashirvaad Superior MP Atta 25 Kg',
                      url_key: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
                      price_range: {
                        minimum_price: {
                          final_price: {
                            value: 1295,
                            __typename: 'Money',
                          },
                          __typename: 'ProductPrice',
                        },
                        __typename: 'PriceRange',
                      },
                      __typename: 'SimpleProduct',
                    },
                    __typename: 'SimpleWishlistItem',
                  },
                ],
                page_info: {
                  current_page: 1,
                  total_pages: 1,
                  __typename: 'SearchResultPageInfo',
                },
                __typename: 'WishlistItems',
              },
              __typename: 'Wishlist',
            },
          ],
          __typename: 'Customer',
        },
      },
    },
  },
];

describe('Login in page ', () => {
  it('should render without errors', async () => {
    await act(async () => {
      render(<LoginPage />, { mocks });
    });
    //expect(await screen.findByTestId('sortingOption')).toBeInTheDocument();
    // order history
    expect(await screen.findByTestId('LoginPage')).toBeInTheDocument();
  });
});
