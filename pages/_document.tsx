import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { DocumentContext } from 'next/dist/shared/lib/utils';

const APP_NAME = 'Nextjs Magento App';
const APP_DESCRIPTION = 'Nextjs Magento Storefront App';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [...(initialProps.styles as any), ...sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  // <Html  data-theme="dark" data-font="small" ></Html>
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png"></link>
          <meta name="theme-color" content="#fff" />
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script> */}
        </Head>
        <body>
          <div className="onesignal-customlink-container"></div>
          <Main />
          <NextScript />
          <div id="nextPortal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
