import React from 'react';

import '@magentopwa/utils/matchMedia';
import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import ContentTypeFactory from '../factory';
import { act } from 'react-dom/test-utils';
import Router from 'next/router';

//jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
//jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));

describe('ContentTypeFactory section ', () => {
  const data = {
    html: "<div data-content-type='Banner'> <div data-content-type='text'> Example text</div></div>",
    isHidden: false,
  };
  it('should render ContentDisplay', async () => {
    act(() => {
      render(<ContentTypeFactory data={data} />);
    });
    // expect(await screen.findByTestId('ProductDetailSection')).toBeInTheDocument();
    // expect(await screen.findByTestId('AddToCartButton')).toBeInTheDocument();
    // await fireEvent.click(await screen.findByTestId('AddToCartButton'));
  });
});
