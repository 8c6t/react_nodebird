import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';

// Component: next에서 넣는 props(index, profile, signup 등)
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.js" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType
}

export default NodeBird;