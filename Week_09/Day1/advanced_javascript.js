//I. Scope in JavaScript
//Scope defines the lifetime and visibility of a variable.
//Variables are not visible outside the scope in which they are declared.
//A. Function Scope

//Function scope means that parameters and variables defined in a function are visible everywhere within the function but are not visible outside of the function.

//Consider the next function:

function autoexecute() {
    let x = 1;
};
console.log(x);
//Uncaught ReferenceError: x is not defined
//Because x only exists within the function

//1. Access before declaration

//Variables declared with var keyword are hoisted to the top of their scope. This way they can be accessed before being declared. Take a look at the code below:

function doSomething(){
  console.log(x); //undefined
  var x = 1;
  console.log("x: ", x); //x: 1
}
doSomething();


//This does not happen for the let keyword. A variable declared with let can be accessed only after its definition.

function doSomething(){
  console.log(x);
  let x = 1;
}
doSomething();
//Uncaught ReferenceError: x is not defined


//2. Re-declaration of variables

//A variable declared with var can be re-declared multiple times in the same scope. The following code is just fine:

function doSomething(){
  var x = 1
  var x = 2;
  console.log("x: ",x); //x: 2
}
doSomething();


//Variables declared with let or const cannot be re-declared in the same scope

function doSomething(){
  let x = 1
  let x = 2;
}
doSomething()
//Uncaught SyntaxError: Identifier 'x' has already been declared

//Maybe we don’t even have to care about this, as the keyword var has started to become obsolete.

//B. Block Scope

//Block scope is defined with curly braces. It is separated by { and }.

//Variables declared with let and const keywords can have block scope. They can only be accessed in the block in which they are defined.

//Consider the next code that emphasizes let block scope:

let x = 1;
{
  let x = 2;
}
console.log("x : ", x); //x: 1

//In contrast, the var declaration has no block scope:

var x = 1;
{
  var x = 2;
}
console.log("x: ", x); //x: 2

//II. Functions in JavaScript
//Default parameters

//Default function parameters allow named parameters to be initialized with default values if no value or undefined is passed.

function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2));
//expected output: 10

console.log(multiply(5));
//expected output: 5


//III. Conditional in JavaScript
//A. Conditional (ternary) operator

//The ternary operator is the only JavaScript operator that takes three operands:

 //   a condition followed by a question mark (?),

 //   an expression to execute if the condition is true, followed by a colon (:),

 //   and finally, the expression to execute if the condition is false.

//<condition> ? <expression> : <expression>

//This operator is frequently used as a shortcut for the if statement.

function getFee(isMember) {
  return (isMember ? "$2.00" : "$10.00");
}

console.log(getFee(true));
// expected output: "$2.00"

console.log(getFee(false));
// expected output: "$10.00"

console.log(getFee(1));
// expected output: "$2.00"
// because Boolean(1) is true

