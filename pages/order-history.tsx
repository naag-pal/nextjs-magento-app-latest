import React, { ReactElement } from 'react';
import Layout from '@magentopwa/components/Layout';
import {
  GetCustomerOrdersDocument,
  GetCustomerOrdersQuery,
  GetCustomerOrdersQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { NestedMetaData } from '../src/components/Layout/nestedMetaData';
import { useQuery } from '@apollo/client';

const MyOrders = () => {
  const { data, loading, error } = useQuery<GetCustomerOrdersQuery, GetCustomerOrdersQueryVariables>(
    GetCustomerOrdersDocument,
    {
      variables: {
        pageSize: 5,
      },
    }
  );

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <div className="container" data-testid="orderHistory">
      <h1 className="text-lg  mt-4 mb-4">My Orders</h1>
      {data &&
        data.customer.orders.items.map((order) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-4 border-2 rounded border-dotted mb-6 mt-6"
              key={order.number}
            >
              <div className="p-3">
                <div className="p-3 font-semibold">Order: {order.number}</div>
                <div className="p-3 font-semibold">Order Status: {order.status}</div>
                <div className="p-3">Order Date: {order.order_date}</div>
              </div>
              <div className="p-3 col-span-3">
                <div className="p-3">Total Price: {order.total.grand_total.value}</div>
                <div className="p-3">Total items: {order.items.length}</div>
                <div className="p-3">
                  {order.items.map((item) => {
                    return (
                      <div className="mb-2" key={item.product_url_key}>
                        <div className="mx-3">
                          Rs. {item.product_sale_price.value} __ {item.product_name}{' '}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

MyOrders.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: 'Order History',
    description: 'Order History',
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};
export default MyOrders;
