import { act, fireEvent, render, screen } from '../../../utils/testUtils';
import SortingOptions from '../sortingOptions';
import { CreateCartDocument, GetCategoryAvailableSortMethodsDocument } from '../../../__generated__/apolloComponents';
import React from 'react';

const mocks = [
  {
    request: {
      query: GetCategoryAvailableSortMethodsDocument,
      variables: { categoryIdFilter: { eq: 'Mw==' } },
    },
    result: {
      data: {
        products: {
          sort_fields: {
            options: [
              {
                label: 'Position',
                value: 'position',
                __typename: 'SortField',
              },
              {
                label: 'Product Name',
                value: 'name',
                __typename: 'SortField',
              },
              {
                label: 'Price',
                value: 'price',
                __typename: 'SortField',
              },
            ],
            __typename: 'SortFields',
          },
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
    render(<SortingOptions category_id="Mw==" />, { mocks });
  });
  expect(await screen.findByTestId('sortingOption')).toBeInTheDocument();
});

it('should render filters for Foods category links', async () => {
  await act(async () => {
    render(<SortingOptions category_id="Mw==" />, { mocks });
  });
  // Find the button element...
  const selectbox = await screen.findByTestId('sortingOption');
  await act(async () => {
    fireEvent.click(selectbox); // Simulate a click and fire the mutation
  });
});
