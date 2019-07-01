import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as postActions from '../reducers/post';

const CommentForm = ({ post }) => {
  const { me } = useSelector(state => state.user);
  const [commentText, setCommentText] = useState('');
  const { commentAdded, isAddingComment } = useSelector(state => state.post);

  const dispatch = useDispatch();

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();

    if (!me) {
      return alert('로그인이 필요합니다');
    }

    dispatch({
      type: postActions.ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
  }, [me && me.id, commentText]);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onSubmit={onSubmitComment}>
      <Form.Item>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment}>멘션</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
