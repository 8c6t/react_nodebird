import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as userActions from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI); // call: 동기 호출
    yield delay(2000);
    yield put({ type: userActions.LOG_IN_SUCCESS }); // put은 dispatch와 동일
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
  return axios.post('http://localhost:8620/api/user/', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({ type: userActions.SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.SIGN_UP_FAILURE });
  }
}

function* watchSignUp() {
  yield takeEvery(userActions.SIGN_UP_REQUEST, signUp);
}

// 사가 미들웨어에서 제너레이터의 next를 알아서 호출
export default function* userSaga() {
  // 이벤트 리스너 간에는 순서가 상관 없듯
  // 가급적 fork를 붙여준다
  yield all([
    fork(watchLogin), // fork: 비동기 호출
    fork(watchSignUp),
  ]);
}
