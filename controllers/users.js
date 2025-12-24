const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');
const errors = require('../utils/errors');
const { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } = require('../middlewares/error-handler.js');

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email) {
    return next(new BadRequestError(errors.ERR_VALIDATION));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError(errors.ERR_CONFLICT));
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ name, avatar, email, password: hash })
            .then((user) => {
              const userObject = user.toObject();
              delete userObject.password;
              res.status(errors.STATUS_CREATED).send(userObject);
            })
            .catch((err) => {
              if (err && err.name === 'ValidationError') {
                return next(new BadRequestError(errors.ERR_VALIDATION));
              }
              if (err && err.code === 11000) {
                return next(new ConflictError(errors.ERR_CONFLICT));
              }
              return next(err);
            });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(errors.ERR_USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(errors.ERR_USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err && err.name === 'ValidationError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      if (err && err.name === 'CastError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

// POST /login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError(errors.ERR_VALIDATION));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ message: 'Login successful', token });
    })
    .catch((err) => {
      if (err && (err.name === 'AuthError' || err.message === errors.ERR_AUTH)) {
        return next(new UnauthorizedError(err.message || 'Invalid email or password'));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};