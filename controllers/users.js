const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');
const errors = require('../utils/errors');

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    return res.status(errors.STATUS_BAD_REQUEST).send({ message: errors.ERR_VALIDATION });
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(errors.STATUS_CONFLICT).send({ message: errors.ERR_CONFLICT });
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ name, avatar, email, password: hash })
            .then((user) => {
              const userObject = user.toObject();
              delete userObject.password;
              res.status(errors.STATUS_CREATED).send(userObject);
            })
            .catch((err) => errors.handleError(res, err));
        })
        .catch((err) => errors.handleError(res, err));
    })
    .catch((err) => errors.handleError(res, err));
};

// GET /users/me
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => new Error(errors.ERR_USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => errors.handleError(res, err));
};

// PATCH /users/me
const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .orFail(() => new Error(errors.ERR_USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => errors.handleError(res, err));
};

// POST /login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(errors.STATUS_BAD_REQUEST).send({ message: errors.ERR_VALIDATION });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ message: 'Login successful', token });
    })
    .catch((err) => {
      errors.handleError(res, err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};