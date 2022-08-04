import React from 'react';
import { act, fireEvent, render, screen } from '../utils/testUtils';
import MyAddresses from '../../pages/address-info';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCartDocument, GetCustomerAddressesDocument } from '../__generated__/apolloComponents';
import ReactDOM from 'react-dom';

const mocks = [
  {
    request: {
      query: GetCustomerAddressesDocument,
      variables: {},
    },
    result: {
      data: {
        customer: {
          addresses: [
            {
              id: 28,
              city: 'KA',
              country_code: 'US',
              default_shipping: true,
              firstname: 'test',
              lastname: 'test',
              postcode: '101001',
              region: {
                region: 'North Dakota',
                region_code: 'ND',
                region_id: 45,
                __typename: 'CustomerAddressRegion',
              },
              street: ['test', 'Street 102'],
              telephone: '1231231231',
              __typename: 'CustomerAddress',
            },
          ],
          __typename: 'Customer',
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

describe('Address information ', () => {
  it('should render without errors', async () => {
    await act(async () => {
      render(<MyAddresses />, { mocks, testState: true });
    });
    //expect(await screen.findByTestId('sortingOption')).toBeInTheDocument();
    // about-us
    expect(await screen.findByTestId('addressInfo')).toBeInTheDocument();
  });

  it('should render without errors', async () => {
    await act(async () => {
      render(<MyAddresses />, { mocks });
    });
    //expect(await screen.findByTestId('sortingOption')).toBeInTheDocument();
    // about-us
    expect(await screen.findByTestId('editLink')).toBeInTheDocument();

    // Find the button element...
    const editLink = await screen.findByTestId('editLink');
    await act(async () => {
      // fireEvent.click(editLink); // Simulate a click and fire the mutation
    });
  });
});
