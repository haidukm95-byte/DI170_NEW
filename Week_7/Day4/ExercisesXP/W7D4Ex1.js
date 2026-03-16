const people = ["Greg", "Mary", "Devon", "James"];
//Part I - Review about arrays
//Write code to remove “Greg” from the people array.
let deletedItem = people.shift()
console.log(people)
//Write code to replace “James” to “Jason”.
let index=2;
let newElement='Jason';
people[index]=newElement;
console.log(people);
//Write code to add your name to the end of the people array.
let my_name=people.push('Marko');
console.log(people);
//Write code that console.logs Mary’s index. take a look at the indexOf 
// method on Google.
const MaryIndex=people.indexOf('Mary');
console.log(MaryIndex);
//Write code to make a copy of the people array using the slice method.
        //The copy should NOT include “Mary” or your name.
        //Hint: remember that now the people array should look like this 
        // const people = ["Mary", "Devon", "Jason", "Yourname"];
        //Hint: Check out the documentation for the slice method
let peopleNew = people.slice(1,3);
console.log(peopleNew);
//Write code that gives the index of “Foo”. Why does it return -1 ?
var FooIndex=people.indexOf('Foo');
console.log(FooIndex);
//Create a variable called last which value is the last element of the 
// array.
    //Hint: What is the relationship between the index of the last element 
    // in the array and the length of the array?
var lastValue = people.at(-1);
console.log(lastValue);

//Part II - Loops

  //  Using a loop, iterate through the people array and console.log each 
  // person.
for (let x in people) {
    console.log(people[x])
}
//    Using a loop, iterate through the people array and exit the loop 
// after you console.log “Devon” .
    //Hint: take a look at the break statement in the lesson.
for (let x in people) {
    console.log(people[x])
    if (people[x]==='Devon') {
        break
    }
}

