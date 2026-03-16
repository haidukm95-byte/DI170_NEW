//the current number is 0 script8.js:4:13
//0 is even script8.js:6:17
//the current number is 1 script8.js:4:13
//1 is odd script8.js:9:17
//the current number is 2 script8.js:4:13
//2 is even script8.js:6:17
//the current number is 3 script8.js:4:13
//3 is odd script8.js:9:17
//the current number is 4 script8.js:4:13
//4 is even script8.js:6:17
//the current number is 5 script8.js:4:13
//5 is odd script8.js:9:17
//the current number is 6 script8.js:4:13
//6 is even script8.js:6:17
//the current number is 7 script8.js:4:13
//7 is odd script8.js:9:17
let person = {fname:"John", lname:"Doe", age:25};
for (let x in person) {
  console.log(x) //fname lname age
  console.log(person[x]) // John Doe 25
}
//fname debugger eval code:3:11
//John debugger eval code:4:11
//lname debugger eval code:3:11
//Doe debugger eval code:4:11
//age debugger eval code:3:11
//25 debugger eval code:4:11
//undefined
for (let x in person) {
  console.log(x) 
  console.log(person[x]) 
}
//fname debugger eval code:2:11
//John debugger eval code:3:11
//lname debugger eval code:2:11
//Doe debugger eval code:3:11
//age debugger eval code:2:11
//25 debugger eval code:3:11
undefined
let n = 0;
while (n < 3) {
  n++;
  console.log(n)
}
//1 debugger eval code:4:11
//2 debugger eval code:4:11
//3 debugger eval code:4:11
//undefined
let i = 0;
do {
  console.log("The number is " + i)
  i++;
}
//The number is 0 debugger eval code:3:11
//The number is 1 debugger eval code:3:11
//The number is 2 debugger eval code:3:11
//The number is 3 debugger eval code:3:11
//The number is 4 debugger eval code:3:11
//The number is 5 debugger eval code:3:11
//The number is 6 debugger eval code:3:11
//The number is 7 debugger eval code:3:11
//The number is 8 debugger eval code:3:11
//The number is 9 debugger eval code:3:11
//9 