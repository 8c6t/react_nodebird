import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as postActions from '../reducers/post';

// addPost
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

// addComment
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

// loadMainPosts
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

// loadHashtagPosts
function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: postActions.LOAD_HASHTAG_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.LOAD_HASHTAG_POST_FAILURE,
      error,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(postActions.LOAD_HASHTAG_POST_REQUEST, loadHashtagPosts);
}

// loadUserPosts
function loadUserPostsAPI(id) {
  return axios.get(`/user/${id}/posts`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: postActions.LOAD_USER_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.LOAD_USER_POST_FAILURE,
      error,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(postActions.LOAD_USER_POST_REQUEST, loadUserPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
  ]);
}
