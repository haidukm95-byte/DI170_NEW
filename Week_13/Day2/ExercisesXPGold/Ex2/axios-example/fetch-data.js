/* Exercise 2 : Fetching and Displaying Data with Axios
Instructions
+Create a directory named axios-example.
+Inside the axios-example directory, open a terminal and run npm init to initialize a new Node.js project.
      Follow the prompts to set up your project.  
+Install the axios package by running npm install axios in the terminal.
+Create a file named fetch-data.js inside the axios-example directory.
In fetch-data.js, require the axios package and use it to make an HTTP GET request to a JSON placeholder API
      (e.g., https://jsonplaceholder.typicode.com/posts) and fetch a list of posts.
Display the title of each post in the terminal.
+Create another file named app.js in the same directory.
In app.js, require the fetch-data.js module and call the function you’ve written to fetch and display the
      post titles.
Run app.js using Node.js and verify that the post titles are displayed in the terminal. */

const axios = require("axios");
async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    response.data.forEach((post) => console.log(post.title));
  } catch (error) {
    console.log("Error fetching data!", error);
  }
}
module.exports = fetchData;
