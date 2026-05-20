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

type Person={
    name: string;
    age: number;
};

function createPerson(obj: Person){
    if (typeof obj.name!=='string' && typeof obj.age!=='number') return console.error();
    return obj;
}

let person1: Person={
    name: 'John Doe',
    age: 35
};

let person2: Person={
    name: 'Ed Ashton',
    age: 38    
};

let person3: Person={
    name: 'Sarah Jennings',
    age: 34    
}

console.log(createPerson(person1));
console.log(createPerson(person2));
console.log(createPerson(person3));


