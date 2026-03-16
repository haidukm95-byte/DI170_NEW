//Write a JavaScript program that recreates the pattern below.
//Do this challenge twice: first by using one loop, then by using two 
// nested for loops (Nested means one inside the other - check out this 
// tutorial of nested loops).
// Do this Daily Challenge by yourself, without looking at the answers on 
// the internet.

//*  
//* *  
//* * *  
//* * * *  
//* * * * *
//* * * * * *

//solution with single loop
let starPattern=''
for (let i=1; i<=6; i++) {
    starPattern += '* ';
    console.log(starPattern)
}

//solution with nested loops
for (let j=1; j<=6; j++) {
    let currentLine='';
    for (let k=0; k<j; k++) {
        currentLine+='* '
    }
    console.log(currentLine)
}