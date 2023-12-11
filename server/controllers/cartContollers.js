const pool = require("../db");
const jwt = require("jsonwebtoken");

const addToCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { productList, priceTotal, discountTotal, productCount, cart_id } =
    req.body;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    let cart;

    if (cart_id && cart_id !== "") {
      //add to current cart
      cart = await pool.query(
        "UPDATE cart SET product_list = $1, total_price = $2, discount_total = $3, product_count = $4 WHERE customer_id = $5 AND cart_id=$6 AND status = 'pending' RETURNING *;",
        [productList, priceTotal, discountTotal, productCount, _id, cart_id]
      );
      console.log("CART UPDATED: ", cart.rows[0]);
    } else {
      //add to new cart
      cart = await pool.query(
        "INSERT INTO cart (customer_id,product_list, total_price, discount_total, product_count) VALUES ($1, $2, $3, $4,$5) RETURNING *",
        [_id, productList, priceTotal, discountTotal, productCount]
      );
      console.log("CART ADDED: ", cart.rows[0]);
    }

    //adding the product in cart_product table
    const record = cart?.rows[0];
    for (const product of record?.product_list) {
      await pool.query(
        "INSERT INTO cart_product (cart_id, product_id, customer_id, quantity) VALUES ($1, $2, $3, $4) ON CONFLICT (cart_id, product_id, customer_id,quantity) DO NOTHING",
        [
          record?.cart_id,
          product?.product_id,
          record?.customer_id,
          product?.quantity,
        ]
      );
    }

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

const getCurrentCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await pool.query(
      "SELECT * FROM cart WHERE customer_id = $1 AND status = 'pending';",
      [_id]
    );
    console.log(cart.rows[0]);
    res.status(200).json({
      cart: cart.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get cart",
      error: error.message,
    });
  }
};

const getPendingCartProducts = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await pool.query(
      "SELECT * FROM cart WHERE customer_id = $1 AND status = 'pending';",
      [_id]
    );
    console.log(cart.rows[0]);
    res.status(200).json({
      cart: cart.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get cart",
      error: error.message,
    });
  }
};

const updateCartProducts = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { product_id, cart_id, quantity } = req.body;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    //Updating the quantity in cart table
    const cart_product = await pool.query(
      "UPDATE cart_product SET quantity = $1 WHERE product_id = $2 AND cart_id = $3 AND customer_id = $4 returning *;",
      [quantity, product_id, cart_id, _id]
    );
    //Updating the quantity in cart_product table
    const previousCart = await pool.query(
      "select product_list from  cart where cart_id=$1 and customer_id=$2;",
      [cart_id, _id]
    );

    //UPDATING THE CART TABLE PRODUCTLIST ARRAY
    const productsArray = previousCart.rows[0].product_list;
    const indexOfProduct = productsArray.findIndex(
      (product) => product.product_id === parseInt(product_id)
    );
    if (indexOfProduct !== -1) {
      console.log("IN");
      productsArray[indexOfProduct].quantity = parseInt(quantity);
    }

    /**NEED TO UPDATE THE TOTAL COUNT,TOTAL COST AND DISCOUNT */
    const cart = await pool.query(
      "UPDATE cart SET product_list = $1 WHERE customer_id = $2 AND cart_id = $3 returning *;",
      [productsArray, _id, cart_id]
    );
    console.log(cart.rows[0]);
    res.status(200).json({
      cart: cart.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "update cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCurrentCart,
  updateCartProducts,
};
