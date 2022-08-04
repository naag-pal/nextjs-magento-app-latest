import React from 'react';
import { act, waitFor, render, fireEvent, screen } from '@magentopwa/utils/testUtils';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { CreateAccount } from '../createAccount';
import { CreateAccountDocument } from '@magentopwa/__generated__/apolloComponents';

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

describe('Create account form', () => {
  it('renders create account form', async () => {
    render(<CreateAccount />, {});
    expect(await screen.findByText('Create an Account')).toBeInTheDocument();
  });
  it('should render loading and success states for create account mutation', async () => {
    const data = {
      generateCustomerToken: {
        token:
          'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE1LCJ1dHlwaWQiOjMsImlhdCI6MTY1OTA4NTQ3MSwiZXhwIjoxNjU5MDg5MDcxfQ.vFsa3m8dYjzVa51ELreVxGsreD703fCcEGAcVSCyMBU',
        __typename: 'CustomerToken',
      },
    };

    const mocks = [
      {
        request: {
          query: CreateAccountDocument,
          variables: {
            email: 'nagendra102@test.com',
            firstname: 'Nagendratest',
            lastname: 'palagiritest',
            password: 'abcdefgh',
            is_subscribed: false,
          },
        },
        result: { data: data },
      },
    ];
    render(<CreateAccount />, { mocks });

    // Find the button element...
    const button = await screen.findByText('Create an Account');
    userEvent.click(button); // Simulate a click and fire the mutation
    expect(await screen.findByText('Create an Account')).toBeInTheDocument();
    //expect(await screen.findByText('Create an Account')).toBeDisabled();
    //await waitFor(() => expect(button).toBeDisabled());
  });
});
