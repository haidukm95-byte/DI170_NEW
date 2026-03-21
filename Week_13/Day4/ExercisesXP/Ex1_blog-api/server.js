/* Exercise 1: Building a RESTful API
Instructions

You’re tasked with building a RESTful API for a blog platform.
Users should be able to create, read, update, and delete blog posts using different endpoints.

    1. Create a directory named blog-api.
    2. Inside the blog-api directory, open a terminal and run npm init to initialize a new Node.js project. 
    Follow the prompts to set up your project.
    3. Install the express package by running npm install express in the terminal.
    4. Create a file named server.js.
    5. In server.js, require the express package and set up an Express app.
    6. Create a data array to simulate a database. Each item in the array should represent a blog post 
    with properties like id, title, and content.
    7. Implement the following routes using Express:
    8. GET /posts: Return a list of all blog posts.
    9. GET /posts/:id: Return a specific blog post based on its id.
    10. POST /posts: Create a new blog post.
    11. PUT /posts/:id: Update an existing blog post.
    12. DELETE /posts/:id: Delete a blog post.
    13. Implement error handling for invalid routes and server errors.
    14. Start the Express app and listen on a specified port (e.g., 3000).
*/
const express = require("express");
const app = express();
const data = [
  {
    id: 1,
    title: "Work at furniture workshop",
    content:
      "Furniture Workshop near Kfar Yonah Transfers from Netanya Schedule from 6: 30 to 16:00 Assembler, installer, assistant for painting furniture.At 45 NIS / hour, preferably with experience and hardworking!",
  },
  {
    id: 2,
    title: "Job Opening in Tel Aviv - Housekeeping Staff Needed!",
    content:
      "This position is only for those who require accommodation. A hotel in Tel Aviv, located near the U.S. Embassy, is hiring room cleaners/housekeeping staff.",
  },
  {
    id: 3,
    title: "Client Account Manager - Wig Salon",
    content:
      "A well-established wig salon in Jerusalem is looking for a Client Account Manager.",
  },
  {
    id: 4,
    title: "Calling All Content Creators & Storytellers!",
    content:
      "The National Library of Israel is looking for a creative, tech-savvy YouTuber to help us bring history and Jewish heritage to life.",
  },
  {
    id: 5,
    title: "Tax Associate Wanted",
    content:
      "We specialize in handling complex tax and compliance issues for American individuals living inside and outside the USA. Our firm provides tax preparation and consulting services. We are known for our expertise in addressing various tax challenges faced by US individuals abroad.",
  },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/posts", (req, res) => {
  res.json(data);
});

app.get("/posts/:id", (req, res) => {
  const post = data.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.post("/posts/", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: data.length + 1,
    title,
    content,
  };
  data.push(newPost);
  res.status(201).json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const post = data.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { title, content } = req.body;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const index = data.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  data.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
