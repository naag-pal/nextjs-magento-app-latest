import React, { ReactElement } from 'react';
import Layout from '@magentopwa/components/Layout';

const About = () => {
  return (
    <div className="container" data-testid="AboutUsPage">
      <h1 className="text-lg  mt-4 mb-4">About Us</h1>
      <div>About Us Sample Content</div>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
