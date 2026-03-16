//Exercise 6 : Employees #2
//Instructions

//Using this object:

const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];

//Using the filter() method, create a new array, containing the students that passed 
// the course.
const studentsPassed=students.filter(val=>val.isPassed===true).map(val=>val.name);
console.log(studentsPassed);
//Bonus : Chain the filter method with a forEach method, to congratulate the students 
// with their name and course name (ie. “Good job Jenner, you passed the course in 
// Information Technology”, “Good Job Marco you passed the course in Robotics” ect…)
const congrats=students.filter(val=>val.isPassed===true).forEach(val=>{
    console.log(`Good Job ${val.name}, you passed the you passed the course in ${val.course}`);
})


