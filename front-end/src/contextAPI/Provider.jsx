import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MyContext from './MyContext';

function Provider({ children }) {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem('token');

  const contextValue = {
    posts,
    setPosts,
    token,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
