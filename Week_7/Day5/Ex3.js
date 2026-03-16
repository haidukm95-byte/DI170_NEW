//Using an arrow function, create a calculator that returns the result 
// of the operation based on the given operator: +, -, *, or /.

//The function should accept two numbers as parameters and return the 
// correct calculation result.

//Bonus: Modify your function to use a ternary operator to handle cases 
// where the operator is not valid, returning "Invalid operator"
//  instead of performing a calculation.

const calc = (x, y, operator) =>
    operator === '+' ? x + y
    : operator === '-' ? x - y
    : operator === '*' ? x * y
    : operator === '/' ? x / y
    : "Invalid operator"

console.log(calc(4, 8, '+'))
