import React, { useContext, useState } from 'react';

import MyContext from '../../contextAPI/MyContext';

import request from '../../services/fetchAPI';

function InputPost() {
  const userName = localStorage.getItem('userName');
  const { token } = useContext(MyContext);
  const [postDatas, setPostDatas] = useState({
    name: userName,
    text: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setPostDatas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const url = 'http://localhost:3001/post';
    const method = 'POST';
    const headers = {
      'Content-type': 'application/json',
      Authorization: token,
    };
    const body = { ...postDatas };

    await request(url, method, headers, JSON.stringify(body));

    window.location.reload();
  };

  return (
    <form>
      <label htmlFor="text">
        Faça uma publicação
        <input
          type="text"
          name="text"
          id="text"
          onChange={ handleChange }
          placeholder="Escreva aqui..."
        />
      </label>

      <button
        type="button"
        onClick={ handleClick }
      >
        Publicar
      </button>
    </form>
  );
}

export default InputPost;
