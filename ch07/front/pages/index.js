import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POST_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  // 성능 최적화(리렌더링)를 위해 useSelector로 쪼개는 것이 좋다
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  // scrollY: 스크롤 내린 거리
  // clientHeight: 화면 높이
  // scrollHeight: 전체 화면 길이
  const onScroll = () => {
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      dispatch({
        type: LOAD_MAIN_POST_REQUEST,
        lastId: mainPosts[mainPosts.length - 1].id,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);

  return (
    <div>
      { me && <PostForm /> }
      { mainPosts.map(c => (
        <PostCard key={c} post={c} />
      ))}
    </div>
  );
};

Home.getInitialProps = async (context) => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POST_REQUEST,
  });
};

export default Home;
