import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as postActions from '../reducers/post';
import * as userActions from '../reducers/user';

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


// addPost
function addPostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({ // post reducer 데이터 수정
      type: postActions.ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({ // user reducer 데이터 수장
      type: userActions.ADD_POST_TO_ME,
      data: result.data.id,
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
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: postActions.ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data,
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


// loadHashtagPosts
function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${encodeURIComponent(tag)}`);
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
  return axios.get(`/user/${id || 0}/posts`);
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


// loadComment
function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: postActions.LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.LOAD_COMMENTS_FAILURE,
      error,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(postActions.LOAD_COMMENTS_REQUEST, loadComments);
}

// loadComment
function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: postActions.UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.UPLOAD_IMAGES_FAILURE,
      error,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(postActions.UPLOAD_IMAGES_REQUEST, uploadImages);
}

// likePost
function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true,
  });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: postActions.LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.LIKE_POST_FAILURE,
      error,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(postActions.LIKE_POST_REQUEST, likePost);
}

// unlikePost
function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true,
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: postActions.UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.UNLIKE_POST_FAILURE,
      error,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(postActions.UNLIKE_POST_REQUEST, unlikePost);
}

// retweet
function retweetAPI(postId) {
  // post 요청은 데이터가 없더라도 빈 객체라도 넣어야한다
  return axios.post(`/post/${postId}/retweet`, {}, {
    withCredentials: true,
  });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: postActions.RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: postActions.RETWEET_FAILURE,
      error,
    });
    alert(error.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(postActions.RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadComments),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
  ]);
}
