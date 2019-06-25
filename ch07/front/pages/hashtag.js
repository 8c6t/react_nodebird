import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as postActions from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => {
  console.log(tag);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);

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
  console.log('hashtag getInitialProps', context.query.tag);
  context.store.dispatch({
    type: postActions.LOAD_HASHTAG_POST_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;
