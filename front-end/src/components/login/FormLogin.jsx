import React from 'react';
import PropTypes from 'prop-types';

import InputEmail from './InputEmail';
import InputPassword from './InputPassword';

function FormLogin({ login: { email, password }, onChange }) {
  return (
    <form>
      <h1>Login</h1>
      <InputEmail email={ email } onChange={ onChange } />
      <InputPassword password={ password } onChange={ onChange } />
    </form>
  );
}

FormLogin.propTypes = {
  login: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormLogin;
