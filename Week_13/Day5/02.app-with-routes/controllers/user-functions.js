const userdata = require("../userdata.js");

function usersView(req, res) {
  res.json(userdata);
}

function userView(req, res) {
  const id = Number(req.params.id);
  const user = userdata.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
}

function userAppend(req, res) {
  const newUser = {
    id: userdata.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  userdata.push(newUser);
  res.status(201).json(newUser);
}

function userUpdate(req, res) {
  const id = Number(req.params.id);
  const index = userdata.findIndex((user) => user.id === id);
  if (index === -1) return res.status(404).send("User not found");
  const updUser = {
    id: userdata[index].id,
    name: req.body.name,
    age: req.body.age,
  };
  userdata[index] = updUser;
  res.status(200).json(updUser);
}

function userDelete(req, res) {
  const id = Number(req.params.id);
  const index = userdata.findIndex((user) => user.id === id);
  if (index === -1) return res.status(404).send("User not found");
  const deletedUser = userdata[index];

  userdata.splice(index, 1);
  res.status(200).json(`User ${deletedUser.name} has been deleted!`);
}

module.exports = { usersView, userView, userAppend, userUpdate, userDelete };
