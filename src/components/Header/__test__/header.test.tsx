import React from 'react';

import { render, screen, cleanup, fireEvent, waitFor } from '../../../utils/testUtils';
import { Header } from '../header';
import { MegaMenu, MegaMenuMobile } from '../../MegaMenu';
import { GetBreadcrumbsDocument } from '../../../__generated__/apolloComponents';
import { act } from 'react-dom/test-utils';

jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));

const mocks = [
  {
    request: {
      query: GetBreadcrumbsDocument,
      variables: {
        category_id: 'NQ==',
      },
    },
    result: {
      data: {
        categories: {
          items: [
            {
              breadcrumbs: [
                {
                  category_uid: 'Mw==',
                  category_level: 2,
                  category_name: 'Foods',
                  category_url_path: 'foods',
                  __typename: 'Breadcrumb',
                },
                {
                  category_uid: 'NA==',
                  category_level: 3,
                  category_name: 'Staples',
                  category_url_path: 'foods/staples',
                  __typename: 'Breadcrumb',
                },
              ],
              uid: 'NQ==',
              name: 'Atta',
              url_path: 'foods/staples/atta',
              __typename: 'CategoryTree',
            },
          ],
          __typename: 'CategoryResult',
        },
      },
    },
  },
];

const mockError = [
  {
    request: {
      query: GetBreadcrumbsDocument,
      variables: {
        category_id: 'NA==',
      },
    },
    result: {
      data: {
        categories: {
          items: [
            {
              breadcrumbs: [
                {
                  category_uid: 'Mw==',
                  category_level: 2,
                  category_name: 'Foods',
                  category_url_path: 'foods',
                  __typename: 'Breadcrumb',
                },
                {
                  category_uid: 'NA==',
                  category_level: 3,
                  category_name: 'Staples',
                  category_url_path: 'foods/staples',
                  __typename: 'Breadcrumb',
                },
              ],
              uid: 'NQ==',
              name: 'Atta',
              url_path: 'foods/staples/atta',
              __typename: 'CategoryTree',
            },
          ],
          __typename: 'CategoryResult',
        },
      },
    },
  },
];

describe(' Header section ', () => {
  it('should render header', async () => {
    act(() => {
      render(<Header />, { mocks });
    });
    expect(await screen.findByTestId('MobileMenu')).toBeInTheDocument();
    expect(await screen.findByTestId('searchForm')).toBeInTheDocument();
  });
  it('should render header MyAccountMenu', async () => {
    act(() => {
      render(<Header />, { mocks });
    });
    expect(await screen.findByTestId('MobileMenu')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(await screen.getByTestId('MobileMenu'));
    });
  });
  it('should render header MobileMenu', async () => {
    act(() => {
      render(<Header />, { mocks });
    });
    expect(await screen.findByTestId('MyAccountMenuDesktop')).toBeInTheDocument();
    expect(await screen.findByTestId('CartDropdownMenu')).toBeInTheDocument();
    act(async () => {
      fireEvent.mouseOver(await screen.getByTestId('MyAccountMenuDesktop'));
      fireEvent.mouseLeave(await screen.getByTestId('MyAccountMenuDesktop'));
      expect(await screen.findByTestId('MyAccountDropdown')).toBeInTheDocument();
      expect(await screen.findByTestId('defaultTheme')).toBeInTheDocument();
      act(async () => {
        fireEvent.click(await screen.findByTestId('defaultTheme'));
      });
      act(async () => {
        fireEvent.mouseOver(await screen.getByTestId('CartDropdownMenu'));
        fireEvent.mouseLeave(await screen.getByTestId('CartDropdownMenu'));
      });
    });
  });
  it('should render header CartDropdownMenu', async () => {
    await act(() => {
      render(<Header />, { mocks });
    });

    /*
      await waitFor(() => screen.findByText('Sign in'));
      expect(await screen.findByText('Sign in')).toBeInTheDocument();
      await waitFor(() => screen.findByTestId('defaultTheme1'));
      expect(await screen.findByTestId('defaultTheme1')).toBeInTheDocument();
      act(async () => {
        fireEvent.click(await screen.findByText('Sign in'));
      });*/
    //expect(await screen.getByTestId('MyAccountDropdown')).toBeInTheDocument();
    //await waitFor(() => screen.getByTestId('MyAccountDropdown'));
  });
});
