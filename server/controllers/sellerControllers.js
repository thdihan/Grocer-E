const pool = require("../db");
const jwt = require("jsonwebtoken");

async function addParentCategory(user_id, category_name) {
  //   const alreadyAddedByUser = await pool.query(
  //     "select * from parent_categories where adder_id=$1 and parent_category_name=$2",
  //     [user_id, category_name]
  //   );

  //   if (alreadyAddedByUser.rowCount) {
  //     throw Error("You added this parent category once already");
  //   }

  const alreadyAddedByUser = await pool.query(
    "select * from parent_categories where parent_category_name=$1",
    [category_name]
  );

  if (alreadyAddedByUser.rowCount) {
    throw Error("This category already exist");
  }
  const addedParentCategory = await pool.query(
    "insert into parent_categories (adder_id,parent_category_name) values ($1,$2) returning *",
    [user_id, category_name]
  );
  return addedParentCategory;
}

const addCategory = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const categoryObject = req.body;
  console.log(categoryObject);

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(Object.keys(categoryObject).length);
    if (Object.keys(categoryObject).length === 1) {
      //if object with only one property (i.e. category_name) then it is added to parent category
      const addedParentCategory = await addParentCategory(
        _id,
        categoryObject.category_name
      );
      res.status(200).json({
        addedParentCategory,
      });
    } else {
      console.log("EMPTY");
    }
  } catch (error) {
    res.status(400).json({
      from: "add category",
      error: error.message,
    });
  }
};

module.exports = {
  addCategory,
};
