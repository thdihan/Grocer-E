const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { getProducts } = require("../controllers/buyerControllers");

const router = express.Router();

router.route("/get-products").post(getProducts);

module.exports = router;
