import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import reducer from '../reducers';
import sagaMiddlware from '../sagas/middleware';
import rootSaga from '../sagas';

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

export default withRedux((initialState, options) => {
  const middlewares = [sagaMiddlware];

  // compose: 미들웨어 여럿을 합성
  // applyMiddleware: 해당 미들웨어들을 적용
  const enhancer = process.env.NODE_ENV === 'production'
    // 적용한 미들웨어에 devtools 적용
    ? compose(applyMiddleware(...middlewares),)
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );

  const store = createStore(reducer, initialState, enhancer);
  sagaMiddlware.run(rootSaga);
  return store;
})(NodeBird);