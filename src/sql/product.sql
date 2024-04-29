CREATE TABLE product(
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_measure_unit VARCHAR(5) NOT NULL,
    product_volume DOUBLE NOT NULL
);

create table stocks(stock_id int primary key AUTO_INCREMENT,product_id int,min int not null default 0,max int not null default 0,current int not null default 0,threshold int not null)