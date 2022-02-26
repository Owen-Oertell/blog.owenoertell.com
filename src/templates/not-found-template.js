// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="404: NOT FOUND">
        <p>Uh oh. You weren&#8217;t supposed to find this page...</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;