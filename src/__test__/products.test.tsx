import React from 'react';

import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import Products, { getServerSideProps } from '../../pages/products';
import { act } from 'react-dom/test-utils';
import Router from 'next/router';
import {
  CreateCartDocument,
  GetProductDetailsByUrlKeyDocument,
  GetCategoryByUrlKeysDocument,
} from '@magentopwa/__generated__/apolloComponents';

const data = {
  categories: {
    items: [
      {
        uid: 'Mw==',
        meta_title: null,
        meta_keywords: null,
        meta_description: null,
        __typename: 'CategoryTree',
      },
    ],
    __typename: 'CategoryResult',
  },
  products: {
    items: [
      {
        id: 15,
        uid: 'MTU=',
        name: 'Aashirvaad Superior MP Atta 25 Kg',
        price_range: {
          maximum_price: {
            final_price: {
              currency: 'INR',
              value: 1295,
              __typename: 'Money',
            },
            regular_price: {
              currency: 'INR',
              value: 1295,
              __typename: 'Money',
            },
            __typename: 'ProductPrice',
          },
          __typename: 'PriceRange',
        },
        sku: 'Aashirvaad Superior MP Atta 25 Kg-1',
        small_image: {
          url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/a/a/aata-2_1.jpg',
          __typename: 'ProductImage',
        },
        stock_status: 'IN_STOCK',
        rating_summary: 0,
        __typename: 'SimpleProduct',
        url_key: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
      },
      {
        id: 13,
        uid: 'MTM=',
        name: 'Dark Desserts Gift Box, 500g',
        price_range: {
          maximum_price: {
            final_price: {
              currency: 'INR',
              value: 500,
              __typename: 'Money',
            },
            regular_price: {
              currency: 'INR',
              value: 500,
              __typename: 'Money',
            },
            __typename: 'ProductPrice',
          },
          __typename: 'PriceRange',
        },
        sku: 'Dark Desserts Gift Box,500g-1',
        small_image: {
          url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/d/a/dark-fantasy-1_1.jpg',
          __typename: 'ProductImage',
        },
        stock_status: 'IN_STOCK',
        rating_summary: 0,
        __typename: 'SimpleProduct',
        url_key: 'dark-desserts-gift-box-350g-1',
      },
      {
        id: 12,
        uid: 'MTI=',
        name: 'Dark Desserts Gift Box, 250g',
        price_range: {
          maximum_price: {
            final_price: {
              currency: 'INR',
              value: 250,
              __typename: 'Money',
            },
            regular_price: {
              currency: 'INR',
              value: 250,
              __typename: 'Money',
            },
            __typename: 'ProductPrice',
          },
          __typename: 'PriceRange',
        },
        sku: 'Dark Desserts Gift Box,250g',
        small_image: {
          url: 'http://demomagento.com/media/catalog/product/cache/f9036a3247601df76ad75da5f6b08aa4/d/a/dark-fantasy-1.jpg',
          __typename: 'ProductImage',
        },
        stock_status: 'IN_STOCK',
        rating_summary: 0,
        __typename: 'SimpleProduct',
        url_key: 'dark-desserts-gift-box-350g',
      },
    ],
    page_info: {
      total_pages: 4,
      __typename: 'SearchResultPageInfo',
    },
    total_count: 11,
    __typename: 'Products',
  },
};

const productData = {
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

const categoryOnlyData = {
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
};

const mocks = [
  {
    request: {
      query: GetCategoryByUrlKeysDocument,
      variables: {
        urlKeys: ['foods'],
      },
    },
    result: { data: categoryOnlyData },
  },
  {
    request: {
      query: GetProductDetailsByUrlKeyDocument,
      variables: {
        currentPage: 1,
        id: 'Mw==',
        filters: {
          category_uid: {
            eq: 'Mw==',
          },
        },
        pageSize: 3,
        sort: {},
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

const productMocks = [
  {
    request: {
      query: GetCategoryByUrlKeysDocument,
      variables: {
        urlKeys: ['aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1'],
      },
    },
    result: { data: categoryOnlyData },
  },
  {
    request: {
      query: GetProductDetailsByUrlKeyDocument,
      variables: {
        urlKey: 'aashirvaad-superior-mp-atta-10-kg-free-hunar-online-course-1',
      },
    },
    result: { data: productData },
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
  pathname: '/foods',
  route: '/foods',
  asPath: '/foods',
  query: { url_key: ['foods'] },
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

const productRouter = {
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

describe('Products Server page layout', () => {
  it('should render without errors', async () => {
    await act(() => {
      render(<Products data={data} />, { mocks, router, testState: true });
    });
    // about-us
    expect(await screen.getByTestId('ProductServerList')).toBeInTheDocument();
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
