
import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Login, LoginVariables } from './__generated__/Login';

export const LOGIN = gql`
  mutation Login ($input: LoginInput!) {
  login (input: $input) {
    ... on LoginSuccess {
      token
    }
    ... on EmailNotFoundError {
      message
    }
    ... on PasswordIncorrectError {
      message
    }
  }
}
`

type FormField = 'email' | 'password';

export function useLogin () {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mutate, { data, error, loading }] = useMutation<Login, LoginVariables>(LOGIN);

  const updateFormField = (field: FormField, value: string) => {
    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'password') {
      setPassword(value)
    }

    setErrorMessage('');
  }

  const submit = () => {
    const isEmailValid = () => {
      return email && email.indexOf('@') !== -1;
    }

    const isPasswordPresent = () => {
      return !!password
    };

    if (!isEmailValid()) {
      alert('Ya gotta enter a valid email.')
      return;
    }

    if (!isPasswordPresent()) {
      alert('Ya gotta enter a valid password too.');
      return;
    }

    mutate({ variables: { input: { email, password }}});
  }

  useEffect(() => {
    console.log(data?.login)
    switch (data?.login.__typename) {
      case 'EmailNotFoundError':
      case 'PasswordIncorrectError':
        console.log('error states')
        setErrorMessage(data.login.message);
        break;
      case 'LoginSuccess':
        console.log('success states')
        history.push('/dashboard');
        break;
      default:
        break;
    }
  }, [data])

  return {
    operations: { updateFormField, submit },
    state: { isLoggingIn: loading, errorMessage }
  }
}