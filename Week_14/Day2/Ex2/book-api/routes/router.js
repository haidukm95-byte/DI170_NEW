const express = require("express");
const postController = require("../controllers/bookcontroller.js");

const router = express.Router();

// Define routes
router.get("/books", postController.getAllBooks);
router.post("/books", postController.createBook);
router.get("/books/:id", postController.getBookById);

module.exports = router;
