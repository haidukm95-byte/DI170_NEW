"use strict";
// nodeTS to node typescript
// tsc main.ts to compile
// tsc main.ts aa.ts to rename
// tsc --init to run node for typecript (just like run in nodejs)
let avg9999 = {
    name: "Mark",
    age: 30,
    gender: 'male',
};
let unknown45 = {
    name: 'unknpown',
    age: 33,
    gender: "female"
};
; // use of type unions impossible!
let arrUsers = [avg9999, unknown45];
/** functions */
const sum = (a, b) => {
    /** type guard */
    //if (b===undefined) return a;
    if (typeof b === 'string')
        return a + b + '';
    return a + b;
};
console.log(sum(6, "7"));
//# sourceMappingURL=main.js.map