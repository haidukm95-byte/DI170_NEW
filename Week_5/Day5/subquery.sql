Code The following example uses all three clauses to display the employees who have a rating higher than 3.

Table aliases temporarily assign tables new names during the execution of a query.
AS keyword is optional. It means that you omit the AS keyword like this:

SELECT a.emp_id, a.first_name, a.last_name, b.rating
FROM Employee a, ratings b
WHERE a.emp_id = b.emp_id AND b.rating > 
(SELECT rating
FROM ratings
WHERE rating=3);


With the AS keyword

SELECT a.emp_id, a.first_name, a.last_name, b.rating
FROM Employee AS a, ratings AS b
WHERE a.emp_id = b.emp_id AND b.rating > 
(SELECT rating
FROM ratings
WHERE rating=3);
