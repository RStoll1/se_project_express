const { handleError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  console.error("Error in errorHandler:", err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return handleError(res, err);
}

module.exports.errorHandler = errorHandler;
