let person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

person.propertyName;

console.log(person.firstName) ;// John
// OR
console.log(person["firstName"]);

person.firstName = "Sarah"
person.eyeColor= "blue"

console.log(person) 