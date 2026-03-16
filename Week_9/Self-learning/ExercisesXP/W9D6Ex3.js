//Exercise 3: User & id
//Instructions

//Using this object 
const users = { user1: 18273, user2: 92833, user3: 90315 };

//Using methods taught in class, turn the users object into an array:
//Excepted output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]
//FYI : The number is their ID number.
const users1=Object.entries(users);
console.log(users1);

//Modify the outcome of part 1, by multipling the user’s ID by 2.
// Excepted output: [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]
const users2 = Object.fromEntries(
  Object.entries(users).map(([key, val]) => [key, val * 2])
);
const users2Array=Object.entries(users2)
console.log(users2Array);