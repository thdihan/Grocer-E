const pool = require("../db");
const jwt = require("jsonwebtoken");

const getProducts = async (req, res) => {
  const { category } = req.body;
  try {
    if (category === undefined) {
      const products = await pool.query(
        "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, aggregated_categories.category_ids, aggregated_categories.categories, COALESCE(SUM(op.quantity), 0) AS sell_quantity FROM products AS p INNER JOIN ( SELECT pcr.product_id, array_agg(c.category_id) AS category_ids, array_agg(c.category_name) AS categories FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id GROUP BY pcr.product_id ) AS aggregated_categories ON p.product_id = aggregated_categories.product_id LEFT JOIN ordered_product AS op ON p.product_id = op.product_id GROUP BY p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, aggregated_categories.category_ids, aggregated_categories.categories;"
      );
      console.log(products);
      res.status(200).json({
        products: products.rows,
      });
    } else {
      const products = await pool.query(
        "WITH AggregatedCategories AS ( SELECT pcr.product_id, array_agg(c.category_id) AS category_ids, array_agg(c.category_name) AS category_names FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id GROUP BY pcr.product_id ) SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, ac.category_ids, ac.category_names, COALESCE( ( SELECT SUM(op.quantity) FROM ordered_product AS op WHERE op.product_id = p.product_id ), 0 ) AS sell_quantity FROM products AS p INNER JOIN AggregatedCategories AS ac ON p.product_id = ac.product_id WHERE EXISTS ( SELECT 1 FROM product_category_relationship AS pcr WHERE pcr.product_id = p.product_id AND pcr.category_id = $1 );",
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
      "SELECT o.order_id, o.order_date, o.status,o.CUSTOMER_DETAILS, JSONB_AGG(jsonb_build_object('quantity', op.quantity, 'product_id', p.product_id, 'product_name', p.product_name, 'description', p.description, 'base_price', p.base_price, 'discount', p.discount, 'unit', p.unit, 'stock', p.stock, 'product_image', p.product_image)) AS product_list, u.user_id AS buyer_id, u.fullname AS buyer_username FROM orders o JOIN ordered_product op ON o.order_id = op.order_id JOIN products p ON op.product_id = p.product_id JOIN users u ON o.customer_id = u.user_id WHERE u.user_id = $1 GROUP BY o.order_id, o.order_date, o.status, u.user_id, u.fullname;",
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

const updateBuyerProfileInfo = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const { fullname, email, contact, address } = req.body;
  console.log("Update Buyer Profile Info", req.body);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query(
      "UPDATE users SET fullname = $1, email = $2, contact = $3, address = $4 WHERE user_id = $5 RETURNING *;",
      [fullname, email, contact, address, _id]
    );
    res.status(200).json({
      user: user.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "update buyer profile info",
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
      "WITH AggregatedCategories AS ( SELECT pcr.product_id, array_agg(c.category_id) AS category_ids, array_agg(c.category_name) AS categories FROM product_category_relationship AS pcr INNER JOIN categories AS c ON pcr.category_id = c.category_id GROUP BY pcr.product_id ) SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, ac.category_ids, ac.categories, COUNT(op.order_id) AS order_count FROM products p JOIN ordered_product op ON p.product_id = op.product_id JOIN orders o ON op.order_id = o.order_id LEFT JOIN AggregatedCategories ac ON p.product_id = ac.product_id WHERE o.customer_id = $1 GROUP BY p.product_id, ac.category_ids,   ac.categories ORDER BY order_count DESC;",
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

const postReview = async (req, res) => {
  const { rating, review, reviewer_fullname, product_id, _id } = req.body;
  try {
    const comment = await pool.query(
      "INSERT INTO reviews (rating, review_text, reviewer_id, reviewer_fullname, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [rating, review, _id, reviewer_fullname, product_id]
    );

    res.status(200).json({
      review: comment.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "post review",
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
  updateBuyerProfileInfo,
  postReview,
};
