const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const multer = require("multer"); // for handling file uploads
const path = require("path");

const {
  addCategory,
  getAllCategories,
  addProduct,
} = require("../controllers/sellerControllers");

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
router
  .route("/add-product")
  .post(requireAuth, upload.array("image"), addProduct);
router.route("/get-all-categories").get(requireAuth, getAllCategories);

module.exports = router;
