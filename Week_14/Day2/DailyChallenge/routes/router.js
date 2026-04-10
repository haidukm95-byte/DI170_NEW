const express = require("express");
const router = express.Router();
const users = require("../controllers/users.js");

router.post("/register", users.register);
router.post("/login", users.login);
router.get("/users", users.getAllUsers);
router.get("/users/:id", users.getUserById);
router.put("/users/:id", users.userUpdate);

module.exports = router;
