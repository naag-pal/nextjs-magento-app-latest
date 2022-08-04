import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import MagentoApolloProvider from '../src/graphql/apollo';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from '../src/contexts/auth/AuthContext';
import { ShoppingAppProvider } from '../src/contexts/shopping';
import { FiltersAppProvider } from '../src/contexts/filters';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  /*
  // TODO:  one signal setup
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: '51d06462-8c44-4ba7-8215-1a5eb845ce61',
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []);
  */

  return (
    <MagentoApolloProvider>
      <AuthProvider>
        <ShoppingAppProvider>
          <FiltersAppProvider>
            <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
          </FiltersAppProvider>
        </ShoppingAppProvider>
      </AuthProvider>
    </MagentoApolloProvider>
  );
}

export default MyApp;
