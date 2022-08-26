import React from 'react';
import PropTypes from 'prop-types';

function ButtonEnter({ onClick }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      Entrar
    </button>
  );
}

ButtonEnter.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonEnter;
