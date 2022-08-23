const JWT = require('jsonwebtoken');

const secret = 'meuPastelEMaisBarato';
const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const authorization = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) return res.status(401).json({ message: 'token not found' });

    const decoded = JWT.verify(token, secret);
    const { data } = decoded;

    req.user = data;
    next();
  } catch (err) {
    console.log(`Erro no Authorization || ${err}`);
    return res.status(400).json({ message: 'invalid token' });
  }
};

module.exports = {
  secret,
  jwtConfig,
  authorization,
};
