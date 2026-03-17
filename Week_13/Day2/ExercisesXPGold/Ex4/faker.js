/*Exercise 4 : Faker Module
Instructions
    1. Install the faker module, and read the documentation.
    2. Create an empty array called users. Tip: It’s an array of objects
    3. Create a function that adds objects to the users array. Each user has the properties: name, address street 
    and country. Use faker to populate them with fake data.
    4. Bonus : Find a node module that allows to prompt the user for his name, address street and country in 
    order to add this information into the users array. */

const faker = require("faker");

let users = [];

function usersAppend(num) {
  for (let i = 0; i < num; i++) {
    const user = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      country: faker.address.country(),
    };
    users.push(user);
  }
  console.log(`${num} new users were successfully added!`);
  console.log("Current users' list:", users);
}

function deleteUserId(id) {
  if (id < users.length) {
    const deletedName = users[id].name;
    users.splice(id, 1);
    console.log(`User ${deletedName} has been successfully deleted!`);
    console.log("Current users' list:", users);
  } else {
    throw new Error();
  }
}

function deleteAll() {
  users.length = 0;
  console.log("All users have been removed from the list!");
}

usersAppend(5);
deleteUserId(2);
deleteUserId(1);
deleteAll();
usersAppend(7);
deleteAll();
