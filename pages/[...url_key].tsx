import React from 'react';
import { useQuery } from '@apollo/client';
import {
  GetCategoryByUrlKeysDocument,
  GetCategoryByUrlKeysQuery,
  GetCategoryByUrlKeysQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import ProductsByCategory from '../src/components/Category/productsByCategory';
import ProductDetailPage from '../src/components/ProductDetail/productDetailPage';
import Layout from '../src/components/Layout';
import { NestedMetaData } from '@magentopwa/components/Layout/nestedMetaData';

const ProductList = () => {
  const router = useRouter();
  const { url_key } = router.query;

  const {
    data: catdata,
    error,
    loading,
  } = useQuery<GetCategoryByUrlKeysQuery, GetCategoryByUrlKeysQueryVariables>(GetCategoryByUrlKeysDocument, {
    variables: { urlKeys: url_key },
  });

  console.log('hello');
  console.log(url_key);

  console.log(catdata);
  console.log(error);
  console.log(loading);

  let CategoryPage = false;
  if (catdata && catdata.categories && catdata.categories.items && catdata.categories?.items.length > 0) {
    CategoryPage = true;
  }

  return (
    <div data-testid="ProductList">
      {catdata ? CategoryPage === true ? <ProductsByCategory /> : <ProductDetailPage /> : <></>}
    </div>
  );
};

ProductList.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { url_key } = router.query;
  const title = url_key && url_key.toString().replaceAll('-', ' ');
  const metadata = {
    title: `${title ? title[0].toUpperCase() + title.slice(1) : ''} Product page`,
    description: `${title ? title[0].toUpperCase() + title.slice(1) : ''} Product page description`,
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};

export default ProductList;
