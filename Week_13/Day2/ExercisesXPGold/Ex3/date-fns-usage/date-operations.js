/*Exercise 3 : Working with Dates Using the date-fns Module
Instructions
    +Create a directory named date-fns-usage.
    +Inside the date-fns-usage directory, open a terminal and run npm init to initialize a new Node.js project. Follow the prompts to set up your project.
    +Install the date-fns package by running npm install date-fns in the terminal. date-fns is a library for working with dates and times.
    +Create a file named date-operations.js inside the date-fns-usage directory.
    In date-operations.js, require the date-fns package and perform the following operations:
        Get the current date and time.
        Add 5 days to the current date.
        Format the resulting date as a string.
        Display the formatted date in the terminal.
    Create a file named app.js in the same directory.
    In app.js, require the date-operations.js module and call the function you’ve written to perform and display the date operations.
    Run app.js using Node.js and verify that the formatted date is displayed in the terminal. 
*/
import { format, addDays } from "date-fns";

export function main() {
  const now = new Date(); // current date and time
  const formattedNow = format(now, "yyyy-MM-dd HH:mm:ss");
  console.log(`Current date: ${formattedNow}`);
  const plusFiveDays = addDays(now, 5);
  const formattedFive = format(plusFiveDays, "yyyy-MM-dd HH:mm:ss");
  console.log(`Date five days later: ${formattedFive}`);
}
