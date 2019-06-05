import { all, fork, call, put, take, takeLatest } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

const HELLO_SAGA = "HELLO_SAGA";

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

function* helloSaga() {
  console.log('before saga!');
  // 함수 자체가 종료되지 않도록,
  // 같은 액션 dispatch에 대해 동일하게 응답할 수 있도록
  // 무한 반복문을 사용
  while(true) {
    // take: 해당 액션이 dispatch 되면 제너레이터를 next 하는 이펙트
    yield take(HELLO_SAGA);
    console.log('hello saga!');
    // 비동기 요청, 타이머 등...
  }
}

// 사가 미들웨어에서 제너레이터의 next를 알아서 호출
export default function* userSaga() {
  yield helloSaga();
}