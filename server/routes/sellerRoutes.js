const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { addCategory } = require("../controllers/sellerControllers");

const router = express.Router();

router.route("/add-category").post(requireAuth, addCategory);

module.exports = router;
