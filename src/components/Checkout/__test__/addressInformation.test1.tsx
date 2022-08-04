import React from 'react';
import { act, fireEvent, render, screen } from '../../../utils/testUtils';
import { AddressInformation } from '../AddressInformation';
import { GetCustomerAddressesDocument } from '@magentopwa/__generated__/apolloComponents';

const mocks = [
  {
    request: {
      query: GetCustomerAddressesDocument,
      variables: { cartId: 'YqBxX9X6HaEoDz4QjmxQFDlQVpJBg4Q9' },
    },
    result: {
      data: {
        customer: {
          addresses: [
            {
              id: 60,
              city: 'Puri, Odisha, India',
              country_code: 'US',
              default_shipping: false,
              firstname: 'Nagendratest',
              lastname: 'palagiritest',
              postcode: '12346',
              region: {
                region: 'North Dakota',
                region_code: 'ND',
                region_id: 45,
                __typename: 'CustomerAddressRegion',
              },
              street: ['sadfsaf', 'Street 102'],
              telephone: '1231231234',
              __typename: 'CustomerAddress',
            },
            {
              id: 61,
              city: 'KA',
              country_code: 'US',
              default_shipping: true,
              firstname: 'Nagendratest',
              lastname: 'palagiritest',
              postcode: '12345',
              region: {
                region: 'North Dakota',
                region_code: 'ND',
                region_id: 45,
                __typename: 'CustomerAddressRegion',
              },
              street: ['sadfsaf', 'Street 102'],
              telephone: '1231231231',
              __typename: 'CustomerAddress',
            },
            {
              id: 62,
              city: 'KA',
              country_code: 'US',
              default_shipping: false,
              firstname: 'adsf',
              lastname: 'adf',
              postcode: '12345',
              region: {
                region: 'North Dakota',
                region_code: 'ND',
                region_id: 45,
                __typename: 'CustomerAddressRegion',
              },
              street: ['adsf', 'Street 102'],
              telephone: '1231231231',
              __typename: 'CustomerAddress',
            },
          ],
          __typename: 'Customer',
        },
      },
    },
  },
];

describe('address information ', () => {
  //const setUserAddress = jest.fn();
  it('should render without errors', async () => {
    await act(() => {
      render(<AddressInformation />, { mocks, testState: true });
    });
    // about-us
    expect(await screen.getByTestId('AddressInformation')).toBeInTheDocument();
  });
});
