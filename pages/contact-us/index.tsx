import React, { ReactElement } from 'react';
import Layout from '@magentopwa/components/Layout';
import {
  GetCmsPageDocument,
  GetCmsPageQuery,
  GetCmsPageQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { useQuery } from '@apollo/client';
import ContentDisplay from '@magentopwa/components/PageBuilder/contentDisplay';

const ContactUsPage = () => {
  const { data: contactUsPage } = useQuery<GetCmsPageQuery, GetCmsPageQueryVariables>(GetCmsPageDocument, {
    variables: { identifier: 'contact-us' },
  });

  return (
    <div className="container" data-testid="ContactUsPage">
      <h1 className="text-lg mt-4 mb-4">Contact Us</h1>
      <div> {contactUsPage && <ContentDisplay content={contactUsPage?.cmsPage?.content} />}</div>
    </div>
  );
};

ContactUsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ContactUsPage;
