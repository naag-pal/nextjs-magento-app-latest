import React, { ReactElement, useEffect } from 'react';
import Layout from '../src/components/Layout';
import Button from '../src/components/UI/Button';
import { NestedMetaData } from '../src/components/Layout/nestedMetaData';

const OfflinePage = () => {
  useEffect(() => {
    const checkNetworkAndReload = async () => {
      try {
        const response = await fetch('.');
        // Verify we get a valid response from the server
        if (response.status >= 200 && response.status < 500) {
          window.location.reload();
          return;
        }
      } catch {
        // Unable to connect to the server, ignore.
      }
    };
    window.setTimeout(function () {
      checkNetworkAndReload();
    }, 5000);
  }, []);

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="container text-center" data-testId="OfflinePage">
      <h1 className="text-lg  mt-4 mb-4">You are offline</h1>
      <p className="mt-10 mb-10">Click the button below to try reloading.</p>
      <Button type="button" onClick={reload}>
        Reload
      </Button>
    </div>
  );
};

OfflinePage.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: 'OfflinePage',
    description: 'OfflinePage',
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};
export default OfflinePage;
