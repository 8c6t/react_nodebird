import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POST_REQUEST } from '../reducers/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  // 성능 최적화(리렌더링)를 위해 useSelector로 쪼개는 것이 좋다
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POST_REQUEST,
    });
  }, []);

  return (
    <div>
      { me && <PostForm /> }
      { mainPosts.map(c => (
        <PostCard key={c} post={c} />
      ))}
    </div>
  );
};

export default Home;
