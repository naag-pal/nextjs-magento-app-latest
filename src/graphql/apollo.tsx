import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
  //uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_LOCAL_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user && user.authToken;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token && token !== '' ? `Bearer ${token}` : '',
    },
  };
});
const MagentoApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MagentoApolloProvider;
