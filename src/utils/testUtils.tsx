// https://testing-library.com/docs/react-testing-library/setup/

import React from 'react';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import MagentoApolloProvider from '@magentopwa/graphql/apollo';
import { ThemeProvider } from '@material-tailwind/react';
import { AuthProvider } from '@magentopwa/contexts/auth/AuthContext';
import { ShoppingAppProvider } from '@magentopwa/contexts/shopping';
import { FiltersAppProvider } from '@magentopwa/contexts/filters';

export * from '@testing-library/react';

// https://github.com/vercel/next.js/issues/7479#issuecomment-659859682
// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof render>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

const mockRouter: NextRouter = {
  basePath: '',
  isReady: true,
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
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

// Where you add your providers for mock testing wrapper
export function customRender(
  ui: RenderUI,
  {
    wrapper,
    router,
    mocks,
    testState,
    ...options
  }: RenderOptions & { mocks?: MockedResponse[] } & { testState?: boolean } = {}
) {
  wrapper = ({ children }) =>
    testState ? (
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <ShoppingAppProvider>
            <FiltersAppProvider>
              <ThemeProvider>
                <RouterContext.Provider value={{ ...mockRouter, ...router }}>{children}</RouterContext.Provider>
              </ThemeProvider>
            </FiltersAppProvider>
          </ShoppingAppProvider>
        </AuthProvider>
      </MockedProvider>
    ) : (
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>{children}</RouterContext.Provider>
      </MockedProvider>
    );

  /*

  wrapper = ({ children }) => (
    <MagentoApolloProvider>
      <AuthProvider>
        <ShoppingAppProvider>
          <FiltersAppProvider>
            <ThemeProvider>
              <MockedProvider mocks={mocks}>
                <RouterContext.Provider value={{ ...mockRouter, ...router }}>{children}</RouterContext.Provider>
              </MockedProvider>
            </ThemeProvider>
          </FiltersAppProvider>
        </ShoppingAppProvider>
      </AuthProvider>
    </MagentoApolloProvider>
  );



  */

  return render(ui, { wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
