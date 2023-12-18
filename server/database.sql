create database grocere;

\l --Use this to see all the databases present in your system
\c grocere -- Use this to connect to the grocere database
\dt --use this to see all the relations in the database
\! cls -- to clear screen


drop table users;

CREATE TABLE users (
    user_id bigserial PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL DEFAULT 'admin',
    address VARCHAR(255),
    contact VARCHAR(20) DEFAULT 'N/A' CHECK (contact <> ''),
    CONSTRAINT email_user_type_unique UNIQUE (email, user_type),
    CONSTRAINT valid_user_type CHECK (user_type IN ('admin', 'customer'))
);

-- ALTER TABLE users
-- ADD COLUMN address VARCHAR(255),
-- ADD COLUMN contact VARCHAR(20) DEFAULT 'N/A' CHECK (contact <> '');



drop table categories;
drop table parent_categories;

CREATE TABLE categories (
    category_id serial PRIMARY KEY,
    category_name varchar(255) NOT NULL,
    seller_id bigint,
    CONSTRAINT category_user_fk FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

CREATE TABLE category_parent_relationship (
    category_id bigint,
    parent_category_id bigint,
    seller_id bigint,
    CONSTRAINT category_parent_pk PRIMARY KEY (category_id, parent_category_id),
    CONSTRAINT category_fk FOREIGN KEY (category_id) REFERENCES categories(category_id) ON delete cascade,
    CONSTRAINT parent_category_fk FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) On delete cascade
);

drop table products;

CREATE TABLE products (
    product_id bigserial PRIMARY KEY,
    product_name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255),
    base_price NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0.00,
    unit VARCHAR(50) NOT NULL,
    stock NUMERIC NOT NULL CONSTRAINT check_stock_non_negative CHECK (stock >= 0),
    product_image VARCHAR(100),
    seller_id bigint,
    status VARCHAR(20) DEFAULT 'Published' CHECK (status IN ('Hidden', 'Published')),
    CONSTRAINT category_user_fk FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

-- ALTER TABLE products
-- ADD COLUMN status VARCHAR(20) DEFAULT 'Published' CHECK (status IN ('Hidden', 'Published'));

-- UPDATE products
-- SET status = 'Published'
-- WHERE status IS NULL;

drop table product_category_relationship;
CREATE TABLE product_category_relationship (
    product_id bigint,
    category_id bigint,
    seller_id bigint,
    CONSTRAINT product_category_pk PRIMARY KEY (product_id, category_id),
    CONSTRAINT category_fk FOREIGN KEY (category_id) REFERENCES categories(category_id) ON delete cascade,
    CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES products(product_id) On delete cascade,
    CONSTRAINT seller_fk FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

drop table cart;

CREATE TABLE cart (
    cart_id bigserial PRIMARY KEY,
    customer_id bigint,
    product_list JSONB[],
    total_price NUMERIC NOT NULL,
    discount_total NUMERIC NOT NULL DEFAULT 0.0,
    product_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    CONSTRAINT valid_status CHECK (status IN ('pending', 'done')),
    CONSTRAINT category_cart_fk FOREIGN KEY (customer_id) REFERENCES users(user_id)
);

drop table cart_product;

CREATE TABLE cart_product (
    cart_id bigint,
    product_id bigint,
    customer_id bigint,
    quantity INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    CONSTRAINT valid_cart_product_status CHECK (status IN ('pending', 'done')),
    CONSTRAINT cart_product_fk_cart FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    CONSTRAINT cart_product_fk_product FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT cart_product_fk_customer FOREIGN KEY (customer_id) REFERENCES users(user_id),
    CONSTRAINT unique_cart_product_combination UNIQUE (cart_id, product_id, customer_id)
);

drop table ordered_product;
drop table orders;

CREATE TABLE orders (
    order_id bigserial PRIMARY KEY,
    cart_id bigint,
    customer_id bigint,
    order_date DATE DEFAULT CURRENT_DATE,
    customer_details JSONB,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Approved', 'Shipped', 'Pending', 'Completed')),
    
    CONSTRAINT cart_fk FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES users(user_id),
    CONSTRAINT unique_cart_customer_combination UNIQUE (cart_id, customer_id)
);

UPDATE orders SET order_date = '2023-12-09' WHERE order_id = 15;


CREATE TABLE ordered_product (
    product_id bigint,
    order_id bigint,
    quantity INTEGER NOT NULL,
    
    CONSTRAINT order_product_pk PRIMARY KEY (product_id,order_id),
    CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT order_fk FOREIGN KEY (order_id) REFERENCES orders(order_id)
);





















































-- { 
--     "cart_id":626,
--     "customer_details":{
--         "address":"abcd",
--         "contact":"01222222222"
--     }
-- }







-- { 
--     "productList":
--     [
--         {"product_id":5, "quantity":4,"product_name":"Chicken Egg"},
--         {"product_id":6, "quantity":3,"product_name":"Tofu"},
--         {"product_id":7, "quantity":1,"product_name":"Rupchanda Fortified Soyabean Oil"}
--     ], 
--     "priceTotal":1230, 
--     "discountTotal":200, 
--     "productCount":8,
--     "cart_id":626
-- }




-- CREATE OR REPLACE FUNCTION before_cart_insert_update()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   IF NEW.status = 'pending' THEN
--     IF EXISTS (
--       SELECT 1
--       FROM cart
--       WHERE customer_id = NEW.customer_id AND status = 'pending'
--     ) THEN
--       UPDATE cart
--       SET
--         product_list = NEW.product_list,
--         total_price = NEW.total_price,
--         discount_total = NEW.discount_total,
--         product_count = NEW.product_count
--       WHERE customer_id = NEW.customer_id AND status = 'pending';
--       RETURN NULL; -- Cancel the original insert/update
--     END IF;
--   END IF;

--   -- Insert a new record
--   INSERT INTO cart (customer_id, product_list, total_price, discount_total, product_count, status)
--   VALUES (NEW.customer_id, NEW.product_list, NEW.total_price, NEW.discount_total, NEW.product_count, NEW.status);
--   RETURN NEW; -- Allow the original insert/update to proceed
-- END;
-- $$ LANGUAGE plpgsql;


-- CREATE OR REPLACE TRIGGER  before_cart_insert_update_trigger
-- BEFORE INSERT OR UPDATE
-- ON cart
-- FOR EACH ROW
-- EXECUTE FUNCTION before_cart_insert_update();





-- -- Trigger function to handle parent category deletion and category updates
-- CREATE OR REPLACE FUNCTION delete_empty_categories()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   -- Remove the category fr
--   DELETE from categories
--   SET parent_category_id = array_remove(parent_category_id, OLD.parent_category_id)
--   WHERE OLD.parent_category_id = ANY(parent_category_id);

--   -- Delete the category if its parent_category_id array becomes empty
--   DELETE FROM category_parent_relationship
--   WHERE parent_category_id = OLD.parent_category_id;

--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Trigger to run after the deletion of a parent category
-- CREATE TRIGGER after_delete_parent_category
-- AFTER DELETE ON parent_categories
-- FOR EACH ROW
-- EXECUTE FUNCTION delete_empty_categories();



