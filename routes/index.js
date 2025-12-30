const router = require("express").Router();
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItem");
const {
  validateLoginBody,
  validateUserBody,
} = require("../middlewares/validation");

// Public
router.post("/signin", validateLoginBody, login);

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signup", validateUserBody, createUser);
router.get("/items", getItems);

// Private
router.use("/users", auth, userRouter);
router.use("/items", auth, clothingItemRouter);

module.exports = router;
