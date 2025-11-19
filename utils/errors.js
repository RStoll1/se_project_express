const ERR_VALIDATION = 'Validation failed';
const ERR_INTERNAL = 'Internal server error';
const ERR_NOT_FOUND = 'Item not found';
const ERR_USER_NOT_FOUND = 'User not found';
const ERR_CONFLICT = 'Resource already exists';
const ERR_INVALID_ID = 'Invalid id';
const ERR_NOT_AUTHORIZED = 'Not authorized to delete this item';
const ERR_DELETED = 'Item deleted successfully';
const ERR_RESOURCE_NOT_FOUND = 'Requested resource not found';
const ERR_AUTHENTICATION = 'Authentication error';

const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

function handleError(res, err) {
  if (err.name === 'CastError') {
    return res.status(STATUS_BAD_REQUEST).send({ message: ERR_INVALID_ID });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(STATUS_NOT_FOUND).send({ message: ERR_NOT_FOUND });
  }
  if (err.message === ERR_USER_NOT_FOUND) {
    return res.status(STATUS_NOT_FOUND).send({ message: ERR_USER_NOT_FOUND });
  }
  if (err.message === ERR_NOT_FOUND) {
    return res.status(STATUS_NOT_FOUND).send({ message: ERR_NOT_FOUND });
  }
  if (err.code === 11000 || (err.message && err.message.includes('duplicate key'))) {
    return res.status(STATUS_CONFLICT).send({ message: ERR_CONFLICT });
  }
  if (err.name === 'ValidationError') {
    return res.status(STATUS_BAD_REQUEST).send({ message: ERR_VALIDATION });
  }
  if (err.message && (err.message.includes('validation failed') || err.message.includes('Illegal arguments') || err.message.includes('required') || err.message.includes('Path'))) {
    return res.status(STATUS_BAD_REQUEST).send({ message: ERR_VALIDATION });
  }
  if (err.message && err.message.includes('Incorrect email or password')) {
    return res.status(STATUS_UNAUTHORIZED).send({ message: ERR_AUTHENTICATION });
  }
  if (err.name === 'AuthenticationError') {
    return res.status(STATUS_UNAUTHORIZED).send({ message: ERR_AUTHENTICATION });
  }
  return res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: ERR_INTERNAL });
}

module.exports = {
  ERR_VALIDATION,
  ERR_INTERNAL,
  ERR_NOT_FOUND,
  ERR_USER_NOT_FOUND,
  ERR_INVALID_ID,
  ERR_NOT_AUTHORIZED,
  ERR_DELETED,
  ERR_RESOURCE_NOT_FOUND,
  ERR_AUTHENTICATION,
  ERR_CONFLICT,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CONFLICT,
  handleError,
};
