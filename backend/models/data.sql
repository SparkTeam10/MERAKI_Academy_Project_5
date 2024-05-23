CREATE TABLE roles (

id SERIAL NOT NULL,

role VARCHAR(255) NOT NULL,

PRIMARY KEY (id) );
TEST

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
-------------------------

CREATE TABLE users(

id SERIAL PRIMARY KEY NOT NULL,
userName VARCHAR(255) NOT NULL UNIQUE,
age INT,
phoneNumber INT,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
country VARCHAR(255),
img text,
role_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id),
is_deleted SMALLINT DEFAULT 0
);
-------------------------------

CREATE TABLE categories(

 id SERIAL PRIMARY KEY,
 title VARCHAR(255),
 description VARCHAR(255),
 img TEXT,
 is_delete SMALLINT DEFAULT 0 
 
)

getUserByName
-----------------------------------------


CREATE TABLE service_provider (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
description varchar(255),
address varchar(255),
img text,
price INT,
category_id INT,
FOREIGN KEY (category_id) REFERENCES categories(id),
is_deleted SMALLINT DEFAULT 0
);
-------------------------------
 
CREATE TABLE booking (
id SERIAL PRIMARY KEY,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
serviceProvider_id INT,
FOREIGN KEY (serviceProvider_id) REFERENCES service_provider (id)ON DELETE CASCADE,
start_date DATE,
end_date DATE ,
price INT,
created_at TIMESTAMP DEFAULT NOW(),
booking_status VARCHAR DEFAULT 'Confirmed',
is_deleted SMALLINT DEFAULT 0
);


-------------------------

CREATE TABLE service_provider (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description varchar(255),
address varchar(255),
    img text,
   category_id INT,
FOREIGN KEY (category_id) REFERENCES categories(id),
    is_deleted SMALLINT DEFAULT 0
);

 CREATE TABLE images (

id SERIAL PRIMARY KEY,

img text,

price INT,

category_id INT,

FOREIGN KEY (category_id) REFERENCES categories(id),

serviceProvider_id INT,

FOREIGN KEY (serviceProvider_id) REFERENCES service_provider (id),  is_deleted SMALLINT DEFAULT 0 );


