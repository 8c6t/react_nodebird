import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
}

function* login() {
  try {
    yield call(loginAPI);
    // put은 dispatch와 동일
    yield put({
      type: LOG_IN_SUCCESS
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

// 액션 실행 여부 대기
function* watchLogin() {
  yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin)
  ]);
}