const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Token Generation
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

function isValidFullname(fullname) {
  console.log(fullname);
  // Remove leading and trailing whitespace from the input
  fullname = fullname.trim();

  if (fullname.length < 3) {
    return false;
  }

  // Check if the full name contains only alphabetic characters
  if (!/^[a-zA-Z\s]+$/.test(fullname)) {
    return false;
  }

  return true;
}

async function validateUser(email, fullname, password, confirm_password) {
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (password !== confirm_password) {
    throw Error("Passwords don't match");
  }
  if (!isValidFullname(fullname)) {
    throw Error(
      "Fullname must contain alphabets and atleast 3 characters long"
    );
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const result = await pool.query("select * from users where email=$1", [
    email,
  ]);

  if (result.rowCount) {
    throw Error("An user with same email and type exists");
  }
}

const signup = async (req, res) => {
  const {
    email,
    password,
    fullname,
    contact,
    address,
    confirm_password,
    user_type,
  } = req.body;

  try {
    await validateUser(email, fullname, password, confirm_password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (user_type && user_type !== "") {
      newUser = await pool.query(
        "insert into users (fullname,password,email,user_type,contact,address) values ($1,$2,$3,$4,$5,$6) returning *",
        [fullname, hashedPassword, email, user_type, contact, address]
      );
    } else {
      newUser = await pool.query(
        "insert into users (fullname,password,email,user_type) values ($1,$2,$3,$4) returning *",
        [fullname, hashedPassword, email, "admin"]
      );
    }

    console.log(newUser.rows[0]);
    res.status(201).json({
      data: newUser.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      from: "signup",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw Error("Invalid email");
    }
    const result = await pool.query("select * from users where email=$1", [
      email,
    ]);
    if (!result.rowCount) {
      throw Error("Account doesn't exist");
    }

    const record = result.rows[0];

    const match = await bcrypt.compare(password, record.password);

    if (!match) {
      throw Error("Invalid password");
    }

    console.log(record);

    const token = generateToken(record.user_id);
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      from: "login",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query(
      "SELECT user_id, fullname, email, user_type FROM users WHERE user_id = $1;",
      [_id]
    );
    res.status(200).json({
      user: user.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      from: "getuser",
      error: error.message,
    });
  }
};

const getRetentionDetails = async (req, res) => {
  try {
    const retention = await pool.query(
      "WITH last_month_customers AS ( SELECT DISTINCT customer_id FROM orders WHERE EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE - INTERVAL '1 month') AND EXTRACT(MONTH FROM order_date) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '1 month') ) SELECT COUNT(DISTINCT current_month.customer_id) AS current_month_customers, COUNT(DISTINCT last_month.customer_id) AS last_month_customers, COUNT(DISTINCT CASE WHEN last_month.customer_id IS NOT NULL THEN current_month.customer_id END) AS retained_customers, COALESCE( CAST(COUNT(DISTINCT CASE WHEN last_month.customer_id IS NOT NULL THEN current_month.customer_id END) AS numeric) / NULLIF(COUNT(DISTINCT last_month.customer_id), 0), 0) * 100 AS retention_rate FROM last_month_customers last_month LEFT JOIN ( SELECT DISTINCT customer_id FROM orders WHERE EXTRACT(YEAR FROM order_date) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM order_date) = EXTRACT(MONTH FROM CURRENT_DATE) ) current_month ON last_month.customer_id = current_month.customer_id;"
    );
    res.status(200).json({
      retention: retention.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "get retention details",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const {
    current_password,
    new_password,
    confirm_password,
    address,
    contact,
    _id,
    fullname,
  } = req.body;

  try {
    let updated_user;
    if (!isValidFullname(fullname)) {
      throw Error(
        "Fullname must contain alphabets and atleast 3 characters long"
      );
    }
    if (current_password && current_password !== "") {
      const checker = await pool.query(
        "select password from users where user_id=$1",
        [_id]
      );
      const match = await bcrypt.compare(
        current_password,
        checker.rows[0].password
      );
      if (!match) {
        throw Error("Invalid password");
      }
      if (new_password !== confirm_password) {
        throw Error("Passwords don't match");
      }
      if (!validator.isStrongPassword(new_password)) {
        throw Error("Password not strong enough");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(current_password, salt);
      updated_user = await pool.query(
        "UPDATE users SET address = COALESCE($1, address), contact = COALESCE($2, contact),fullname = COALESCE($3, fullname), password=$4 WHERE user_id = $5 returning *;",
        [address, contact, fullname, hashedPassword, _id]
      );
    } else {
      updated_user = await pool.query(
        "UPDATE users SET address = COALESCE($1, address), contact = COALESCE($2, contact) WHERE user_id = $3 returning *;",
        [address, contact, _id]
      );
    }
    res.status(200).json({
      user: updated_user.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      from: "update-user",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  const { product_id } = req.query;
  try {
    const reviews = await pool.query(
      "SELECT * FROM REVIEWS WHERE product_id=$1;",
      [product_id]
    );

    res.status(200).json({
      reviews: reviews.rows,
    });
  } catch (error) {
    res.status(400).json({
      from: "get reviews",
      error: error.message,
    });
  }
};
module.exports = {
  signup,
  login,
  getUser,
  getRetentionDetails,
  updateUser,
  getReviews,
};
