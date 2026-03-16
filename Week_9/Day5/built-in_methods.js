//C. Built-in methods: Getters and Setters

//JavaScript classes can have getter and setter functions.

 //   Getters, as the name suggests, is a method that lets us get some data from a class.
//    Setters are methods that give us the ability to set some fields of the class.

//We denote getter functions with the get keyword and setters with the set keyword.

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;

  }
  // Getter
  get area() {
    return this.height * this.width;
  }

  // Setter
  set area(factor) {
    this.width = this.height*factor
  }
}

const square = new Rectangle(10, 10);
square.area = 2
square.area //200
