-- the database dvdrental is referenced via link https://github.com/haidukm95-byte/DI170/blob/SQL-dvdrental/restore.sql
-- the newly created tables which do not exist in original script, are created in W5D6EX1.sql which is linked here: https://github.com/haidukm95-byte/DI170/blob/Week_5/W5D6EX1.sql

--Exercise 2 : DVD Rental
--Instructions

    --1. Use UPDATE to change the language of some films. Make sure that you use valid languages.
    --2. Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?
    --3. We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
    --4. Find out how many rentals are still outstanding (ie. have not been returned to the store yet).
    --5. Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)
    --6. Your friend is at the store, and decides to rent a movie. He knows he wants to see 4 movies, but he can’t remember their names. Can you help him find which movies he wants to rent?
        --1. The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope Monroe.
        --2.The 2nd film : A short documentary (less than 1 hour long), rated “R”.
        --3. The 3rd film : A film that his friend Matthew Mahan rented. He paid over $4.00 for the rental, and he returned it between the 28th of July and the 1st of August, 2005.
        --4. The 4th film : His friend Matthew Mahan watched this film, as well. It had the word “boat” in the title or description, and it looked like it was a very expensive DVD to replace.

--1. Use UPDATE to change the language of some films. Make sure that you use valid languages.
SELECT * FROM language;
--Here we see output of valid languages: 
--1	"English             "
--2	"Italian             "
--3	"Japanese            "
--4	"Mandarin            "
--5	"French              "
--6	"German              "

UPDATE film
SET language_id=2 WHERE title='Chamber Italian';

UPDATE film
SET language_id=6 WHERE title='Fireball Philadelphia';

--2. Which foreign keys (references) are defined for the customer table? How does this affect the 
--way in which we INSERT into the customer table?

INSERT INTO customer(first_name, last_name, email, create_date) VALUES
	('Marko', 'Haiduk', 'haidukm95@gmail.com', '2026-01-19');
--ERROR:  null value in column "store_id" of relation "customer" violates not-null constraint
--Failing row contains (602, null, Marko, Haiduk, haidukm95@gmail.com, null, t, 2026-01-19, 2026-01-19 16:57:21.0172, null). 
--customer.store_id is referenced with store.store_id and customer.address_id is referenced with address.address_id.
--Impossibility to add null values to these columns explains that they have foreign keys defined.

 --3. We created a new table called customer_review. Drop this table. Is this an easy step, 
 --or does it need extra checking?

 DROP TABLE customer_review;
 --finally it didn`t need any extra checks because it`s not a maternal table. It was dependent on 
 --tables language and new_film

--4. Find out how many rentals are still outstanding (ie. have not been returned to the store yet).
SELECT COUNT(rental_id) AS outstanding FROM rental WHERE return_date IS Null;

--Output: 183

--5. Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)
SELECT film.title, film.rental_rate 
FROM film 
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
WHERE rental.return_date IS NULL
ORDER BY film.rental_rate DESC
LIMIT 30;

--6. Your friend is at the store, and decides to rent a movie. He knows he wants to see 4 movies, 
--but he can’t remember their names. Can you help him find which movies he wants to rent?

    --1. The 1st film : The film is about a sumo wrestler, and one of the actors is Penelope 
        --Monroe.
SELECT film.title, film.description, actor.first_name, actor.last_name
FROM film
JOIN film_actor
ON film.film_id=film_actor.film_id
JOIN actor
ON actor.actor_id=film_actor.actor_id
WHERE
actor.first_name LIKE 'Penelope' 
AND actor.last_name LIKE 'Monroe' 
AND description LIKE '%Sumo%';
--OUTPUT: "Park Citizen"	"A Taut Epistle of a Sumo Wrestler And a Girl who must Face a Husband in Ancient Japan"	"Penelope"

    --2.The 2nd film : A short documentary (less than 1 hour long), rated “R”.
SELECT * FROM film
WHERE description LIKE '%Documentary%'
AND length<60
AND rating='R'
--OUTPUT: 192	"Crossing Divorce"	"A Beautiful Documentary of a Dog And a Robot who must Redeem a Womanizer in Berlin"

    --3. The 3rd film : A film that his friend Matthew Mahan rented. He paid over $4.00 for the 
        --rental, and he returned it between the 28th of July and the 1st of August, 2005.

SELECT film.title, film.description, film.rental_rate, rental.return_date, customer.first_name, customer.last_name
FROM film
JOIN inventory
ON film.film_id=inventory.film_id
JOIN rental
ON inventory.inventory_id=rental.inventory_id
JOIN customer
ON inventory.store_id=customer.store_id
WHERE customer.first_name='Matthew' 
AND customer.last_name='Mahan' 
AND film.rental_rate>4
AND rental.return_date BETWEEN '2005-07-28' AND '2005-08-01'


     --4. The 4th film : His friend Matthew Mahan watched this film, as well. It had the word 
        --“boat” in the title or description, and it looked like it was a very expensive DVD to 
        --replace.

SELECT film.title, film.description, film.replacement_cost, customer.first_name, customer.last_name
FROM film
JOIN inventory
ON film.film_id=inventory.film_id
JOIN rental
ON inventory.inventory_id=rental.inventory_id
JOIN customer
ON inventory.store_id=customer.store_id
WHERE customer.first_name='Matthew' 
AND customer.last_name='Mahan' 
AND film.description LIKE '%Boat%'
ORDER BY film.replacement_cost DESC