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
    "select * from categories where category_name=$1",
    [category_name]
  );

  if (alreadyAddedByUser.rowCount) {
    throw Error("This category already exist");
  }
  const addedParentCategory = await pool.query(
    "insert into categories (seller_id,category_name) values ($1,$2) returning *",
    [user_id, category_name]
  );
  return addedParentCategory;
}

async function addChildCategory(user_id, category_name, parent_category_id) {
  console.log(user_id, category_name, parent_category_id);
  const alreadyAddedByUser = await pool.query(
    "select * from categories where category_name=$1",
    [category_name]
  );

  //   if (alreadyAddedByUser.rowCount) {
  //     throw Error("This category already exist");
  //   }

  let addedCategory;

  if (alreadyAddedByUser.rowCount) {
    const categoryId = BigInt(alreadyAddedByUser.rows[0].category_id);
    //if the category is already added
    if (categoryId === parent_category_id) {
      throw Error("Category can't be parent of itself");
    }
    const alreadyAddedRelation = await pool.query(
      "select * from category_parent_relationship where category_id=$1 and parent_category_id=$2",
      [categoryId, parent_category_id]
    );

    if (alreadyAddedRelation.rowCount) {
      throw Error("This category under the parent exists");
    }
    const addInJunctionTable = await pool.query(
      "insert into category_parent_relationship (parent_category_id,seller_id,category_id) values ($1,$2,$3) returning *",
      [parent_category_id, user_id, categoryId]
    );
    addedCategory = addInJunctionTable.rows[0];
  } else {
    //if the category is not added (add then make relation)
    const addedChildCategory = await pool.query(
      "insert into categories (seller_id,category_name) values ($1,$2) returning *",
      [user_id, category_name]
    );
    const addInJunctionTable = await pool.query(
      "insert into category_parent_relationship (parent_category_id,seller_id,category_id) values ($1,$2,$3) returning *",
      [
        parent_category_id,
        user_id,
        BigInt(addedChildCategory.rows[0].category_id),
      ]
    );
    addedCategory = addInJunctionTable.rows[0];
  }

  return addedCategory;
}

const addCategory = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const categoryObject = req.body;
  console.log(categoryObject);

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(Object.keys(categoryObject).length);
    if (Object.keys(categoryObject).length === 1) {
      //if object with only one property (i.e. category_name) then it is added to parent category
      const addedParentCategory = await addParentCategory(
        BigInt(_id),
        categoryObject.category_name
      );
      res.status(200).json({
        addedParentCategory,
      });
    } else {
      let data;
      for (const key in categoryObject) {
        if (key !== "category_name") {
          console.log("INN");
          const parentId = BigInt(categoryObject[key]);
          console.log(
            "DATA: ",
            BigInt(_id),
            categoryObject.category_name,
            parentId
          );
          const addedChildCategory = await addChildCategory(
            _id,
            categoryObject.category_name,
            parentId
          );
          console.log("ADDED: ", addedChildCategory);
          data = addedChildCategory;
        }
      }
      res.status(200).json({ addedChildCategory: data });
    }
  } catch (error) {
    res.status(400).json({
      from: "add category",
      error: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query("select * from categories");
    console.log(categories.rows);
    res.status(200).json({
      categories: categories.rows,
    });
  } catch (error) {
    res.status(400).json({
      from: "get all categories",
      error: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};
