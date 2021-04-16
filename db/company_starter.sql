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
FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);

INSERT INTO department (name) VALUES
('Sales'),
('Finance'),
('IT'),
('Production'),
('Legal'),
('Engineering');

USE cms_db;
INSERT INTO role (title, salary, dept_id ) VALUES
('Salesperson', 75000, 1),
('Accountant', 55000, 2),
('Technician', 65000, 3),
('Designer', 55000, 4),
('Lawyer', 80000, 5),
('Software Engineer', 75000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES

