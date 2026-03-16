//D. Sub classing with extends

//The extends keyword is used in class declarations or class expressions to create a class as a child of another class.

//A constructor can use the super keyword to call the super class constructor.

class Animal { 
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}


class Dog extends Animal {
  constructor(name,noise) {
    super(name); // call the super class constructor and pass in the name parameter
    // Add a new property
    this.noise = noise;
  }

  speak() {
    console.log(`${this.name} barks.It says ${this.noise}`);
  }
}

let d = new Dog('Mitzie', "Wouaf");
console.log(d.name) // Mitzie
d.speak(); // Mitzie barks.It says Wouaf
console.log(d)
//Dog {name: "Mitzie", noise: "Wouaf"}
//__proto__: Animal
//  constructor: class Dog
//  speak: ƒ speak()
//__proto__: Object
