import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from '../reducers/user';
import * as postActions from '../reducers/post';

import NicknameEditForm from '../containers/NicknameEditForm';
import PostCard from '../containers/PostCard';
import FollowList from '../components/FollowList';

const Profile = () => {
  const dispatch = useDispatch();

  const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

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

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: userActions.LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    })
  }, [followerList.length]);

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: userActions.LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length,
    })
  }, [followingList.length]);

  return (
    <>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        hasMore={hasMoreFollowing}
        onClickMore={loadMoreFollowings}
        data={followingList}
        onClickStop={onUnfollow}
      />
      <FollowList
        header="팔로워 목록"
        hasMore={hasMoreFollower}
        onClickMore={loadMoreFollowers}
        data={followerList}
        onClickStop={onRemoveFollower}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
    </>
  );
};

Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  const me = state.user.me;

  // 이 직전에 LOAD_USER_REQUEST
  context.store.dispatch({
    type: userActions.LOAD_FOLLOWERS_REQUEST,
    data: me && me.id,
  });
  context.store.dispatch({
    type: userActions.LOAD_FOLLOWINGS_REQUEST,
    data: me && me.id,
  });
  context.store.dispatch({
    type: postActions.LOAD_USER_POST_REQUEST,
    data: me && me.id,
  });

  // LOAD_USER_SUCCESS 되어 me가 생김
};

export default Profile;
