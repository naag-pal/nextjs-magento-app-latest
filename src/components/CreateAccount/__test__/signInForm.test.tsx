import React from 'react';
import { act, waitFor, render, fireEvent, screen } from '@magentopwa/utils/testUtils';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { SignInForm } from '../signInForm';
import { SignInDocument } from '@magentopwa/__generated__/apolloComponents';

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

describe('Sign In Form', () => {
  it('renders sign in form', async () => {
    render(<SignInForm />, {});
    expect(await screen.findByText('Sign in')).toBeInTheDocument();
  });
  it('should render loading and success states for sign in mutation', async () => {
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
          query: SignInDocument,
          variables: { email: 'nagendra101@test.com', password: 'aa' },
        },
        result: { data: data },
      },
    ];
    render(<SignInForm />, { mocks });

    // Find the button element...
    const button = await screen.findByText('Sign in');
    await act(async () => {
      userEvent.click(button); // Simulate a click and fire the mutation
    });
    expect(await screen.findByText('Sign in')).toBeInTheDocument();
    //expect(await screen.findByText('User already')).toBeInTheDocument();
    //await waitFor(() => expect(button).toBeDisabled());
  });
});
