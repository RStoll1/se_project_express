const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const errors = require('./utils/errors');
const { errorHandler } = require('./middlewares/error-handler');
const { errors: celebrateErrors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  }).catch(console.error);

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use('/', mainRouter);

app.use((req, res) => {
  res.status(errors.STATUS_NOT_FOUND).send({ message: errors.ERR_RESOURCE_NOT_FOUND });
});

app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
