--Week 5 Self-learning DailyChallenge Part I
CREATE TABLE Customer(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile(
	id SERIAL PRIMARY KEY,
	isLoggedIn BOOLEAN DEFAULT FALSE,
	customer_id INTEGER REFERENCES Customer(id)
);

INSERT INTO Customer(first_name, last_name) VALUES
	('John', 'Doe'),
	('Jerome', 'Lalu'),
	('Lea', 'Rive');

--Insert those customer profiles, use subqueries

--    John is loggedIn
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (TRUE, (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe'));

--    Jerome is not logged in
INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES (FALSE, (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));



--Use the relevant types of Joins to display:

 --   The first_name of the LoggedIn customers
--    All the customers first_name and isLoggedIn columns - even the customers those who don’t have a profile.
 --   The number of customers that are not LoggedIn

SELECT Customer.first_name, Customer_profile.isLoggedIn
FROM Customer
JOIN Customer_profile
ON Customer.id=Customer_profile.customer_id
WHERE Customer_profile.isLoggedIn=TRUE;

SELECT Customer.first_name, Customer_profile.isLoggedIn
FROM Customer
FULL JOIN Customer_profile
ON Customer.id = Customer_profile.customer_id;

SELECT COUNT(*) 
FROM Customer
JOIN Customer_profile
ON Customer.id = Customer_profile.customer_id
WHERE Customer_profile.isLoggedIn = FALSE;







