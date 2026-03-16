//Exercise 3 : Analyzing
//Instructions
//Analyze these pieces of code before executing them. What will be the outputs ?

//------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
//the advanced method of arrays and strings splitting is used
//arrays fruits and vegetables are split into separate strings
//the predicted output before the execution is: ['bread', "carrot", "potato", 'chicken', "apple", "orange"]
console.log(result);


//------2------
const country = "USA";
console.log([...country]);
//the advanced method of arrays and strings splitting is used
//the string 'USA' will be split into separate characters and they will create an array: ["U", "S", "A"]


//------Bonus------
let newArray = [...[,,]];
console.log(newArray);
////the advanced method of arrays and strings splitting is used
//as nothing was defined, the output will be [undefined, undefined]