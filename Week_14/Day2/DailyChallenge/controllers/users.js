/*
POST /register: Allow users to register by providing a username and password. Hash the password using bcrypt before storing it in the the database
POST /login: Allow users to login by providing their username and password. Compare the hashed password from the JSON file with the provided password.
GET /users: Retrieve a list of all registered users from the database
GET /users/:id: Retrieve a specific user by ID from the database
PUT /users/:id: Update a user’s information by ID in the database
*/
const db = require("../config/db.js");
const bcrypt = require("bcrypt");

const users = {
  //REGISTER

  register: async (req, res) => {
    //POST  /register
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.first_name ||
      !req.body.last_name ||
      !req.body.password
    ) {
      return res.status(400).send("Fill all the fields!");
    }
    try {
      const newUser = await db("users")
        .returning(["id", "email", "username", "first_name", "last_name"])
        .insert({
          email: req.body.email,
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        });
      await db("hashpwd").insert({
        userid: newUser[0].id,
        password: await bcrypt.hash(req.body.password, 10),
      });
      console.log("Account created");
      res.status(201).send(newUser[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },

  //LOGIN
  login: async (req, res) => {
    try {
      // 1. Get user from DB
      const user = await db("users")
        .select("id", "username")
        .where("username", req.body.username)
        .first();

      if (!user) return res.status(404).send("User not found");

      // 2. Get their hashed password
      const hashRow = await db("hashpwd")
        .select("password")
        .where("userid", user.id)
        .first();

      if (!hashRow) return res.status(500).send("Password record missing");

      // 3. Compare plain text input with stored hash
      const match = await bcrypt.compare(req.body.password, hashRow.password);

      if (!match) return res.status(401).send("Invalid password");

      res.status(200).send("Logged in successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },

  //GET ALL USERS

  getAllUsers: async (req, res) => {
    //GET /users
    try {
      await db("users")
        .select()
        .from("users")
        .then((data) => {
          if (!data.length)
            return res.status(404).send("No users in the list!");
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },

  //GET USER BY ID

  getUserById: async (req, res) => {
    //GET  /users/:id
    try {
      await db("users")
        .select()
        .from("users")
        .where("id", req.params.id)
        .then((data) => {
          if (!data.length) return res.status(404).send("No user ID entered!");
          console.log(data);
          res.status(200).send(data);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },

  //USER UPDATE

  userUpdate: async (req, res) => {
    try {
      const userFields = {};
      if (req.body.email) userFields.email = req.body.email;
      if (req.body.username) userFields.username = req.body.username;
      if (req.body.first_name) userFields.first_name = req.body.first_name;
      if (req.body.last_name) userFields.last_name = req.body.last_name;

      let updatedUser;
      if (Object.keys(userFields).length) {
        updatedUser = await db("users")
          .returning(["id", "email", "username", "first_name", "last_name"])
          .where("id", req.params.id)
          .update(userFields);
      } else {
        updatedUser = await db("users")
          .select("id", "email", "username", "first_name", "last_name")
          .where("id", req.params.id);
      }

      if (req.body.password) {
        await db("hashpwd")
          .where("userid", updatedUser[0].id)
          .update({ password: await bcrypt.hash(req.body.password, 10) });
      }

      console.log("Account updated");
      res.status(200).send(updatedUser[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send("Connection failed");
    }
  },
};

module.exports = users;
