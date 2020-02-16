####################
# Define tables
####################
create table categories
(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description TEXT DEFAULT NULL,
	parent_id INT,
	primary key(id)
)
ENGINE = INNODB;

create table products
(
  id varchar(32) NOT NULL,
  name varchar(255) NOT NULL,
  vender_id int NOT NULL,
  category_id int NOT NULL,
  actual_qty int NOT NULL DEFAULT 0,
  valid_qty int NOT NULL DEFAULT 0,
  description text,
  primary key(id)
)
ENGINE = InnoDB;

create table price
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id varchar(32) NOT NULL,
  price decimal(8,2) NOT NULL DEFAULT 0,
  type int NOT NULL DEFAULT 0,
  start_time DATETIME DEFAULT '1000-01-01 00:00:00',
  end_time DATETIME DEFAULT '9999-12-31 23:59:59',
  description text,
  primary key(id)
)
ENGINE = InnoDB;

create table product_attributes
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id varchar(32) NOT NULL,
  attribute_name varchar(100) NOT NULL,
  attribute_value varchar(100) NOT NULL,
  description text,
  primary key(id)
)
ENGINE = InnoDB;

create table venders
(
   id int NOT NULL AUTO_INCREMENT,
   name varchar(200) NOT NULL,
   description text,
   country varchar(200) NOT NULL,
   province varchar(200) NOT NULL,
   city varchar(200) NOT NULL,
   address varchar(200) NOT NULL,
   tel varchar(200) NOT NULL,
   primary key(id)
)
ENGINE = InnoDB;

create table orders
(
   id int NOT NULL AUTO_INCREMENT,
   type int NOT NULL,
   customer_id int NOT NULL,
   date datetime NOT NULL,
   status int NOT NULL,
   refer_order int,
   amounts decimal(8,2) NOT NULL,
   address int,
   primary key(id)
)
ENGINE = InnoDB;

create table orderlines
(
  order_id int NOT NULL,
  line_no int NOT NULL AUTO_INCREMENT,
  product_id varchar(32) NOT NULL,
  price decimal(8,2) NOT NULL,
  qty int NOT NULL,
  amount decimal(8,2) NOT NULL,
  primary key(line_no)
)
ENGINE = InnoDB;

create table customers
(
   id int NOT NULL AUTO_INCREMENT,
   mobile varchar(20) NOT NULL,
   username varchar(100) NOT NULL,
   password char(32) NOT NULL,
   nikename varchar(100) NOT NULL,
   name varchar(100),
   gender int NOT NULL DEFAULT 0,
   register_time datetime NOT NULL,
   birthday date,
   primary key(id)
)
ENGINE = InnoDB;

create table customer_address
(
   id int NOT NULL AUTO_INCREMENT,
   customer_id int NOT NULL,
   country varchar(200) NOT NULL,
   province varchar(200) NOT NULL,
   city varchar(200) NOT NULL,
   address varchar(200) NOT NULL,
   zip varchar(20) NOT NULL,
   primary key(id)
)
ENGINE = InnoDB;

#####################
# Define foreign keys
#####################
ALTER TABLE categories ADD CONSTRAINT fk_categories_categories FOREIGN KEY(parent_id) REFERENCES categories(id);
ALTER TABLE products ADD CONSTRAINT fk_products_categories FOREIGN KEY(category_id) REFERENCES categories(id);
ALTER TABLE products ADD CONSTRAINT fk_products_venders FOREIGN KEY(vender_id) REFERENCES venders(id);
ALTER TABLE price ADD CONSTRAINT fk_price_products FOREIGN KEY(product_id) REFERENCES products(id);
ALTER TABLE product_attributes ADD CONSTRAINT fk_product_attributes_products FOREIGN KEY(product_id) REFERENCES products(id);
ALTER TABLE orders ADD CONSTRAINT fk_orders_orders FOREIGN KEY(refer_order) REFERENCES orders(id);
ALTER TABLE orders ADD CONSTRAINT fk_orders_customers FOREIGN KEY(customer_id) REFERENCES customers(id);
ALTER TABLE orders ADD CONSTRAINT fk_orders_address FOREIGN KEY(address) REFERENCES customer_address(id);
ALTER TABLE orderlines ADD CONSTRAINT fk_orderlines_orders FOREIGN KEY(order_id) REFERENCES orders(id);
ALTER TABLE orderlines ADD CONSTRAINT fk_orderlines_products FOREIGN KEY(product_id) REFERENCES products(id);
ALTER TABLE customers ADD CONSTRAINT uq_customers_username UNIQUE KEY(username);
ALTER TABLE customers ADD CONSTRAINT uq_customers_mobile UNIQUE KEY(mobile);
ALTER TABLE customer_address ADD CONSTRAINT fk_customer_address_customers FOREIGN KEY(customer_id) REFERENCES customers(id);
