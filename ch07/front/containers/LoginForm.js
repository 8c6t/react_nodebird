import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { useInput } from '../pages/signup';
import * as userActions from '../reducers/user';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLoggingIn } = useSelector(state => state.user);

  const dispatch = useDispatch();

  //  useCallback: 자식 컴포넌트에 넘기는 함수는 useCallback으로 감싼다
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: userActions.LOG_IN_REQUEST,
      data: { userId: id, password },
    });
  }, [id, password]);

  return (
    <Form style={{ padding: '1rem' }} onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;
