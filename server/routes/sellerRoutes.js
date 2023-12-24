const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const multer = require("multer"); // for handling file uploads
const path = require("path");

const {
    addCategory,
    getAllCategories,
    addProduct,
    getProducts,
    updateCategory,
    updateProduct,
    getAllOrder,
    getOrderedProducts,
} = require("../controllers/sellerControllers");

const { updateOrderStatus } = require("../controllers/cartContollers");

const router = express.Router();
// Create a multer storage configuration to save the uploaded file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
}); // You can use a disk storage if needed

const upload = multer({ storage: storage });

router.route("/add-category").post(requireAuth, addCategory);
router.route("/update-category").post(requireAuth, updateCategory);
router
    .route("/add-product")
    .post(requireAuth, upload.array("image"), addProduct);
router
    .route("/update-product")
    .put(requireAuth, upload.array("image"), updateProduct);
router.route("/get-all-categories").get(requireAuth, getAllCategories);
router.route("/update-order-status").put(requireAuth, updateOrderStatus);
router.route("/get-all-orders").get(requireAuth, getAllOrder);
router
    .route("/get-ordered-products/:orderId")
    .get(requireAuth, getOrderedProducts);

module.exports = router;
