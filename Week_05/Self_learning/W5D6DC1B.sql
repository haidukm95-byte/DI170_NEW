--Week 5 Self-learning DailyChallenge Part II
--1. Create a table named Book, with the columns : book_id SERIAL PRIMARY KEY, title NOT NULL, 
--author NOT NULL
CREATE TABLE Book(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100 )NOT NULL
);
--2. Insert those books :

   -- Alice In Wonderland, Lewis Carroll
  --  Harry Potter, J.K Rowling
  --  To kill a mockingbird, Harper Lee

INSERT INTO Book(title, author) VALUES
    ('Alice in Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To kill a mockingbird', 'Harper Lee');

--3. Create a table named Student, with the columns : student_id SERIAL PRIMARY KEY, 
--name NOT NULL UNIQUE, age. Make sure that the age is never bigger than 15 (Find an SQL method);
CREATE TABLE Student(
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

--4. Insert those students:

 --   John, 12
  --  Lera, 11
  --  Patrick, 10
  --  Bob, 14

INSERT INTO Student(name, age) VALUES
    ('John', 12),
    ('Lera', 11),
    ('Patrick', 10),
    ('Bob', 14);

--5. Create a table named Library, with the columns :

--    book_fk_id ON DELETE CASCADE ON UPDATE CASCADE
--    student_id ON DELETE CASCADE ON UPDATE CASCADE
--    borrowed_date
--    This table, is a junction table for a Many to Many relationship with the Book and Student 
--tables : A student can borrow many books, and a book can be borrowed by many children
--    book_fk_id is a Foreign Key representing the column book_id from the Book table
--    student_fk_id is a Foreign Key representing the column student_id from the Student table
--    The pair of Foreign Keys is the Primary Key of the Junction Table

CREATE TABLE Library(
    book_fk_id INTEGER REFERENCES Book(id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY(book_fk_id, student_fk_id)
);

--6. Add 4 records in the junction table, use subqueries.

 --   the student named John, borrowed the book Alice In Wonderland on the 15/02/2022
 --   the student named Bob, borrowed the book To kill a mockingbird on the 03/03/2021
 --   the student named Lera, borrowed the book Alice In Wonderland on the 23/05/2021
 --   the student named Bob, borrowed the book Harry Potter the on 12/08/2021

INSERT INTO Library(book_fk_id, student_fk_id, borrowed_date) VALUES
    ((SELECT id FROM Book WHERE Book.title='Alice in Wonderland'), 
    (SELECT student_id FROM Student WHERE Student.name='John'), '2022-02-15'),
    ((SELECT id FROM Book WHERE Book.title='To kill a mockingbird'), 
    (SELECT student_id FROM Student WHERE Student.name='Bob'), '2021-03-03'),
    ((SELECT id FROM Book WHERE Book.title='Alice in Wonderland'), 
    (SELECT student_id FROM Student WHERE Student.name='Lera'), '2021-05-23'),
    ((SELECT id FROM Book WHERE Book.title='Harry Potter'), 
    (SELECT student_id FROM Student WHERE Student.name='Bob'), '2021-08-12');

--7. Display the data

 --   Select all the columns from the junction table
 --   Select the name of the student and the title of the borrowed books
 --   Select the average age of the children, that borrowed the book Alice in Wonderland
 --   Delete a student from the Student table, what happened in the junction table ?

SELECT * FROM Library;

SELECT Student.name, Book.title
FROM Library
JOIN Student
ON Student.student_id=Library.student_fk_id
JOIN Book
ON id=Library.book_fk_id;

SELECT AVG(Student.age), Book.title
FROM Library
JOIN Student
ON Student.student_id = Library.student_fk_id
JOIN Book
ON Book.id = Library.book_fk_id
WHERE Book.title='Alice in Wonderland'
GROUP BY Book.title;

DELETE FROM Student WHERE name='John';
SELECT * FROM Library;
--OUTPUT:
--3	4	"2021-03-03"
--1	2	"2021-05-23"
--2	4	"2021-08-12"
--After deleting a student named John, all the data related to him has been deleted as well 
--because of cascade update/delete operations stated in the code