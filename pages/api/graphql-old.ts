import { ApolloClient, DocumentNode, gql, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
/*
import { GetServerSideProps } from 'next';
import { GetProductsByCategoryDocument } from '../../src/__generated__/apolloComponents';
import { ReactElement } from 'react';
import Link from 'next/link';
*/

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export const getApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `http://demomagento.com/graphql`,
      fetch,
    }),
  });
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const apolloClient = getApolloClient();

  const {
    body: { operationName: type, query: apolloQuery, variables: queryVariables },
  } = request;

  const mutation = apolloQuery && apolloQuery.indexOf('mutation') === 0;
  const { data: d } =
    mutation === true
      ? await apolloClient.mutate({
          mutation: gql`
            ${apolloQuery}
          `,
          variables: queryVariables,
        })
      : await apolloClient.query({
          query: gql`
            ${apolloQuery}
          `,
          variables: queryVariables,
        });

  response.status(200).json(d);
}
