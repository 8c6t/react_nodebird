import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const { user, isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  // 성능 최적화(리렌더링)를 위해 useSelector로 쪼개는 것이 좋다
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <div>
      { user ? <div>로그인 했습니다: { user.nickname } </div> : <div>로그아웃 했습니다.</div> }
      { isLoggedIn && <PostForm /> }
      { mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        )
      })}
    </div>
  )
};

export default Home;