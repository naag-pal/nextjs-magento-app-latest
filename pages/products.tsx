import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';
import { GetProductsByCategoryDocument, BundleProduct } from '../src/__generated__/apolloComponents';
import Layout from '../src/components/Layout';
import { ReactElement } from 'react';
import ProductCard from '../src/components/ProductCard/productCard';

export const getApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http://demomagento.com/graphql`,
      fetch,
    }),
  });
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = getApolloClient();
  console.log(params);

  const { data } = await apolloClient.query({
    query: GetProductsByCategoryDocument,
    variables: { id: 'Mw==' },
  });
  console.log(data);
  return { props: { data } };
};

const Products = ({ data }) => {
  return (
    <div className="content-body" data-testId="ProductServerList">
      <h1 className="h1 mx-6 font-bold text-2lg mb-8 mt-6">Food Products - Sample server side rendering</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {data &&
          data.products.items.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Products;
