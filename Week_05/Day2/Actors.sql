CREATE TABLE actors(
actor_id SERIAL PRIMARY KEY,
first_name VARCHAR (50) NOT NULL,
last_name VARCHAR (50) NOT NULL,
date_of_birth DATE NOT NULL,
number_of_oscars INTEGER NOT NULL
);

INSERT INTO actors(first_name, last_name, date_of_birth, number_of_oscars) VALUES
	('Matt', 'Ross', '1970-01-03', 2),
	('George', 'Clooney', '1961-05-06', 2),
	('Matt', 'Damon', '1970-10-08', 0),
	('Bruce', 'Willis', '1955-03-19', 0),
	('Keanu', 'Reeves', '1964-09-02', 1);

--1. Count how many actors are in the table.

SELECT COUNT(actor_id) AS number_of_actors
FROM actors;

--2. Try to add a new actor with some blank fields. What do you think the outcome will be ?

INSERT INTO actors(first_name, last_name, date_of_birth, number_of_oscars) VALUES
	('Vin', 'Diesel', '1967-07-18','');

--ERROR:  invalid input syntax for type integer: ""
--LINE 2:  ('Vin', 'Diesel', '1967-07-18','')