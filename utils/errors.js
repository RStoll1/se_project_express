const ERR_VALIDATION = 'Validation failed';
const ERR_INTERNAL = 'Internal server error';
const ERR_NOT_FOUND = 'Item not found';
const ERR_USER_NOT_FOUND = 'User not found';
const ERR_INVALID_ID = 'Invalid id';
const ERR_NOT_AUTHORIZED = 'Not authorized to delete this item';
const ERR_DELETED = 'Item deleted successfully';
const ERR_RESOURCE_NOT_FOUND = 'Requested resource not found';

function handleError(res, err) {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: ERR_INVALID_ID });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: ERR_NOT_FOUND });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: ERR_VALIDATION });
  }
  return res.status(500).send({ message: ERR_INTERNAL });
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
  handleError,
};
