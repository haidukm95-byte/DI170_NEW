//Exercise 3 : Is it a string ?
//Instructions
//Write a JavaScript arrow function that checks whether the value of the 
//      argument passed, is a string or not. The function should return true 
//      or false
//Check out the example below to see the expected output
let isString=(x)=>{
  if (typeof(x)==='string'){
    return true;
  }
  else{
    return false;
  }
} 
console.log(isString(23432423))
//false
console.log(isString('World Wide Web'))
//true