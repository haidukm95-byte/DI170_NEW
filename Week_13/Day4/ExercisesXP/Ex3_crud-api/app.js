/*Exercise 3: Building a Basic CRUD API with Express and Axios using a Data Module
Instructions
In this exercise, you’ll build a basic CRUD (Create, Read, Update, Delete) API using Express.js and Axios to 
retrieve data from the JSONPlaceholder API and respond with that data in your own API. You’ll also create a 
separate module to handle data retrieval using Axios.

Part 1: Setting Up the Express Server
    1. Create a new directory named crud-api.
    2. Inside the crud-api directory, initialize a new Node.js project and install the express and axios 
    packages.
    3. Create a new file named app.js in the crud-api directory.
    4. In app.js, import the express module and create an instance of an Express app.
    5. Set up the app to listen on port 5000. Print a message in the console to indicate that the server is 
    running.

Part 2: Creating a Data Module for Axios
    1. Inside the crud-api directory, create a new directory named data.
    2. Inside the data directory, create a new file named dataService.js.
    3. In dataService.js, import the axios module and create a function named fetchPosts that makes a GET 
    request to the JSONPlaceholder API to fetch data for all posts.
    4. Export the fetchPosts function.

Part 3: Using the Data Module in the Express App
    1. Inside app.js, import the dataService module you created.
    2. Create an endpoint in your Express app that uses the fetchPosts function from the dataService module to 
    retrieve data from the JSONPlaceholder API.
    3. Respond with the fetched data from the JSONPlaceholder API. https://jsonplaceholder.typicode.com/posts
    4. Print a message in the console to indicate that the data has been successfully 
    retrieved and sent as a response.
*/

const express = require("express");
const { fetchPosts } = require("./data/data-service.js");
const app = express();
const port = 5000;

app.get("/posts", async (req, res) => {
  const posts = await fetchPosts();
  console.log("Data successfully retrieved and sent.");
  res.json(posts);
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
