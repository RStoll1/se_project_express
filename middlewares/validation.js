const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "The minimum length for the name is 2 characters.",
      "string.max": "The maximum length for the name is 30 characters.",
      "string.empty": "The name field cannot be empty.",
    }),

    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.empty": "The weather field cannot be empty.",
      "any.only": "The weather must be one of: hot, warm, cold.",
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The imageUrl field cannot be empty.",
      "string.uri": "The imageUrl must be a valid URL.",
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "The minimum length for the name is 2 characters.",
      "string.max": "The maximum length for the name is 30 characters.",
      "string.empty": "The name field cannot be empty.",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The avatar field cannot be empty.",
      "string.uri": "The avatar must be a valid URL.",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field cannot be empty.",
      "string.email": "The email must be a valid email address.",
    }),
    password: Joi.string().required().min(6).messages({
      "string.empty": "The password field cannot be empty.",
      "string.min": "The minimum length for the password is 6 characters.",
    }),
  }),
});

module.exports.validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field cannot be empty.",
      "string.email": "The email must be a valid email address.",
    }),
    password: Joi.string().required().min(6).messages({
      "string.empty": "The password field cannot be empty.",
      "string.min": "The minimum length for the password is 6 characters.",
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.length": "The ID must be 24 hexadecimal characters.",
      "string.hex": "The ID must contain only hexadecimal characters.",
      "string.empty": "The ID field cannot be empty.",
    }),
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required().messages({
        "string.length": "The ID must be 24 hexadecimal characters.",
        "string.hex": "The ID must contain only hexadecimal characters.",
        "string.empty": "The ID field cannot be empty.",
      }),
    }),
  }),
});
