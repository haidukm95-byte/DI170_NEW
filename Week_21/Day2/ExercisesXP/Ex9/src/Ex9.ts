/* Instructions

Create an overloaded function greet that can either take a name and greet the person, 
or take no arguments and return a default greeting.

*/

function greeting(name: string='Guest'): string{
    return `Hello, ${name}!`;
};

console.log(greeting());
console.log(greeting('John Doe'));