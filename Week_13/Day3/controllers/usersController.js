const {users} = require('../config/db.js')

const getAllUsers = (req, res) => {
  //   console.log(req);
  res.status(201).json(users);
};

const updateUser = (req, res) => {
  const { name, email } = req.body;
  const { userid } = req.params;
  const index = users.findIndex((item) => item.id == userid);
  if (index === -1) {
    res.status(404).json({ msg: "user to mpdify not found" });
    return;
  }
  users[index] = { ...users[index], name, email };
  res.json(users);
};

const deleteUser = (req, res) => {
  const { userid } = req.params;
  const index = users.findIndex((item) => item.id == userid);
  if (index === -1) {
    res.status(404).json({ msg: "user to mpdify not found" });
    return;
  }
  users.splice(index, 1);
  res.json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id == id);
  if (!user) {
    // res.status(404).json({ msg: "user not found" });
    res.sendStatus(404);
    return;
  }
  res.json(user);
};

const searchUsers = (req, res) => {
  const { a } = req.query;
  const filteredUsers = users.filter((item) => {
    return item.name.toLowerCase().includes(a.toLowerCase());
  });
  if (filteredUsers.length === 0) {
    res.status(404).json({ msg: " no user match your search" });
  }
  res.json(filteredUsers);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { name, email, id: users.length + 1 };
  users.push(newUser);
  res.json({ msg: "user created" });
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  searchUsers,
  createUser,
};
