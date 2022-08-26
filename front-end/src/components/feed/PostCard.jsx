import React from 'react';
import PropTypes from 'prop-types';

function PostCard({ name, text }) {
  return (
    <div>
      <h3>{ name }</h3>
      <p>{ text }</p>
    </div>
  );
}

PostCard.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default PostCard;
