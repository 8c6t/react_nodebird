import React, { useEffect, useCallback } from 'react';
import { Button, List, Card, Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../reducers/user';
import * as postActions from '../reducers/post';

import NicknameEditForm from '../components/NicknameEditForm';
import PostCard from '../components/PostCard';

const Profile = () => {
  const dispatch = useDispatch();

  const { me, followingList, followerList } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    if (me) {
      dispatch({
        type: userActions.LOAD_FOLLOWERS_REQUEST,
        data: me.id,
      });
      dispatch({
        type: userActions.LOAD_FOLLOWINGS_REQUEST,
        data: me.id,
      });
      dispatch({
        type: postActions.LOAD_USER_POST_REQUEST,
        data: me.id,
      });
    }
  }, [me && me.id]);

  const onUnfollow = useCallback(userId => () => {
    dispatch({
      type: userActions.UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const onRemoveFollower = useCallback(userId => () => {
    dispatch({
      type: userActions.REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  }, []);

  return (
    <>
      <NicknameEditForm />
      <List
        style={{ marginBottom: '2rem' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: '2rem' }}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: '2rem' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: '2rem' }}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </>
  );
};

export default Profile;
