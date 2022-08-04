import { act, waitFor, render, screen } from '@testing-library/react';
import React from 'react';
import Layout from '../layout';
import { MockedProvider } from '@apollo/client/testing';
import ReactDOM from 'react-dom/client';
import { GetBreadcrumbsDocument } from '@magentopwa/__generated__/apolloComponents';

let container;

const mocks = [
  {
    request: {
      query: GetBreadcrumbsDocument,
      variables: {
        category_id: 'MTU=',
      },
    },
    data: {
      categories: {
        items: [
          {
            breadcrumbs: null,
            uid: 'MTU=',
            name: 'Stationery',
            url_path: 'stationery',
            __typename: 'CategoryTree',
          },
        ],
        __typename: 'CategoryResult',
      },
    },
  },
];

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Home page layout', () => {
  it('should render without errors', async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks}>
          <Layout>
            <div></div>
          </Layout>
        </MockedProvider>
      );
    });
    // header
    expect(await screen.getByTestId('heading')).toBeInTheDocument();
  });
});
