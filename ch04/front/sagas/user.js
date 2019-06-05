import { all, fork, call, put, take, takeLatest, delay } from 'redux-saga/effects';
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
  while(true) {
    yield take(LOG_IN);
    yield delay(2000);
    // put: saga의 dispatch
    yield put({
      type: LOG_IN_SUCCESS
    });
  }
}

function* watchSignUp() {

}

/* function* watchSaga() {
  console.log('before saga!');
  // 함수 자체가 종료되지 않도록,
  // 같은 액션 dispatch에 대해 동일하게 응답할 수 있도록
  // 무한 반복문을 사용
  // while(true) {

  // 횟수에 제한을 두고 싶다면...
  // 사가에서는 동작하지 않아도 리듀서는 동작함
  for(let i = 0; i < 5; i++) {
    // take: 해당 액션이 dispatch 되면 제너레이터를 next 하는 이펙트
    yield take(HELLO_SAGA);
    console.log('hello saga!');
    // 비동기 요청, 타이머 등...
  }
} */

// 사가 미들웨어에서 제너레이터의 next를 알아서 호출
export default function* userSaga() {
  yield all([
    // watchSaga(),
    watchLogin(),
    watchSignUp()
  ]);
}