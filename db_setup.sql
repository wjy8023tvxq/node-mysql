CREATE DATABASE IF NOT EXISTS testDB;
USE testDB;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    ID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (ID)
);

INSERT INTO users (LastName, FirstName, age) 
VALUES ('Wise','Alice', 25), ('Clarkson','Bob', 30);

SELECT * FROM users;
