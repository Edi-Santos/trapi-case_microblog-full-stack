const request = (url, method, headers, body) => {
  const options = {
    method,
    headers,
    body,
  };

  return fetch(url, options)
    .then((response) => response.json());
};

module.exports = request;
