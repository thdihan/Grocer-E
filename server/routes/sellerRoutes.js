const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  addCategory,
  getAllCategories,
} = require("../controllers/sellerControllers");

const router = express.Router();

router.route("/add-category").post(requireAuth, addCategory);
router.route("/get-all-categories").get(requireAuth, getAllCategories);

module.exports = router;
