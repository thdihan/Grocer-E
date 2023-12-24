CREATE DATABASE GROCERE;

\l --Use this to see all the databases present in your system
\c grocere -- Use this to connect to the grocere database
\dt --use this to see all the relations in the database
\! cls -- to clear screen

DROP TABLE USERS;

CREATE TABLE USERS (
    USER_ID BIGSERIAL PRIMARY KEY,
    FULLNAME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    USER_TYPE VARCHAR(50) NOT NULL DEFAULT 'admin',
    ADDRESS VARCHAR(255),
    CONTACT VARCHAR(20) DEFAULT 'N/A' CHECK (CONTACT <> ''),
    CONSTRAINT EMAIL_USER_TYPE_UNIQUE UNIQUE (EMAIL, USER_TYPE),
    CONSTRAINT VALID_USER_TYPE CHECK (USER_TYPE IN ('admin', 'customer'))
);

-- ALTER TABLE users
-- ADD COLUMN address VARCHAR(255),
-- ADD COLUMN contact VARCHAR(20) DEFAULT 'N/A' CHECK (contact <> '');



DROP TABLE CATEGORIES;

DROP TABLE PARENT_CATEGORIES;

CREATE TABLE CATEGORIES (
    CATEGORY_ID SERIAL PRIMARY KEY,
    CATEGORY_NAME VARCHAR(255) NOT NULL,
    SELLER_ID BIGINT,
    CONSTRAINT CATEGORY_USER_FK FOREIGN KEY (SELLER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE CATEGORY_PARENT_RELATIONSHIP (
    CATEGORY_ID BIGINT,
    PARENT_CATEGORY_ID BIGINT,
    SELLER_ID BIGINT,
    CONSTRAINT CATEGORY_PARENT_PK PRIMARY KEY (CATEGORY_ID, PARENT_CATEGORY_ID),
    CONSTRAINT CATEGORY_FK FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID) ON DELETE CASCADE,
    CONSTRAINT PARENT_CATEGORY_FK FOREIGN KEY (PARENT_CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID) ON DELETE CASCADE
);

DROP TABLE PRODUCTS;

CREATE TABLE PRODUCTS (
    PRODUCT_ID BIGSERIAL PRIMARY KEY,
    PRODUCT_NAME VARCHAR(255) UNIQUE NOT NULL,
    DESCRIPTION VARCHAR(255),
    BASE_PRICE NUMERIC NOT NULL,
    DISCOUNT NUMERIC DEFAULT 0.00,
    UNIT VARCHAR(50) NOT NULL,
    STOCK NUMERIC NOT NULL CONSTRAINT CHECK_STOCK_NON_NEGATIVE CHECK (STOCK >= 0),
    PRODUCT_IMAGE VARCHAR(100),
    SELLER_ID BIGINT,
    STATUS VARCHAR(20) DEFAULT 'Published' CHECK (STATUS IN ('Hidden', 'Published')),
    CONSTRAINT CATEGORY_USER_FK FOREIGN KEY (SELLER_ID) REFERENCES USERS(USER_ID)
);

ALTER TABLE PRODUCTS ADD COLUMN STATUS VARCHAR(20) DEFAULT 'Published' CHECK (STATUS IN ('Hidden', 'Published'));

-- UPDATE products
-- SET status = 'Published'
-- WHERE status IS NULL;

DROP TABLE PRODUCT_CATEGORY_RELATIONSHIP;

CREATE TABLE PRODUCT_CATEGORY_RELATIONSHIP (
    PRODUCT_ID BIGINT,
    CATEGORY_ID BIGINT,
    SELLER_ID BIGINT,
    CONSTRAINT PRODUCT_CATEGORY_PK PRIMARY KEY (PRODUCT_ID, CATEGORY_ID),
    CONSTRAINT CATEGORY_FK FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES(CATEGORY_ID) ON DELETE CASCADE,
    CONSTRAINT PRODUCT_FK FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID) ON DELETE CASCADE,
    CONSTRAINT SELLER_FK FOREIGN KEY (SELLER_ID) REFERENCES USERS(USER_ID)
);

DROP TABLE CART;

CREATE TABLE CART (
    CART_ID BIGSERIAL PRIMARY KEY,
    CUSTOMER_ID BIGINT,
    PRODUCT_LIST JSONB[],
    TOTAL_PRICE NUMERIC NOT NULL,
    DISCOUNT_TOTAL NUMERIC NOT NULL DEFAULT 0.0,
    PRODUCT_COUNT INTEGER NOT NULL DEFAULT 0,
    STATUS VARCHAR(20) NOT NULL DEFAULT 'pending',
    CONSTRAINT VALID_STATUS CHECK (STATUS IN ('pending', 'done')),
    CONSTRAINT CATEGORY_CART_FK FOREIGN KEY (CUSTOMER_ID) REFERENCES USERS(USER_ID)
);

DROP TABLE CART_PRODUCT;

CREATE TABLE CART_PRODUCT (
    CART_ID BIGINT,
    PRODUCT_ID BIGINT,
    CUSTOMER_ID BIGINT,
    QUANTITY INTEGER NOT NULL,
    STATUS VARCHAR(20) NOT NULL DEFAULT 'pending',
    CONSTRAINT VALID_CART_PRODUCT_STATUS CHECK (STATUS IN ('pending', 'done')),
    CONSTRAINT CART_PRODUCT_FK_CART FOREIGN KEY (CART_ID) REFERENCES CART(CART_ID),
    CONSTRAINT CART_PRODUCT_FK_PRODUCT FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID),
    CONSTRAINT CART_PRODUCT_FK_CUSTOMER FOREIGN KEY (CUSTOMER_ID) REFERENCES USERS(USER_ID),
    CONSTRAINT UNIQUE_CART_PRODUCT_COMBINATION UNIQUE (CART_ID, PRODUCT_ID, CUSTOMER_ID)
);

DROP TABLE ORDERED_PRODUCT;

DROP TABLE ORDERS;

CREATE TABLE ORDERS (
    ORDER_ID BIGSERIAL PRIMARY KEY,
    CART_ID BIGINT,
    CUSTOMER_ID BIGINT,
    ORDER_DATE DATE DEFAULT CURRENT_DATE,
    CUSTOMER_DETAILS JSONB,
    STATUS VARCHAR(20) DEFAULT 'Pending' CHECK (STATUS IN ('Approved', 'Shipped', 'Pending', 'Completed')),
    CONSTRAINT CART_FK FOREIGN KEY (CART_ID) REFERENCES CART(CART_ID),
    CONSTRAINT CUSTOMER_FK FOREIGN KEY (CUSTOMER_ID) REFERENCES USERS(USER_ID),
    CONSTRAINT UNIQUE_CART_CUSTOMER_COMBINATION UNIQUE (CART_ID, CUSTOMER_ID)
);

UPDATE ORDERS
SET
    ORDER_DATE = '2023-12-09'
WHERE
    ORDER_ID = 15;

CREATE TABLE ORDERED_PRODUCT (
    PRODUCT_ID BIGINT,
    ORDER_ID BIGINT,
    QUANTITY INTEGER NOT NULL,
    CONSTRAINT ORDER_PRODUCT_PK PRIMARY KEY (PRODUCT_ID, ORDER_ID),
    CONSTRAINT PRODUCT_FK FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCTS(PRODUCT_ID),
    CONSTRAINT ORDER_FK FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDER_ID)
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