let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
  myFunc: ()=> "console.log('hi');"
  
};
//EVERY value in JSON has to be wrapped with double quotemarks,
//unless it`s not a string!

let jsonStudent = JSON.stringify(student);

console.log(jsonStudent)