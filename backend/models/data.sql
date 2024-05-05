CREATE TABLE roles (

id SERIAL NOT NULL,

role VARCHAR(255) NOT NULL,

PRIMARY KEY (id) );

-------------------------------

CREATE TABLE users(

id SERIAL PRIMARY KEY NOT NULL,

userName VARCHAR(255) NOT NULL UNIQUE,

age INT,

phoneNumber INT,

email VARCHAR(255) NOT NULL UNIQUE,

password VARCHAR(255) NOT NULL,

country VARCHAR(255),

role_id INT,

FOREIGN KEY (role_id) REFERENCES roles(id),

is_deleted SMALLINT DEFAULT 0

);

-------------------------------

CREATE TABLE categories(

 id SERIAL PRIMARY KEY,
 name VARCHAR(255),
 description VARCHAR(255),
 img TEXT,
 is_delete SMALLINT DEFAULT 0 
 
)

