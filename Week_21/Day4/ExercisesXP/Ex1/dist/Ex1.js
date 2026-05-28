"use strict";
/* Instructions:

Create a class Employee with the following properties:

    A private property name of type string.
    A private property salary of type number.
    A public property position of type string.
    A protected property department of type string.

Also, include a constructor to initialize these properties. Create a public method getEmployeeInfo that returns
the employee’s name and position.

*/
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`;
    }
}
const emp = new Employee("Alice Johnson", 75000, "Software Engineer", "Engineering");
console.log(emp.getEmployeeInfo());
console.log(emp.position);
//# sourceMappingURL=Ex1.js.map