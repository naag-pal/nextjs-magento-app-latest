import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { NestedMetaData } from '../nestedMetaData';
import { MockedProvider } from '@apollo/client/testing';

describe('Home page layout NestedMetaData', () => {
  it('should render without errors', async () => {
    const metadata = {
      title: 'Sample title',
      description: 'sample Descripiton',
    };
    render(
      <MockedProvider>
        <NestedMetaData metadata={metadata}>
          <div></div>
        </NestedMetaData>
      </MockedProvider>
    );
    // header
    expect(await screen.getByTestId('metadata')).toBeInTheDocument();
  });
});
