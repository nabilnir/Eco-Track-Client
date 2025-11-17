import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import useTitle from '../Hooks/useTitle';

const Login = () => {
  useTitle("Login")
  return <LoginForm />;
};

export default Login;