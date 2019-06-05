import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useInput } from '../pages/signup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

const LoginForm = () => {

  const [ id, onChangeId ] = useInput('');
  const [ password, onChangePassword ] = useInput('');
  const dispatch = useDispatch();

  //  useCallback: 자식 컴포넌트에 넘기는 함수는 useCallback으로 감싼다
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch(loginAction);
  }, [id, password]);

  return (
    <Form style={ { padding: '1rem' } } onSubmit={onSubmitForm}>
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
      <div style={ { marginTop: "1rem" } }>
        <Button type="primary" htmlType="submit" loading={false} >로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  )
}

export default LoginForm;