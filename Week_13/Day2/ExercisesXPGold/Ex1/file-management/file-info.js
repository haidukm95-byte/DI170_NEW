//Exercise 1 : File Management and Path Manipulation
//Instructions
//Create a directory named file-management.
//Inside the file-management directory, open a terminal and run npm init to initialize a new Node.js project.
// Follow the prompts to set up your project.
//Create a directory named data inside the file-management directory.
//Inside the data directory, create a file named example.txt and add some content to it.
//Create a file named file-info.js inside the file-management directory.

//    In file-info.js, require the path and fs modules and implement the following functionality:
//        Use the path.join function to create a file path to the example.txt file within the data directory.
//        Use the fs.existsSync function to check if the file exists.
//        Use the fs.statSync function to get information about the file, such as size and creation time.
//        Display the file’s existence, size, and creation time in the terminal.

//    Create another file named app.js in the same directory.

//   In app.js, require the file-info.js module and call the function you’ve written to display information
// about the file.

//    Run app.js using Node.js and verify that the file’s existence, size, and creation time are displayed in
// the terminal.

const fs = require("fs");
const path = require("path");
const fileCheck = () => {
  const filePath = path.join(__dirname, "./data/example.txt");
  const exists = fs.existsSync(filePath);

  if (exists) {
    console.log("File exists");
    const stats = fs.statSync(filePath);
    console.log("Size: ", stats.size, "bytes");
    console.log("Created: ", stats.birthtime);
  } else {
    console.log("File does not exist!");
  }
};

module.exports = fileCheck;
