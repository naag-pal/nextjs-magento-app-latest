import React from 'react';
import { act, fireEvent, render, screen } from '../../src/utils/testUtils';
import MyOrders from '../../pages/order-history';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCartDocument, GetCustomerOrdersDocument } from '../../src/__generated__/apolloComponents';
import ReactDOM from 'react-dom';

const mocks = [
  {
    request: {
      query: GetCustomerOrdersDocument,
      variables: { pageSize: 5 },
    },
    result: {
      data: {
        customer: {
          orders: {
            items: [
              {
                billing_address: {
                  city: 'Bengaluru',
                  country_code: 'IN',
                  firstname: 'Nagendra',
                  lastname: 'Palagiri',
                  postcode: '5000695',
                  region: 'Karnataka',
                  street: ['Street 101'],
                  telephone: '9191919191',
                  __typename: 'OrderAddress',
                },
                id: 'MTk=',
                invoices: [],
                items: [
                  {
                    id: 'NjE=',
                    product_name:
                      'Fiama Men Shower Gel Refreshing Pulse Body Wash with Skin Conditioners for Refreshed Skin, 900 ml bottle',
                    product_sale_price: {
                      currency: 'INR',
                      value: 650,
                      __typename: 'Money',
                    },
                    product_sku: 'Fiama Men Shower Gel Refreshing Pulse Body Wash 900ml',
                    product_url_key:
                      'fiama-men-shower-gel-refreshing-pulse-body-wash-with-skin-conditioners-for-refreshed-skin-900-ml-bottle',
                    selected_options: [],
                    quantity_ordered: 1,
                    __typename: 'OrderItem',
                  },
                  {
                    id: 'NjI=',
                    product_name:
                      '1 Classmate Interaktiv Origami Craft Book (Assorted) - Mythical Creatures and Ghosts & Spirits ',
                    product_sale_price: {
                      currency: 'INR',
                      value: 100,
                      __typename: 'Money',
                    },
                    product_sku: '1 Classmate Interaktiv Origami Craft Book-1',
                    product_url_key:
                      'classmate-interaktiv-origami-craft-book-assorted-mythical-creatures-and-ghosts-spirits-1',
                    selected_options: [],
                    quantity_ordered: 1,
                    __typename: 'OrderItem',
                  },
                  {
                    id: 'NjM=',
                    product_name: 'Dark Desserts Gift Box, 500g',
                    product_sale_price: {
                      currency: 'INR',
                      value: 500,
                      __typename: 'Money',
                    },
                    product_sku: 'Dark Desserts Gift Box,500g-1',
                    product_url_key: 'dark-desserts-gift-box-350g-1',
                    selected_options: [],
                    quantity_ordered: 1,
                    __typename: 'OrderItem',
                  },
                ],
                number: '000000019',
                order_date: '2022-07-01 11:41:12',
                payment_methods: [
                  {
                    name: 'Check / Money order',
                    type: 'checkmo',
                    additional_data: [],
                    __typename: 'OrderPaymentMethod',
                  },
                ],
                shipments: [],
                shipping_address: {
                  city: 'Bengaluru',
                  country_code: 'US',
                  firstname: 'Nagendra',
                  lastname: 'Palagiri',
                  postcode: '5000695',
                  region: 'North Dakota',
                  street: ['Street 101', 'Street 102'],
                  telephone: '9191919191',
                  __typename: 'OrderAddress',
                },
                shipping_method: 'Free Shipping - Free',
                status: 'Pending',
                total: {
                  discounts: [],
                  grand_total: {
                    currency: 'INR',
                    value: 1250,
                    __typename: 'Money',
                  },
                  subtotal: {
                    currency: 'INR',
                    value: 1250,
                    __typename: 'Money',
                  },
                  total_shipping: {
                    currency: 'INR',
                    value: 0,
                    __typename: 'Money',
                  },
                  total_tax: {
                    currency: 'INR',
                    value: 0,
                    __typename: 'Money',
                  },
                  __typename: 'OrderTotal',
                },
                __typename: 'CustomerOrder',
              },
            ],
            page_info: {
              current_page: 1,
              total_pages: 1,
              __typename: 'SearchResultPageInfo',
            },
            total_count: 1,
            __typename: 'CustomerOrders',
          },
          __typename: 'Customer',
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

describe('Order History ', () => {
  it('should render without errors', async () => {
    await act(async () => {
      render(<MyOrders />, { mocks, testState: true });
    });
    //expect(await screen.findByTestId('sortingOption')).toBeInTheDocument();
    // order history
    expect(await screen.findByTestId('orderHistory')).toBeInTheDocument();
  });
});
