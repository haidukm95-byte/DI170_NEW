const express = require("express");
const { userRouter } = require("./routes/usersRouter.js");
const { productsRouter } = require("./routes/productsRouter.js");
// import express from "express";
// const bp = require('body-parser')

const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`run on ${PORT}`);
});

app.use("/", express.static(__dirname + "/public"));

/** json body */
app.use(express.json());
/** form data */
// app.use(express.urlencoded())

app.use("/api/usr", userRouter);
app.use("/api/prd", productsRouter);

/**
 * app.get
 * app.post
 * app.put
 * app.delete
 */
/**
 * API
 */
/**
 * HTTP -Methods
 * GET
 * POST
 * PUT
 * DELETE
 */
/** CRUD
 * Create - POST - Create a new data - new row in db
 * Read  - GET - retrieve data-
 * Update - PUT - modify a password
 * Delete - DELETE - delete something
 */
/**
 * Rest(full) API
 * http://example.com/users - GET - get users
 * http://example.com/users - POST - create get user
 * http://example.com/users - PUT - modify a users
 * http://example.com/users - DELETE - delete a user
 */

// let obj = {
//   a:1
// }

// const obj2 = {...obj, a:2, b:1}

/**
 *  server
 *    |_ config - connection to databases
 *    |_ models - queries to database/files
 *    |_ controllers - function implements code - request, response
 *    |_ routes - route for api
 *    |_ middlewares - function - req, res - auth, log
 */
