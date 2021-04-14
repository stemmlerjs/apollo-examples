
import React from 'react'
import Button from '../../shared/components/button/Button';
import Layout from '../../shared/components/layout/Layout';
import TextInput from '../../shared/components/textInput/TextInput';
import { useLogin } from './useLogin';

const LoginPage = () => {
  const { operations, state } = useLogin();

  return (
    <Layout>
      <h1>Login</h1>
      <p>Here's where you'll want to enter your lovely one-of-a-kind credentials.</p>

      {state.errorMessage && <blockquote>{state.errorMessage}</blockquote> }

      <h2>Email</h2>
      <TextInput
        type="email" 
        onChange={(val) => operations.updateFormField('email', val)}
        placeholder="Enter email here"
      />

      <h2>Password</h2>
      <TextInput
        type='password'
        onChange={(val) => operations.updateFormField('password', val)}
        placeholder="Enter password here"
      />
      <Button text="Submit" onSubmit={() => operations.submit()}/>
    </Layout>
  )
}

export default LoginPage;