const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const clothingItemRouter = require('./clothingItem');
const { login, createUser } = require('../controllers/users');
const { getItems } = require('../controllers/clothingItem');

// Public
router.post('/signin', login);
router.post('/signup', createUser);
router.get('/items', getItems);

// Private
router.use('/users', auth, userRouter);
router.use('/items', auth, clothingItemRouter);

module.exports = router;