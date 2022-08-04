import React from 'react';

import { render, screen, cleanup, fireEvent, waitFor } from '../../../utils/testUtils';
import { SearchForm } from '..';
import { GetAutocompleteResultsDocument } from '../../../__generated__/apolloComponents';
import { act } from 'react-dom/test-utils';
import { ApolloError } from '@apollo/client';

//jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
//jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));

const mocks = [
  {
    request: {
      query: GetAutocompleteResultsDocument,
      variables: { inputText: 'atta' },
    },
    result: {
      data: {
        products: {
          aggregations: [
            {
              label: 'Price',
              count: 2,
              attribute_code: 'price',
              options: [
                {
                  label: '0-1000',
                  value: '0_1000',
                  __typename: 'AggregationOption',
                },
                {
                  label: '1000-2000',
                  value: '1000_2000',
                  __typename: 'AggregationOption',
                },
              ],
              position: null,
              __typename: 'Aggregation',
            },
            {
              label: 'Category',
              count: 4,
              attribute_code: 'category_id',
              options: [
                {
                  label: 'Foods',
                  value: '3',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Staples',
                  value: '4',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Aata',
                  value: '5',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'New Launch',
                  value: '16',
                  __typename: 'AggregationOption',
                },
              ],
              position: null,
              __typename: 'Aggregation',
            },
          ],
          items: [
            {
              id: 15,
              uid: 'MTU=',
              name: 'Aashirvaad Superior MP Atta 25 Kg',
              sku: 'Aashirvaad Superior MP Atta 25 Kg-1',
              small_image: {
                url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
                __typename: 'ProductImage',
              },
              url_key: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
              url_suffix: '',
              price: {
                regularPrice: {
                  amount: {
                    value: 1295,
                    currency: 'INR',
                    __typename: 'Money',
                  },
                  __typename: 'Price',
                },
                __typename: 'ProductPrices',
              },
              price_range: {
                maximum_price: {
                  final_price: {
                    currency: 'INR',
                    value: 1295,
                    __typename: 'Money',
                  },
                  __typename: 'ProductPrice',
                },
                __typename: 'PriceRange',
              },
              __typename: 'SimpleProduct',
            },
            {
              id: 1,
              uid: 'MQ==',
              name: 'Aashirvaad Superior MP Atta 5 Kg, Free Hunar Online Course',
              sku: 'Aashirvaad Superior MP Atta 5 Kg, Free Hunar Online Course',
              small_image: {
                url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/s/e/select-sharbari-aata-1.jpg',
                __typename: 'ProductImage',
              },
              url_key: 'aashirvaad-superior-mp-atta-5-kg-free-hunar-online-course',
              url_suffix: '',
              price: {
                regularPrice: {
                  amount: {
                    value: 265,
                    currency: 'INR',
                    __typename: 'Money',
                  },
                  __typename: 'Price',
                },
                __typename: 'ProductPrices',
              },
              price_range: {
                maximum_price: {
                  final_price: {
                    currency: 'INR',
                    value: 265,
                    __typename: 'Money',
                  },
                  __typename: 'ProductPrice',
                },
                __typename: 'PriceRange',
              },
              __typename: 'SimpleProduct',
            },
            {
              id: 5,
              uid: 'NQ==',
              name: 'Aashirvaad Superior MP Atta 5 Kg, Free Hunar Online Course',
              sku: 'Aashirvaad Superior MP Atta 5 Kg, Free Hunar Online Course-1',
              small_image: {
                url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/s/e/select-sharbari-aata-1_1.jpg',
                __typename: 'ProductImage',
              },
              url_key: 'aashirvaad-superior-mp-atta-5-kg-free-hunar-online-course-1',
              url_suffix: '',
              price: {
                regularPrice: {
                  amount: {
                    value: 265,
                    currency: 'INR',
                    __typename: 'Money',
                  },
                  __typename: 'Price',
                },
                __typename: 'ProductPrices',
              },
              price_range: {
                maximum_price: {
                  final_price: {
                    currency: 'INR',
                    value: 265,
                    __typename: 'Money',
                  },
                  __typename: 'ProductPrice',
                },
                __typename: 'PriceRange',
              },
              __typename: 'SimpleProduct',
            },
          ],
          page_info: {
            total_pages: 2,
            __typename: 'SearchResultPageInfo',
          },
          total_count: 4,
          __typename: 'Products',
        },
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: GetAutocompleteResultsDocument,
      variables: {},
    },
    errors: [
      {
        message: "The current customer isn't authorized.",
        path: ['customer'],
        extensions: {
          category: 'graphql-authorization',
        },
      },
    ],
  },
];

describe('Search Form section ', () => {
  it('should render Search', async () => {
    await act(() => {
      render(<SearchForm />, { mocks });
    });
    expect(await screen.findByTestId('SearchForm')).toBeInTheDocument();
  });
  it('should render Search field', async () => {
    await act(() => {
      render(<SearchForm />, { mocks });
    });
    expect(await screen.findByTestId('searchField')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByTestId('searchField'), { target: { value: 'foods' } });
    });
  });
});
