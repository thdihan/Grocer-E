const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

const {
    signup,
    login,
    getUser,
    getRetentionDetails,
    updateUser,
} = require("../controllers/userControllers");
const {
    getSingleProductDetails,
    categoryBasedProductList,
    getPopularProductList,
    getPopularCategories,
    getSingleProductRecord,
    getSingleCategoryRecord,
    getSearchResult,
} = require("../controllers/productControllers");

const router = express.Router();

router.route("/").get(requireAuth, getUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/get-single-product").get(getSingleProductDetails);
router.route("/get-category-based-product").get(categoryBasedProductList);
router.route("/get-popular-products").get(getPopularProductList);
router.route("/get-popular-categories").get(getPopularCategories);
router.route("/get-single-product-record").get(getSingleProductRecord);
router.route("/get-single-category-record").get(getSingleCategoryRecord);
router.route("/get-search-results").get(getSearchResult);
router.route("/get-retention-details").get(getRetentionDetails);
router.route("/update-profile").put(requireAuth, updateUser);
//   router.route("/login").post(checkLogin);
//   router.route("/").get(requireAuth, getUser);
//   router.route("/forgot-password").post(checkEmail);
//   router.route("/reset-password/:id/:token").post(updatePassword);

module.exports = router;
