const express = require("express");
const router = express.Router();

const {
  usersView,
  userView,
  userAppend,
  userDelete,
  userUpdate,
} = require("../controllers/user-functions.js");

router.get("/api/users/", usersView);
router.get("/api/users/:id", userView);
router.post("/api/users", userAppend);
router.put("/api/users/:id", userUpdate);
router.delete("/api/users/:id", userDelete);

module.exports = router;
