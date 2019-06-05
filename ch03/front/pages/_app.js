import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import reducer from '../reducers';

// Component: next에서 넣는 props(index, profile, signup 등)
// next에서는 next-redux-wrapper 패키지 설치 필요. props로 받음
const NodeBird = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.js" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
}

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
}

// 
export default withRedux((initialState, options) => {
  const store = createStore(reducer, initialState);
  // store 커스터마이징시...
  return store;
})(NodeBird);