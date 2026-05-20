"use strict";
/* Instructions

Create a function getDetails that takes a name and age as input and returns a tuple containing the input values and a
greeting message.
The tuple should contain multiple values of different types */
Object.defineProperty(exports, "__esModule", { value: true });
function getDetails(name, age) {
    return [name, age, `Hello, my name is ${name} and I am ${age} years old.`];
}
console.log(getDetails("Alice", 30));
//# sourceMappingURL=Ex5.js.map