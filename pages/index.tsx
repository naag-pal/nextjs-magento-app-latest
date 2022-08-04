import React from 'react';
import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import {
  GetHomeProductsDocument,
  GetHomeProductsQuery,
  GetHomeProductsQueryVariables,
  GetCmsPageDocument,
  GetCmsPageQuery,
  GetCmsPageQueryVariables,
  BundleProduct,
} from '../src/__generated__/apolloComponents';
import Layout from '../src/components/Layout';
import { NestedMetaData } from '../src/components/Layout/nestedMetaData';
import { ReactElement, useEffect } from 'react';
import ProductCard from '../src/components/ProductCard/productCard';
import ContentDisplay from '../src/components/PageBuilder/contentDisplay';
import { HomePageSlider, HomeQuickSearch, HomeCouponsDisplay } from '@magentopwa/components/HomePage';

const Home = () => {
  const { data, error, loading } = useQuery<GetHomeProductsQuery, GetHomeProductsQueryVariables>(
    GetHomeProductsDocument,
    {
      variables: { id: 'MTY=' },
    }
  );
  const {
    data: homePage,
    error: cmsError,
    loading: cmsLoading,
  } = useQuery<GetCmsPageQuery, GetCmsPageQueryVariables>(GetCmsPageDocument, {
    variables: { identifier: 'home' },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  }, []);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Loading</div>;

  if (cmsLoading) return <div>cmsError Loading</div>;
  if (cmsError) return <div>cmsError Loading</div>;

  return (
    <div className="content-body" data-testId="IndexPage">
      {/*
      <div>
        <HomePageBannerSlider>
          <div className="keen-slider__slide">
            <Image src="http://demomagento.com/media/wysiwyg/banner-1.JPG" width="1300" height="372" alt="" />
          </div>
          <div className="keen-slider__slide">
            <Image src="http://demomagento.com/media/wysiwyg/banner-2.JPG" width="1300" height="372" alt="" />
          </div>
          <div className="keen-slider__slide">
            <Image src="http://demomagento.com/media/wysiwyg/banner-3.JPG" width="1300" height="372" alt="" />
          </div>
        </HomePageBannerSlider>
      </div>
  */}

      <ContentDisplay content={homePage.cmsPage.content} />
      <div className="gap-4">
        <HomeQuickSearch />
      </div>
      <h1 className="h1 text-lg text-bold mt-8 mb-8">Shop New Launch products</h1>
      <div className="gap-4">
        <HomePageSlider>
          {data.products.items.map((product: BundleProduct) => {
            return (
              <div className="keen-slider__slide" key={product.uid}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </HomePageSlider>
      </div>
      <div className="gap-4">
        <HomeCouponsDisplay />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  const metadata = {
    title: 'Home page title',
    description: 'Home page description',
  };
  return (
    <Layout>
      <NestedMetaData metadata={metadata}>{page}</NestedMetaData>
    </Layout>
  );
};

export default Home;
