const express = require("express");
const app = express();
const db = require("./config/db.js");
const port = 5882;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/posts", (req, res) => {
  db("posts")
    .select()
    .from("posts")
    .then((data) => {
      if (!data || data.length === 0) res.status(404).send("No data!");
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

app.get("/posts/:id", (req, res) => {
  db("posts")
    .select()
    .from("posts")
    .where("id" === req.params.id)
    .then((data) => {
      if (!data) res.status(404).send("Data not found");
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Connection failed");
    });
});

app.post("/posts", (req, res) => {
  db("posts")
    .returning(["id", "title", "content"])
    .insert({ title: req.body.title, content: req.body.content })
    .then((data) => {
      if (!req.body.title || !req.body.content)
        res
          .status(400)
          .send(
            'Bad request. Please check if you entered \"title\" and \"content\" correctly',
          );
      console.log("Post created!");
      res.status(201).send(data);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).send("Connection failed");
    });
});

app.put("/posts/:id", (req, res) => {
  db("posts")
    .where("id", req.params.id)
    .update({ title: req.body.title, content: req.body.content }, [
      "title",
      "content",
    ])
    .then((data) => {
      if (!req.params.id || !req.body.title || !req.body.content)
        res
          .status(400)
          .send(
            'Bad request. Please check if you entered \"title\" and \"content\" correctly',
          );
      console.log("Post updated!");
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Connection failed");
    });
});

app.delete("/posts/:id", (req, res) => {
  db("posts")
    .where("id", req.params.id)
    .del(["id", "title", "content"])
    .then((data) => {
      if (!req.params.id)
        res
          .status(400)
          .send(
            'Bad request. Please check if you entered \"title\" and \"content\" correctly',
          );
      console.log("Post deleted");
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Connection failed");
    });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
