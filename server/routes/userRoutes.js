const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { signup, login } = require("../controllers/userControllers");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
//   router.route("/login").post(checkLogin);
//   router.route("/").get(requireAuth, getUser);
//   router.route("/forgot-password").post(checkEmail);
//   router.route("/reset-password/:id/:token").post(updatePassword);

module.exports = router;
