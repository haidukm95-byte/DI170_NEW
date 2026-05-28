"use strict";
/*
Exercise 5: Extending Interfaces with Optional and Readonly Properties
Instructions:

Create an interface User with properties id (readonly), name, and email. Extend the User interface to create a
PremiumUser interface with an additional optional property membershipLevel. Create a function printUserDetails that
accepts a PremiumUser and logs the details to the console.

*/
Object.defineProperty(exports, "__esModule", { value: true });
function printUserDetails(user) {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    }
}
const user1 = { id: 1, name: "Alice", email: "alice@example.com", membershipLevel: "Gold" };
const user2 = { id: 2, name: "Bob", email: "bob@example.com" };
printUserDetails(user1);
printUserDetails(user2);
//# sourceMappingURL=Ex5.js.map