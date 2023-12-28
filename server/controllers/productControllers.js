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

const categoryBasedProductList = async (req, res) => {
  const { category_id } = req.query;
  console.log(category_id, typeof category_id);
  try {
    const category = await pool.query(
      "select category_name from categories where category_id=$1",
      [category_id]
    );
    const products = await pool.query(
      "WITH RECURSIVE category_hierarchy AS (SELECT c.category_id, c.category_name, cp.parent_category_id FROM categories c LEFT JOIN category_parent_relationship cp ON c.category_id = cp.category_id WHERE c.category_id = $1 UNION ALL SELECT c.category_id, c.category_name, cp.parent_category_id FROM categories c JOIN category_parent_relationship cp ON c.category_id = cp.category_id JOIN category_hierarchy ch ON c.category_id = ch.parent_category_id ) SELECT ch.category_id, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image FROM category_hierarchy ch JOIN product_category_relationship pcr ON ch.category_id = pcr.category_id JOIN products p ON pcr.product_id = p.product_id GROUP BY ch.category_id, ch.category_name, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image;",
      [category_id]
    );
    res.status(200).json({
      products: {
        count: products?.rowCount,
        category_name: category?.rows[0].category_name,
        productList: products?.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      from: "get category based product",
      error: error.message,
    });
  }
};

("WITH RankedProducts AS ( SELECT p.*, COUNT(op.product_id) AS productCount, ROW_NUMBER() OVER (ORDER BY COUNT(op.product_id) DESC) AS ROWNUM FROM products p JOIN ordered_product op ON p.product_id = op.product_id GROUP BY p.product_id ) SELECT P.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_id) AS category_ids, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM RankedProducts p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON c.category_id = pcr.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE ROWNUM <= 5 GROUP BY p.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id ORDER BY ROWNUM;");

const getPopularProductList = async (req, res) => {
  console.log("get popular product list");
  try {
    const products = await pool.query(
      "WITH RankedProducts AS ( SELECT p.*, COUNT(op.product_id) AS productCount, ROW_NUMBER() OVER (ORDER BY COUNT(op.product_id) DESC) AS ROWNUM FROM products p JOIN ordered_product op ON p.product_id = op.product_id GROUP BY p.product_id ) SELECT P.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_id) AS category_ids, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM RankedProducts p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON c.category_id = pcr.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE ROWNUM <= 5 GROUP BY p.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id ORDER BY ROWNUM;"
    );
    res.status(200).json({
      products: {
        count: products?.rowCount,
        productList: products?.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      from: "get popular product",
      error: error.message,
    });
  }
};

const getPopularCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      "WITH RankedProducts AS (SELECT c.*, COUNT(op.product_id) AS productCount, ROW_NUMBER() OVER (ORDER BY COUNT(op.product_id) DESC) AS ROWNUM FROM products p JOIN ordered_product op ON p.product_id = op.product_id JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON pcr.category_id = c.category_id GROUP BY c.category_id) SELECT * FROM RankedProducts p WHERE ROWNUM <= 5;"
    );
    res.status(200).json({
      categories: {
        count: categories?.rowCount,
        categoryList: categories?.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      from: "get popular category",
      error: error.message,
    });
  }
};

const getSingleProductRecord = async (req, res) => {
  const { product_id, start_time, end_time } = req.query;
  console.log(req.query);
  try {
    const product = await pool.query(
      "SELECT  COALESCE(SUM(op.quantity), 0) AS total_quantity_sold FROM ordered_product op JOIN  orders o ON op.order_id = o.order_id WHERE op.product_id = $1 AND o.order_date BETWEEN $2 AND $3;",
      [product_id, start_time, end_time]
    );
    console.log(product.rows[0]);
    res.status(200).json({
      product: product.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get single product record",
      error: error.message,
    });
  }
};

const getSingleCategoryRecord = async (req, res) => {
  const { category_id, start_time, end_time } = req.query;
  console.log(req.query);
  try {
    const category = await pool.query(
      "SELECT COALESCE(SUM(op.quantity), 0) AS total_quantity_sold FROM ordered_product op JOIN orders o ON op.order_id = o.order_id JOIN product_category_relationship pcr ON op.product_id = pcr.product_id WHERE pcr.category_id = $1 AND o.order_date BETWEEN $2 AND $3;",
      [category_id, start_time, end_time]
    );
    console.log(category.rows[0]);
    res.status(200).json({
      category: category.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get single category record",
      error: error.message,
    });
  }
};

const getSearchResult = async (req, res) => {
  const { text } = req.query;
  try {
    const productSearch = await pool.query(
      "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM products p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON pcr.category_id = c.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE LOWER(p.product_name) LIKE LOWER($1) GROUP BY p.product_id;",
      [`%${text}%`]
    );

    const categorySearch = await pool.query(
      "SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM products p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON pcr.category_id = c.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE LOWER(c.category_name) LIKE LOWER($1) GROUP BY p.product_id;",
      [`%${text}%`]
    );

    const combinedSearchResult = [
      ...productSearch.rows,
      ...categorySearch.rows,
    ];

    //TO REMOVE THE DUPLICATES
    const uniqueSearchResult = Array.from(
      new Set(combinedSearchResult.map((item) => item.product_id))
    ).map((product_id) =>
      combinedSearchResult.find((item) => item.product_id === product_id)
    );

    res.status(200).json({
      result: uniqueSearchResult,
    });
  } catch (error) {
    res.status(400).json({
      from: "get search result",
      error: error.message,
    });
  }
};

module.exports = {
  getSingleProductDetails,
  categoryBasedProductList,
  getPopularProductList,
  getPopularCategories,
  getSingleProductRecord,
  getSingleCategoryRecord,
  getSearchResult,
};
