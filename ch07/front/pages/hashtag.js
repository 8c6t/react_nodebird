import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as postActions from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: postActions.LOAD_HASHTAG_POST_REQUEST,
            lastId: mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
        countRef.current.push(lastId);
      }
    }
  }, [mainPosts.length, hasMorePost]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost]);

  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.number.isRequired,
};

// 라이프사이클 메소드. componentDidMount보다 먼저 실행됨
// SSR을 위해 사용
Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  console.log('hashtag getInitialProps', tag);
  context.store.dispatch({
    type: postActions.LOAD_HASHTAG_POST_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
