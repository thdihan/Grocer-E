const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
  getProducts,
  getUserAllOrders,
} = require("../controllers/buyerControllers");
const {
  addToCart,
  getCurrentCart,
  updateCartProducts,
  getPendingCartProducts,
  confirmOrder,
} = require("../controllers/cartContollers");

const router = express.Router();

router.route("/get-products").post(getProducts);
router.route("/add-to-cart").post(requireAuth, addToCart);
router.route("/get-cart").get(requireAuth, getCurrentCart);
router.route("/get-pending-products").get(requireAuth, getPendingCartProducts);
router.route("/update-cart").put(requireAuth, updateCartProducts);
router.route("/confirm-order").post(requireAuth, confirmOrder);
router.route("/get-all-order").get(requireAuth, getUserAllOrders);

module.exports = router;
