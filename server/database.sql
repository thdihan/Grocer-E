create database grocere;

\l --Use this to see all the databases present in your system
\c grocere -- Use this to connect to the grocere database
\dt --use this to see all the relations in the database


drop table users;

CREATE TABLE users (
    -- user_id bigserial PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL DEFAULT 'admin',
    CONSTRAINT email_user_type_unique UNIQUE (email, user_type),
    CONSTRAINT valid_user_type CHECK (user_type IN ('admin', 'customer'))
);
