const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/user-controller");

// import middleware

// put nywhere we need to send a token for verification of user
router.route("/").post(createUser).put(saveBook);

router.route("/login").post(login);

router.route("/me").get(getSingleUser);

router.route("/books/:bookId").delete(deleteBook);

module.exports = router;
