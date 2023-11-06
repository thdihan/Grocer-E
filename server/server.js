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
app.use(express.static("public"));

//error handler
app.use(errorHandler);

//route imports
const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");

//routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);

//listening the server
app.listen(process.env.SERVER_PORT || 5001, () => {
  console.log(
    `App listening on http://localhost:${process.env.SERVER_PORT || 5001}`
  );
});
