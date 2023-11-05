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

CREATE TABLE parent_categories (
    parent_category_id bigserial PRIMARY KEY,
    parent_category_name varchar(255) UNIQUE NOT NULL,
    adder_id bigint,
    CONSTRAINT parent_user_fk FOREIGN KEY (adder_id) REFERENCES users(user_id)
);

CREATE TABLE categories (
    category_id serial PRIMARY KEY,
    category_name varchar(255) NOT NULL,
    parent_category_id bigint,
    adder_id bigint,
    CONSTRAINT category_fk FOREIGN KEY (parent_category_id) REFERENCES parent_categories(parent_category_id),
    CONSTRAINT category_user_fk FOREIGN KEY (adder_id) REFERENCES users(user_id)
);
