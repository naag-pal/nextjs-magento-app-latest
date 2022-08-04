import React from 'react';
import ProductsByCategory from '../productsByCategory';
import TestRenderer, { act } from 'react-test-renderer';
import { render, screen } from '../../../utils/testUtils';
import { useRouter } from 'next/router';
import { GetCategoryByUrlKeysDocument } from '../../../__generated__/apolloComponents';

/*
 * Wrap rendering code in `act()`, for lifecycle purposes.
 *
 * https://reactjs.org/docs/test-utils.html#act
 */
const createTestInstance = (...args) => {
  let instance;

  act(() => {
    instance = TestRenderer.create(...args);
  });

  return instance;
};

const mocks = [
  {
    request: {
      query: GetCategoryByUrlKeysDocument,
      variables: {
        urlKeys: 'foods',
      },
    },
    result: {
      data: {
        categories: {
          items: [
            {
              name: 'Foods',
              uid: 'Mw==',
              url_key: 'foods',
              children: [
                {
                  name: 'Staples',
                  uid: 'NA==',
                  url_key: 'staples',
                  __typename: 'CategoryTree',
                },
                {
                  name: 'Snacks',
                  uid: 'OA==',
                  url_key: 'snacks',
                  __typename: 'CategoryTree',
                },
                {
                  name: 'Beverages',
                  uid: 'OQ==',
                  url_key: 'beverages',
                  __typename: 'CategoryTree',
                },
              ],
              __typename: 'CategoryTree',
            },
          ],
          __typename: 'CategoryResult',
        },
      },
    },
  },
];

jest.mock('@magentopwa/components/ProductCard/productCard', () => 'ProductCard');
jest.mock('@magentopwa/components/Breadcrumbs/breadcrumbs', () => 'Breadcrumbs');
jest.mock('@magentopwa/components/Filters', () => 'CategoryFilters');
jest.mock('@magentopwa/components/Category/sortingOptions', () => 'Button');
jest.mock('@magentopwa/components/UI', () => 'SortingOptions');
jest.mock('react-router-dom', () => ({
  Link: ({ children, ...rest }) => <div {...rest}>{children}</div>,
}));

const props = {};

/*

it('Should render properly', () => {
  const tree = createTestInstance(<ProductsByCategory {...props} />);

  expect(tree.toJSON()).toMatchSnapshot();
});
*/

it('should render Foods and Atta links', async () => {
  render(<ProductsByCategory {...props} />, { mocks });
  expect(await screen.findByText('Foods')).toBeInTheDocument();
  expect(await screen.findByText('Atta')).toBeInTheDocument();
});
