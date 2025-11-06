const ClothingItem = require('../models/clothingItem')
const errors = require('../utils/errors');

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(errors.STATUS_CREATED).send(item))
    .catch((err) => errors.handleError(res, err));
};

const getItems = (req, res) => {
  ClothingItem.find({}).then((items) =>
    res.status(errors.STATUS_OK).send(items))
    .catch((err) => errors.handleError(res, err));
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(errors.STATUS_OK).send(item))
    .catch((err) => errors.handleError(res, err));
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(errors.STATUS_OK).send(item))
    .catch((err) => errors.handleError(res, err));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findOneAndDelete({ _id: itemId, owner: req.user._id })
    .then((deleted) => {
      if (deleted) {
        return res.status(errors.STATUS_OK).send({ message: errors.ERR_DELETED });
      }
      return ClothingItem.findById(itemId)
        .then((found) => {
          if (!found) {
            return res.status(errors.STATUS_NOT_FOUND).send({ message: errors.ERR_NOT_FOUND });
          }
          return res.status(errors.STATUS_FORBIDDEN).send({ message: errors.ERR_NOT_AUTHORIZED });
        })
        .catch((err) => errors.handleError(res, err));
    })
    .catch((err) => errors.handleError(res, err));
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem
};