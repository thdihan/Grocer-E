const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//Token Generation
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
  const { email, fullname, password, confirm_password, user_type } = req.body;

  try {
    await validateUser(email, fullname, password, confirm_password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "insert into users (fullname,password,email,user_type) values ($1,$2,$3,$4) returning *",
      [fullname, hashedPassword, email, "admin"]
    );

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

module.exports = {
  signup,
  login,
};
