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
    const alreadyAddedByUser = await pool.query(
        "select * from categories where category_name=$1",
        [category_name]
    );
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
    console.log("categoryObject", categoryObject);

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(Object.keys(categoryObject).length);
        if (Object.keys(categoryObject).length === 2) {
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
                if (key !== "category_name" && key !== "_id") {
                    const parentId = BigInt(categoryObject[key]);

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

const updateCategory = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const categoryObject = req.body;
    //   console.log("categoryObject", categoryObject);
    console.log("IN");
    try {
        console.log("BODY: ", categoryObject.category_id);
        const deleteParentEntries = await pool.query(
            "delete from category_parent_relationship where category_id=$1",
            [categoryObject.category_id]
        );

        const updateCategory = await pool.query(
            "update categories set category_name=$1 where category_id=$2 returning *",
            [categoryObject.category_name, categoryObject.category_id]
        );
        console.log("first");

        let data;
        if (categoryObject.null === null) {
            delete categoryObject.null;
        }

        for (const key in categoryObject) {
            if (
                key !== "category_name" &&
                key !== "category_id" &&
                key !== "_id"
            ) {
                console.log("CAT OBJS: ", categoryObject);
                const parentId = BigInt(categoryObject[key]);
                console.log(updateCategory.rows[0].category_id);

                const addedChildCategory = await addChildCategory(
                    updateCategory.rows[0].category_id,
                    categoryObject.category_name,
                    parentId
                );
                data = addedChildCategory;
            }
        }

        res.status(200).json({ addedChildCategory: data });
    } catch (error) {
        res.status(400).json({
            from: "update category",
            error: error.message,
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await pool.query(
            "WITH allCategories AS ( SELECT pc.category_id, pc.category_name, array_agg(DISTINCT cpr.parent_category_id) AS parent_id, array_agg(DISTINCT c.category_name) AS parent_name FROM categories pc LEFT JOIN category_parent_relationship cpr ON pc.category_id = cpr.category_id LEFT JOIN categories c ON cpr.parent_category_id = c.category_id GROUP BY pc.category_id, pc.category_name ) SELECT c.category_id, c.category_name, c.parent_id, c.parent_name, COUNT(p.product_id) AS product_count FROM allCategories c LEFT JOIN product_category_relationship pcr ON c.category_id = pcr.category_id LEFT JOIN products p ON p.product_id = pcr.product_id GROUP BY c.category_id, c.category_name, c.parent_id, c.parent_name;"
        );
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

const addProduct = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const {
        product_name,
        discount,
        base_price,
        unit,
        stock,
        categories,
        description,
    } = req.body;
    console.log(req.body);
    const imageFile = req.files[0];
    console.log(imageFile.filename);
    console.log(product_name);

    try {
        const productExists = await pool.query(
            "select * from products where product_name=$1",
            [product_name]
        );
        if (productExists.rowCount) {
            throw Error("Product already exists");
        }
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const productEntry = await pool.query(
            "INSERT INTO products (product_name, discount, base_price, unit, stock,seller_id,product_image,description ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            [
                product_name,
                discount,
                base_price,
                unit,
                stock,
                BigInt(_id),
                imageFile.filename,
                description,
            ]
        );

        const product_id = productEntry.rows[0].product_id; // Assuming _id is the product ID

        const categoryArray = categories.split(",");
        // Insert records into product_category for each category ID
        for (const category_id of categoryArray) {
            const relation = await pool.query(
                "INSERT INTO product_category_relationship (product_id, category_id,seller_id) VALUES ($1, $2, $3)",
                [BigInt(product_id), BigInt(category_id), BigInt(_id)]
            );
            console.log(relation.rows[0]);
        }
        console.log(productEntry.rows);
        res.status(200).json({
            categories: productEntry.rows,
        });
    } catch (error) {
        res.status(400).json({
            from: "add product",
            error: error.message,
        });
    }
};

// const getAllOrder = async (req, res) => {
//     console.log("WORKED");

//     try {
//         const order = await pool.query(
//             "select * from orders o join ordered_product op on o.order_id = op.order_id"
//         );
//         res.status(200).json({
//             order: order.rows,
//         });
//     } catch (error) {
//         res.status(400).json({
//             from: "get all order",
//             error: error.message,
//         });
//     }
// };
const getAllOrder = async (req, res) => {
    try {
        const order = await pool.query(
            "select * from orders o join users u on o.customer_id = u.user_id;"
        );
        res.status(200).json({
            order: order.rows,
        });
    } catch (error) {
        res.status(400).json({
            from: "get all order",
            error: error.message,
        });
    }
};

const getOrderedProducts = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await pool.query(
            "select * from orders o join ordered_product op on o.order_id = op.order_id join products p on op.product_id = p.product_id where o.order_id=$1",
            [orderId]
        );
        res.status(200).json({
            order: order.rows,
        });
    } catch (error) {
        res.status(400).json({
            from: "get all order",
            error: error.message,
        });
    }
};
const updateProduct = async (req, res) => {
    const {
        product_name,
        discount,
        base_price,
        unit,
        stock,
        categories,
        description,
        product_id,
    } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("BODY: ", req.body);

    const imageFile = req.files[0];
    console.log(imageFile?.filename);
    console.log("product_id", product_id);

    try {
        //UPDATE PRODUCT TABLE
        const updatedProduct = await pool.query(
            "UPDATE PRODUCTS SET PRODUCT_NAME = COALESCE($1, PRODUCT_NAME), DISCOUNT = COALESCE($2, DISCOUNT), BASE_PRICE = COALESCE($3, BASE_PRICE), UNIT = COALESCE($4, UNIT), STOCK = COALESCE($5, STOCK), DESCRIPTION = COALESCE($6, DESCRIPTION), product_image=COALESCE($7, product_image) WHERE PRODUCT_ID = $8 RETURNING *;",
            [
                product_name,
                discount,
                base_price,
                unit,
                stock,
                description,
                imageFile?.filename,
                BigInt(product_id),
            ]
        );

        //UPDATE PRODUCT CATEGORY RELATIONSHIP TABLE
        await pool.query(
            "DELETE FROM product_category_relationship WHERE product_id = $1",
            [BigInt(product_id)]
        );

        const categoryArray = categories.split(",");

        for (const category_id of categoryArray) {
            await pool.query(
                "INSERT INTO product_category_relationship (product_id, category_id, seller_id) VALUES ($1, $2, $3)",
                [BigInt(product_id), BigInt(category_id), BigInt(_id)]
            );
        }
        res.status(200).json({
            updatedProduct: updatedProduct.rows[0],
        });
    } catch (error) {
        res.status(400).json({
            from: "update product",
            error: error.message,
        });
    }
};

// Count orders based on status
const getOrderStatusCount = async (req, res) => {
    try {
        const orderStatusCount = await pool.query(
            "SELECT status, COUNT(*) FROM orders GROUP BY status;"
        );
        res.status(200).json({
            orderStatusCount: orderStatusCount.rows,
        });
    } catch (error) {
        res.status(400).json({
            from: "get order status count",
            error: error.message,
        });
    }
};
module.exports = {
    addCategory,
    getAllCategories,
    addProduct,
    updateCategory,
    updateProduct,
    getAllOrder,
    getOrderedProducts,
    getOrderStatusCount,
};

// ("SELECT p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image, array_agg(c.category_id) AS category_ids, array_agg(c.category_name) AS category_names FROM products AS p INNER JOIN product_category_relationship AS pcr ON p.product_id = pcr.product_id INNER JOIN categories AS c ON pcr.category_id = c.category_id GROUP BY p.product_id, p.product_name, p.description, p.base_price, p.discount, p.unit, p.stock, p.product_image;");
