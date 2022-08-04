import React from 'react';

import { render, screen, cleanup, fireEvent, waitFor } from '../../../utils/testUtils';
import ProductDetailPage from '../productDetailPage';
import {
  CreateCartDocument,
  GetMegaMenuDocument,
  GetProductDetailsByUrlKeyDocument,
} from '../../../__generated__/apolloComponents';
import { act } from 'react-dom/test-utils';
import Router from 'next/router';

//jest.mock('../../MegaMenu/megaMenu', () => ({ MegaMenu: () => 'mocked MegaMenu' }));
//jest.mock('../../MegaMenu/megaMenuMobile', () => ({ MegaMenuMobile: () => 'mocked MegaMenuMobile' }));
//jest.mock('../../Search/searchForm', () => ({ SearchForm: () => 'mocked SearchForm' }));
const data = {
  products: {
    items: [
      {
        id: 15,
        sku: 'Aashirvaad Superior MP Atta 25 Kg-1',
        url_key: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
        uid: 'MTU=',
        name: 'Aashirvaad Superior MP Atta 25 Kg',
        categories: [
          {
            uid: 'Mw==',
            name: 'Foods',
            url_key: 'foods',
            __typename: 'CategoryTree',
          },
          {
            uid: 'NA==',
            name: 'Staples',
            url_key: 'staples',
            __typename: 'CategoryTree',
          },
          {
            uid: 'NQ==',
            name: 'Aata',
            url_key: 'aata',
            __typename: 'CategoryTree',
          },
          {
            uid: 'MTY=',
            name: 'New Launch',
            url_key: 'new-launch',
            __typename: 'CategoryTree',
          },
        ],
        price_range: {
          maximum_price: {
            regular_price: {
              value: 1295,
              __typename: 'Money',
            },
            final_price: {
              value: 1295,
              __typename: 'Money',
            },
            discount: {
              amount_off: 0,
              __typename: 'ProductDiscount',
            },
            __typename: 'ProductPrice',
          },
          minimum_price: {
            regular_price: {
              value: 1295,
              __typename: 'Money',
            },
            final_price: {
              value: 1295,
              __typename: 'Money',
            },
            discount: {
              amount_off: 0,
              __typename: 'ProductDiscount',
            },
            __typename: 'ProductPrice',
          },
          __typename: 'PriceRange',
        },
        media_gallery: [
          {
            url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aataa-1_1.jpg',
            position: 0,
            disabled: false,
            __typename: 'ProductImage',
          },
          {
            url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
            position: 1,
            disabled: false,
            __typename: 'ProductImage',
          },
        ],
        image: {
          disabled: null,
          label: 'Aashirvaad Superior MP Atta 25 Kg',
          position: null,
          url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
          __typename: 'ProductImage',
        },
        small_image: {
          disabled: null,
          label: 'Aashirvaad Superior MP Atta 25 Kg',
          position: null,
          url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
          __typename: 'ProductImage',
        },
        description: {
          html: '',
          __typename: 'ComplexTextValue',
        },
        short_description: {
          html: '<h3>Overview</h3>\r\n<p>AASHIRVAAD Whole Wheat Atta is made from the grains which are heavy on the palm and golden amber in colour. AASHIRVAAD Atta contains 0% Maida and is 100% Whole Wheat Atta. Thus we ensure, through our 4 Step Advantage process of sourcing, cleaning, grinding, mechanised packaging and nutrition lockage.</p>\r\n<ul>\r\n<li>100% Whole Wheat</li>\r\n<li>0% Maida</li>\r\n<li>Free Hunar Online Course</li>\r\n</ul>\r\n<p><strong>Key Features</strong></p>\r\n<ul>\r\n<li>By ensuring that all the nutrients of the grain stay intact and protected in our packaging, we deliver the freshness of the fields combined with the power of the whole wheat.</li>\r\n<li>The dough made from AASHIRVAAD Atta absorbs more water, hence rotis remain softer for longer. This means you serve soft, fluffy rotis to your family which powers them through their day!</li>\r\n</ul>',
          __typename: 'ComplexTextValue',
        },
        __typename: 'SimpleProduct',
      },
    ],
    __typename: 'Products',
  },
};

const mocks = [
  {
    request: {
      query: GetProductDetailsByUrlKeyDocument,
      variables: {
        urlKey: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
      },
    },
    result: { data: data },
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

const router = {
  basePath: '',
  isReady: true,
  pathname: '/aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
  route: '/aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
  asPath: '/aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
  query: { url_key: ['aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1'] },
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
};

describe('ProductDetail section ', () => {
  it('should render ProductDetail', async () => {
    await act(() => {
      render(<ProductDetailPage />, { mocks, router, testState: true });
    });
    expect(await screen.findByTestId('ProductDetailSection')).toBeInTheDocument();
    expect(await screen.findByTestId('AddToCartButton')).toBeInTheDocument();
    await fireEvent.click(await screen.findByTestId('AddToCartButton'));
  });
});
