const express = require("express");
const app = express();
const db = require("./config/db.js");
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/books", (req, res) => {
  db("books")
    .select()
    .from("books")
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(404).send("No content!");
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.detail });
    });
});

app.get("/books/:id", (req, res) => {
  db("books")
    .select()
    .from("books")
    .where("id", req.params.id)
    .then((data) => {
      if (!data || data.length === 0)
        return res.status(404).send("Data not found");
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.detail });
    });
});

app.post("/books", (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.publishedyear)
    return res
      .status(400)
      .send(
        'Bad request. Please check if you entered "title", "author" and "publishedyear" correctly',
      );

  db("books")
    .insert({
      title: req.body.title,
      author: req.body.author,
      publishedyear: req.body.publishedyear,
    })
    .returning(["id", "title", "author", "publishedyear"])
    .then((data) => {
      console.log("Book added!");
      res.status(201).send(data);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.detail });
    });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
