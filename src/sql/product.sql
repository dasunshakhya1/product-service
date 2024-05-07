CREATE TABLE product(
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_measure_unit VARCHAR(5) NOT NULL,
    product_volume DOUBLE NOT NULL
);


CREATE TABLE stock(
    product_id VARCHAR(10) PRIMARY KEY,
    measure_unit VARCHAR(5) NOT NULL,
    min_volume DOUBLE NOT NULL,
    max_volume DOUBLE NOT NULL,
    reorder_threshold DOUBLE NOT NULL,
    current_volume DOUBLE NOT NULL
)