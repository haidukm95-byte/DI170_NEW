//Analyse this code before executing it. What will be the output ?

const user = { name: 'Lydia', age: 21 };
const admin = { admin: true, ...user };
console.log(admin);
//Object { admin: true, name: "Lydia", age: 21 }
//Object spreading has been used


