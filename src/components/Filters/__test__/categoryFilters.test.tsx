import { act, fireEvent, render, screen } from '../../../utils/testUtils';
import { CategoryFilters } from '../categoryFilters';
import { CreateCartDocument, GetProductFiltersByCategoryDocument } from '../../../__generated__/apolloComponents';
import React from 'react';

const mocks = [
  {
    request: {
      query: GetProductFiltersByCategoryDocument,
      variables: { categoryIdFilter: { eq: 'Mw==' } },
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
              count: 6,
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
                  label: 'New Launch',
                  value: '16',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Snacks',
                  value: '8',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Aata',
                  value: '5',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Spices',
                  value: '6',
                  __typename: 'AggregationOption',
                },
              ],
              position: null,
              __typename: 'Aggregation',
            },
          ],
          __typename: 'Products',
        },
      },
    },
  },
  {
    request: {
      query: CreateCartDocument,
      variables: {},
    },
    result: {
      data: {
        cartId: '0MKXb8hKWPY5IobuUwdBGQqbqu2CKMQl',
      },
    },
  },
];

const mockError = [
  {
    request: {
      query: GetProductFiltersByCategoryDocument,
      variables: { categoryIdFilter: { eq: 'Mw==' } },
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
              count: 6,
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
                  label: 'New Launch',
                  value: '16',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Snacks',
                  value: '8',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Aata',
                  value: '5',
                  __typename: 'AggregationOption',
                },
                {
                  label: 'Spices',
                  value: '6',
                  __typename: 'AggregationOption',
                },
              ],
              position: null,
              __typename: 'Aggregation',
            },
          ],
          __typename: 'Products',
        },
      },
    },
  },
  {
    request: {
      query: CreateCartDocument,
      variables: {},
    },
    result: {
      data: {
        cartId: '0MKXb8hKWPY5IobuUwdBGQqbqu2CKMQl',
      },
    },
  },
];

it('should render filters for Foods category links', async () => {
  await act(async () => {
    render(<CategoryFilters category_id="Mw==" />, { mocks });
  });
  expect(await screen.findByText('Price')).toBeInTheDocument();
});

it('should render filters for Foods category links', async () => {
  await act(async () => {
    render(<CategoryFilters category_id="Mw==" />, { mocks });
  });
  // Find the button element...
  const checkbox = await screen.findByTestId('0-1000-0_1000');
  await act(async () => {
    fireEvent.click(checkbox); // Simulate a click and fire the mutation
  });
});
