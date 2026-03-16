CREATE DATABASE bootcamp;

CREATE TABLE students(
 id SERIAL PRIMARY KEY,
 last_name VARCHAR(100) NOT NULL,
 first_name VARCHAR(100) NOT NULL,
 birth_date DATE NOT NULL;
)

INSERT INTO students (last_name, first_name, birth_date) VALUES
	('Benichou', 'Marc', '1998-11-02'),
	('Cohen', 'Yoan', '2010-12-03'),
	('Benichou', 'Lea', '1987-07-27'),
	('Dux', 'Amelia', '1996-04-07'),
	('Grez', 'David', '2003-06-14'),
	('Simpson', 'Omer', '1980-10-03');

INSERT INTO students(last_name, first_name, birth_date) VALUES
	('Haiduk', 'Marko', '1995-08-30');

SELECT * FROM students;

SELECT last_name, first_name FROM students;
SELECT first_name, last_name FROM students WHERE id=2;
SELECT first_name, last_name FROM students WHERE last_name='Benichou' AND first_name='Marc';
SELECT first_name, last_name FROM students WHERE last_name='Benichou' OR first_name='Marc';
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a%'; 
SELECT first_name, last_name FROM students WHERE first_name ILIKE 'A%';
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a';
SELECT first_name, last_name FROM students WHERE(RIGHT(first_name, 2) ILIKE 'a%');
SELECT first_name, last_name FROM students WHERE id=1 OR id=3;
SELECT * FROM students WHERE birth_date>='2000-01-01'