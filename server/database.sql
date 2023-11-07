create database grocere;

\l --Use this to see all the databases present in your system
\c grocere -- Use this to connect to the grocere database
\dt --use this to see all the relations in the database


drop table users;

CREATE TABLE users (
    user_id bigserial PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL DEFAULT 'admin',
    CONSTRAINT email_user_type_unique UNIQUE (email, user_type),
    CONSTRAINT valid_user_type CHECK (user_type IN ('admin', 'customer'))
);

--delete from parent_categories;

drop table categories;
drop table parent_categories;

-- CREATE TABLE parent_categories (
--     parent_category_id bigserial PRIMARY KEY,
--     parent_category_name varchar(255) UNIQUE NOT NULL,
--     adder_id bigint,
--     CONSTRAINT parent_user_fk FOREIGN KEY (adder_id) REFERENCES users(user_id)
-- );

CREATE TABLE categories (
    category_id serial PRIMARY KEY,
    category_name varchar(255) NOT NULL,
    -- parent_category_id bigint,
    seller_id bigint,
    -- CONSTRAINT category_fk FOREIGN KEY (parent_category_id) REFERENCES parent_categories(parent_category_id),
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
    base_price NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0.00,
    unit VARCHAR(50) NOT NULL,
    stock NUMERIC NOT NULL,
    product_image VARCHAR(100),
    seller_id bigint,
    CONSTRAINT category_user_fk FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

CREATE TABLE product_category_relationship (
    product_id bigint,
    category_id bigint,
    seller_id bigint,
    CONSTRAINT product_category_pk PRIMARY KEY (product_id, category_id),
    CONSTRAINT category_fk FOREIGN KEY (category_id) REFERENCES categories(category_id) ON delete cascade,
    CONSTRAINT product_fk FOREIGN KEY (product_id) REFERENCES products(product_id) On delete cascade
);


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
