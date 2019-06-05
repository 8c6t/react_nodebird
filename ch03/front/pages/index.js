import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';

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

const Home = () => {

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
  console.log(user);

  // Hooks를 이용한 redux dispatch
  useEffect(() => {
    dispatch(userActions.loginAction);
    dispatch(userActions.logoutAction);
    dispatch(userActions.loginAction);
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

export default Home;