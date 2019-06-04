import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from 'antd';

const dummy = {
  nickname: 'Hachicore',
  Post: [],
  Following: [],
  Followers: [],
  isLoggedIn: false
}

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search style={{ verticalAlign: 'middle' }} enterButton />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {dummy.isLoggedIn
            ?
            <Card
              actions={[
                <div key="twit">트윗<br />{dummy.Post.length}</div>,
                <div key="following">팔로잉<br />{dummy.Following.length}</div>,
                <div key="follower">팔로워<br />{dummy.Followers.length}</div>,
              ]}
            >
              <Card.Meta
                avatar={ <Avatar>{ dummy.nickname[0] }</Avatar> }
                title={ dummy.nickname }
              />
            </Card>
            : 
            <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>

        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout;