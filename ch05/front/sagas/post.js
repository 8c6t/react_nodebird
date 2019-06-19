import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as postActions from '../reducers/post';

function addPostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: postActions.ADD_POST_SUCCESS,
      data: result.data,
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

function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: postActions.LOAD_MAIN_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.LOAD_MAIN_POST_FAILURE,
      error,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(postActions.LOAD_MAIN_POST_REQUEST, loadMainPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}
