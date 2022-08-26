import React from 'react';
import PropTypes from 'prop-types';

function InputPassword({ password, onChange }) {
  return (
    <label htmlFor="password">
      Senha
      <input
        type="password"
        id="password"
        name="password"
        value={ password }
        onChange={ onChange }
        placeholder="Digite sua senha aqui"
      />
    </label>
  );
}

InputPassword.propTypes = {
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputPassword;
