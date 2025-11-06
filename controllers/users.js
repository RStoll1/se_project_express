const User = require('../models/user');

// GET /users
const errors = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({}).then((users) =>
    res.status(errors.STATUS_OK).send(users))
    .catch((err) => errors.handleError(res, err));
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(errors.STATUS_CREATED).send(user))
    .catch((err) => errors.handleError(res, err));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(errors.STATUS_OK).send(user))
    .catch((err) => errors.handleError(res, err));
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};