import { act, render, screen } from '@testing-library/react';
import React from 'react';
import CartPage from '../../pages/cart';
import { MockedProvider } from '@apollo/client/testing';
import { ReactElement, useContext } from 'react';
import Link from 'next/link';

const state = {
  cart: {
    products: [
      {
        uid: 'MTU=',
        sku: 'Aashirvaad Superior MP Atta 25 Kg-1',
        name: 'Aashirvaad Superior MP Atta 25 Kg',
        url_key: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
        image: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
        price: 1295,
        quantity: 1,
      },
    ],
    cartId: 'xridz9hrJRVeVn2L3qWJQNx2uKgDjiMk',
    wishlistId: '',
    checkout: { status: 'DEFAULT', addressId: '' },
  },
};

describe('Cart information ', () => {
  it('should render without errors', async () => {
    await act(() => {
      render(<CartPage />);
    });
    // about-us
    expect(screen.getByTestId('cart-error-page')).toBeInTheDocument();
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
