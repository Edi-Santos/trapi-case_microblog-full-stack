const JWT = require('jsonwebtoken');
const User = require('../services/User');

const { secret, jwtConfig } = require('../auth/authorization');

const login = async (req, res) => {
  const userDatas = req.body;

  try {
    const user = await User.login(userDatas);

    const token = JWT.sign({ data: user }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(`Erro no Controller || ${err}`);
  }
};

module.exports = {
  login,
};
