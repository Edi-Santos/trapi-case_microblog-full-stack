import React, { useContext } from 'react';

import PostCard from './PostCard';

import MyContext from '../../contextAPI/MyContext';

function PostsList() {
  const { allPosts } = useContext(MyContext);
  const { posts } = allPosts;

  if (posts !== undefined) {
    return posts.map((post, index) => {
      const { name, text } = post;

      return (
        <article key={ index }>
          <PostCard name={ name } text={ text } />
        </article>
      );
    });
  }
}

export default PostsList;
