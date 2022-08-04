import { act, render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/index';
import { MockedProvider } from '@apollo/client/testing';

describe('Index page layout', () => {
  it('should render without errors', async () => {
    await act(() => {
      render(<Home />);
    });
    // about-us
    expect(await screen.getByTestId('IndexPage')).toBeInTheDocument();
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
