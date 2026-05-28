"use strict";
/*
 Exercise 3: Class Inheritance
 Create a base class Animal with a public property name and a method makeSound that returns a string.
 Create a subclass Dog that extends Animal and overrides the makeSound method to return the sound a dog makes
 (“bark”). Create an instance of the Dog class and call the makeSound method.
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return `${this.name} makes a sound`;
    }
}
class Dog extends Animal {
    makeSound() {
        return `${this.name} barks`;
    }
}
const dog = new Dog("Rex");
console.log(dog.makeSound());
//# sourceMappingURL=Ex3.js.map