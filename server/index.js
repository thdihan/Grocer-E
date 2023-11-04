//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

//middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//listening the server
app.listen(process.env.SERVER_PORT || 5001, () => {
  console.log(
    `App listening on http://localhost:${process.env.SERVER_PORT || 5001}`
  );
});
