//Exercise 5 : Family
//Instructions
//Create an object called family with a few key value pairs.
const family={
    lastname: 'Frederickson',
    firstnameAndAge: {
        father: ['Jack', 52],
        mother: ['Helen', 48],
        son1: ['Michael', 23],
        son2: ['Evan', 13],
        daughter: ['Cindy', 19]
    }
}
// Using a for in loop, console.log the keys of the object.
for (let x in family) {
  console.log(x) 
}
//Using a for in loop, console.log the values of the object.
for (let x in family) {
  console.log(family[x]) 
}