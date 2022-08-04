import React from 'react';

import { render, screen } from '../../../utils/testUtils';
import { Breadcrumbs } from '../breadcrumbs';
import { CreateCartDocument, GetBreadcrumbsDocument } from '../../../__generated__/apolloComponents';

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

const mockError = [
  {
    request: {
      query: GetBreadcrumbsDocument,
      variables: {
        category_id: 'NA==',
      },
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
  {
    request: {
      query: CreateCartDocument,
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

const links = [{ name: 'Sample link', link: '/sample-link' }];

it('should render Foods and Atta links', async () => {
  render(<Breadcrumbs category_id="NQ==" links={links} />, { mocks });
  expect(await screen.findByText('Foods')).toBeInTheDocument();
  expect(await screen.findByText('Atta')).toBeInTheDocument();
});

it('should render Error', async () => {
  render(<Breadcrumbs category_id="NQ==" links={links} />, { mocks: mockError });
});
