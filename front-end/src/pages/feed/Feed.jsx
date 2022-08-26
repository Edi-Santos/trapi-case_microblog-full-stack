import React, { useContext, useEffect } from 'react';
import InputPost from '../../components/feed/InputPost';
import PostsList from '../../components/feed/PostsList';
import MyContext from '../../contextAPI/MyContext';

import request from '../../services/fetchAPI';

function Feed() {
  const { token, setAllPosts } = useContext(MyContext);

  useEffect(() => {
    const getPosts = async () => {
      const url = 'http://localhost:3001/post';
      const method = 'GET';
      const headers = {
        'Content-type': 'application/json; charset=utf8',
        Authorization: token,
      };

      const { posts } = await request(url, method, headers);

      setAllPosts(() => ({ posts }));
    };

    getPosts();
  }, [token, setAllPosts]);

  return (
    <main>
      <InputPost />
      <PostsList />
    </main>
  );
}

export default Feed;
