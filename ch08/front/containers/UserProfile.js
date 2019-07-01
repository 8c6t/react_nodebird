import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

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
        <Link href="/profile" key="twit" prefetch>
          <a>
            <div>트윗<br />{me.Posts.length}</div>
          </a>
        </Link>,
        <Link href="/profile" key="following" prefetch>
          <a>
            <div>팔로잉<br />{me.Followings.length}</div>
          </a>
        </Link>,
        <Link href="/profile" key="follower" prefetch>
          <a>
            <div>팔로워<br />{me.Followers.length}</div>
          </a>
        </Link>,
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
