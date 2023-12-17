const pool = require("../db");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utilities/utility");

const addToCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { productList, priceTotal, discountTotal, productCount, cart_id } =
    req.body;

  console.log("Request Body: ", req.body);
  // console.log("PRODUCT LIST: ", productList);
  // console.log("PRICE TOTAL: ", typeof priceTotal);
  console.log("CART ID: ", cart_id);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    let cart;
    let cart_flag = 0;

    //CHECK IF A CART EXISTS
    if (cart_id && cart_id !== "") {
      const cartChecker = await pool.query(
        "select 1 from cart where cart_id=$1 and customer_id=$2 and status='pending'",
        [cart_id, _id]
      );
      cart_flag = cartChecker.rowCount > 0;
    }

    if (cart_flag) {
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
      // if (cart_flag) {
      //     await pool.query(
      //         "UPDATE cart_product SET quantity=$1 where cart_id=$2 AND product_id=$3 AND customer_id=$4",
      //         [
      //             product?.quantity,
      //             record?.cart_id,
      //             product?.product_id,
      //             record?.customer_id,
      //         ]
      //     );
      // } else {
      //     await pool.query(
      //         "INSERT INTO cart_product (cart_id, product_id, customer_id,quantity) VALUES ($1, $2, $3,$4) ON CONFLICT (cart_id, product_id, customer_id) DO NOTHING",
      //         [
      //             record?.cart_id,
      //             product?.product_id,
      //             record?.customer_id,
      //             product?.quantity,
      //         ]
      //     );
      // }
      await pool.query(
        "INSERT INTO cart_product (cart_id, product_id, customer_id,quantity) VALUES ($1, $2, $3,$4) ON CONFLICT (cart_id, product_id, customer_id) DO NOTHING",
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
      "select * from  cart where cart_id=$1 and customer_id=$2;",
      [cart_id, _id]
    );

    //UPDATING THE CART TABLE PRODUCTLIST ARRAY
    const productsArray = previousCart.rows[0].product_list;
    let previousQuantity;
    const indexOfProduct = productsArray.findIndex((product) => {
      if (BigInt(product.product_id) === BigInt(product_id)) {
        previousQuantity = product.quantity;
        return true; // Return true to stop the iteration once the desired product is found
      }
      return false; // Return false if the product_id doesn't match
    });
    if (indexOfProduct !== -1) {
      productsArray[indexOfProduct].quantity = parseInt(quantity);
    }
    /**NEED TO UPDATE THE TOTAL COUNT,TOTAL COST AND DISCOUNT */
    const cart = await pool.query(
      // "UPDATE cart SET product_list = $1,product_count=$2 WHERE customer_id = $3 AND cart_id = $4 returning *;",
      "UPDATE cart SET product_list = $1 WHERE customer_id = $2 AND cart_id = $3 returning *;",
      [
        productsArray,
        // previousCart.rows[0].product_count - previousQuantity + quantity, //new total
        _id,
        cart_id,
      ]
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

const confirmOrder = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { cart_id, customer_details } = req.body;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    //Updating the quantity in cart table
    const cart = await pool.query(
      "UPDATE cart SET status = 'done' WHERE customer_id = $1 AND cart_id = $2 returning *;",
      [_id, cart_id]
    );

    //Updating the product in cart_product table
    const record = cart?.rows[0];
    for (const product of record?.product_list) {
      await pool.query(
        "UPDATE cart_product SET status='done' WHERE customer_id = $1 AND cart_id = $2 AND product_id=$3",
        [_id, cart_id, product?.product_id]
      );
    }

    //Entry to the order table
    const order = await pool.query(
      "INSERT INTO orders (cart_id, customer_id, customer_details) VALUES ($1, $2, $3) returning *",
      [cart_id, _id, customer_details]
    );

    //Entry to order product table
    for (const product of record?.product_list) {
      await pool.query(
        "INSERT INTO ordered_product (product_id, order_id, quantity) VALUES ($1, $2, $3) returning *",
        [product?.product_id, order?.rows[0].order_id, product?.quantity]
      );

      //Updating the stock in the products table
      const stock_checker = await pool.query(
        "select * from products where product_id=$1",
        [product?.product_id]
      );
      const new_stock =
        stock_checker.rows[0].stock - product?.quantity >= 0
          ? stock_checker.rows[0].stock - product?.quantity
          : 0;
      console.log("STOCK: ", parseFloat(stock_checker.rows[0].stock));
      console.log("QUANTITY: ", product?.quantity);
      console.log("PRODUCT: ", product);
      const product_update = await pool.query(
        "UPDATE products SET stock = $1 WHERE product_id = $2 returning *",
        [new_stock, product?.product_id]
      );
      if (new_stock >= 0 && new_stock < 10) {
        //UPDATE STATUS
        if (new_stock === 0) {
          await pool.query(
            "UPDATE products SET status = 'Hidden' WHERE product_id=$1",
            [product?.product_id]
          );
        }
        //SEND WARNING EMAIL
        console.log("EMAILERS");
        const seller = await pool.query(
          "select email,fullname from users where user_type='admin' AND user_id=$1;",
          [product_update?.rows[0].seller_id]
        );

        const seller_record = seller.rows[0];
        const subject = "Product Stock Low Warning";
        const message = `Dear Seller, your product quantity is getting low/depleted. Please restock and update in the website to sell more.\nProduct ID: ${product_update?.rows[0].product_id}\nProduct Name: ${product_update?.rows[0].product_name}\nStock: ${product_update?.rows[0].stock}`;
        sendEmail(seller_record.email, subject, message);
      }
    }

    // console.log(order.rows[0]);
    res.status(200).json({
      order: order.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "confirm order",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCurrentCart,
  updateCartProducts,
  getPendingCartProducts,
  confirmOrder,
};
