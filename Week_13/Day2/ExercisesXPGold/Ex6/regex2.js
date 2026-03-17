/*Exercise 6 : Regular Expression #2
Instructions

    Ask the user for his full name (example: "John Doe"), and use the regular expression module to check the
    validity of his answer:
        The name should contain only letters.
        The name should contain only one space.
        The first letter of each name should be upper cased.
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pattern breakdown:
// ^       - start of string
// [A-Z]   - first name starts with uppercase
// [a-z]+  - followed by one or more lowercase letters
// \s      - exactly one space
// [A-Z]   - last name starts with uppercase
// [a-z]+  - followed by one or more lowercase letters
// $       - end of string
const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

rl.question("Enter your full name (e.g. John Doe): ", (name) => {
  if (namePattern.test(name)) {
    console.log(name + " is a valid full name.");
  } else {
    console.log(name + " is not valid.");
    console.log("Requirements:");
    console.log("  - Only letters (no numbers or special characters)");
    console.log("  - Exactly one space between first and last name");
    console.log("  - First letter of each name must be uppercase");
  }
  rl.close();
});
