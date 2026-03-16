 --Create another table, called countries, with two fields : country_id and coutry_name. It has no foreign key. It's a table to test the --PostgreSQL Joins.

   -- Use INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, and FULL OUTER JOIN to join the table countries with the table actors, depending --on the comparaison of their primary key
    --Look at the results, and analyse them to understand the difference between the types of PostgreSQL Joins

CREATE TABLE country(
  id SERIAL PRIMARY KEY,
  country_name VARCHAR (34) NOT NULL
  );

INSERT INTO country(country_name) values
  ('Republia'),
  ('Antegria'),
  ('Impor'),
  ('United Federation'),
  ('Kolechia'),
  ('Obristan');

INSERT INTO country(country_name) values
  ('Arstotzka');

INSERT INTO actors(first_name, last_name, number_of_oscars) values
  ('Peter', 'Stormare', 0),
  ('Steve', 'Buscemi', 1),
  ('Michael', 'Madsen', 0);

SELECT actors.id, actors.first_name, actors.last_name, country.id, country.country_name
FROM actors
INNER JOIN country
ON actors.id = country.id