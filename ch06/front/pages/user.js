
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar } from 'antd';
import PostCard from '../components/PostCard';

import * as postActions from '../reducers/post';
import * as userActions from '../reducers/user';

const User = ({ id }) => {

  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    dispatch({
      type: userActions.LOAD_USER_REQUEST,
      data: id,
    });

    dispatch({
      type: postActions.LOAD_USER_POST_REQUEST,
      data: id,
    });
  }, []);

  return (
    <div>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                트윗
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

// context: 서버측에서 전달한 데이터가 있음
User.getInitialProps = async (context) => {
  console.log('user getInitialProps', context.query.id);
  // component의 props로 데이터를 전달
  return { id: parseInt(context.query.id, 10) };
};

export default User;
