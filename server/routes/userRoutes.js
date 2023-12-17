const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const { signup, login, getUser } = require("../controllers/userControllers");
const {
    getSingleProductDetails,
    categoryBasedProductList,
    getPopularProductList,
} = require("../controllers/productControllers");

const router = express.Router();

router.route("/").get(requireAuth, getUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/get-single-product").get(getSingleProductDetails);
router.route("/get-category-based-product").get(categoryBasedProductList);
router.route("/get-popular-products").get(getPopularProductList);
//   router.route("/login").post(checkLogin);
//   router.route("/").get(requireAuth, getUser);
//   router.route("/forgot-password").post(checkEmail);
//   router.route("/reset-password/:id/:token").post(updatePassword);

module.exports = router;
