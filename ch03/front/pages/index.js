import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';

import * as userActions from '../reducers/user';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'hachicore',
    },
    content: '첫번째 게시글',
    img: 'http://img.hani.co.kr/imgdb/resize/2018/0313/00500561_20180313.JPG'
  }],
}

const Home = ({ user, login, logout }) => {

  useEffect(() => {
    login(),
    logout(),
    login()
  }, []);

  return (
    <div>
      { user ? <div>로그인 했습니다: { user.nickname } </div> : <div>로그아웃 했습니다.</div> }
      {dummy.isLoggedIn && <PostForm /> }
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        )
      })}
    </div>
  )
};

const mapStateToProps = (state) => ({
  // root store -> user store
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(userActions.loginAction),
    logout: () => dispatch(userActions.logoutAction)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);