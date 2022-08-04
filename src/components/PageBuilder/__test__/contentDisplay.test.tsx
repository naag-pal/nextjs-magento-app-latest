import React from 'react';

import '@magentopwa/utils/matchMedia';
import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import ContentDisplay from '../contentDisplay';
import { act } from 'react-dom/test-utils';
import Router from 'next/router';

//jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
//jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));

describe('ContentDisplay section ', () => {
  it('should render ContentDisplay', async () => {
    act(() => {
      render(<ContentDisplay content={''} />);
    });
    // expect(await screen.findByTestId('ProductDetailSection')).toBeInTheDocument();
    // expect(await screen.findByTestId('AddToCartButton')).toBeInTheDocument();
    // await fireEvent.click(await screen.findByTestId('AddToCartButton'));
  });
});
