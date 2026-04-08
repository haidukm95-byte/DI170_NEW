const db = require("../../../Ex2/book-api/config/db");

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      db("books")
        .select()
        .from("books")
        .then((data) => {
          if (!data || data.length === 0) return res.status(404).send("No data!");
          console.log(data);
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.send({ message: err.detail });
    }
  },

  getBookById: async (req, res) => {
    try {
      db("books")
        .select()
        .from("books")
        .where("id", req.params.id)
        .then((data) => {
          if (!data) return res.status(404).send("Data not found");
          console.log(data);
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },

  createBook: async (req, res) => {
    if (!req.body.title || !req.body.author)
      return res
        .status(400)
        .send('Bad request. Please check if you entered "title" and "author" correctly');
    try {
      db("books")
        .returning(["id", "title", "author", "publishedyear"])
        .insert({
          title: req.body.title,
          author: req.body.author,
          publishedyear: req.body.publishedyear,
        })
        .then((data) => {
          console.log("Book added!");
          res.status(201).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },
};

module.exports = bookController;
