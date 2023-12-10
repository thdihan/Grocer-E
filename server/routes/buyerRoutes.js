const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { getProducts } = require("../controllers/buyerControllers");
const { addToCart } = require("../controllers/productControllers");

const router = express.Router();

router.route("/get-products").post(getProducts);
router.route("/add-to-cart").post(requireAuth, addToCart);

module.exports = router;
