//Function declaration

//Syntax

//    Starts with the keyword function.
//    Then the function’s name.
//    Then a list of parameters enclosed by parentheses. These parameters behave like local variables inside the function body.
//    Then, the function body comprises a set of JavaScript statements enclosed by curly braces. The body executes when the function is invoked

function say(name) {
    alert("Hello " + name);
}         

say("Sarah"); 

//Function expression

//Functions assigned to variables.
//They are invoked by calling the variable name with a pair of parentheses containing any arguments.
//The function itself does not have a name, so this is an anonymous function.

let say = function (name) {
    alert("Hello " + name);
}         
say("Sarah"); 


//Function hoisting

//A JavaScript function can be invoked before its declaration. This works because the JavaScript engine implicitly hoists the function to the top to be visible throughout the program.

say("Sarah"); 

function say (name) {
    alert("Hello " + name);
}         


//Immediate functions (ie. self-invoking functions).

//Immediate functions execute as soon as JavaScript encounters them. These functions are a powerful concept that is frequently used in JavaScript.

//The opening parenthesis before a function keyword tells JavaScript to interpret the function keyword as a function expression.

(function (name) {
    alert("Hello " + name);
})("Sarah")

//I. Nested functions

//A function is called nested when it is created inside another function.

//    The nested (inner) function is private to its containing (outer) function.

function verify (name) {            // outer function  
    function isJohn() {             // inner function
        return name === "John";     // full access to argument        
    }
    if (isJohn()) {
        alert("Yep, this is John");
    }
}
verify("John");

//The inner function isJohn has full access to the name argument of the outer function; there is no need to pass a parameter to the internal function.

function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}

a = addSquares(2, 3); // returns 13
b = addSquares(3, 4); // returns 25
c = addSquares(4, 5); // returns 41


//Example:

const hummus = function(factor) {
    const ingredient = function(amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};

hummus(2)

//Here the nested function ingredient is made for convenience.

//    It can access the external variables and so can use the parameter factor.
//    It’s local variables and parameters such as unit or ingredientAmount are not visible in the outer function (ie. the hummus function).

//The visibility of variables and parameters (ie. called “bindings”) inside a block is determined by the place of that block in the program. 

//To summarize:

//    The inner function can be accessed only from statements in the outer function.
//    The inner function can use the arguments and variables of the outer function, while the outer function cannot use the arguments and variables of the inner function.

//II. Closures

//A closure is a function that remembers its outer variables and can access them.

//Therefore, in a nested function, the inner function forms a closure. This means that a nested function can “inherit” the arguments and variables of its containing function. In other words, the inner function contains the scope of the outer function.

//A closure is most commonly created when a nested function object is returned from the function within which it was defined.

///Since the inner function forms a closure, you can call the outer function and specify arguments for both the outer and inner function:

function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}

let fnInside = outside(3);
console.log(fnInside) 
// function inside(y) {
//    return x + y;
//  }
console.dir(fnInside) 
// Closure (outside) x: 3

let result = fnInside(5); // The same as calling outside(3)(5)
console.log(result) // returns 8


    When the outside function is invoked, it returns a reference to the increment function
    When the outside function finishes execution, JavaScript saves its scope, and only the function that it returns, in our example inside , has to access it.
    This is the function’s closure and includes a copy of the variable x

//Since inside is defined within outside, it has access to the x variable of the function outside, even if outside completed its execution.

//III. Currying

//Currying is a way to reduce functions of multiple arguments to the functions of one argument.

//A curried function is a function that takes multiple arguments one at a time.

const add = a => b => a + b;
const result = add(2)(3)
console.log(result) // console.log 5

//Explanation

 //   First, the function takes a, and then returns a new function,
 //   which then takes b and returns the sum of a and b.

//Each argument is taken one at a time

//The add function takes one argument and then returns a partial application of itself with a fixed in the closure scope.

//The parentheses in the example above represent function invocations: add is invoked with 2, which returns a partially applied function with a fixed to 2. Instead of assigning the return value to a variable or otherwise using it, we immediately invoke the returned function bypassing 3 to it in parentheses, which completes the application and returns 5.


//Example:

const multiply = (n, m) => (n * m)
multiply(3, 4) === 12 // true

const curryedMultiply = (n) => (m) => multiply(n, m)
let triple = curryedMultiply(3)
triple(4) === 12 // true


//Is There Uncurrying?

//Uncurrying is the inverse operation of currying.

curryedMultiply = (n) => (m) => n * m
curryedMultiply(3)(4) === 12 // true

multiply = (n, m) => curryedMultiply(n)(m)
multiply(3, 4) === 12 // true




