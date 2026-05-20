"use strict";
/* Instructions

    Define the Object Structure:

    Create an object type annotation that defines the shape of a Person object. The object should have two
    properties: name (a string) and age (a number).

    Create the Function:
    Write a function named createPerson that takes two parameters: name (string) and age (number).

    The function should return an object that matches the Person structure.

    Test the Function:
    Test the createPerson function by creating a person and logging the result to the console.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createPerson(obj) {
    if (typeof obj.name !== 'string' && typeof obj.age !== 'number')
        return console.error();
    return obj;
}
let person1 = {
    name: 'John Doe',
    age: 35
};
let person2 = {
    name: 'Ed Ashton',
    age: 38
};
let person3 = {
    name: 'Sarah Jennings',
    age: 34
};
let person4 = {
    name: 2323,
    age: 'sds'
};
console.log(createPerson(person1));
console.log(createPerson(person2));
console.log(createPerson(person3));
console.log(createPerson(person4));
//# sourceMappingURL=Ex6.js.map