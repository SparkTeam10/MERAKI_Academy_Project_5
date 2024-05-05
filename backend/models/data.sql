CREATE TABLE roles (

id SERIAL NOT NULL,

role VARCHAR(255) NOT NULL,

PRIMARY KEY (id) );
--------------------
CREATE TABLE permissions (
id SERIAL NOT NULL,
permission VARCHAR(255) NOT NULL,
PRIMARY KEY (id) );
------------------------------

CREATE TABLE role_permission ( 
id SERIAL NOT NULL,

role_id INT,

permission_id INT,

FOREIGN KEY (role_id ) REFERENCES roles (id),

FOREIGN KEY (permission_id) REFERENCES permissions (id),

PRIMARY KEY (id) );
-------------------------
CREATE TABLE users(

id SERIAL PRIMARY KEY NOT NULL,

userName VARCHAR(255) NOT NULL UNIQUE,

age INT,

phone VARCHAR(255),

email VARCHAR(255) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

role_id INT,

FOREIGN KEY (role_id) REFERENCES roles(id),

is_deleted SMALLINT DEFAULT 0

);
-------------------------------

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    img text, 
    is_deleted SMALLINT DEFAULT 0
);

