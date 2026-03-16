import { persons } from "./data.js";
const averageAge = () => {
  let sum = 0;
  for (let i = 0; i < persons.length; i++) {
    sum += persons[i].age;
  }
  let avg = sum / persons.length;
  console.log(`The average age of the participants is ${avg}`);
};

averageAge();
