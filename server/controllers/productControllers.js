const pool = require("../db");
const jwt = require("jsonwebtoken");

const getSingleProductDetails = async (req, res) => {
  const { product_id } = req.query;
  try {
    const product = await pool.query(
      " SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount,p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM products p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON pcr.category_id = c.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE p.product_id = $1 GROUP BY p.product_id;",
      [product_id]
    );
    console.log(product.rows[0]);
    res.status(200).json({
      product: product.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get single product",
      error: error.message,
    });
  }
};

module.exports = {
  getSingleProductDetails,
};
