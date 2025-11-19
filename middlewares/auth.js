const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const errors = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // Authorization header check
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(errors.STATUS_UNAUTHORIZED)
      .send({ message: errors.ERR_AUTHENTICATION });
  }

  // Token extraction and verification
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(errors.STATUS_UNAUTHORIZED)
      .send({ message: errors.ERR_AUTHENTICATION });
  }

  req.user = payload;
  return next();
};

module.exports = auth;