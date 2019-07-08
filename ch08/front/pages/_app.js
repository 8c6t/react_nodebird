import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Container } from 'next/app';

import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';

import { LOAD_USER_REQUEST } from '../reducers/user';

// Component: next에서 넣는 props(index, profile, signup 등)
// next에서는 next-redux-wrapper 패키지 설치 필요. props로 받음
const NodeBird = ({ Component, store, pageProps }) => (
  <Container>
    <Provider store={store}>
      <Helmet
        title="NodeBird"
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charSet: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: 'NodeBird SNS',
        }, {
          name: 'og:title', content: 'NodeBird',
        }, {
          name: 'og:description', content: 'NodeBird SNS',
        }, {
          property: 'og:type', content: 'website',
        }, {
          property: 'og:image', content: 'http://localhost:3131/favicon.ico',
        }]}
        link={[{
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
        }]}
        script={[{
          src: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.js'
        }]}
      />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  </Container>
);

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// next에서 넘겨준 context
NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};

  const state = ctx.store.getState();
  // 서버 측에서 쿠키를 직접 전송. req 같은 정보는 서버 환경에서만 있음
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

  // 프론트 서버에 쿠키가 없을 경우 axios 쿠키 초기화
  axios.defaults.headers.Cookie = '';

  // 서버 환경이고 쿠키라면
  if (ctx.isServer && cookie) {
    axios.defaults.headers.cookie = cookie;
  }

  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }

  // 각 페이지에 getInitialProps가 있으면 실행
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
  }

  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  // compose: 미들웨어 여럿을 합성
  // applyMiddleware: 해당 미들웨어들을 적용
  const enhancer = process.env.NODE_ENV === 'production'
    // 적용한 미들웨어에 devtools 적용
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );

  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
