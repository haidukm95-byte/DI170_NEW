const exp = require("express");
const router = exp.Router();

let books = [];
router.get("/books", (req, res) => {
  res.json(books);
});

router.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

router.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    name: req.body.name,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return res.status(404).send("Book not found");
  const updBook = {
    id: books[index].id,
    name: req.body.name,
    author: req.body.author,
  };
  books[index] = updBook;
  res.status(200).json(updBook);
});

router.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return res.status(404).send("Book not found");
  books.splice(index, 1);
  res.status(200).send("Book deleted!");
});

module.exports = router;
