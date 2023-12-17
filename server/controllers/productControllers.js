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

const getPopularProductList = async (req, res) => {
    try {
        const products = await pool.query(
            "WITH RankedProducts AS (SELECT p.*, COUNT(op.product_id) AS productCount, ROW_NUMBER() OVER (ORDER BY COUNT(op.product_id) DESC) AS ROWNUM FROM products p LEFT JOIN ordered_product op ON p.product_id = op.product_id GROUP BY p.product_id) SELECT P.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id, array_agg(DISTINCT c.category_name) AS categories, array_agg(DISTINCT pc.parent_category_id) AS parent_categories FROM RankedProducts p JOIN product_category_relationship pcr ON p.product_id = pcr.product_id JOIN categories c ON c.category_id = pcr.category_id LEFT JOIN category_parent_relationship pc ON c.category_id = pc.category_id WHERE ROWNUM <= 5 GROUP BY p.ROWNUM, p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, p.seller_id; "
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

const getPopularCategoryBasedOnOrder = async (req, res) => {
    try {
        const categories = await pool.query(
            "SELECT c.category_id, c.category_name, COUNT(*) AS count FROM categories c JOIN product_category_relationship pcr ON c.category_id = pcr.category_id JOIN products p ON pcr.product_id = p.product_id JOIN orders o ON p.product_id = o.product_id GROUP BY c.category_id ORDER BY count DESC LIMIT 10;"
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
module.exports = {
    getSingleProductDetails,
    categoryBasedProductList,
    getPopularProductList,
};
