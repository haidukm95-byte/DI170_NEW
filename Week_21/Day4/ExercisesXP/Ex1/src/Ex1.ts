/* Instructions:

Create a class Employee with the following properties:

    A private property name of type string.
    A private property salary of type number.
    A public property position of type string.
    A protected property department of type string.

Also, include a constructor to initialize these properties. Create a public method getEmployeeInfo that returns 
the employee’s name and position. 

*/

class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`;
  }
}

const emp = new Employee("Alice Johnson", 75000, "Software Engineer", "Engineering");
console.log(emp.getEmployeeInfo());
console.log(emp.position);
