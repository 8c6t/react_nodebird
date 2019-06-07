import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import * as postActions from '../reducers/post';

function* addPost() {
  try {
    yield delay(2000);
    yield put({
      type: postActions.ADD_POST_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.ADD_POST_FAILURE,
      error,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(postActions.ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}
