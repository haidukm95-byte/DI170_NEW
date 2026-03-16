//Exercise 6 : Rudolf
//Instructions
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};
//Given the object above and using a for loop, console.log 
// “my name is Rudolf the reindeer” 
for(let x in details){
    console.log(x, details[x])
};
