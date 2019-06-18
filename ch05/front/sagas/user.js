import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as userActions from '../reducers/user';

axios.defaults.baseURL = 'http://localhost:8620/api';

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    // call: 동기 호출
    const result = yield call(loginAPI, action.data);
    yield put({ // put은 dispatch와 동일
      type: userActions.LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.LOG_IN_FAILURE });
  }
}

// 액션 실행 여부 대기
function* watchLogin() {
  yield takeEvery(userActions.LOG_IN_REQUEST, login);
}


function signUpAPI(signUpData) {
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({ type: userActions.SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.SIGN_UP_FAILURE, error });
  }
}

function* watchSignUp() {
  yield takeEvery(userActions.SIGN_UP_REQUEST, signUp);
}


function logoutAPI() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logout(action) {
  try {
    yield call(logoutAPI);
    yield put({ type: userActions.LOG_OUT_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.LOG_OUT_FAILURE });
  }
}

function* watchLogout() {
  yield takeEvery(userActions.LOG_OUT_REQUEST, logout);
}


function loadUserAPI() {
  return axios.get('/user/', {
    withCredentials: true,
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: userActions.LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.LOAD_USER_FAILURE });
  }
}

function* watchLoadUser() {
  yield takeEvery(userActions.LOAD_USER_REQUEST, loadUser);
}

// 사가 미들웨어에서 제너레이터의 next를 알아서 호출
export default function* userSaga() {
  // 이벤트 리스너 간에는 순서가 상관 없듯
  // 가급적 fork를 붙여준다
  yield all([
    fork(watchLogin), // fork: 비동기 호출
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp),
  ]);
}
