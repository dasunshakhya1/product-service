CREATE TABLE products(
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DOUBLE NOT NULL
)


create table stocks(stock_id int primary key AUTO_INCREMENT,product_id int,min int not null default 0,max int not null default 0,current int not null default 0,threshold int not null)