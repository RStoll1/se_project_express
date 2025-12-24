const ClothingItem = require('../models/clothingItem')
const errors = require('../utils/errors');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../middlewares/error-handler.js');

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(errors.STATUS_CREATED).send(item))
    .catch((err) => {
      if (err && err.name === 'ValidationError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({}).then((items) =>
    res.send(items))
    .catch((err) => next(err));
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new NotFoundError(errors.ERR_NOT_FOUND))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => new NotFoundError(errors.ERR_NOT_FOUND))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findOneAndDelete({ _id: itemId, owner: req.user._id })
    .then((deleted) => {
      if (deleted) {
        return res.send({ message: errors.ERR_DELETED });
      }
      return ClothingItem.findById(itemId)
        .then((found) => {
          if (!found) {
            return next(new NotFoundError(errors.ERR_NOT_FOUND));
          }
          return next(new ForbiddenError(errors.ERR_NOT_AUTHORIZED));
        })
        .catch((err) => {
          if (err && err.name === 'CastError') {
            return next(new BadRequestError(errors.ERR_VALIDATION));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err && err.name === 'CastError') {
        return next(new BadRequestError(errors.ERR_VALIDATION));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem
};