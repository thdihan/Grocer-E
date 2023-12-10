const pool = require("../db");
const jwt = require("jsonwebtoken");

const getSingleProductDetails = async (req, res) => {
  const { product_id } = req.body;
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

const addToCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { productList, priceTotal, discountTotal, productCount } = req.body;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await pool.query(
      "INSERT INTO cart (customer_id,product_list, total_price, discount_total, product_count) VALUES ($1, $2, $3, $4,$5) RETURNING *",
      [_id, productList, priceTotal, discountTotal, productCount]
    );
    console.log(cart.rows[0]);
    res.status(200).json({
      cart: cart.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "add to cart",
      error: error.message,
    });
  }
};

module.exports = {
  getSingleProductDetails,
  addToCart,
};
