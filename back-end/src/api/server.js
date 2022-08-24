require('dotenv').config();
const app = require('./app');

const { PORT } = process.env || 3001;

app.listen(PORT, () => (
  console.log(`App rodando na porta ${PORT}`)
));
