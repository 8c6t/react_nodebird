import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import * as postActions from '../reducers/post';

function addPostAPI() {

}

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

function addCommentAPI() {

}

function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: postActions.ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.ADD_COMMENT_FAILURE,
      error,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(postActions.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}
