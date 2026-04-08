const express = require("express");
const postController = require("../controllers/Postcontroller.js");

const router = express.Router();

// Define routes
router.get("/posts", postController.getAllPosts);
router.post("/posts", postController.createPost);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
