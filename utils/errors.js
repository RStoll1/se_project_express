const ERR_VALIDATION = 'Validation failed';
const ERR_INTERNAL = 'Internal server error';
const ERR_NOT_FOUND = 'Item not found';
const ERR_USER_NOT_FOUND = 'User not found';
const ERR_INVALID_ID = 'Invalid id';
const ERR_NOT_AUTHORIZED = 'Not authorized to delete this item';
const ERR_DELETED = 'Item deleted successfully';
const ERR_RESOURCE_NOT_FOUND = 'Requested resource not found';

const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

function handleError(res, err) {
  if (err.name === 'CastError') {
    return res.status(STATUS_BAD_REQUEST).send({ message: ERR_INVALID_ID });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(STATUS_NOT_FOUND).send({ message: ERR_NOT_FOUND });
  }
  if (err.name === 'ValidationError') {
    return res.status(STATUS_BAD_REQUEST).send({ message: ERR_VALIDATION });
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
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  handleError,
};
