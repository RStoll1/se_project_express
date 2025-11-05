const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');
const errors = require('./utils/errors');

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  }).catch(console.error);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '690ada4ba3209ae18114ffbc'
  };
  next();
});

app.use('/', mainRouter);

app.use((req, res) => {
  res.status(404).send({ message: errors.ERR_RESOURCE_NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
