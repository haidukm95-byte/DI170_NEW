/* 
Exercise 6: Intersection Types and Type Guards

Task

Define a type Employee that combines Person and Job using intersection types. 
Create a function describeEmployee that takes an Employee object and uses type guards to return a 
description based on whether the Job is a Manager or a Developer.

    Person type: name: string; age: number;
    Job type: position: string; department: string;
    Employee type should combine these.
    describeEmployee should return a specific message for each type of job.

*/

import './App.css'
type Person={
  name: string,
  age: number
};

type Job={
  position: string,
  department: string
};

type Employee=Person & Job;

function describeEmployee(emp: Employee){
  if (typeof emp.position==='string' && emp.position==='Manager') return `${emp.name} is a Manager in ${emp.department} department`;
  if (typeof emp.position==='string' && emp.position==='Developer') return `${emp.name} is a Developer in ${emp.department} department`;
} 

function App() {
  let emp1={
    name: 'John Smith',
    age: 35,
    position: 'Developer',
    department: 'Web Development'
  };

  let emp2={
    name: 'Michael Anderson',
    age: 40,
    position: 'Manager',
    department: 'QA Engineering'
  }

  return (
    <>
      <div>
        <p>{emp1.name}, {emp1.age}</p>
        <p>{describeEmployee(emp1)}</p>
        <p>{emp2.name}, {emp2.age}</p>
        <p>{describeEmployee(emp2)}</p>
      </div>
    </>
  )
}

export default App
