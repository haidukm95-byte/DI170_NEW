//1. Object.keys()

const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object1));
// expected output: ["a", "b", "c"]

//2. Object.values()
console.log(Object.values(object1));
// expected output: ["somestring", 42, false]

//3. Object.entries()
//outputs all the consent of the object
console.log(Object.entries(object1));
// expected output: 
// [ [ 'a', 'somestring' ], [ 'b', 42 ], [ 'c', false ] ]

//4. Object.fromEntries()

//The Object.fromEntries() method allows you to convert a list of key-value pairs into an object quickly.

//Syntax :
//Object.fromEntries(iterable)

//    it accepts a parameter, more specifically an iterable such as Array or Map.
//    it returns a new object whose properties are given by the entries of the iterable.

//Example:
const shopping = [
  ["apple", "$2"],
  ["pear", "$1"],
  ["banana", "$0.77"],
];
const shoppingObject = Object.fromEntries(shopping);
console.log(shoppingObject); // { apple: '$2', pear: '$1', banana: '$0.77' }