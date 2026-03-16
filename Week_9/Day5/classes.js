//Classes

//Classes are a template for creating objects. Such objects are called instances of the class
//ECMAScript 2015, also known as ES6, introduced JavaScript Classes.
//Defining classes

//Classes are in fact “special functions”, and just as you can define function expressions and function declarations, the class syntax has two components: class expressions and class declarations.
//A. Class declarations

//One way to define a class is using a class declaration. To declare a class, you use the class keyword with the name of the class (“Rectangle” here).

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
//this is similar to .self in python

//Methods

class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

//instance of the class Rectangle
const square = new Rectangle2(10, 10);

//calling the method
console.log(square.calcArea()); // 100

console.log(square)
//Rectangle {height: 10, width: 10}
//__proto__:
//  constructor: class Rectangle
//  calcArea: ƒ calcArea()
//__proto__: Object
