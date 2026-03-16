const { Router } = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
  createUser,
} = require("../controllers/usersController.js");

const router = Router();

router.get("/", getAllUsers);
router.put("/:userid", updateUser);
router.delete("/:userid", deleteUser);
router.get("/:id", getUserById);
router.get("/search", searchUsers);
router.post("/", createUser);

module.exports = {
  userRouter: router,
};
