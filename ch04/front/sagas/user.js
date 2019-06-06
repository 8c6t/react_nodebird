import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import * as userActions from '../reducers/user';

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI() {
  // 서버에 요청을 보내는 부분
}

function* login() {
  try {
    // call: 동기 호출
    // fork: 비동기 호출
    yield call(loginAPI);
    // put은 dispatch와 동일
    yield put({ type: userActions.LOG_IN_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.LOG_IN_FAILURE });
  }
}

// 액션 실행 여부 대기
function* watchLogin() {
  yield takeEvery(userActions.LOG_IN_REQUEST, login);
}

function signUpAPI() {
  // 서버에 요청을 보냄
}

function* signUp() {
  try {
    yield call(signUpAPI);
    yield put({ type: userActions.SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    yield put({ type: userActions.SIGN_UP_FAILURE });
  }
}


function* watchSignUp() {
  yield takeEvery(userActions.SIGN_UP_REQUEST, signUp);
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

function* hello() {
  yield delay(1000);
  yield put({ type: 'BYE_SAGA' });
}

function* watchHello() {
  // takeEvery를 사용하면 while(true)를 사용하지 않아도 된다
/*   yield takeEvery(HELLO_SAGA, function*() {
    yield put({ type: 'BYE_SAGA' })
  }); */

  // 여러 번 호출된 경우 마지막 호출에 대해서만 유효
  // 이전 요청이 끝나지 않은게 있다면 이전 요청을 취소함
  yield takeLatest(HELLO_SAGA, hello);
}

/* function* watchHello() {
  while(true) {
    yield take(HELLO_SAGA);
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);
  }
} */

// 사가 미들웨어에서 제너레이터의 next를 알아서 호출
export default function* userSaga() {
  // 이벤트 리스너 간에는 순서가 상관 없듯
  // 가급적 fork를 붙여준다
  yield all([
    fork(watchLogin),
    fork(watchHello),
    fork(watchSignUp),
  ]);
}
