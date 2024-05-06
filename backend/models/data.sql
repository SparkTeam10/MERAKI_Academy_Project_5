CREATE TABLE roles (

id SERIAL NOT NULL,

role VARCHAR(255) NOT NULL,

PRIMARY KEY (id) );
TEST

-------------------------------


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
main
CREATE TABLE users(

id SERIAL PRIMARY KEY NOT NULL,

userName VARCHAR(255) NOT NULL UNIQUE,

age INT,

 TEST
phoneNumber INT,

phone VARCHAR(255),
 main

email VARCHAR(255) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

 TEST
country VARCHAR(255),


 main
role_id INT,

FOREIGN KEY (role_id) REFERENCES roles(id),

is_deleted SMALLINT DEFAULT 0

);
 TEST

-------------------------------

CREATE TABLE categories(

 id SERIAL PRIMARY KEY,
 title VARCHAR(255),
 description VARCHAR(255),
 img TEXT,
 is_delete SMALLINT DEFAULT 0 
 
)

-------------------------------


