/*Part 2: Creating a Data Module for Axios
    1. Inside the crud-api directory, create a new directory named data.
    2. Inside the data directory, create a new file named dataService.js.
    3. In dataService.js, import the axios module and create a function named fetchPosts that makes a GET 
    request to the JSONPlaceholder API to fetch data for all posts.
    4. Export the fetchPosts function. */

const axios = require("axios");
async function fetchPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
}

module.exports = { fetchPosts };
