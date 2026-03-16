CREATE TABLE directors (
  director_id SERIAL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (director_id)
);


CREATE TABLE movies (
  movie_id SERIAL,
  movie_title VARCHAR(45) NOT NULL,
  released_date date NOT NULL,
  fk_director_id INTEGER NOT NULL,
  PRIMARY KEY (movie_id),
  FOREIGN KEY (fk_director_id) REFERENCES directors(director_id) ON DELETE CASCADE
);