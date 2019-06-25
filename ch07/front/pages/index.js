import React from 'react';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POST_REQUEST } from '../reducers/post';

const Home = () => {
  // 성능 최적화(리렌더링)를 위해 useSelector로 쪼개는 것이 좋다
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const { me } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

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
