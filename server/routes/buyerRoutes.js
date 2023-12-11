const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { getProducts } = require("../controllers/buyerControllers");
const {
  addToCart,
  getCurrentCart,
  updateCartProducts,
} = require("../controllers/cartContollers");

const router = express.Router();

router.route("/get-products").post(getProducts);
router.route("/add-to-cart").post(requireAuth, addToCart);
router.route("/get-cart").get(requireAuth, getCurrentCart);
router.route("/update-cart").put(requireAuth, updateCartProducts);

module.exports = router;
