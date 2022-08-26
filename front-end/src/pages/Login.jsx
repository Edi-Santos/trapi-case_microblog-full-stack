import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormLogin from '../components/login/FormLogin';
import ButtonLogin from '../components/login/ButtonLogin';

import request from '../services/fetchAPI';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const url = 'http://localhost:3001/login';
    const method = 'POST';
    const headers = {
      'Content-type': 'application/json',
    };
    const body = { ...login };

    const requestLogin = await request(url, method, headers, JSON.stringify(body));

    if (requestLogin.message) return alert(requestLogin.message);

    if (requestLogin.token) {
      const { token } = requestLogin;

      localStorage.setItem('token', token);
      return navigate('/feed');
    }
  };

  return (
    <main>
      <FormLogin login={ login } onChange={ handleChange } />
      <ButtonLogin onClick={ handleClick } />
    </main>
  );
}

export default Login;
