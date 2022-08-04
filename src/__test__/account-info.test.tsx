import React from 'react';
import { act, fireEvent, render, screen } from '../../src/utils/testUtils';
import MyAccount from '../../pages/account-info';
import { CreateCartDocument, GetCustomerInformationDocument } from '@magentopwa/__generated__/apolloComponents';

const mocks = [
  {
    request: {
      query: GetCustomerInformationDocument,
      variables: {},
    },
    result: {
      data: {
        customer: {
          id: null,
          firstname: 'Nagendra',
          lastname: 'Palagiri',
          email: 'nagendra301@test.com',
          __typename: 'Customer',
        },
      },
    },
  },
];
describe('Account information ', () => {
  it('should render without errors', async () => {
    await act(async () => {
      render(<MyAccount />, { mocks });
    });
    // about-us
    expect(await screen.findByTestId('accountInfo')).toBeInTheDocument();
  });
  it('should render without errors', async () => {
    await act(async () => {
      render(<MyAccount />, { mocks });
    });
    // about-us
    const button = await screen.findByText('Edit');
    await act(async () => {
      //fireEvent.click(button); // Simulate a click and fire the mutation
    });
  });
});
