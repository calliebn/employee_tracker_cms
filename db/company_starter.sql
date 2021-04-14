DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10, 4) NOT NULL,
dept_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id),
FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES role (id) ON DELETE CASCADE
);

INSERT INTO department (name) VALUES
('Sales'),
('Finance'),
('IT'),
('Production'),
('Legal'),
('Engineering')