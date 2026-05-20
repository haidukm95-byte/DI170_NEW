/* Instructions

Write a function that takes a number as input and returns a string indicating whether the number is positive, negative, or zero.
Use if...else statements to control the flow of a program. */

const numberType = (n: number): string => {
    if (n > 0) return 'The number is positive';
    if (n < 0) return 'The number is negative';
    return 'The number is zero';
}

console.log(numberType(5));
console.log(numberType(-3));
console.log(numberType(0));