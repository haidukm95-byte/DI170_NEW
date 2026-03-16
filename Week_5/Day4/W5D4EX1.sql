CREATE TABLE items(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price INTEGER NOT NULL
);

INSERT INTO items(name, price) VALUES
	('Microwave oven', 400),
	('Refrigerator', 1000),
	('Vacuum cleaner', '500'),
	('Fan', 150),
	('Oil heater', 300),
	('Gas cooker with stove', 1300);

INSERT INTO customers(first_name, last_name) VALUES
	('Marko', 'Haiduk'),
	('Roni', 'Cohen'),
	('Ohad', 'Hadar'),
	('Razi', 'Barhoum'),
	('David', 'Ben Shimon'),
	('Michael', 'Higer'),
	('Mahmud', 'Jaber'),
	('Evgeny', 'Gizunov');

--Exercise 1 : Items and customers
--Use SQL to get the following from the database:

	--1. All items, ordered by price (lowest to highest).
SELECT * FROM items ORDER BY price ASC;

	--2. Items with a price above 80 (80 included), ordered by price (highest to lowest).
SELECT * FROM items WHERE price > 80 ORDER BY price DESC;

	--3. The first 3 customers in alphabetical order of the first name (A-Z) – exclude the primary key column from the results.
SELECT name, price FROM items ORDER BY name ASC FETCH FIRST 3 ROWS ONLY;

	--4. All last names (no other columns!), in reverse alphabetical order (Z-A)
SELECT last_name FROM customers ORDER BY last_name DESC;
