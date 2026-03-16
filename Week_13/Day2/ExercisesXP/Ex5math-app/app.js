//In app.js, require the lodash package and the custom math module.
//Use the exported functions from the math module and the utility functions from the lodash package to
// perform calculations.
//Run app.js using Node.js and verify that the calculations are correct.

const lodash = require("lodash");
const { add, mult } = require("./math.js");

add(2, 5);
mult(3, 8);

console.log(lodash.random(1, 200));
console.log(lodash.uniq([2, 5, 6, 2, 3, 8, 6, 5]));
console.log(lodash.clamp(10, 1, 5));
console.log(lodash.clamp(12, 7, 22));
console.log(lodash.isEqual(8, 8));
console.log(lodash.isEqual(6, "6"));
