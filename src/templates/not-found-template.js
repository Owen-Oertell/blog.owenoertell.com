// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';



const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  let url = "/depth_and_breadth.png";

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="404: NOT FOUND">
        <p>It appears that this route doesn't exist... but enjoy a fun XKCD:</p>
        <img src={url} alt="hopefully an xkcd comic" loading="lazy"/> 
      </Page>
    </Layout>
  );
};


export default NotFoundTemplate;
