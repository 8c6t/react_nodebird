import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../reducers/user';

const UserProfile = () => {
  const { me } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: userActions.LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      actions={[
/*         <div key="twit">트윗<br />{me.Post.length}</div>,
        <div key="following">팔로잉<br />{me.Following.length}</div>,
        <div key="follower">팔로워<br />{me.Followers.length}</div>, */
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{ me.nickname[0] }</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};


export default UserProfile;
