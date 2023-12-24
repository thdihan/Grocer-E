const pool = require("../db");
const jwt = require("jsonwebtoken");

const getProducts = async (req, res) => {
  const { category } = req.body;
  try {
    if (category === undefined) {
      const products = await pool.query(
        "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, array_agg(c.category_id) AS category_ids, array_agg(c.category_name) AS category_names, COALESCE(SUM(op.quantity), 0) AS sell_quantity FROM products AS p INNER JOIN product_category_relationship AS pcr ON p.product_id = pcr.product_id INNER JOIN categories AS c ON pcr.category_id = c.category_id LEFT JOIN ordered_product AS op ON p.product_id = op.product_id GROUP BY p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image;"
      );
      console.log(products);
      res.status(200).json({
        products: products.rows,
      });
    } else {
      const products = await pool.query(
        "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, (SELECT array_agg(c.category_id) FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id WHERE pcr.product_id = p.product_id) AS category_ids, (SELECT array_agg(c.category_name) FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id WHERE pcr.product_id = p.product_id) AS category_names, COALESCE((SELECT SUM(op.quantity) FROM ordered_product AS op WHERE op.product_id = p.product_id), 0) AS sell_quantity FROM products AS p WHERE EXISTS ( SELECT 1 FROM product_category_relationship AS pcr WHERE pcr.product_id = p.product_id AND pcr.category_id = $1 );",
        [category]
      );
      console.log(products);
      res.status(200).json({
        products: products.rows,
      });
    }
  } catch (error) {
    res.status(400).json({
      from: "get all categories",
      error: error.message,
    });
  }
};

const getUserAllOrders = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(_id);
    const orders = await pool.query(
      "SELECT o.order_id, o.order_date, o.status, JSONB_AGG(jsonb_build_object('quantity', op.quantity, 'product_id', p.product_id, 'product_name', p.product_name, 'description', p.description, 'base_price', p.base_price, 'discount', p.discount, 'unit', p.unit, 'stock', p.stock, 'product_image', p.product_image)) AS product_list, u.user_id AS buyer_id, u.fullname AS buyer_username FROM orders o JOIN ordered_product op ON o.order_id = op.order_id JOIN products p ON op.product_id = p.product_id JOIN users u ON o.customer_id = u.user_id WHERE u.user_id = $1 GROUP BY o.order_id, o.order_date, o.status, u.user_id, u.fullname;",
      [_id]
    );
    res.status(200).json({
      orders: orders.rows,
    });
  } catch (error) {
    res.status(400).json({
      from: "get user all order",
      error: error.message,
    });
  }
};

const getBuyerProfileInfo = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1;", [
      _id,
    ]);
    res.status(200).json({
      user: user.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get buyer profile info",
      error: error.message,
    });
  }
};

const getFrequentBoughtProducts = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const products = await pool.query(
      "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, COUNT(op.order_id) AS order_count FROM products p JOIN ordered_product op ON p.product_id = op.product_id JOIN orders o ON op.order_id = o.order_id WHERE o.customer_id = $1 GROUP BY p.product_id ORDER BY order_count DESC;",
      [_id]
    );
    res.status(200).json({
      products: products.rows,
    });
  } catch (error) {
    res.status(400).json({
      from: "get frequently bought products",
      error: error.message,
    });
  }
};

const getLastOrderedDate = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const ordered_date = await pool.query(
      "SELECT MAX(order_date) AS last_ordered_date FROM orders WHERE customer_id = $1;",
      [_id]
    );

    //CONTVERING THE DATE TO STANDARD TIME
    const originalDate = new Date(ordered_date.rows[0].last_ordered_date);
    const newDate = new Date(originalDate.getTime() + 6 * 60 * 60 * 1000);

    res.status(200).json({
      ordered_date: newDate.toISOString(),
    });
  } catch (error) {
    res.status(400).json({
      from: "get last ordered date",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getUserAllOrders,
  getBuyerProfileInfo,
  getFrequentBoughtProducts,
  getLastOrderedDate,
};

("SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, (SELECT array_agg(c.category_id) FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id WHERE pcr.product_id = p.product_id) AS category_ids, (SELECT array_agg(c.category_name) FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id WHERE pcr.product_id = p.product_id) AS category_names, COALESCE((SELECT SUM(op.quantity) FROM ordered_product AS op WHERE op.product_id = p.product_id), 0) AS sell_quantity FROM products AS p WHERE EXISTS ( SELECT 1 FROM product_category_relationship AS pcr WHERE pcr.product_id = p.product_id AND pcr.category_id = $1 );");
