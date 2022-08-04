import React from 'react';

import { render, screen, cleanup, fireEvent, waitFor } from '../../../utils/testUtils';
import { MegaMenu, MegaMenuMobile } from '../../MegaMenu';
import { CreateCartDocument, GetMegaMenuDocument } from '../../../__generated__/apolloComponents';
import { act } from 'react-dom/test-utils';
import { ApolloError } from '@apollo/client';

//jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
//jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));

const mocks = [
  {
    request: {
      query: GetMegaMenuDocument,
      variables: {},
    },
    result: {
      data: {
        categoryList: [
          {
            uid: 'Mg==',
            name: 'Default Category',
            children: [
              {
                uid: 'Mw==',
                include_in_menu: 1,
                name: 'Foods',
                position: 1,
                url_path: 'foods',
                children: [
                  {
                    uid: 'NA==',
                    include_in_menu: 1,
                    name: 'Staples',
                    position: 1,
                    url_path: 'foods/staples',
                    children: [
                      {
                        uid: 'NQ==',
                        include_in_menu: 1,
                        name: 'Aata',
                        position: 1,
                        url_path: 'foods/staples/aata',
                        __typename: 'CategoryTree',
                      },
                      {
                        uid: 'Ng==',
                        include_in_menu: 1,
                        name: 'Spices',
                        position: 2,
                        url_path: 'foods/staples/spices',
                        __typename: 'CategoryTree',
                      },
                      {
                        uid: 'Nw==',
                        include_in_menu: 1,
                        name: 'Cooking oil',
                        position: 3,
                        url_path: 'foods/staples/cooking-oil',
                        __typename: 'CategoryTree',
                      },
                    ],
                    __typename: 'CategoryTree',
                  },
                  {
                    uid: 'OA==',
                    include_in_menu: 1,
                    name: 'Snacks',
                    position: 2,
                    url_path: 'foods/snacks',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                  {
                    uid: 'OQ==',
                    include_in_menu: 1,
                    name: 'Beverages',
                    position: 3,
                    url_path: 'foods/beverages',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                ],
                __typename: 'CategoryTree',
              },
              {
                uid: 'MTA=',
                include_in_menu: 1,
                name: 'Personal Care',
                position: 2,
                url_path: 'personal-care',
                children: [
                  {
                    uid: 'MTE=',
                    include_in_menu: 1,
                    name: 'Perfumes',
                    position: 1,
                    url_path: 'personal-care/perfumes',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                  {
                    uid: 'MTI=',
                    include_in_menu: 1,
                    name: 'Skin Care',
                    position: 2,
                    url_path: 'personal-care/skin-care',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                  {
                    uid: 'MTM=',
                    include_in_menu: 1,
                    name: 'Bath & Body',
                    position: 3,
                    url_path: 'personal-care/bath-body',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                ],
                __typename: 'CategoryTree',
              },
              {
                uid: 'MTQ=',
                include_in_menu: 1,
                name: 'Clean & Hygiene',
                position: 3,
                url_path: 'clean-hygiene',
                children: [
                  {
                    uid: 'MTc=',
                    include_in_menu: 1,
                    name: 'Puja',
                    position: 1,
                    url_path: 'clean-hygiene/puja',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                  {
                    uid: 'MTg=',
                    include_in_menu: 1,
                    name: 'Kitchen',
                    position: 2,
                    url_path: 'clean-hygiene/kitchen',
                    children: [],
                    __typename: 'CategoryTree',
                  },
                ],
                __typename: 'CategoryTree',
              },
              {
                uid: 'MTU=',
                include_in_menu: 1,
                name: 'Stationery',
                position: 4,
                url_path: 'stationery',
                children: [],
                __typename: 'CategoryTree',
              },
              {
                uid: 'MTY=',
                include_in_menu: 1,
                name: 'New Launch',
                position: 5,
                url_path: 'new-launch',
                children: [],
                __typename: 'CategoryTree',
              },
            ],
            __typename: 'CategoryTree',
          },
        ],
      },
    },
  },
  {
    request: {
      query: CreateCartDocument,
      variables: {},
    },
    result: {
      data: {
        cartId: '0MKXb8hKWPY5IobuUwdBGQqbqu2CKMQl',
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: GetMegaMenuDocument,
      variables: {},
    },
    errors: [
      {
        message: "The current customer isn't authorized.",
        path: ['customer'],
        extensions: {
          category: 'graphql-authorization',
        },
      },
    ],
  },
];

describe('Megamenu section ', () => {
  it('should render Megamenu', async () => {
    await act(() => {
      render(<MegaMenu />, { mocks, testState: true });
    });
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(await screen.findByText('Foods')).toBeInTheDocument();
  });
  it('should render Megamenu Mobile', async () => {
    await act(() => {
      render(<MegaMenuMobile />, { mocks, testState: true });
    });
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(await screen.findByText('Foods')).toBeInTheDocument();
  });

  it('should render Megamenu mocksError', async () => {
    await act(() => {
      render(<MegaMenu />, { mocks: mocksError, testState: true });
    });
  });
});
