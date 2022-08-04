import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import About from '../../pages/about-us';

describe('About us page layout', () => {
  it('should render without errors', async () => {
    render(<About />);
    // about-us
    expect(screen.getByTestId('AboutUsPage')).toBeInTheDocument();
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
