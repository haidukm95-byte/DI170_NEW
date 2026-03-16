//Exercise 3 : Repeat the question
//Instructions
//  Prompt the user for a number.
//    Hint : Check the data type you receive from the prompt 
// (ie. Use the typeof method)
let number=prompt('Please enter the number');
console.log(typeof number);
//    While the number is smaller than 10 continue asking the user for 
// a new number.
//    Tip : Which while loop is more relevant for this situation?
do {
    number = parseInt(prompt("Enter a number:"));
} while (number < 10);

console.log("You entered:", number);


