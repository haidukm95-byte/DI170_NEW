"use strict";
/* Instructions

Create an overloaded function greet that can either take a name and greet the person,
or take no arguments and return a default greeting.

*/
Object.defineProperty(exports, "__esModule", { value: true });
function greeting(name = 'Guest') {
    return `Hello, ${name}!`;
}
;
console.log(greeting());
console.log(greeting('John Doe'));
//# sourceMappingURL=Ex9.js.map