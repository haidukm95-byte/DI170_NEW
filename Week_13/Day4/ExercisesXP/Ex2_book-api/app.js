/*🌟 Exercise 2: Building a Basic CRUD API with Express.js
Instructions
In this exercise, you’ll build a basic CRUD (Create, Read, Update, Delete) API using Express.js. Your task
 is to create routes to manage a collection of books.
1.Create a new directory named book-api.
2. Inside the book-api directory, initialize a new Node.js project and install the express package.
3. Create a new file named app.js in the book-api directory.
4. In app.js, import the express module and create an instance of an Express app.
5. Define a basic data array containing a few book objects. Each book object should have properties like id, 
title, author, and publishedYear.
6. Set up the app to listen on port 5000. Print a message in the console to indicate that the server is running.
7. Implement the “Read all” route by defining a route at GET /api/books. Send a JSON response with the books array.
8. Implement the “Read” route by defining a route at GET /api/books/:bookId. Extract the bookId parameter 
from the URL and use it to find the corresponding book in the books array. If the book is found, send a JSON 
response with the book details and a status code of 200 (OK). If the book is not found, send a 404 status with 
a “Book not found” message.
9. Implement the “Create” route at POST /api/books. Use the express.json() middleware to parse JSON body 
content. Inside the route handler, create a new book object with an incremented ID and the data from the 
request body. Add the new book to the books array and return a JSON response with the new book and a status 
code of 201 (Created).
*/

const data = [
  {
    id: 1,
    title: "Never let me go",
    author: "Kazuo Ishiguro",
    publishedYear: 2005,
  },
  {
    id: 2,
    title: "Nineteen-eighty four",
    author: "George Orwell",
    publishedYear: 1949,
  },
  {
    id: 3,
    title: "Tiger By The Tail",
    author: "James Hadley Chase",
    publishedYear: 1954,
  },
];

const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

app.get("/api/books/", (req, res) => {
  res.json(data);
});

app.get("/api/books/:bookId", (req, res) => {
  const book = data.find((p) => p.id === Number(req.params.bookId));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.post("/api/books/", (req, res) => {
  const { title, author, publishedYear } = req.body;

  const newBook = {
    id: data.length + 1,
    title,
    author,
    publishedYear,
  };
  data.push(newBook);
  res.status(201).json(newBook);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
