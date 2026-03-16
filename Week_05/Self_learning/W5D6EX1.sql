-- the database dvdrental is referenced via link https://github.com/haidukm95-byte/DI170/blob/SQL-dvdrental/restore.sql
--Exercise 1. DVD Rental
--Instructions
--1. Get a list of all the languages, from the language table.
--2. Get a list of all films joined with their languages – select the following details : film title, description, and language name.
--3. Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.
--4.Create a new table called new_film with the following columns : id, name. Add some new films to the table.
--5. Create a new table called customer_review, which will contain film reviews that customers will make.
    --Think about the DELETE constraint: if a film is deleted, its review should be automatically deleted.
    --It should have the following columns:
    --    1. review_id – a primary key, non null, auto-increment.
    --    2. film_id – references the new_film table. The film that is being reviewed.
    --    3. language_id – references the language table. What language the review is in.
    --    4. title – the title of the review.
    --    5. score – the rating of the review (1-10).
    --    6. review_text – the text of the review. No limit on the length.
    --    7. last_update – when the review was last updated.

    --6. Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
    --7. Delete a film that has a review from the new_film table, what happens to the customer_review table?


--1. Get a list of all the languages, from the language table.
SELECT name FROM language;
--2. Get a list of all films joined with their languages – select the following details : film title, description, and language name.
SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id;
--3. Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.
SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='English';

SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='Italian';

SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='Japanese';

SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='Mandarin';

SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='French';

SELECT film.title, film.description, language.name
FROM film
INNER JOIN language
ON film.language_id=language.language_id
WHERE language.name='German';

--4.Create a new table called new_film with the following columns : id, name. Add some new films to the table.
CREATE TABLE new_film(
	id SERIAL PRIMARY KEY,
	name VARCHAR (200) NOT NULL
);
INSERT INTO new_film(name) VALUES
    ('Fargo'),
    ('Matrix'),
    ('Matrix Reloaded'),
    ('Matrix: Revolution'),
    ('Postal'),
    ('The whole nine yards'),
    ('Rainman');

--5. Create a new table called customer_review, which will contain film reviews that customers will make.
CREATE TABLE customer_review(
	review_id SERIAL PRIMARY KEY,
	film_id INTEGER REFERENCES new_film(id),
    language_id INTEGER REFERENCES language(language_id),
    title VARCHAR(300) NOT NULL,
    score SMALLINT NOT NULL CHECK (score between 1 AND 10),
    review_text TEXT NOT NULL,
    last_update timestamp without time zone DEFAULT now() NOT NULL 
);

--6. Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
INSERT INTO customer_review(film_id, language_id, title, score, review_text) VALUES
	(1, 1, 'Alejandro E', 10, 'The simple trick inspired by a real event still works, despite the passing of time. The straightforward story of a crime that went wrong is 
	still relevant today, making it a classic of the 1990s.'),
	(1, 1, 'Patrick S', 10, 'A true Coen masterpiece. A funny crime movie. Frances McDormand is brilliant however all acting performances are of a high level. This is one to 
	watch several times and it never gets dull.'),
	(1, 1, 'Maksim S', 8, 'Fargo is a brilliantly dark comedy-crime gem, set against the icy, 
	unforgiving backdrop of Minnesota. The cast delivers fantastic performances across the 
	board, from Frances McDormand’s unforgettable Marge Gunderson to William H. Macy’s 
	bumbling criminal, creating a world that feels simultaneously believable and absurd. 
	While the film claims to be “based on true events,” research quickly shows that the 
	story is entirely fictional—a detail that only enhances the darkly comic tone. The Coen 
	brothers balance tension, deadpan humor, and moral absurdity with impeccable precision, 
	crafting a film that is funny, chilling, and endlessly memorable. Fargo is a masterclass 
	in storytelling where every icy snowfall and quirky accent adds to the darkly hilarious 
	atmosphere. '),
	(1, 1, 'Hunter L', 8, 'I had to watch it for film class. Not really my preferred genre, 
	so I was surprised how much I liked it. Has great cinematography and music that really 
	sets the scene. The characters are compelling and the plot keeps tension throughout, 
	though it is not anything out of this world. Overall, a solid experience.'),
	(2, 1, 'Ember W', 10, 'I am not an action movie type person, but I still loved The 
	Matrix because it is so intelligent, intriguing, and full of deeper themes to dive 
	into and ponder. The plot line is airtight and I found myself getting more and more 
	engaged and excited as the movie went on. Even though there is violence, it was not 
	gratuitous and made sense within the context of the story line. And some of the 
	special effects were so unique and unlike anything I have seen before. I also like 
	that there is some romance sprinkled in because it helps to humanize the characters. 
	After 25 years, I understand the hype.'),
	(2, 1, 'Patrick S', 8, 'The first is the best. The sequels are worthwile except for the 4th which sucks'),
	(2, 1, 'Jack F', 7, 'Watch it once. If you watch it twice, it will be boring. 
	But you simply cannot go through your whole life without watching the Matrix. And if 
	you have not seen it yet, you are stupid. '),
	(5, 1, 'Obi-wan K', 1, 'I regret everything after watching this movie'),
	(5, 1, 'Jasper B', 7, 'One of the best game adaptations and anybody who says otherwise is wrong'),
	(5, 1, 'Bartilek C', 10, 'This movie is BAD. STUPID. And got Poor writing. However, the reason it 
	gets 5 stars is because it is POSTAL we are talking about. Edgy jokes are a PART of the 
	series, and Uwe Boll captured it nicely in my opinion. It DOES NOT NEED good writing, 
	because it is POSTAL. It is like expecting a touching, heartbreaking story from a film 
	for Toddlers.');

--7. Delete a film that has a review from the new_film table, what happens to the customer_review table?
DELETE FROM new_film WHERE name='Postal';
--ERROR:  update or delete on table "new_film" violates foreign key constraint "customer_review_film_id_fkey" on table "customer_review"
--Key (id)=(5) is still referenced from table "customer_review". 

--SQL state: 23503
--Detail: Key (id)=(5) is still referenced from table "customer_review".