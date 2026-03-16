//Exercise 2: Advanced Module Usage using ES6 module syntax
//Instructions
//Create a file named data.js.
//Inside data.js, define an array of objects, each representing a person with properties like name, age,
// and location.
//Export the array using the ES6 module syntax.
//Create another file named app.js.
//In app.js, import the array of person objects from the data.js module.
//Write a function that calculates and prints the average age of all the persons in the array.
//Use the imported array and the average age function in app.js.
//Run app.js and confirm that the average age is correctly calculated and displayed.

export const persons = [
  { name: "Marko", age: 30, location: "Mevaseret Zion, Israel" },
  { name: "Alex", age: 50, location: "Panama City, FL, USA" },
  { name: "Ignat", age: 47, location: "Berlin, Germany" },
  { name: "Anne", age: 28, location: "Holon, Israel" },
  { name: "Stanislav", age: 28, location: "Poltava, Ukraine" },
  { name: "Olena", age: 63, location: "Paphos, Cyprus" },
];
